import RoomCard from '../components/details/RoomCard';
import uniqid from 'uniqid';
import { Room } from '../types/Interfaces';
type SearchResultsProps = {
  data: Room[];
  refreshUserData: Function;
};
function SearchResults({ data, refreshUserData }: SearchResultsProps) {
  return (
    <div>
      <h6 className='italic text-xs p-2'>Showing the top 20 results</h6>
      <div className='flex justify-center h-full w-full'>
        <div className='grid grid-cols-fluid grid-rows-3 h-full w-full gap-y-4 gap-x-1'>
          {data.map((room) => (
            <RoomCard
              key={uniqid()}
              refreshUserData={refreshUserData}
              room={room}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
