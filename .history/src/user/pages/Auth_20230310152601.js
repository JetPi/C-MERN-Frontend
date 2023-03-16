import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/AuthContext';
import './Auth.css';
import useFetchHandler from '../../shared/util/fetcher';

const Auth = () => {
  const auth = useContext(AuthContext)
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {isLoading, isError, sendRequest, resetter} = useFetchHandler()

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      
    console.log(formState);
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image:{
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  async function authSubmitHandler(event) {
    event.preventDefault();

    console.log(formState.inputs)

    if(isLoginMode){
      try {
        const result = await sendRequest({
          url: "/users/login",
          method: "POST",
          body: {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
        }); 
        console.log(result)
        auth.getUser(result.user.id)
        auth.login()
      } catch (err) {
        console.log(err)
      }
    
    }else {
      try {
        const formData = new FormData()
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const result = await sendRequest({
          url: "/users/signup",
          method: "POST",
          body: formData,
        }); 
        auth.getUser(result.user.id)
        auth.login()
      } catch (err) {
        console.log(err)
      }
    }
  };

  return (
    <>
    <ErrorModal error={isError} onClear={resetter}/>
    <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay/>}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        {!isLoginMode && <ImageUpload buttonStyle={"center"} id="image-id" onInput={inputHandler}/>}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a valid password, at least 8 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
    </>
  );
};

export default Auth;
