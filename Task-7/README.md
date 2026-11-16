# Cognifyz Internship - Task 7

## Project Title

Advanced API Usage and External API Integration

## Technologies Used

- Node.js
- Express.js
- Axios
- Express Rate Limit
- Dotenv

## Features

### 1. External API Integration

Integrated JSONPlaceholder API using Axios.
Fetches and displays the first 10 posts.

### 2. Rate Limiting

Implemented API rate limiting.
Maximum 100 requests are allowed per 15 minutes.

### 3. Error Handling

Implemented error handling for:

- External API errors
- Network/request errors
- Internal server errors

### 4. OAuth Concepts

Studied OAuth authorization concepts, access tokens,
authorization servers and resource servers.

## API Endpoints

| Method | Endpoint | Description |
| GET | / | Home route |
| GET | /api/posts | Fetch external posts |

## How to Run

1. Install dependencies:
   npm install

2. Start the server:
   node server.js

3. Open:
   http://localhost:5002

## External API

https://jsonplaceholder.typicode.com/posts
