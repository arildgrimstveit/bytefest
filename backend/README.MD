## Setup Locally

### Java

### Maven

### Install PostgreSQL

1. Download postgreSQL from website
2. Verify the installation in terminal using the command 
```postgres -V```
The version should show if its installed
3. Start postgreSQL using the command:
```psql postgres```
4. You are now on your superuser, Create a user in accordance to your ~/src/main/resources/application.yml using the command:
```CREATE ROLE bytefest WITH LOGIN PASSWORD 'password';```
4. You can verify the user has been created and Alter its priveliges as needed using the \du command
5. Create the database in accordance to your ~/src/main/resources/application.yml using the command:
```CREATE DATABASE bytefest;```
6. Grant privileges to bytefest:
```GRANT ALL PRIVILEGES ON DATABASE bytefest TO bytefest;```
7. Connect to the database using:
```\connect bytefest```

and start a server with information outlined in ~/src/main/resources/application.yml

2. Setup a User with credentials outlined in ~/src/main/resources/application.yml
    - This is bytefest/password standard
3. Run the application