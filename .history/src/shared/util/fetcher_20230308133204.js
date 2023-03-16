async function fetchHandler({ url, method = "GET", headers = {
    "Content-Type": "application/json"
},
body }) {
    const link = "http://localhost:5000/api" + url
    console.log(link)
  const response = await fetch(link, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });
  return response
}

export default fetchHandler;
