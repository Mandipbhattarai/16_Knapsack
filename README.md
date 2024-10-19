# Loan Application Approval System

This project is a web application that processes loan applications using a machine learning (ML) algorithm to approve or reject applications based on specific criteria. The system generates a `0` for rejected and a `1` for approved applications.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [ML Algorithm Details](#ml-algorithm-details)
- [Database Schema](#database-schema)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn
- **Backend**: Node.js, Express, TypeScript, Prisma, PostgreSQL, Python FastAPI
- **Machine Learning**: Python (scikit-learn, pandas, numpy, etc.)

## Architecture

The application uses a microservices-based architecture:

1. **Frontend**: Developed using React and TypeScript for building user interfaces. Tailwind CSS and Shadcn are used for styling.

3. **Backend**: Built using Node.js, Express, and TypeScript. Prisma is used as an ORM for PostgreSQL.

4. **ML Algorithm**: The loan approval logic is implemented in Python using FastAPI for the ML service, which evaluates applications based on input data.

## Features

- User registration and login (authentication system)
- Form for loan application submission
- Integration with the ML model for loan application processing
- Persistent data storage using PostgreSQL
- RESTful APIs for frontend-backend communication

## Installation

### Prerequisites

Ensure you have the following installed:
- Node.js
- Python 3.x
- PostgreSQL
- Docker (optional for containerization)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/loan-approval-system.git
   cd loan-approval-system




### Frontend Setup

    ```bash 
    cd frontend
    npm install
    npm run dev
    

### Backend Setup

    ```bash
    cd backend
    npm install
    npm run dev
    
    

### Database Setup

*   Make sure PostgreSQL is running and create a database.
*   Update the `.env` file with your database credentials.
*   Run migrations:

    ```bash 
    npx prisma migrate dev


   ## Some layouts are given below
![image](https://github.com/user-attachments/assets/39a59778-604f-45b5-a3c2-30d7fd228147)
![image](https://github.com/user-attachments/assets/f91868a9-778a-4f53-ab36-d919bea81329)
![image](https://github.com/user-attachments/assets/38d3a3bd-c832-4452-b2c7-e84abec38dea)
![image](https://github.com/user-attachments/assets/420642b8-7e62-4ef6-9ac6-9e5826a51cc0)


    

