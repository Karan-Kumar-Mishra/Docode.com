# Docode.com

Welcome to DOcode! This platform allows users to write, compile, and execute code directly from their browser. Whether you're a beginner learning to code or a seasoned developer looking to quickly test snippets, DOcode has you covered.

# Features
1 Online Coding Environment: Write and run code in various programming languages.
2 Real-time Compilation: Instant feedback with live code execution.
3 API Integration: Seamlessly integrate your applications with the DOcode API.

# Installation
Prerequisites
Before installing, ensure you have the following:

1 Node.js (version 14 or higher)
2 npm (Node Package Manager)
3 Git
4 Mongodb

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

# Docker 
```
docker pull karankumarmishra/docode-linux:latest
docker run -it -p 80:80 karankumarmishra/docode-linux
```
<p>After running the above docker command go on <a herf="http:127.0.0.1" target="_blank" >http:127.0.0.1</a> </p>
# Usage
<br>
1.Visit DOcode.com to access the online coding environment.<br>
2.Select your preferred programming language from the dropdown.<br>
3.Write your code in the editor.<br>
4.Click on the "Run" button to compile and execute your code.<br>
5.View the output in the designated output section.<br>

# API Documentation
DOcode provides a powerful API for developers. Here’s how to get started
