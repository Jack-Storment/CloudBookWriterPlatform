# Cloud Book Writer Platform

This project is a front-end React-based platform where users can create, edit, and collaborate on books. It focuses on providing a user-friendly interface with powerful functionality for book writing and collaboration.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Jack-Storment/CloudBookWriterPlatform
   ```

2. Navigate to the project directory:
   ```
   cd cloud-book-writer
   ```

3. Install dependencies for both backend and frontend:
   ```
   cd backend && yarn install
   cd ../frontend/cloud-book-writer && yarn install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend && yarn dev
   ```

2. In a new terminal, start the frontend application:
   ```
   cd frontend && yarn start
   ```

The application should now be running. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Features

1. **Unlimited Sections and Subsections**: Create and manage an infinite hierarchy of sections and subsections within books.
2. **User Authentication**: Secure sign-up, login, and account management.
3. **Permissions & Roles**: Implement Author and Collaborator roles with different access levels.

## API Documentation

The frontend interacts with a simulated backend using json-server-auth. Here are the main endpoints:

- `POST /register`: Register a new user
- `POST /login`: Authenticate a user
- `GET /books`: Retrieve all books
- `POST /books`: Create a new book
- `GET /books/:id`: Retrieve a specific book
- `PUT /books/:id`: Update a book
- `DELETE /books/:id`: Delete a book
- `GET /sections`: Retrieve all sections
- `POST /sections`: Create a new section
- `PUT /sections/:id`: Update a section
- `DELETE /sections/:id`: Delete a section

For detailed API usage, refer to the [json-server-auth documentation](https://www.npmjs.com/package/json-server-auth).

## Implementation Overview

This React application is built with a focus on modularity and reusability. Key aspects of the implementation include:

1. **Component Structure**: The UI is composed of reusable React components for sections, subsections, user authentication forms, and collaboration management.

2. **State Management**: React Context API is used for global state management, handling user authentication and book data.

3. **Routing**: React Router is implemented for navigation between different views (e.g., book list, book editor, user profile).

4. **API Integration**: Axios is used for making HTTP requests to the backend API.

5. **Authentication**: JSON Web Tokens (JWT) are used for maintaining user sessions.

6. **Styling**: Styled-components are used for component-specific styling, ensuring a modular and maintainable CSS approach.

## Testing

Unit and integration tests are written using Jest and React Testing Library to ensure component functionality and reliability.

## Performance Optimization

- Implemented caching mechanisms to improve response times for frequently accessed data.
- Used React.memo and useMemo for optimizing re-renders of complex components.

## Code Style

The project follows the Airbnb JavaScript Style Guide to maintain clean and consistent code throughout the application.

## Trade-offs and Decisions

- Chose to use a simulated backend (json-server-auth) for easier development and testing, acknowledging that a production environment would require a more robust backend solution.
- Prioritized component reusability over premature optimization to ensure a flexible and maintainable codebase.
- Implemented infinite nesting for sections/subsections using a recursive component structure, balancing flexibility with potential performance considerations for very deep hierarchies.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
