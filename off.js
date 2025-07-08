// curl -u appid:secret https://api.planningcenteronline.com/people/v2/people

const url = 'https://api.planningcenteronline.com/people/v2/people';

const headers = new Headers();
headers.set(
  'Authorization',
  'Basic ' + btoa(`${appId}:${secret}`)
);

fetch(url, {
  method: 'GET',
  headers: headers,
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });