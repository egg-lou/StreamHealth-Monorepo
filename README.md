# StreamHealth-Monorepo

StreamHealth is a product management and POS system designed for pharmacies. This monorepo contains the client and server codebases needed to deploy and manage the application.

## Features

- **Client**: Angular-based web interface.
- **Server**: Java Spring Boot with Spring Security backend.
- **Database**: MySQL for data storage.
- **Pages**:
    - Homepage
    - Login and Register
    - Dashboard (Profile View, POS View, Products View)
- **API Endpoints** for transactions, products, users, and authentication.

## Technology Stack

- **Frontend**: Angular
- **Backend**: Java Spring Boot, Spring Security
- **Database**: MySQL

# Installation

To get started with the project, clone the repository and follow the steps below for both client and server setups.

## Client Setup

1. Install dependencies:
    ```sh
    npm install
    ```
2. Start the development server:
    ```sh
    ng serve
    ```

## Server Setup

1. Navigate to the server directory:
    ```sh
    cd server
    ```
2. Build the project using Maven:
    ```sh
    mvn clean install
    ```
3. Run the server:
    ```sh
    mvn spring-boot:run
    ```

## Database Setup

Ensure MySQL is installed and running. Create a new database for the project. Update the database configuration in the `application.yml` file located in the `src/main/resources` directory.
1. Create a `.env` file in the root directory of your project. Add the following line to the file, replacing `your_password` with your actual MySQL password:
    ```sh
    PASSWORD=your_password
    ```
# Usage

After setting up both the client and server, open your browser and navigate to `http://localhost:4200` to access the StreamHealth web interface. From here, you can monitor and manage pharmacy products, transactions, and user profiles.

# API Endpoints

## Transaction Endpoints

- GET `/api/v1/transaction/get_transactions?filterByCashier=&transactionId=&transactionDate=&page=`
- GET `/api/v1/transaction/get_transaction/{transactionId}`
- POST `/api/v1/transaction/add_transaction`
- PUT `/api/v1/transaction/update_transaction/{transactionId}`
- DELETE `/api/v1/transaction/delete_transaction/{transactionId}`

## Products Endpoints

- GET `/api/v1/product/get_products?search&page=`
- GET `/api/v1/product/get_product/{productId}`
- POST `/api/v1/product/add_product`
- PUT `/api/v1/product/update_product/{productId}`
- DELETE `/api/v1/product/delete_product/{productId}`

## User Endpoint

- GET `/api/v1/user/get_user_and_sales`

## Auth Endpoints

- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`

# Payload Formats

## Product Payload

```json
{
  "productName": "",
  "productDescription": "",
  "productPrice": 0,
  "productStock": 0
}
```
## Transaction Payload
```json
{
  "clientName": "",
  "totalAmount": 0,
  "paymentMethod": "",
  "discountType": "",
  "discountPercentage": 0,
  "products": [
    {
      "productId": 0,
      "quantitySold": 0
    }
  ]
}
```

## Authentication Payload Register
```json
{
  "name": "",
  "login": "",
  "password": ""
}
```

## Authentication Payload Login
```json
{
  "login": "",
  "password": ""
}
```

