import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';
import useFetchHandler from '../../shared/util/fetcher';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/AuthContext';

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const auth = useContext(AuthContext)
  const {isError, isLoading, sendRequest, resetter} = useFetchHandler()
  const [place, setPlace] = useState()
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

  useEffect(() => {
    async function middle(){
      try {
        const response = await sendRequest({
          url: `/places/${placeId}`
        })
        setPlace(response.place)
        setFormData({
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
        )
      } catch (err) {
        console.log(err)
      }
    }
    middle()
  }, [placeId, sendRequest, setFormData]);

  async function placeUpdateSubmitHandler(event) {
    event.preventDefault();

    try {
      const response = await sendRequest({
        url: `/places/${placeId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.userInfo.token}`,
          'Content-Type': 'application/json'
        },
        body: {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        },
      });
    } catch (error) {
      console.log(error)
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
      {!isLoading && place && (
      <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={place.title}
          initialValid={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={place.description}
          initialValid={true}
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
