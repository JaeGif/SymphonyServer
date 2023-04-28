import { useContext, useState } from 'react';
import { Outlet } from 'react-router';
import CreateRoom from '../components/modals/createRoom/CreateRoom';
import Sidebar from '../components/sidebar/Sidebar';
import { AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../App';
type LayoutProps = {
  refreshUserData: Function;
  setTheme: Function;
};
function Layout({ refreshUserData, setTheme }: LayoutProps) {
  const theme = useContext(ThemeContext);
  const [createRoom, setCreateRoom] = useState<boolean>(false);

  const closeCreateRoom = () => {
    setCreateRoom(false);
  };
  const openCreateRoom = () => {
    setCreateRoom(true);
  };
  return (
    <div className={`${theme} relative`}>
      <AnimatePresence>
        {createRoom && (
          <CreateRoom
            closeCreateRoom={closeCreateRoom}
            refreshUserData={refreshUserData}
          />
        )}
      </AnimatePresence>
      <div
        className={`flex sm:space-x-16 dark:bg-gray-700 dark:text-white bg-gray-200 h-screen w-screen overflow-hidden`}
      >
        <Sidebar
          createRoom={createRoom}
          openCreateRoom={openCreateRoom}
          theme={theme}
          setTheme={setTheme}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
