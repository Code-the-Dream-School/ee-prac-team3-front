//export let BASE_URL = 'https://ee-prac-team3-back.onrender.com/'
export let BASE_URL;

if (process.env.NODE_ENV === 'production') {
  console.log('production is true');
  // Set production API URL
  BASE_URL = 'https://ee-prac-team3-back.onrender.com/api/v1';
} else {
  console.log('production is false');
  // Set local development API URL
  BASE_URL = 'http://localhost:8000/api/v1';
}
console.log('console.log(process.env.NODE_ENV ===', process.env.NODE_ENV);
console.log('BASE_URL ===', BASE_URL);
