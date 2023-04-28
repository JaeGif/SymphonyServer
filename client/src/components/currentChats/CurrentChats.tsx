import { useContext } from 'react';
import { TokenContext, UserContext } from '../../App';
import { useQueries } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { BallTriangle } from 'react-loading-icons';
import OptionsEllipses from '../utilities/OptionsEllipses';
import uniqid from 'uniqid';
const apiURL: string = import.meta.env.VITE_SOCKET_ADDRESS;
type CurrentChatsProps = {
  refreshUserData: Function;
  isShowing: boolean;
};
function CurrentChats({ refreshUserData, isShowing }: CurrentChatsProps) {
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  const roomParam = useParams();

  const fetchRoom = async (room: string) => {
    const res = await fetch(`${apiURL}/api/rooms/${room}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json();
    return data.room;
  };
  const roomsQueries = useQueries({
    queries: loggedInUser!.rooms.map((room) => {
      return {
        queryKey: ['room', { _id: room }],
        queryFn: () => fetchRoom(room),
      };
    }),
  });

  return (
    <div
      style={{ transform: 'scaleX(-1)' }}
      className={`max-h-[calc(100vh-4rem)] sm:max-h-[100vh] w-fit dark:bg-gray-800 bg-gray-100 shadow-sm overflow-scroll`}
    >
      {roomsQueries.map((query) =>
        query.isSuccess ? (
          <Link key={uniqid()} to={`/messages/${query.data._id}`}>
            <div
              style={{ transform: 'scaleX(-1)' }}
              className={
                roomParam.id === query.data._id
                  ? `sm:p-5 p-2 dark:hover:bg-gray-900 hover:bg-gray-300 cursor-pointer border-r-blue-500 border-r-4 rounded-sm flex justify-between items-center relative`
                  : 'sm:p-5 p-2 dark:hover:bg-gray-900 hover:bg-gray-300 cursor-pointer flex justify-between items-center relative'
              }
            >
              <div className='flex gap-2 justify-center items-center h-10'>
                <div className='h-8 max-w-8'>
                  <img
                    className='h-8 max-w-[32px]'
                    src={`${query.data.avatar}`}
                  />
                </div>
                <p
                  className={
                    roomParam.id === query.data._id
                      ? `text-pink-500 hidden sm:block`
                      : 'hidden sm:block'
                  }
                >
                  {query.data.title}
                </p>
              </div>
              <OptionsEllipses
                refreshUserData={refreshUserData}
                room={`${query.data._id}`}
              />
            </div>
          </Link>
        ) : (
          <div className='p-5 hover:bg-gray-900 cursor-pointer flex justify-center items-center'>
            <BallTriangle stroke='#ec4899' className='h-6' />
          </div>
        )
      )}
    </div>
  );
}
export default CurrentChats;
