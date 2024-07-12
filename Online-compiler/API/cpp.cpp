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
    std::string url = "http://172.20.80.1/api/compile";
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
