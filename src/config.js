export let BASE_URL;

if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://localhost:8000/api/v1/';
} else {
  BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;
}
