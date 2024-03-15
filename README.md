# Evaluation Dashboard App - Mentor-P

Welcome to the Evaluation Dashboard App - Mentor View repository! This application provides a complete solution for mentors to evaluate students for a semester-long project in college.

## Description

The Evaluation Dashboard App - Mentor View allows mentors to assign, edit, and submit marks for students based on various parameters. Mentors can view all assigned students and their marks, filter them based on their evaluation status, and perform actions such as adding, editing, and removing students.

## Features

- **Adding and Managing Students**: Mentors can add students to be evaluated and manage their information.
- **Assigning Marks**: Mentors can assign marks to each student based on various parameters such as Ideation, Execution, Viva/Pitch, etc. Total marks are calculated automatically.
- **Edit/Remove Students and Marks**: Mentors can edit or remove assigned students and their corresponding marks.
- **Final Submission**: Mentors can submit marks, locking them from further editing. Students receive email notifications with their evaluation marks upon submission.
- **View**: Mentors can view all students and their assigned marks with filters to view students with unassigned marks or already assigned marks.
- **PDF Generation**: Mentors can generate PDF mark sheets for all students using react-pdf/renderer.
- **State Management**: Redux Toolkit for efficient state management with simplified APIs and built-in tools like createSlice.

## Technology Stack

- **Frontend**: React.js with Vite for fast development and HMR (Hot Module Replacement).
- **Backend**: Express.js for handling server-side logic and APIs.
- **Database**: MongoDB for storing mentor, student, and evaluation data.
- **Email Notifications**: Nodemailer for sending emails to students with their marks.
- **PDF Generation**: react-pdf/renderer for generating PDF mark sheets on the client side.
- **State Management**: Redux Toolkit for efficient state management with simplified APIs and built-in tools like createSlice.

## Installation

1. Clone the repository:

```
git clone https://github.com/vivrehal/Scaler-Mentor-Portal
```

2. Install dependencies for both frontend and backend:

```
cd Scaler-Mentor-Portal
cd server
npm install
cd client
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add necessary environment variables (e.g., MongoDB URI, email credentials, port, cors_origin).

4. Run the application:

```
# Start the backend server
npm start:server

# Start the frontend development server
npm run dev:client
```

5. Access the application in your web browser at `http://localhost:3000`.

## Contributing

Contributions to this project are welcome! Please follow the usual GitHub flow:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Deployment

https://mentorp.netlify.app/
