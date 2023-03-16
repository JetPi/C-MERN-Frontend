import { useReducer } from "react";

function FetchReducer(state, action) {
  switch (action.type) {
    case "start":
      return { isError: null, isLoading: true };
    case "ok_finish":
      return { isError: null, isLoading: false, result: action.result };
    case "error_finish":
      return { isError: action.error, isLoading: false };
    case "reset":
      return { isError: null, isLoading: false };
    default:
      throw new Error();
  }
}

async function useFetchHandler({
  url,
  method = "GET",
  headers = {
    "Content-Type": "application/json",
  },
  body}) 
{
  const [{ isError, isLoading, result }, dispatch] = useReducer(FetchReducer, {
    isError: null,
    isLoading: false,
    result: null
  });
  function resetter(){
    dispatch({type: "reset"})
  }

  dispatch({type: "start"})

  try {
    const link = "http://localhost:5000/api" + url;
    const response = await fetch(link, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
    });

    const responseData = await response.json()

    if(!response.ok){
        throw new Error(responseData.message);
    }
    dispatch({type: "ok_finish", result: responseData})
    
  } catch (error) {
    dispatch({type: "error_finish", error: error.message})
  }

  return {isError, isLoading, result}
}

export default useFetchHandler;
