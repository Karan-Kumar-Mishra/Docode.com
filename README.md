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
docker pull karankumarmishra/docode:docode
docker run -it -p 80:80 karankumarmishra/docode
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
# java
```

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

public class java {

    public static void main(String[] args) {
        // Define the API endpoint and request body
        String url = "https://docode-com.onrender.com/api/compile";
        String requestBody = "language=python&code=print(\"hello\")";

        try {
            // Create URL object
            URL obj = new URL(url);

            // Create HttpURLConnection instance
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // Set the request method (POST)
            con.setRequestMethod("POST");

            // Enable sending of data
            con.setDoOutput(true);

            // Write the request body to the connection
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(requestBody);
            wr.flush();
            wr.close();

            // Get the response code
            int responseCode = con.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            // Read and print the response content
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Print the response
            System.out.println("Response: " + response.toString());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```
# c++

```

#include <iostream>
#include <curl/curl.h> // Include libcurl header

// Callback function to write response data
size_t writeCallback(void* contents, size_t size, size_t nmemb, void* userp) {
    ((std::string*)userp)->append((char*)contents, size * nmemb);
    return size * nmemb;
}

int main() {
    CURL* curl;
    CURLcode res;
    std::string url = "https://docode-com.onrender.com/api/compile";
    std::string requestBody = "language=python&code=print(\"hello\")";
    std::string responseBuffer;

    // Initialize libcurl
    curl_global_init(CURL_GLOBAL_ALL);
    curl = curl_easy_init();
    if (curl) {
        // Set URL and HTTP method (POST)
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POST, 1L);

        // Set POST fields (request body)
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, requestBody.c_str());

        // Function pointer for response data handling
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writeCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseBuffer);

        // Perform the request
        res = curl_easy_perform(curl);
        if (res != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        }
        else {
            long responseCode;
            curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);
            std::cout << "Response Code: " << responseCode << std::endl;
            std::cout << "Response: " << responseBuffer << std::endl;
        }

        // Clean up
        curl_easy_cleanup(curl);
    }
    // Clean up global libcurl resources
    curl_global_cleanup();

    return 0;
}

```
shell
```
curl -X POST -H "Content-Type: application/json" -d "{\"language\": \"python\", \"code\": \"print(\\\"hello\\\")\"}" https://docode-com.onrender.com/api/compile
```








