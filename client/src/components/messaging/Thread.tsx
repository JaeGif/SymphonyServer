import { useContext, useEffect, useState } from 'react';
import { TokenContext, UserContext } from '../../App';
import * as io from 'socket.io-client';
import Body from '../threads/Body';
import Footer from '../threads/Footer';
import Header from '../threads/Header';
import { MessageType } from '../../types/Interfaces';
import uniqid from 'uniqid';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

type ThreadProps = {
  socket: io.Socket;
  room: string | undefined;
};
// thread maps messages into a full thread with correct layout
function Thread({ socket, room }: ThreadProps) {
  // dummy user
  const token = useContext(TokenContext);
  const user = useContext(UserContext);
  const [message, setMessage] = useState<string>();
  const [recievedMessage, setRecievedMessage] = useState<MessageType>();

  useEffect(() => {}, []);
  const setSeenThread = async () => {
    const res = await fetch(`${apiURL}/api/rooms/${room}`, {
      mode: 'cors',
      body: JSON.stringify({
        seen: true,
      }),
      headers: {
        Authorization: 'Bearer' + ' ' + token,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    if (res.status === 200) {
      // remove notification
    }
  };
  const submitMessage = async () => {
    if (message !== '') {
      let date = new Date();
      let options: {} = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      // send message
      const data = {
        _id: uniqid() + Date.now(),
        room: room,
        user: user,
        message: message,
        seen: false,
        timestamp: date.toLocaleTimeString('en-us', options),
      };
      socket.emit('send_message', data);
    }
  };
  useEffect(() => {
    socket.on('recieve_message', (data) => {
      data.seen = true;
      setRecievedMessage(data);
    });
  }, [socket, io]);
  return (
    <div className='sm:h-screen h-[calc(100vh-4rem)] w-full relative'>
      <Header room={room} />
      <Body room={room} recievedMessage={recievedMessage!} />
      <Footer setMessage={setMessage} submitMessage={submitMessage} />
    </div>
  );
}

export default Thread;
