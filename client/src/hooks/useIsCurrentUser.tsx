import { useEffect, useState } from 'react';

function useIsCurrentUser(loggedInUserID: string, userID: string) {
  const [loggedInIsCurrent, setLoggedInIsCurrent] = useState<boolean>(false);
  useEffect(() => {
    if (loggedInUserID === userID) {
      setLoggedInIsCurrent(true);
    } else {
      setLoggedInIsCurrent(false);
    }
  }, [loggedInUserID, userID]);
  return loggedInIsCurrent;
}

export default useIsCurrentUser;
