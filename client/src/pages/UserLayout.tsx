import { useContext } from 'react';
import { Outlet, useParams } from 'react-router';
import { TokenContext } from '../App';
import { useQuery } from '@tanstack/react-query';
const apiURL: string = import.meta.env.VITE_SOCKET_ADDRESS;

function UserLayout() {
  const userId = useParams();
  const token = useContext(TokenContext);
  const getUser = async () => {
    const res = await fetch(`${apiURL}/api/users/${userId.id}`, {
      mode: 'cors',
      method: 'GET',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.user;
  };
  const userQuery = useQuery({
    queryKey: ['users', { _id: userId }],
    queryFn: getUser,
  });
  return (
    <div className='sm:p-6'>
      {userQuery.data && <Outlet context={userQuery.data} />}
    </div>
  );
}

export default UserLayout;
