import { motion } from 'framer-motion';

function Error() {
  const badSuspension = {
    hidden: {
      y: '-100vh',
      opacity: 0,
      transform: 'scale(0) rotateX(-360deg)',
    },
    visible: {
      y: '-25vh',
      opacity: 1,
      transition: {
        duration: 0.2,
        type: 'spring',
        damping: 15,
        stiffness: 500,
      },
    },
    exit: {
      y: '-100vh',
      opacity: 0,
    },
  };
  return <motion.div>Error</motion.div>;
}

export default Error;
