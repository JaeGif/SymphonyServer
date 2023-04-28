import style from './skeleton.module.css';

function LoadingChat() {
  return (
    <div className={`flex gap-2 p-3`}>
      <span className={`rounded-3xl h-10 w-10 dark:bg-gray-500 bg-gray-300 `}>
        <p className='invisible'>Picture Of stuff</p>
      </span>
      <div className={`flex flex-col gap-1`}>
        <span
          className={`dark:${style.animateSkeleton} ${style.animateSkeletonLight} h-5 dark:bg-gray-500 bg-gray-300 rounded-md `}
        >
          <p className='invisible'>This is a time</p>
        </span>
        <span
          className={`h-5 dark:bg-gray-500 bg-gray-300 rounded-md dark:${style.animateSkeleton} ${style.animateSkeletonLight}`}
        >
          <p className='invisible'>
            This is a really long message, but the text will be opaque so no one
            can see this unless they're clever. In fact I wanted to put Lorem
            Ipsum here, but I just couldn't bring myself to use an ipsum
            generator, no one takes the time to type aythign fun anymore, so why
            no make my dummy loading text a ridiculous run on sentence? It's
            just a personal fun project anyway to learn about Tailwind and
            Websockets yanno?
          </p>
        </span>
        <span
          className={`h-5 dark:bg-gray-500 bg-gray-300 rounded-md dark:${style.animateSkeleton} ${style.animateSkeletonLight}`}
        >
          <p className='invisible'>
            This is a really long message, but the text will be opaque so no one
            can see this unless they're clever. In fact I wanted to put Lorem
            Ipsum here, but I just couldn't bring myself to use an ipsum
            generator, no one takes the time to type aythign fun anymore, so why
            no make my dummy loading text a ridiculous run on sentence? It's
            just a personal fun project anyway to learn about Tailwind and
            Websockets yanno?
          </p>
        </span>
      </div>
    </div>
  );
}

export default LoadingChat;
