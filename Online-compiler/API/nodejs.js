const axios = require('axios');

// Define the API endpoint and request body
const url = 'http://172.20.80.1/api/compile';
const bodyParams = new URLSearchParams({
    language: 'python',
    code: 'print("hello")'
});

// Axios POST request
axios.post(url, bodyParams)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
