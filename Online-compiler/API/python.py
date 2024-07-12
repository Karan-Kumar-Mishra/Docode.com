import requests

# Define the API endpoint and request body
url = 'http://172.20.80.1/api/compile'
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
