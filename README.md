# fh-campus-web-XTodoList

<h1>XTodoList</h1>
The main purpose of the XTodoList is to keep track and "not forget anything". Actually, everything on the list must be done. If you still don't manage to get everything done, it would be annoying and unwise if unimportant things are done and important things are left undone. That's why there are priorities: determine what is important.

<h2> Architiecture </h2>
<p>
  .....
</p>

<p>
  <h2> Requirements to develop </h2>

  - Java >11
  - MySQL or MariaDB (we installed it by WAMP)
  - Apache Maven 3.6
  - npm     >6.14
  - Node    >14
  - IDE (for developing)
    Note: We used IntelliJ IDEA for Backend and VS Code for Frontend
</p>

<p>
  <h2> How to setup Backend </h2>

   1. Clone the repo locally `git clone https://github.com/omid-nazifi/fh-campus-web-XTodoList.git`
   2. Open the project (server directory) in the IntelliJ
   3. Project structure > Project > Project SDK > You have to set your java path here (Java version >11)
   4. Update maven dependencies 
      Settings/Preferences > Build, Execution, Deployment > Build Tools > Maven > Repositories > click Update
   5. Maven clean and install
   6. If you get an error message "/bin/sh: 1: ./mvnw: not found"
      - Go to backend directory
      - Run `mvn -N io.takari:maven:wrapper`
   7. Config DB:
      - Create a database with name "todolist"
   8. Set the username and password of the db in the `resources/application.properties`
   9. Run the server --> TodolistApplication.java
      It will be run on port localhost:8080
</p>

<p>
  <h2> How to setup Frontend </h2>
  
  1. Clone the repo. 
     Note: If you did the first step of Backend-Setup, then you don't need to do this step
  2. Go to root of the project (client directory)
  3. Open terminal
  4. Run command `npm install`: to download all dependencies
  5. Run command `npm start`: to run the client in port localhost:3000
</p>

<h2> License </h2>
<a href="https://opensource.org/licenses/MIT">
  <img alt="GitHub" src="https://img.shields.io/github/license/devopsusr-tech/hackerearth2021">
</a>
