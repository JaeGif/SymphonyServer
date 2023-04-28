import { useState } from 'react';
import ChangeUserInformation from './ChangeUserInformation';
import ChangePassword from './ChangePassword';
import { motion, AnimatePresence } from 'framer-motion';
import uniqid from 'uniqid';
type EditUserProps = {
  refreshUserData: Function;
};
function EditUser({ refreshUserData }: EditUserProps) {
  const options = ['Profile', 'Password'];

  const [openTab, setOpenTab] = useState<string>(options[0]);
  return (
    <div className='justify-evenly'>
      <div className='rounded-t-md overflow-hidden flex w-full'>
        {options.map((item) => (
          <div
            className={
              openTab === item
                ? item === 'Profile'
                  ? 'p-5 cursor-pointer relative w-20 dark:bg-gray-900 bg-white rounded-tl-md h-10 flex flex-1 justify-center items-center select-none'
                  : 'p-5 cursor-pointer relative w-20 dark:bg-gray-900 bg-white rounded-tr-md h-10 flex flex-1 justify-center items-center select-none'
                : 'p-5 cursor-pointer relative w-20 dark:bg-gray-900 bg-white h-10 flex flex-1 justify-center items-center select-none'
            }
            key={item}
            onClick={() => setOpenTab(item)}
          >
            {item}
            {item === openTab ? (
              <motion.div
                className='absolute bottom-[-1px] left-0 right-0 h-[3px] bg-pink-500'
                layoutId='underline'
              />
            ) : null}
          </div>
        ))}
      </div>
      <div className={'rounded-b-md overflow-hidden'}>
        <AnimatePresence mode={'wait'}>
          <motion.div
            key={uniqid()}
            initial={{ y: -500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -500, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {openTab === 'Profile' && (
              <ChangeUserInformation refreshUserData={refreshUserData} />
            )}
            {openTab === 'Password' && <ChangePassword />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default EditUser;
