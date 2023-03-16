import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/context/AuthContext';
import useFetchHandler from '../../shared/util/fetcher';

import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
  const auth = useContext(AuthContext);
  const {userId} = auth
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

  return <PlaceList items={places} />;
};

export default UserPlaces;
