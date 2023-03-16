import React, {useEffect, useState} from 'react';
import fetchHandler from '../../shared/util/fetcher';

import UsersList from '../components/UsersList';

function Users() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, isError] = useState()
  const [loadedUsers, setLoadedUsers] = useState()

  useEffect(() => {
    const sendRequest = async () =>{
      const response = await fetchHandler({
        url: "/users/"
      })

      const responseData = await response.json
    }
    sendRequest()
  
      
    }
    
  ,[])

  return <UsersList items={{}} />;
};

export default Users;
