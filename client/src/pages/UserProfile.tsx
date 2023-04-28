import { useContext } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../App';
import EditUser from '../components/users/EditUser';
import UserCard from '../components/users/UserCard';
import useIsCurrentUser from '../hooks/useIsCurrentUser';
type UserProfileProps = {
  logoutUser: Function;
  refreshUserData: Function;
};
function UserProfile({ logoutUser, refreshUserData }: UserProfileProps) {
  const user = useContext(UserContext);
  const profile = useParams();
  const isCurrentUser = useIsCurrentUser(user!._id, profile.id!);

  return (
    <div className='flex max-h-[calc(100vh-4rem)] gap-4 flex-col sm:flex-row overflow-y-scroll w-screen sm:w-auto'>
      <UserCard logoutUser={logoutUser} />
      {isCurrentUser && <EditUser refreshUserData={refreshUserData} />}
    </div>
  );
}

export default UserProfile;
