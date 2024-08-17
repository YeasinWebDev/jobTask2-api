# Foodi Backend  [Live](https://job-task2-client.vercel.app)  || [client](https://github.com/YeasinWebDev/jobTask2-client)
### This repository contains the backend code for the Foodi web application, a single-page website where users can search, filter, categorize, and sort food products. The backend is built using Node.js, Express, and MongoDB.


## Project Overview
### Foodi is a full-stack application that allows users to browse food products with functionalities like pagination, searching, categorization, and sorting. This repository handles the backend part of the project, built using Node.js and Express, with MongoDB as the database.

##Features
 
    1. API for Products: Create, read, update, and delete (CRUD) product data.
    2. Pagination: Efficiently load products in chunks with pagination.
    3. Search: Search for products by name.
    4. Categorization: Filter products by brand name, category, and price range.
    5. Sorting: Sort products by price and date added.

## Tech Stack
    1. Node.js: JavaScript runtime for building the server-side.
    2. Express.js: Web framework for Node.js.
    3. MongoDB: NoSQL database for storing product data.

  ## Getting Started
  ## Prerequisites

Before you begin, ensure you have the following installed:

    Node.js (version 14 or higher)
    npm or yarn
    MongoDB: You can use a local instance or a cloud-based service like MongoDB Atlas


## Installation
### 1. Clone the repository:

    git clone https://github.com/your-username/foodi-backend.git
    cd foodi-backend
    
### 2. Install dependencies:

    npm install
    
### 3. Set up the environment variables:

Create a .env file in the root of your project and add the following:

    MONGO_URI=mongodb://localhost:27017/foodi
    PORT=5000
Replace the MongoDB URI with your actual database connection string.

## Running the Application
### 1. Start the server:

    npm start
    
### 2. Access the API:

The backend server will be running on http://localhost:5000.
