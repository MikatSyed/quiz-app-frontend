Quiz Management Application


Overview

This is a full-stack quiz management application developed using Next.js for the frontend and Express.js for the backend. The application is designed to provide a robust platform for creating, managing, and taking quizzes. Admins can create and manage quizzes, track performers' scores, and provide an interactive quiz-taking experience. Performers can take quizzes and receive feedback on their performance.

Features

1. User Authentication (Role-based)
Admin: Can create, edit, and delete quizzes. Admins can also manage quiz categories.
Performer: Can take quizzes, view scores, and receive feedback.

2. Quiz Creation and Management
Admins can create quizzes by adding questions, answer options, and marking the correct answer.
Both single and multiple-choice questions are supported.
Admins can also edit or delete quizzes as required.
Quizzes are categorized by topics such as frontend, fullstack, React.js, and JavaScript.

3. Quiz Taking (Performers)
Performers can view a list of all quiz categories and choose one.
Quizzes are presented one question at a time.
For each quiz category, performers get a random set of 10 questions.
Answer options for each question are displayed randomly to avoid pattern recognition.
Immediate feedback is provided upon quiz completion, along with the performer’s score.

4. Score Tracking
Each quiz attempt is scored.
Scores are stored in the database, allowing users and admins to track performance.
The application also includes a leaderboard to show the top performers.

5. Database Integration
PostgreSQL is used as the primary database.
Prisma ORM is used to model and query the database with ease.

6. Error Handling
Informative error messages are displayed for various user actions, such as invalid logins or form submissions.
Backend and frontend validation is implemented to ensure smooth operation.

7. User-Friendly Interface
A clean and responsive UI using a modern UI library (e.g., Material-UI or Tailwind CSS).
The application state is managed by Redux for seamless and consistent data flow.
Technologies Used

Frontend

Next.js

TypeScript

Redux

Tailwind CSS

Backend

Express.js

TypeScript

PostgreSQL

Prisma

For the backend (Express)


Challenges Faced
1. Schema Design
Designing the schema for the quiz application, especially for the quiz-related data such as questions, answers, and user selections, was a challenge. Initially, the schema structure was complex due to relationships between users, quizzes, questions, and answers. Defining the correct relationships and ensuring that queries were efficient took considerable time and effort.

Solution: After multiple iterations, I settled on a normalized database schema where quizzes, questions, and user attempts were efficiently linked. Using Prisma to handle relations between models greatly simplified the management of complex queries.

2. Formatting Quiz Data
Another significant challenge was correctly formatting the quiz data on the backend so that quizzes could be posted with the correct answers and options. This involved ensuring that the correct answer was stored and associated with each question, as well as ensuring that randomization logic for both questions and options was correctly applied during quiz generation.

Solution: I implemented helper functions to format and randomize quiz data before sending it to the frontend, ensuring that each quiz appeared correctly formatted.

3. Displaying Correct Answers After Quiz Completion
Showing the correct answers after the quiz was completed, while also displaying the user’s selected answer, proved tricky. Initially, I struggled with tracking the user’s selections alongside the correct answers.

Solution: I structured the quiz submission data carefully so that the performer’s selected options could be compared to the correct answers stored in the database. This allowed me to present the final results with both correct answers and the performer’s selections side by side.

Conclusion
This quiz management application was a great learning experience, especially in handling complex database schemas and managing state effectively with Redux. Despite the challenges, I was able to successfully implement all the required features, including randomizing questions and options, score tracking, and providing feedback to users.

Future Improvements
Add more detailed analytics for both performers and admins.
Implement timed quizzes and a countdown timer for quiz attempts.
Improve the quiz-taking UI for a more interactive experience.
This project demonstrates how to build a full-featured quiz management system, combining user authentication, quiz logic, and database management using modern technologies like Next.js, Express, and Prisma.


#Admin :

gmail : mikat@gmail.com

password: mikat123

#User :

gmail : riaz@gmail.com

password: riaz123