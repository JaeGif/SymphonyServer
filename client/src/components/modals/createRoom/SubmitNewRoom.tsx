import { useState, useEffect } from 'react';
import style from './submit.module.css';
import { FileUploader } from 'react-drag-drop-files';

type SubmitNewRoomProps = {
  handleSubmitSelection: Function;
};
function SubmitNewRoom({ handleSubmitSelection }: SubmitNewRoomProps) {
  const maxCount = 40;
  const fileTypes = [
    'jpg',
    'png',
    'jpeg',
    'gif',
    'apng',
    'svg',
    'bmp',
    'bmp ico',
    'png ico',
    'avif',
    'webp',
  ];
  const [isPublic, setIsPublic] = useState(true);
  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [wordCount, setWordCount] = useState(`0/${maxCount}`);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleFileParentChild = (file: File) => {
    setImageFile(file);
  };

  useEffect(() => {
    if (!imageFile) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target!.result);
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  const countWords = () => {
    const length = description.length;
    setWordCount(`${length}/${maxCount}`);
    if (length >= maxCount) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  return (
    <div className='w-full flex flex-col gap-5 mt-2'>
      <div className='flex gap-1 flex-col'>
        {imageFile ? (
          <div className='flex justify-evenly items-center gap-1 mb-3'>
            <div className='h-24 w-24 flex justify-center items-center rounded-[50%] overflow-hidden'>
              <img className='w-24' src={`${image}`} />
            </div>
            <img
              onClick={() => setImageFile(null)}
              className='h-12 w-12 cursor-pointer'
              src='/assets/favicons/add-photo.svg'
            />
          </div>
        ) : (
          <div className='mb-3'>
            <FileUploader
              handleChange={handleFileParentChild}
              name='file'
              types={fileTypes}
              onTypeError={() => alert('Invalid file type.')}
            />
          </div>
        )}
        <fieldset
          className={`relative border-[1px] border-pink-500 ${style.rounded}`}
        >
          <legend className='rounded-md absolute text-xs m-0 ml-1 p-0 pl-1 pr-1 -top-2 bg-white text-gray-500'>
            Give your room a name
          </legend>
          <input
            onChange={(e) => {
              console.log(e.target.value);
              setTitle(e.target.value);
            }}
            className='focus:outline-none border-none p-1 rounded-md w-full'
            type='text'
            name='title'
            id='title'
          />
        </fieldset>
        <div className='relative'>
          <label className='text-sm text-gray-500' htmlFor='description'>
            Description
          </label>
          <textarea
            maxLength={40}
            onKeyUp={countWords}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className='p-1 rounded-md w-full border-[1px] border-pink-500 resize-none'
            name='description'
            id='description'
          ></textarea>
          <div className='absolute bottom-1 right-1'>
            <p className={disabled ? 'text-red-500 text-xs' : 'text-xs'}>
              {wordCount}
            </p>
          </div>
        </div>
      </div>
      <div className='flex gap-1 items-center'>
        <input
          onChange={() => {
            if (isPublic) setIsPublic(false);
            else setIsPublic(true);
          }}
          className={`cursor-pointer ${style.cssCheckbox}`}
          type='checkbox'
          defaultChecked
          name='public'
          id='public'
        />
        <label
          title='Selecting this allows other users to search and join your room.'
          htmlFor='public'
          className='cursor-pointer'
        >
          Make Room Public
        </label>
      </div>
      <div className='flex justify-center'>
        <button
          onClick={() => {
            handleSubmitSelection(title, isPublic, description, imageFile);
          }}
          className='w-fit pr-8 pl-8 pt-1 pb-1 text-blue-500 hover:text-blue-400 cursor-pointer text-2xl rounded-md'
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default SubmitNewRoom;
