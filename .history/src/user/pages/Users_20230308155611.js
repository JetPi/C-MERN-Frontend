import React, {useEffect, useState} from 'react';
import useFetchHandler from '../../shared/util/fetcher';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import UsersList from '../components/UsersList';

function Users() {
  const [users, setUsers] = useState()
  const { isLoading, isError, sendRequest, resetter } = useFetchHandler();

  useEffect(() =>{
    async function middle(){
      try {
        const result = await sendRequest({
          url: "/users/"
        })
        setUsers(result.users)
      } catch (err) {
        console.log()
      }
    }
  }, [sendRequest])

  function errorHandler(){
    resetter()
  }

  return <>
  <ErrorModal error={isError} onClear={errorHandler}/>
  {isLoading && (
  <div className='center'>
    <LoadingSpinner/>
  </div>
  )}
  {!isLoading && users && <UsersList items={users} />}
  </>
    
};

export default Users;
