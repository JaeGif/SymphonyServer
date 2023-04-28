import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bars } from 'react-loading-icons';
import { useNavigate } from 'react-router';
import RegisterBackground from '../components/effects/RegisterBackground';
const apiURL: string = import.meta.env.VITE_SOCKET_ADDRESS;

type RegisterProps = {
  registerUser: Function;
  registerStatus: number;
  setRegisterStatus: Function;
};
type ValidityObject = {
  username: boolean;
  password: boolean;
  email: boolean;
  confirmPassword: boolean;
};
function Register({
  registerUser,
  registerStatus,
  setRegisterStatus,
}: RegisterProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [validObj, setValidObj] = useState<ValidityObject>({
    username: false,
    password: false,
    email: false,
    confirmPassword: false,
  });
  useEffect(() => {
    if (registerStatus === 200) {
      navigate('/login');
      setRegisterStatus(0);
    }
  }, [registerStatus]);
  const [email, setEmail] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimationDone(true), 1500);
    return () => {
      setIsLoading(false);
    };
  }, []);

  function validatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const password = e.target;
    password.setCustomValidity('');

    if (password.checkValidity()) {
      const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
      if (pattern.test(password.value)) {
        password.setCustomValidity('');
        handlePassword(e);
        setButtonDisabled(false);
        setValidObj({ ...validObj, password: true });
      } else {
        password.setCustomValidity(
          'Minimum six characters, at least one uppercase letter, one lowercase letter, and one number.'
        );
        setValidObj({ ...validObj, password: false });

        setButtonDisabled(true);
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
      handleConfirmPassword(e);
      setButtonDisabled(false);
      setValidObj({ ...validObj, confirmPassword: true });
    } else {
      confirmPassword.setCustomValidity('Passwords do not match.');
      setButtonDisabled(true);
      setValidObj({ ...validObj, confirmPassword: false });

      confirmPassword.reportValidity();
    }
  }
  const checkUnique = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target;
    username.setCustomValidity('');

    if (username.checkValidity()) {
      const res = await fetch(`${apiURL}/api/users/usernames`, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ username: e.target.value }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 200) {
        username.setCustomValidity('');
        handleUsername(e);
        setValidObj({ ...validObj, username: true });
      } else if (res.status === 409) {
        username.setCustomValidity('This username is already taken.');
        setValidObj({ ...validObj, username: false });

        username.reportValidity();
      } else {
        console.log(res);
      }
    }
  };

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target;
    email.setCustomValidity('');
    if (email.checkValidity()) {
      console.log('checking email');
      const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (pattern.test(email.value)) {
        console.log('pass');

        email.setCustomValidity('');
        handleEmail(e);
        setValidObj({ ...validObj, email: true });
      } else {
        console.log('fail');
        email.setCustomValidity('Please enter a valid email address.');
        setValidObj({ ...validObj, email: false });
        email.reportValidity();
      }
    }
  };
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const validityCheck = (
    e: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => {
    const button = e.target as HTMLButtonElement;
    button.setCustomValidity('');
    let invalidStr = '';
    if (
      validObj.username &&
      validObj.email &&
      validObj.password &&
      validObj.confirmPassword
    ) {
      button.setCustomValidity('');

      handleSubmit();
    } else {
      if (!validObj.username) {
        invalidStr += 'username';
      }
      if (!validObj.email) {
        if (!validObj.username) {
          invalidStr += ', ';
        }
        invalidStr += 'email';
      }
      if (!validObj.confirmPassword) {
        if (!validObj.email || !validObj.username) {
          invalidStr += ' and ';
        }
        invalidStr += 'password';
      }
      button.setCustomValidity(`Please correct invalid ${invalidStr}.`);
      button.reportValidity();
      console.log('invalid');
    }
  };
  const handleSubmit = () => {
    registerUser({
      username: username,
      password: password,
      email: email,
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className='overflow-hidden w-screen h-screen'>
      <RegisterBackground />
      <motion.div
        animate={{
          opacity: animationDone ? 1 : 0,
          scale: animationDone ? 1 : 0,
        }}
        style={{ originX: 1, x: 0 }}
        className={
          animationDone
            ? 'absolute w-[400px] top-[10vh] left-[calc(50vw-200px)] flex items-center flex-col'
            : 'hidden'
        }
      >
        <div>
          <p className='text-9xl font-dirtyClassic text-white'>Symphony</p>
        </div>
        <div className='w-full bg-white rounded-md shadow-2xl flex flex-col justify-center items-center p-8'>
          <p className='text-3xl m-0 p-0'>Create an Account</p>
          <p className='text-gray-600'>The messaging app for friends.</p>
          <div className='flex flex-col gap-3 mt-2'>
            <div>
              <label className='font-bold text-xs text-gray-800'>EMAIL</label>

              <input
                type='email'
                onBlur={(e) => validateEmail(e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsLoading(true);
                  }
                }}
                onChange={(e) => {
                  validateEmail(e);
                }}
                className='w-full bg-gray-100 h-9 text-gray-800 rounded-sm border-gray-500 border-[1px] text-xl pl-1'
              />
            </div>
            <div>
              <label className='font-bold text-xs text-gray-800'>
                USERNAME
              </label>

              <input
                type='text'
                autoComplete='true'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsLoading(true);
                  }
                }}
                onChange={(e) => {
                  checkUnique(e);
                }}
                className='w-full bg-gray-100 h-9 text-gray-800 rounded-sm border-gray-500 border-[1px] text-xl pl-1'
              />
            </div>
            <div>
              <label className='font-bold text-xs text-gray-800'>
                PASSWORD
              </label>
              <input
                type='password'
                onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                  if (e.key === 'Enter') {
                    setIsLoading(true);
                    validityCheck(e);
                  }
                }}
                onChange={(e) => {
                  validatePassword(e);
                }}
                className='w-full bg-gray-100 h-9 text-gray-800 rounded-sm border-gray-500 border-[1px] text-xl'
              />
            </div>
            <div>
              <label className='font-bold text-xs text-gray-800'>
                CONFIRM PASSWORD
              </label>
              <input
                type='password'
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    setIsLoading(true);
                    validityCheck(e);
                  }
                }}
                onChange={(e) => {
                  matchPasswords(e);
                }}
                className='w-full bg-gray-100 h-9 text-gray-800 rounded-sm border-gray-500 border-[1px] text-xl'
              />
            </div>
            <div>
              <button
                disabled={buttonDisabled}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  validityCheck(e);
                }}
                type='submit'
                className='h-8 bg-pink-600 hover:bg-pink-500 text-white w-full rounded-sm text-md flex justify-center items-center'
              >
                {isLoading ? <Bars className='h-5' /> : 'Register'}
              </button>
              <Link
                className='text-blue-500 text-sm'
                to='/login'
                replace={true}
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      <div className='fixed bottom-5 left-5'>
        <p className='text-white text-sm'>
          <em>Background image from wallpaperflare</em>
        </p>
      </div>
    </div>
  );
}

export default Register;
