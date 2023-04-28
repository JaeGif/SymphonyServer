import { User } from '../../types/Interfaces';
import { useNavigate } from 'react-router';

type UserHeadProps = {
  user: User;
  hover?: boolean;
  size?: string;
  redirect?: boolean;
  isUsername?: boolean;
};
// displays user profile picture, and their username next to messages
function UserHead({
  user,
  hover = true,
  size = 'md',
  redirect = false,
  isUsername = true,
}: UserHeadProps) {
  const navigate = useNavigate();
  return (
    <div
      className={
        hover
          ? 'flex gap-5 p-1 dark:hover:bg-gray-800 hover:bg-gray-300 rounded-sm items-center'
          : 'flex gap-5 p-1 rounded-sm items-center'
      }
    >
      <div className='h-10 w-10 overflow-hidden rounded-3xl'>
        <img className='h-10' src={`${user.avatar}`} />
      </div>
      {isUsername ? (
        <p
          onClick={() => {
            if (redirect) navigate(`/profile/${user._id}`);
            else return;
          }}
          className={redirect ? `text-${size} cursor-pointer` : `text-${size}`}
        >
          {user.username}
        </p>
      ) : null}
    </div>
  );
}

export default UserHead;
