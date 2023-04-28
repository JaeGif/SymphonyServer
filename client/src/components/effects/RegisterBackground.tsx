import style from './effects.module.css';

function RegisterBackground() {
  return (
    <div className='relative w-screen h-screen overflow-hidden'>
      <img
        className={`w-[2160px] object-cover max-h-[3840px] min-h-full ${style.registerAnimation} ${style.registerImg} absolute`}
        src='/assets/images/registerBackground.png'
        alt='background grey'
      ></img>
      <img
        className='w-[2160px] object-cover max-h-[3840px] min-h-full block'
        src='/assets/images/registerOriginal.png'
        alt='background color'
      ></img>
    </div>
  );
}

export default RegisterBackground;
