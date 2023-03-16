import React, {useEffect, useState} from 'react';
import fetchHandler from '../../shared/util/fetcher';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import UsersList from '../components/UsersList';

function Users() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [loadedUsers, setLoadedUsers] = useState()

  useEffect(() => {
    const sendRequest = async () =>{
      setIsLoading(true)

      try {
        const response = await fetchHandler({
          url: "/users/"
        })
  
        const responseData = await response.json
        if(!response.ok){
          throw new Error(responseData.message)
        }
  
        setLoadedUsers(responseData.users)
        setIsLoading(false)
        
      } catch (err) {
        setIsLoading(false)
        setError(err.message)
      }
    }
  sendRequest()}, [])

  function errorHandler(){
    setError(null)
  }

  console.log(loadedUsers)

  return <>
  <ErrorModal error={error} onClear={errorHandler}/>
  {isLoading && (
  <div className='center'>
    <LoadingSpinner/>
  </div>
  )}
  {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
  </>
    
};

export default Users;
