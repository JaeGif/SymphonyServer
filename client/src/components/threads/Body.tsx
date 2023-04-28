import { useContext, useEffect, useRef, useState } from 'react';
import Message from '../messaging/Message';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TokenContext } from '../../App';
import LoadingChat from '../utilities/LoadingChat';
import { MessageType } from '../../types/Interfaces';
import uniqid from 'uniqid';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;
type BodyProps = {
  room: string | undefined;
  recievedMessage: MessageType;
};
function Body({ room, recievedMessage }: BodyProps) {
  const [currentThread, setCurrentThread] = useState<MessageType[]>([]);
  const [savedMessages, setSavedMessages] = useState<MessageType[]>([]);

  const ref = useRef<HTMLDivElement | null>(null);
  const skeletonMap = [1];

  const token = useContext(TokenContext);
  const returnLimit = 10;

  const removeMessage = (_id: string) => {
    for (let i = 0; i < currentThread.length; i++) {
      if (currentThread[i]._id === _id) {
        console.log('removing', i, currentThread[i]);
        let threadMod = [...currentThread];
        threadMod.splice(i, 1);
        setCurrentThread(threadMod);
        return;
      }
    }
    for (let i = 0; i < savedMessages.length; i++) {
      if (savedMessages[i]._id === _id) {
        console.log('removing', i, savedMessages[i]);
        let threadMod = [...savedMessages];
        threadMod.splice(i, 1);
        setSavedMessages(threadMod);
        return;
      }
    }
  };
  const messagesQuery = useInfiniteQuery(
    ['messages', { room: room }],
    async ({ pageParam = 0 }) => {
      const res = await fetch(
        `${apiURL}/api/messages?room=${room}&cursor=${pageParam}&returnLimit=${returnLimit}`,
        {
          mode: 'cors',
          method: 'GET',
          headers: {
            Authorization: 'Bearer' + ' ' + token,
          },
        }
      );
      const data = await res.json();
      return data;
    },
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor ?? undefined,
      getPreviousPageParam: (firstPage, pages) =>
        firstPage.previousCursor ?? undefined,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (!messagesQuery.data) return;
    let intermediateArray = [];
    for (let i = messagesQuery.data.pages.length - 1; i >= 0; i--) {
      intermediateArray.push(...messagesQuery.data.pages[i].messages);
    }
    setSavedMessages([...intermediateArray]);
  }, [messagesQuery.data?.pages.length]);

  useEffect(() => {
    const messageContainer = ref.current as HTMLDivElement;
    if (!messageContainer) return;
    const onScroll = function () {
      if (messageContainer.scrollTop === 0) {
        if (!messagesQuery.isFetchingNextPage) {
          messagesQuery.fetchNextPage();
        }
      }
    };
    messageContainer.addEventListener('scroll', onScroll);
    return () => messageContainer.removeEventListener('scroll', onScroll);
  }, [messagesQuery.isFetching]);

  useEffect(() => {
    if (recievedMessage)
      setCurrentThread(currentThread.concat(recievedMessage));
  }, [recievedMessage]);
  return (
    <div
      ref={ref}
      className={`overflow-y-scroll overflow-x-hidden h-[calc(100vh-10rem)] sm:h-[calc(100vh-7rem)] flex flex-1 flex-col-reverse`}
    >
      <div>
        {currentThread.length !== 0 &&
          currentThread.map((messageObj) => (
            <Message
              key={uniqid()}
              message={messageObj}
              removeMessage={removeMessage}
            />
          ))}
      </div>
      <div>
        {savedMessages.length !== 0 &&
          savedMessages.map((messageObj) => (
            <Message
              key={uniqid()}
              message={messageObj}
              removeMessage={removeMessage}
            />
          ))}
      </div>

      {messagesQuery.isFetching && skeletonMap.map((el) => <LoadingChat />)}
    </div>
  );
}

export default Body;
