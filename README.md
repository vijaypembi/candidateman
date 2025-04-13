# Full Stack Project: Candidate Management System

This repository contains both the **frontend** (React.js) and **backend** (Node.js/Express) for the Candidate Management System project. It is a full-stack application designed to manage candidate data.

---

## Prerequisites

Before you begin, make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (with npm)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) or your preferred database
-  (if using a different DB like MySQL or PostgreSQL, make sure to configure accordingly)
- Text Editor like [VSCode](https://code.visualstudio.com/)

---

## Project Structure

This repository is structured with two main directories:

- **`cmclient/`**: Frontend (React.js)
- **`cmserver/`**: Backend (Node.js with Express)

---

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:


git clone https://github.com/vijaypembi/candidateman.git
cd candidateman
### Install Dependencies
Backend (Node.js)
Navigate to the cmserver directory and install the backend dependencies:

 
cd cmserver
npm install

Frontend (React.js)
Navigate to the cmclient directory and install the frontend dependencies:

 
cd cmclient
npm install


Environment Setup
You may need to set up some environment variables for both the backend and frontend:

Backend (cmserver)
Create a .env file inside the cmserver directory.

Add the following sample environment variables:
PORT=5000
MONGO_URI=mongodb://localhost:27017/candidate_db


Running the Application
Run the Backend Server
In the cmserver directory, start the backend server:

cd cmserver
npm start

Run the Frontend Server
In the cmclient directory, start the frontend server:

 
cd cmclient
npm start

