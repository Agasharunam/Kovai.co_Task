Project Description:
This is a Node.js-based local folder management project that allows users to perform full CRUD operations (Create, Read, Update/Rename, Delete) on folders inside a specified directory. The project supports two interfaces:
  A console-based CLI for interactive folder operations.
  A REST API using Express.js, which can be tested using Postman or any HTTP client.
  All operations are performed within a local directory named drivespace inside the project folder. This makes it ideal for learning file system handling with Node.js.

How to Run the Project
1. Clone the Repository: git clone https://github.com/Agasharunam/Kovai.co_Task.git
                          cd Kovai.co_Task
2. Install Dependencies: npm install
   
 Running the API Server
Run this command: node server.js
The server will start on http://localhost:5000.

Available API Endpoints:
POST /create – Create a new folder (pass folderName in JSON body)

GET /get – List all folders in the drivespace directory

PUT /rename – Rename a folder (pass oldName and newName in JSON body)

DELETE /delete/:folderName – Delete a folder by name

 Running the Console Application
Run this command: node console.js
