import { useCallback, useState, useRef, useEffect } from "react";

function useFetchHandler() {
  const [isError, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const activeHttpRequests = useRef([]);

  function resetter() {
    setError(null);
  }

  const sendRequest = useCallback(
    async ({
      url,
      method = "GET",
      headers = {
        "Content-Type": "application/json",
      },
      body,
    }) => {
      setLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      const link = process.env.REACT_APP_BACKEND_URL + url;
      console.log(link)
      try {
        const response = await fetch(link, {
          method: method,
          headers: headers,
          body: JSON.stringify(body),
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoading(false);
        return responseData;
      } catch (err) {
        setLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, isError, sendRequest, resetter };
}

export default useFetchHandler;
