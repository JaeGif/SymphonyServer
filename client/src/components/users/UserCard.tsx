import { useContext } from 'react';
import { useParams } from 'react-router';
import { Room } from '../../types/Interfaces';
import { TokenContext, UserContext } from '../../App';
import { useQueries } from '@tanstack/react-query';
import UserHead from './UserHead';
import useIsCurrentUser from '../../hooks/useIsCurrentUser';
import uniqid from 'uniqid';
const apiURL: string = import.meta.env.VITE_SOCKET_ADDRESS;
type UserCardProps = {
  logoutUser?: Function;
};
function UserCard({ logoutUser }: UserCardProps) {
  const token = useContext(TokenContext);
  const user = useContext(UserContext);

  const profile = useParams();
  const isCurrentUser = useIsCurrentUser(user!._id, profile.id!);
  const rooms = user!.rooms;

  const getRooms = async (room: string): Promise<Room> => {
    const res = await fetch(`${apiURL}/api/rooms/${room}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.room;
  };
  const userRooms = useQueries({
    queries: rooms.map((room: string) => ({
      queryKey: ['room', { _id: room }],
      queryFn: () => getRooms(room),
    })),
  });
  return (
    <div className='dark:bg-gray-900 bg-white rounded-lg p-4 dark:text-white h-fit w-screen sm:w-[28rem]'>
      <UserHead hover={false} user={user!} size={'2xl'} />
      {user!.isModerator && (
        <div>
          <h3 className='w-fit m-2 text-blue-400'>Roles</h3>
          <div className='dark:bg-gray-950 bg-gray-100 p-3 rounded-md'>
            <p>Admin</p>
          </div>
        </div>
      )}

      <div className='flex flex-col'>
        <h3 className='w-fit m-2 text-blue-400'>About</h3>
        <div className='dark:bg-gray-950 bg-gray-100 p-3 rounded-md max-h-80 overflow-scroll'>
          <p>{user!.bio ? `${user!.bio}` : 'I need no introduction.'}</p>
        </div>
      </div>

      {user!.website !== '' && (
        <div className='flex flex-col'>
          <h3 className='w-fit m-2 text-blue-400'>Personal Site</h3>
          <div className='dark:bg-gray-950 bg-gray-100 p-3 rounded-md'>
            <a href={`${user!.website}`} rel='noreferrer' target='_blank'>
              {user!.website}
            </a>
          </div>
        </div>
      )}
      {user!.rooms.length !== 0 ? (
        <div>
          <h3 className='text-blue-400 w-fit m-2'>Active Rooms</h3>
          <div className='gap-1 overflow-scroll flex'>
            {userRooms.map(
              (room) =>
                room.data && (
                  <div
                    key={uniqid()}
                    className='dark:bg-gray-700 bg-gray-100 rounded-sm p-1 flex gap-1 min-w-fit'
                  >
                    {room.data.avatar ? (
                      <div className='h-6 w-6 rounded-3xl overflow-hidden'>
                        <img className='h-6 w-6' src={room.data.avatar} />
                      </div>
                    ) : (
                      <div className='h-6 w-6 rounded-3xl overflow-hidden'>
                        <img
                          className='h-6 w-6'
                          src='/assets/favicons/study.png'
                        />
                      </div>
                    )}
                    <p>{room.data.title}</p>
                  </div>
                )
            )}
          </div>
        </div>
      ) : (
        <>
          <h3 className='text-blue-400 w-fit m-2'>Active Rooms</h3>
          <p>{user!.username} hasn't joined any rooms yet.</p>
        </>
      )}
      {isCurrentUser && (
        <div
          onClick={() => logoutUser!()}
          className='flex items-center mt-4 w-fit gap-1 hover:cursor-pointer'
        >
          <img className='h-6' src='/assets/favicons/logout.svg' />
          <p className='text-red-600 text-center'>Logout</p>
        </div>
      )}
    </div>
  );
}

export default UserCard;
