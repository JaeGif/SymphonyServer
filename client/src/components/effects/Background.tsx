import style from './effects.module.css';

function Background() {
  return (
    <div className='relative w-screen h-screen overflow-hidden'>
      <img
        className={`w-[2160px] object-cover max-h-[3840px] min-h-full ${style.animation} ${style.colorimg} absolute`}
        src='/assets/images/graffiti-grey.png'
        alt='background grey'
      ></img>
      <img
        className='w-[2160px] object-cover max-h-[3840px] min-h-full block'
        src='/assets/images/graffiti-original.jpg'
        alt='background color'
      ></img>
    </div>
  );
}

export default Background;
