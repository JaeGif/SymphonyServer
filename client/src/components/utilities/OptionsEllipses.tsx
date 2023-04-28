import React, { useContext, useRef, useState, useEffect } from 'react';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import { ThemeContext, TokenContext, UserContext } from '../../App';

const apiURL: string = import.meta.env.VITE_SOCKET_ADDRESS;

type OptionsEllipsesProps = {
  room: string;
  refreshUserData: Function;
};
function OptionsEllipses({ room, refreshUserData }: OptionsEllipsesProps) {
  const token = useContext(TokenContext);
  const loggedInUser = useContext(UserContext);
  const theme = useContext(ThemeContext);
  const [isToggled, setIsToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = (e: React.FormEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsToggled(true);
  };
  const handleClose = (): void => {
    setIsToggled(false);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleRemoveUser = async () => {
    if (loggedInUser) {
      const data = { order: 'userLeaving', user: loggedInUser._id, room: room };
      const res = await fetch(`${apiURL}/api/rooms/${room}`, {
        mode: 'cors',
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: 'Bearer' + ' ' + token,
          'Content-Type': 'application/json',
        },
      });
      const userRes = await fetch(`${apiURL}/api/users/${loggedInUser._id}`, {
        mode: 'cors',
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: 'Bearer' + ' ' + token,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200 && userRes.status === 200) {
        refreshUserData();

        handleClose();
      } else if (res.status !== 200) {
        const jsonData = await res.json();
      }
    }
  };
  return (
    <div
      onClick={(e) => {
        handleOpen(e);
      }}
    >
      {
        <div
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className={
            isToggled
              ? `visible left-0 absolute top-0 dark:bg-gray-950 bg-gray-400 w-full p-6 hover:bg-red-500 dark:hover:bg-red-500`
              : 'invisible absolute top-0 w-full p-6'
          }
        >
          <div
            className='flex justify-center items-center h-8'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRemoveUser();
              setIsLoading(true);
            }}
          >
            {!isLoading ? (
              <p className='h-full text-lg'>Leave</p>
            ) : (
              <TailSpin className='h-8' />
            )}
          </div>
        </div>
      }
      <img
        className='h-8 hidden sm:block'
        src={
          theme === 'dark'
            ? `/assets/favicons/ellipses.svg`
            : '/assets/favicons/ellipses-black.svg'
        }
      />
    </div>
  );
}

export default OptionsEllipses;
