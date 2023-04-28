import React, { useContext } from 'react';
import { TokenContext, UserContext } from '../../../App';
const apiURL = import.meta.env.VITE_SCOKET_ADDRESS;
type SearchProps = {
  setQuery: Function;
  handleSearching: Function;
  setSearching: Function;
};
function Search({ setQuery, handleSearching, setSearching }: SearchProps) {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);

  return (
    <div className='min-w-[300px] max-w-[35%] shadow-sm'>
      <input
        onBlur={(e) => {
          if (e.target.value === '') {
            setTimeout(setSearching, 2000);
          }
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearching(e);
        }}
        className='w-full h-10 rounded-md text-lg dark:bg-gray-600 p-2 placeholder:text-gray-500'
        placeholder='Find public rooms...'
        type='text'
      />
    </div>
  );
}

export default Search;
