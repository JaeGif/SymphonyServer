import React, { useState } from 'react';
import Bars from 'react-loading-icons/dist/esm/components/bars';

function ChangePassword() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function validatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const password = e.target;
    password.setCustomValidity('');

    if (password.checkValidity()) {
      const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
      if (pattern.test(password.value)) {
        password.setCustomValidity('');
        setPassword(e.target.value);
      } else {
        password.setCustomValidity(
          'Minimum six characters, at least one uppercase letter, one lowercase letter, and one number.'
        );
        password.reportValidity();
      }
    }
  }
  function matchPasswords(e: React.ChangeEvent<HTMLInputElement>) {
    const firstPassword = password;
    const confirmPassword = e.target;
    confirmPassword.setCustomValidity('');
    if (firstPassword === confirmPassword.value) {
      confirmPassword.setCustomValidity('');
      setConfirmPassword(e.target.value);
    } else {
      confirmPassword.setCustomValidity('Passwords do not match.');
      confirmPassword.reportValidity();
    }
  }
  return (
    <div className='dark:bg-gray-900 bg-white p-3 flex flex-col gap-2'>
      <div className='flex flex-col relative'>
        <label className='text-blue-400 text-xl font-bold'>New Password</label>
        <input
          className='bg-gray-100 dark:bg-gray-950 p-3 rounded-md min-w-[322px] max-w-[508px]'
          onChange={(e) => validatePassword(e)}
          type={visible ? 'text' : 'password'}
        />
        {!visible ? (
          <img
            onClick={() => setVisible(!visible)}
            className='absolute top-0 right-2 h-6 cursor-pointer'
            src='/assets/favicons/visible.svg'
          />
        ) : (
          <img
            onClick={() => setVisible(!visible)}
            className='absolute top-0 right-2 h-6 cursor-pointer'
            src='/assets/favicons/visible-off.svg'
          />
        )}
      </div>
      <div className='flex flex-col relative'>
        <label className='text-blue-400 text-xl font-bold'>
          Confirm Password
        </label>
        <input
          className='bg-gray-100 dark:bg-gray-950 p-3 rounded-md'
          onChange={(e) => matchPasswords(e)}
          type={visible ? 'text' : 'password'}
        />
      </div>
      <button className='dark:bg-blue-600 bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-md dark:hover:bg-blue-500 flex justify-center items-center'>
        {isLoading ? <Bars className='h-6' /> : 'Confirm Changes'}
      </button>
    </div>
  );
}

export default ChangePassword;
