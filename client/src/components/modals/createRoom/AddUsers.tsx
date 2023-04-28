import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { TokenContext, UserContext } from '../../../App';
import UserHead from '../../users/UserHead';
import uniqid from 'uniqid';
import { User } from '../../../types/Interfaces';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;
type AddUsersProps = {
  handleUsersSelection: Function;
};
function AddUsers({ handleUsersSelection }: AddUsersProps) {
  const token = useContext(TokenContext);
  const loggedInUser = useContext(UserContext);
  const [users, setUsers] = useState([{ user: loggedInUser, key: uniqid() }]);
  const [query, setQuery] = useState('');

  const searchUsers = async () => {
    const res = await fetch(`${apiURL}/api/users?q=${query}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json();
    return data.users;
  };
  const updateQueryParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const searchUsersQuery = useQuery({
    queryKey: ['search', { q: query }],
    queryFn: searchUsers,
    enabled: Boolean(query),
  });
  const joinUser = (userData: { user: User; key: string }) => {
    // no multiple users added at once
    if (!userData) return;

    for (let i = 0; i < users.length; i++) {
      if (userData.user.username === users[i].user?.username) {
        return;
      }
    }
    setUsers([...users, userData]);
  };
  const removeFromList = (key: string) => {
    let usersObj = [...users];
    for (let i = 0; i < usersObj.length; i++) {
      console.log(users[i].key, key);
      if (usersObj[i].key === key) {
        usersObj.splice(i, 1);
        setUsers(usersObj);
        break;
      }
    }
  };

  return (
    <div className='w-full gap-1'>
      <p>Add people to the room.</p>
      <div className='flex gap-1 mb-1'>
        {users.length > 0 &&
          users.map((item, i) => (
            <div className='bg-blue-400 rounded-md p-1 flex gap-2 items-center'>
              <p>{item.user?.username}</p>
              {i !== 0 && (
                <img
                  onClick={() => removeFromList(item.key)}
                  className='h-5 cursor-pointer'
                  src='/assets/favicons/close.svg'
                />
              )}
            </div>
          ))}
      </div>
      <input
        onChange={(e) => updateQueryParams(e)}
        className='border-[1px] border-black rounded-sm p-1 w-full'
        type='text'
        placeholder='Add users'
      />
      <div>
        {searchUsersQuery.isFetched &&
          searchUsersQuery.data &&
          searchUsersQuery.data.map((user: User) => (
            <div
              className='cursor-pointer hover:bg-gray-300'
              onClick={() => joinUser({ user: user, key: uniqid() })}
            >
              <UserHead hover={false} user={user} />
            </div>
          ))}
      </div>
      <div className='flex justify-center'>
        <p
          onClick={() => {
            handleUsersSelection(users);
          }}
          className='w-fit cursor-pointer text-2xl text-blue-500 hover:text-blue-400'
        >
          Next
        </p>
      </div>
    </div>
  );
}

export default AddUsers;
