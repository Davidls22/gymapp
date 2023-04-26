Gym Class Booking App (MERN Stack) _

This is a web application for managing gym class bookings. It is built using the MERN stack, which consists of MongoDB, Express, React, and Node.js. This document outlines the system architecture and specific system requirements.

Deployment _______

The app has been deployed to Heroku and can be accessed at the following URL: https://gymapp-ds1.herokuapp.com
The app has been deployed as a single entity (backend and frontend together) and can be accessed via the link above.

How to Use _____

As Admin ____

To log in as an Admin there is a hardcoded access of:

 Username - admin@example.com
 Password - adminpassword

Once the Admin has entered the login details they will have the ability to add classes (title, instructor, time, date, max capacity)

They will then be able to view all current classes, and be able to edit and delete them.
They will also be able to view who is attending each class.

As User ____

The user will need to register their details (name, email, password). 

Once registered they will need to login with the same details which will bring them to the classes page.

The classes page has a timetable of all available classes for them to book. They click the book button and it will alert if it is successful. They can then click the booked classes navigation bar link.

On the booked classes page they can see all their booked classes and cancel if they are no longer attending.

The design was made to be easy to understand and follow.

Installation________

To install and run the app locally, follow these steps:

Clone the GitHub repository: git clone http://github.com/Davidls22/gymapp

Navigate to the project directory: cd gymapp

Install the dependencies: npm install

Create a .env file in the root directory of the project and add your MongoDB URI and any API keys you may be using:

MONGODB_URI=your_mongodb_uri_here
API_KEY=your_api_key_here
Start the development server: npm run dev

Open your web browser and navigate to http://localhost:3000

Security Measures _____

To ensure the security of this application, I taken the following measures:

JSON Web Tokens (JWT) for authentication and authorization

I have implemented API key security using the helmet middleware. helmet is a collection of middleware functions that helps secure Express apps by setting various HTTP headers.

System Architecture ______

This web application uses a client-server architecture. The client is built using React and communicates with the server, which is built using Node.js and Express. The server communicates with a MongoDB database to store and retrieve data.

Front-end __

The frontend module will be responsible for presenting the user interface to the end-users. It will be developed using the React library and will interact with the backend through RESTful API calls. The frontend module will consist of several components,login, admin login and registration, classlist, booked classes, and an admin class dashboard. These components will be developed as reusable components so that they can be easily used in other parts of the application.

Back-end _

The backend module will be responsible for managing the application logic and data storage. It will be developed using Node.js and the Express.js framework. The backend will interact with a MongoDB database to store user, class and booking data. It will also implement a RESTful API to allow the frontend module to interact with it. The backend will consist of several components, such as user management, class management, authentication, and authorization. These components will be developed as reusable components so that they can be easily used in other parts of the application.

Database __

The application uses a MongoDB database to store data. MongoDB is a document-based NoSQL database that stores data in JSON-like documents. It is a popular choice for web applications because it allows for flexible and scalable data storage. the database will sotre login, class and booking data.

System Requirements _

Server The following software is required to run the server:

Node.js npm v6 MongoDB

Client The following software is required to run the client:

Node.js npm v6 or later

Dependencies The application has the following dependencies:

react axios express mongoose nodemon

Deployment __

The application can be deployed to a server or cloud platform using a platform-specific process. For example, the application can be deployed to Heroku, Vercel, Rendered or Netlify.

Why MERN Stack? __

The MERN stack was chosen for this application because it allows for the creation of fast, scalable, and maintainable web applications. React provides a great user experience, Node.js allows for easy scaling, Express provides a robust set of features for building web applications, and MongoDB allows for flexible and scalable data storage.

Who will use this App and why? ___

The users of the application will be gym-goers who want to book gym classes in advance. They will be able to browse the available classes, select the classes they want to attend, and book them through the application.

The gym owners/Admins will also be users of the application, as they will be responsible for creating and managing the classes. They will be able to add new classes, update existing ones, and view the bookings for each class.

The users will benefit from using the application as they will be able to easily book gym classes in advance, which will save them time and ensure that they get a spot in the class. They will also be able to view their upcoming bookings and cancel them if necessary, which will give them more flexibility.

It will have a user-friendly interface that will make it easy for users to navigate and book classes. The application will also be affordable, as it will not require any additional hardware or software, which will make it stand out from competitors.

Functional requirements for the application include the ability for users to create accounts, browse available classes, book classes, view upcoming bookings, and cancel bookings. Non-functional requirements include fast loading times, responsive design, and secure authentication and authorization.

Overall, the MERN stack gym class booking app will provide a convenient and efficient way for gym-goers to book classes in advance and for gym owners to manage their classes and bookings.

User Stories _

As a gym member, I want to be able to view all available classes and their schedules so that I can choose the classes that fit my schedule and interests.

As a gym member, I want to be able to book a class online, so that I can reserve my spot before it fills up, and I want to see my booked classes so i have a log of what i am doing and when.

As a gym instructor, I want to be able to manage the classes I offer, so that I can add or remove classes, and adjust the schedule or the capacity of the class.

As a gym manager, I want to be able to view attendance records for the classes, so that I can analyze the popularity and effectiveness of the classes.

As a gym owner, I want to see how many classes are offered and attended so i can make data-driven decisions to improve the offerings and the business.


