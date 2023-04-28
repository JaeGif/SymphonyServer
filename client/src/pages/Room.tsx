import { useContext, useEffect, useState } from 'react';
import * as io from 'socket.io-client';
import { UserContext } from '../App';
import Thread from '../components/messaging/Thread';
import { useParams } from 'react-router';

const socketAddress: string = import.meta.env.VITE_SOCKET_ADDRESS;

function Room() {
  let { id } = useParams();
  const user = useContext(UserContext);
  const socket = io.connect(`${socketAddress}`, {
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 10,
  });

  // this room id would be fetched from a MONGO converstation collection
  const [room, setRoom] = useState<string | undefined>(id);
  const joinRoom = () => {
    if (!user) return;
    if (user.username !== '' && room) {
      socket.emit('join_room', room);
    }
  };
  useEffect(() => {
    joinRoom();
  }, []);

  return (
    <div className='flex-1 dark:bg-inherit bg-gray-200'>
      <Thread socket={socket} room={room} />
    </div>
  );
}

export default Room;
