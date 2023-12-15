export let BASE_URL;

if (process.env.NODE_ENV === 'production') {
  // Set production API URL
  BASE_URL = 'https://jsquiz-u1ri.onrender.com';
} else {
  // Set local development API URL
  BASE_URL = 'http://localhost:8000/api/v1';
}
