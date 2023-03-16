import { useCallback, useReducer } from "react";

function FetchReducer(state, action) {
  switch (action.type) {
    case "start":
      return { isError: null, isLoading: true };
    case "ok_finish":
      return { isError: null, isLoading: false };
    case "error_finish":
      return { isError: action.error, isLoading: false };
    case "reset":
      return { isError: null, isLoading: false };
    default:
      throw new Error();
  }
}

function useFetchHandler() {
  const [{ isError, isLoading }, dispatch] = useReducer(FetchReducer, {
    isError: null,
    isLoading: false,
  });

  function resetter() {
    dispatch({ type: "reset" });
  }

  dispatch({ type: "start" });

  const sendRequest = useCallback(
    async ({
      url,
      method = "GET",
      headers = {
        "Content-Type": "application/json",
      },
      body,
    }) => {
      const link = "http://localhost:5000/api" + url;
      try {
        const response = await fetch(link, {
          method: method,
          headers: headers,
          body: JSON.stringify(body),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        dispatch({ type: "ok_finish" });
        return responseData;
      } catch (error) {
        dispatch({ type: "error_finish", error: error.message });
      }
    },
    []
  );

  return { isLoading, isError, sendRequest , resetter };
}

export default useFetchHandler;
