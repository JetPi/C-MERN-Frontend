import React from 'react';
import fetchHandler from '../../shared/util/fetcher';

import UsersList from '../components/UsersList';

async function Users() {
  try {
    const response = await fetchHandler({
      url: "/users/"
    })

     const responseData = await response.json()
        if(!response.ok){
          throw new Error(responseData.message)
        }
        
    } catch (err) {
      // setError(err.message || "Something went wrong, try again")
      console.log(err)
      
  }
  

  return <UsersList items={""} />;
};

export default Users;
