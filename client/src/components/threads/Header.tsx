import { useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TokenContext } from '../../App';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;
import { useOutletContext } from 'react-router';

type HeaderProps = {
  room: string | undefined;
};
function Header({ room }: HeaderProps) {
  const token = useContext(TokenContext);

  const context: { toggleChats: Function; isShowingCurrent: boolean } =
    useOutletContext();

  const getRoom = async () => {
    const res = await fetch(`${apiURL}/api/rooms/${room}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.room;
  };
  const roomQuery = useQuery({
    queryKey: ['room', { _id: room }],
    queryFn: getRoom,
  });
  return (
    <div
      className={`shadow-sm shadow-gray-400 dark:shadow-gray-800 flex p-1 pr-4 content-center justify-between items-center`}
    >
      <div className='flex'>
        <img
          onClick={() => context.toggleChats()}
          className='h-8 sm:hidden hover:cursor-pointer'
          src='/assets/favicons/back-arrow.svg'
          alt='check rooms'
        />
        <div className='dark:border-r-gray-600 border-r-gray-400 border-solid border-r p-1.5'>
          {roomQuery.data && (
            <p className='font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap'>
              {roomQuery.data.title}
            </p>
          )}
        </div>
        <div className='flex content-center p-1.5'>
          {roomQuery.data && (
            <p className='sm:max-w-none overflow-ellipsis overflow-hidden whitespace-nowrap text-gray-500'>
              {roomQuery.data.description}
            </p>
          )}
        </div>
      </div>
      {roomQuery.data && (
        <img
          className='h-10'
          src={`/assets/favicons/${roomQuery.data.topic}.png`}
        />
      )}
    </div>
  );
}

export default Header;
