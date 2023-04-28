import { User } from '../../types/Interfaces';
import { useNavigate } from 'react-router';
type TimestampProps = {
  timestamp: string;
  username: string;
  user?: User;
};
function Timestamp({ timestamp, username, user }: TimestampProps) {
  const navigate = useNavigate();
  return (
    <div className='flex gap-2 w-fit'>
      <p>
        <em
          onClick={() => {
            if (user?._id) navigate(`/profile/${user?._id}`);
            else return;
          }}
          className={
            user?._id
              ? 'font-bold text-pink-500 cursor-pointer'
              : 'font-bold text-pink-500'
          }
        >
          {username}
        </em>
      </p>
      <p>
        <em className='text-xs dark:text-gray-400 text-black'>{timestamp}</em>
      </p>
    </div>
  );
}

export default Timestamp;
