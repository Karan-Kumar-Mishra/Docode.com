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
        String url = "http://172.20.80.1/api/compile";
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
