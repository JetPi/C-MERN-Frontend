import { useCallback, useState, useRef, useEffect } from "react";

function useFetchHandler() {
  const [ isError, setError] = useState(null);
  const [isLoading, setLoading] = useState(false)

  const activeHttpRequests = useRef([])

  function resetter() {
    setError(null);
  }

  setLoading(true);
  const httpAbortCtrl = new AbortController()
  activeHttpRequests.current.push(httpAbortCtrl)

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
          signal: httpAbortCtrl.signal
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoading(false);
        return responseData;
      } catch (err) {
        setLoading(false)
        setError(err.message);
      }
    },
    [httpAbortCtrl]
  );

  useEffect(() => {
    return () =>{
        activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, [])

  return { isLoading, isError, sendRequest , resetter };
}

export default useFetchHandler;
