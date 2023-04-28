import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import Layout from './pages/Layout';
import MessageLayout from './pages/MessageLayout';
import Explore from './pages/Explore';
import UserLayout from './pages/UserLayout';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import Error404 from './pages/Error404';
import RoomMountingWrapper from './components/utilities/RoomMountingWrapper';
import { User } from './types/Interfaces';
const UserContext = React.createContext<User | null>(null);
const TokenContext = React.createContext<string | null>(null);
const ThemeContext = React.createContext<'light' | 'dark'>('dark');

type LoginDataProps = {
  user: User;
  token: string;
};

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null); // Stores user data
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Boolean for conditionally showing login routes
  const [loginStatus, setLoginStatus] = useState<number>(0);
  const [checkedLoginState, setCheckedLoginState] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [registerStatus, setRegisterStatus] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const apiURL: string = import.meta.env.VITE_SOCKET_ADDRESS;
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const data = JSON.parse(loggedUserJSON);
      parseJwt(data);
    }
    setCheckedLoginState(true);
  }, []);
  const parseJwt = (data: LoginDataProps): void => {
    const decode = JSON.parse(atob(data.token.split('.')[1]));
    if (decode.expire * 1000 < new Date().getTime()) {
      clearExpiredData();
      console.log('Token Expired');
    } else {
      setLoggedInUser(data.user);
      setToken(data.token);
      setIsLoggedIn(true);
      navigate('/explore', { replace: true });
    }
  };
  const clearExpiredData = () => {
    localStorage.clear();
  };
  const fetchUserData = async (
    id: string,
    token: string | null,
    refetch: boolean = false
  ): Promise<void> => {
    const res = await fetch(`${apiURL}/api/users/${id}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json();
    setLoggedInUser(data.user);
    if (!refetch) {
      setIsLoggedIn(true);
      navigate('/explore', { replace: true });
    }
    window.localStorage.setItem(
      'user',
      JSON.stringify({ user: data.user, token: token })
    );
  };
  const loginUser = async (
    username: string,
    password: string,
    isGuest = false
  ): Promise<void> => {
    const userData = new URLSearchParams();
    userData.append('username', username);
    userData.append('password', password);
    const res = await fetch(`${apiURL}/login`, {
      mode: 'cors',
      method: 'POST',
      body: userData,
    });
    setLoginStatus(res.status);
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
    }
    if (data.user && data.token) {
      fetchUserData(data.user, data.token);
    }
  };
  const logoutUser = async () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setToken('');
    window.localStorage.clear();
  };
  const registerUser = async (data: {
    username: string;
    password: string;
    email: string;
  }): Promise<void> => {
    // to be completed
    const userData = new URLSearchParams();
    userData.append('username', data.username);
    userData.append('password', data.password);
    userData.append('email', data.email);
    const res = await fetch(`${apiURL}/register`, {
      mode: 'cors',
      method: 'POST',
      body: userData,
    });
    setRegisterStatus(res.status);
  };

  const refreshUserData = async () => {
    if (loggedInUser) fetchUserData(loggedInUser._id, token, true);
  };
  return (
    <UserContext.Provider value={loggedInUser}>
      <TokenContext.Provider value={token}>
        <ThemeContext.Provider value={theme}>
          {checkedLoginState && (
            <Routes>
              <Route
                path='/login'
                element={
                  <Login loginUser={loginUser} loginStatus={loginStatus} />
                }
              />
              <Route
                path='/register'
                element={
                  <Register
                    registerUser={registerUser}
                    registerStatus={registerStatus}
                    setRegisterStatus={setRegisterStatus}
                  />
                }
              />
              {isLoggedIn ? (
                <Route
                  path='/'
                  element={
                    <Layout
                      refreshUserData={refreshUserData}
                      setTheme={setTheme}
                    />
                  }
                >
                  <Route
                    path='messages'
                    element={
                      <MessageLayout refreshUserData={refreshUserData} />
                    }
                  >
                    <Route path=':id' element={<RoomMountingWrapper />} />
                  </Route>
                  <Route
                    path='explore'
                    element={<Explore refreshUserData={refreshUserData} />}
                  />
                  <Route path='profile' element={<UserLayout />}>
                    <Route
                      path=':id'
                      element={
                        <UserProfile
                          logoutUser={logoutUser}
                          refreshUserData={refreshUserData}
                        />
                      }
                    />
                  </Route>
                </Route>
              ) : (
                <Route path='*' element={<Navigate to='/login' />} />
              )}
              <Route path='*' element={<Error404 />} />
            </Routes>
          )}
        </ThemeContext.Provider>
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}

export { App, UserContext, TokenContext, ThemeContext };
