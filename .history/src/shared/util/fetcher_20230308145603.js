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

function useFetchHandler({
  url,
  method = "GET",
  headers = {
    "Content-Type": "application/json",
  },
  body}) 
{
    const link = "http://localhost:5000/api" + url;
  const [state, dispatch] = useReducer(FetchReducer, {
    isError: null,
    isLoading: false,
    result: null
  });

  function resetter(){
    dispatch({type: "reset"})
  }

  dispatch({type: "start"})

  async function sendRequest(){
      try {
        const response = await fetch(link, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
        });
        
        const responseData = await response.json()
        console.log(responseData)
        
        if(!response.ok){
            throw new Error(responseData.message);
        }
        dispatch({type: "ok_finish", result: responseData})
        
      } catch (error) {
        dispatch({type: "error_finish", error: error.message})
      }
  }
  sendRequest()

//   console.log(state)

  return {resetter}
}

export default useFetchHandler;
