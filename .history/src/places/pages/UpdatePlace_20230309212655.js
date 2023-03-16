import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';
import useFetchHandler from '../../shared/util/fetcher';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Emp. State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
];

const UpdatePlace = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;
  const {isError, isLoading, sendRequest, resetter} = useFetchHandler()
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  // const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    const middle = async () => {
      try {
        const response = await sendRequest({
          url: `/places/${placeId}`
        })
        console.log(response)
        setFormData(
          {
            title: {
              value: response.place.title,
              isValid: true
            },
            description: {
              value: response.place.description,
              isValid: true
            }
          },
          true
        );
      } catch (err) {
        console.log(err)
      }
    }
    middle()
  }, [placeId, setFormData, sendRequest]);

  async function placeUpdateSubmitHandler(event) {
    event.preventDefault();

    try {
      const response = sendRequest({
        url: `/places/${placeId}`,
        method: 'PATCH',
        body:{
          title: formState.inputs.title.value,
          description: formState.inputs.title.value
        }
      })
      console.log(response)
    } catch (error) {
      
    }
  };

  return (
    <>
      <ErrorModal error={isError} onCancel={resetter} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
      <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>
      )}
    </>
  );
};

export default UpdatePlace;
