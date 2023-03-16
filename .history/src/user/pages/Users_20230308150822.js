import React, {useEffect, useState} from 'react';
import useFetchHandler from '../../shared/util/fetcher';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import UsersList from '../components/UsersList';

function Users() {

  const {isError, isLoading, sendRequest, resetter} = useFetchHandler()
  const [users, setUsers] = useState()

  useEffect(() => {
    const result = sendRequest({
      url: "/users/"
    })
    setUsers(result.users)
  }, [sendRequest])

  console.log(users)

  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState()
  // const [loadedUsers, setLoadedUsers] = useState()

  // useEffect(() => {
  //   const sendRequest = async () =>{
  //     setIsLoading(true)

  //     try {
  //       const response = await useFetchHandler({
  //         url: "/users/"
  //       })
  
  //       const responseData = await response.json()
  //       if(!response.ok){
  //         throw new Error(responseData.message)
  //       }
  
  //       setLoadedUsers(responseData.users)
  //       setIsLoading(false)
        
  //     } catch (err) {
  //       setIsLoading(false)
  //       setError(err.message)
  //     }
  //   }
  // sendRequest()}, [])

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
