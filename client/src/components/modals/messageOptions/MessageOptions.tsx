import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import uniqid from 'uniqid';

type MessageOptionsProps = {
  handleDelete: Function;
  openEdit: Function;
  closeOptions: Function;
};
function MessageOptions({
  handleDelete,
  openEdit,
  closeOptions,
}: MessageOptionsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        closeOptions(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      key={uniqid()}
      ref={ref}
      className='h-full flex dark:bg-gray-950 absolute right-[calc(48px+.75rem)] top-0 rounded-lg overflow-hidden'
    >
      <button
        className='text-blue-50 dark:hover:bg-gray-900 dark:bg-gray-950 hover:bg-blue-500 bg-blue-400 p-2'
        onClick={(e) => {
          e.stopPropagation();
          closeOptions();
          openEdit();
        }}
      >
        Edit
      </button>
      <button
        className='dark:text-red-500 text-white dark:hover:bg-gray-900 dark:bg-gray-950 hover:bg-red-600 bg-red-500 p-2'
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      >
        Delete
      </button>
    </motion.div>
  );
}

export default MessageOptions;
