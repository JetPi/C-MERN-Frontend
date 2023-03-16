async function fetch({ url, method = "GET", headers = {
    "Content-Type": "application/json"
},
body }) {
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });
  return response
}

export default fetch;
