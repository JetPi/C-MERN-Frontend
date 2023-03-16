import React, {useReducer} from "react";

function FetchReducer(state, action){

}

async function FetchHandler({
  url,
  method = "GET",
  headers = {
    "Content-Type": "application/json",
  },
  body,
}) {
    // const [{isError, isLoading}, dispatch] = useReducer(FetchReducer, {
    //     isError: false,
    //     isLoading: true
    // })

    // console.log(isError, isLoading)


  const link = "http://localhost:5000/api" + url;
  const response = await fetch(link, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });
  return response;
}

export default FetchHandler;
