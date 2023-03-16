async function fetchHandler({ url, method = "GET", headers = {
    "Content-Type": "application/json"
},
body }) {
  const response = await fetch("http://localhost:5000/api" + url, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });
  return response
}

export default fetchHandler;
