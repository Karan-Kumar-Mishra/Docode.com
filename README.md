# Docode.com

Welcome to DOcode! This platform allows users to write, compile, and execute code directly from their browser. Whether you're a beginner learning to code or a seasoned developer looking to quickly test snippets, DOcode has you covered. <br>

# URL 
https://docode-com.onrender.com

# Features <br>
1 Online Coding Environment: Write and run code in various programming languages. <br>
2 Real-time Compilation: Instant feedback with live code execution. <br>
3 API Integration: Seamlessly integrate your applications with the DOcode API. <br>

# Installation
Prerequisites
Before installing, ensure you have the following:

1 Node.js (version 14 or higher) <br>
2 npm (Node Package Manager) <br>
3 Git <br>
4 Mongodb <br>

```
apt update -y
apt upgrade -y
apt install g++ -y
apt install python3 -y
apt install nodejs -y
apt install git -y
git clone https://github.com/Karan-Kumar-Mishra/Docode.com
cd  Docode.com
echo 'EXPIRE_TIME=30
EMAILE_API_KEY="8dea33eec5msh8825484ed59f6fap1b4d69jsn366810ceca5e"
PORT=80' > .env
npm install 
node server.js
```
# Set .env file 
```
EXPIRE_TIME=30
EMAILE_API_KEY="8dea33eec5msh8825484ed59f6fap1b4d69jsn366810ceca5e"
PORT=80
```

# Docker 
```
docker pull karankumarmishra/docode-linux:latest
docker run -it -p 80:80 karankumarmishra/docode-linux
```
<p>After running the above docker command go on <a herf="http://127.0.0.1" target="_blank" >http://127.0.0.1</a> </p>
<h1> Usage </h1> <br>
1.Visit DOcode.com to access the online coding environment.<br>
2.Select your preferred programming language from the dropdown.<br>
3.Write your code in the editor.<br>
4.Click on the "Run" button to compile and execute your code.<br>
5.View the output in the designated output section.<br>

# API Documentation
DOcode provides a powerful API for developers. Here’s how to get started <br>
# API integration
To integrate the API of an Do-code, we need to follow the following steps. <br>
<h4>End Point : https://docode-com.onrender.com/api/compile </h4> <br> <br>

# Node js

```

const axios = require('axios');

// Define the API endpoint and request body
const url = 'https://docode-com.onrender.com/api/compile';
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

```
# python

```

import requests

# Define the API endpoint and request body
url = 'https://docode-com.onrender.com/api/compile'
bodyParams = {
    'language': 'python',
    'code': 'print("hello")'
}

try:
    # Python requests POST request
    response = requests.post(url, data=bodyParams)
    
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        print('Response:', response.json())  # Print response JSON data
    else:
        print('Request failed:', response.status_code)
        
except requests.exceptions.RequestException as e:
    print('Error:', e)


```








