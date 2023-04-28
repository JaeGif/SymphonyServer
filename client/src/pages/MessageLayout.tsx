import { useState } from 'react';
import { Outlet, useOutlet } from 'react-router';
import CurrentChats from '../components/currentChats/CurrentChats';
import OpenChatMessage from '../components/utilities/OpenChatMessage';
import useSwipe from '../hooks/useSwipe';

type MessageLayoutProps = {
  refreshUserData: Function;
};
function MessageLayout({ refreshUserData }: MessageLayoutProps) {
  const [isShowingCurrent, setIsShowingCurrent] = useState(true);
  const toggleChats = () => {
    setIsShowingCurrent(!isShowingCurrent);
  };
  const swipeHandlers = useSwipe({
    onSwipedLeft: () => setIsShowingCurrent(false),
    onSwipedRight: () => setIsShowingCurrent(true),
  });
  return (
    <div {...swipeHandlers} className='flex w-screen overflow-hidden'>
      <div className={isShowingCurrent ? 'flex' : 'hidden'}>
        <CurrentChats
          refreshUserData={refreshUserData}
          isShowing={isShowingCurrent}
        />
      </div>
      {<Outlet context={{ toggleChats, isShowingCurrent }} /> || (
        <OpenChatMessage />
      )}
    </div>
  );
}

export default MessageLayout;
