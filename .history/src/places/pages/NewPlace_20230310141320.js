import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import useFetchHandler from '../../shared/util/fetcher';
import './PlaceForm.css';
import { AuthContext } from '../../shared/context/AuthContext';

const NewPlace = () => {
  const {isError, isLoading, sendRequest, resetter} = useFetchHandler()
  const auth = useContext(AuthContext)
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory()

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const result = await sendRequest({
        url: "/places/",
        method: "POST",
        body: {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          image: "https://picsum.photos/200",
          location: {
            lat: 1,
            lng: 2
          },
          creator: auth.userId
        },
      });
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
    <ErrorModal error={isError} onClear={resetter}/>
    <form className="place-form" onSubmit={placeSubmitHandler}>
    {isLoading && <LoadingSpinner asOverlay/>}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
    </>
  );
};

export default NewPlace;
