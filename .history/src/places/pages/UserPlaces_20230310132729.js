import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import useFetchHandler from '../../shared/util/fetcher';

import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
  const userId = useParams().userId
  const [places, setPlaces] = useState();
  const {isLoading, isError, sendRequest, resetter} = useFetchHandler()

  useEffect(() => {
    async function middle(){
      try {
        const result = await sendRequest({url: `/places/user/${userId}`});
        console.log(result)
        setPlaces(result.places)
      } catch (err) {
        console.log(err)
      }
    }
    middle()
  }, [sendRequest, userId])

  function placeDeletedHandler(deletedPlaceId){
    setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
  }

  return (
    <>
      <ErrorModal error={isError} onClear={resetter} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && places && <PlaceList items={places} onDeletePlaces={placeDeletedHandler}/>};
    </>
  );
};

export default UserPlaces;
