import { useContext, useEffect, useState } from 'react';
import { UserContext, TokenContext } from '../../App';
import { Room } from '../../types/Interfaces';

const apiURL: string = import.meta.env.VITE_SOCKET_ADDRESS;
type RoomCardProps = {
  room: Room;
  refreshUserData: Function;
};
function RoomCard({ room, refreshUserData }: RoomCardProps) {
  const user = useContext(UserContext);

  const token = useContext(TokenContext);
  const [isMember, setIsMember] = useState(false);
  useEffect(() => {
    if (!user) return;
    for (let i = 0; i < user.rooms.length; i++) {
      if (user.rooms[i] === room._id) {
        setIsMember(true);
      }
    }
  }, [user?.rooms.length]);
  const joinRoomPut = async () => {
    setIsMember(true);

    const payload = {
      user: user?._id,
      room: room._id,
      order: 'userJoining',
    };
    const resRoom = await fetch(`${apiURL}/api/rooms/${room._id}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    const resUser = await fetch(`${apiURL}/api/users/${user?._id}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    const roomData = await resRoom.json();
    const userData = await resUser.json();
    refreshUserData();
  };

  return (
    <div className='flex flex-col justify-between dark:bg-gray-950 bg-gray-100 w-80 h-44 rounded-md p-4 shadow-md border-l-4 border-blue-500'>
      <div className='flex gap-2'>
        <div className='w-12 h-12 rounded-3xl bg-gray-900 overflow-hidden flex justify-center items'>
          <img
            className='w-12'
            src={room.avatar ? room.avatar : '/assets/favicons/symphony.svg'}
            alt='img'
          />
        </div>
        <div className='w-[calc(100%-3rem)]'>
          <span className='flex justify-between'>
            <p>{room.title}</p>
            <img className='h-8' src={`/assets/favicons/${room.topic}.png`} />
          </span>
          <p>Members: {room.users.length}</p>
        </div>
      </div>
      <div className='max-w-full'>
        <p className='break-normal'>
          {room.description ? room.description : 'No descrption'}
        </p>
      </div>
      <div className='flex justify-center'>
        {!isMember ? (
          <button
            onClick={joinRoomPut}
            disabled={isMember}
            className='bg-pink-500 w-fit p-6 pt-2 pb-2 rounded-md hover:bg-pink-700 hover:text-black text-white'
          >
            Join
          </button>
        ) : (
          <p>
            <em className='text-gray-500'>Already a member.</em>
          </p>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
