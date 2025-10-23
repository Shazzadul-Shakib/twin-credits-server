## Twin Credits

A digital platform with a referral and credit system, enabling users to earn rewards, manage credits, and access digital products seamlessly.

## 🚀 Features

- **User Authentication**: JWT-based authentication with refresh tokens
- **Referral Management**: Unique referral links for each user, tracking referrer–referred relationships and referral status
- **Credit System**: Award credits to both referrer and referred user on the first purchase, preventing double-crediting
- **Purchase Simulation**: “Buy Product” functionality to trigger first-purchase credit rewards
- **User Dashboard**: Displays total referred users, converted users, total credits earned, and unique referral link with copy option
- **Data Integrity**: Safe handling of concurrent users, consistent persistence, and prevention of duplicate credit rewards
- **Product Management**: View digital products with full details
- **API Documentation**: Comprehensive Swagger/OpenAPI documentation for all endpoints
- **Database Integration**: Optimized MongoDB implementation with Mongoose schemas and relations

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.x or higher
- **npm**: Version 8.x or higher (comes with Node.js)
- **Git**: For version control

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd twin-credits-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=
NODE_ENV=
MONGO_URI=
SALT_ROUND=
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=
```

### 5. Start the Application

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm run build
npm run start
```

The application will be available at `http://localhost:5000`

## 🌐 Live Deployment

### Production API Access

**Base URL**: https://twin-credits-server.vercel.app

### Vercel Deployment Notes

- **Automatic Deployments**: Connect your GitHub repository to Vercel for automatic deployments
- **Environment Variables**: Set all required environment variables in Vercel dashboard
- **Build Command**: `npm run build`
- **Output Directory**: `./dist`

### Required Environment Variables for Vercel

Make sure to add these in your Vercel project settings:

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://shakib1186_db_user:tbauJndoMC5n0Jfh@twin-credits.b9ehnbf.mongodb.net/twin-credits?retryWrites=true&w=majority&appName=twin-credits
SALT_ROUND=9
JWT_ACCESS_SECRET=7368616b6962313138365f6a77745f6163636573735f736563726574
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_SECRET=7368616b6962313138365f6a77745f726566726573685f736563726574
JWT_REFRESH_EXPIRES_IN=7d

```

## 📚 API Documentation

Once the application is running, you can access the comprehensive API documentation at:

**Swagger UI**: http://localhost:5000/api-docs

This interactive documentation includes:

- All available endpoints
- Request/response schemas
- Example requests and responses
- Authentication requirements

## 🔧 Available Scripts

- `npm run start` - Start the application in production
- `npm run dev` - Start in development mode with hot reload
- `npm run build` - Build the application

## 📋 Project Structure Overview

### **🏗️ Architecture Pattern**

- **Clean Architecture** with separation of concerns:
  - `builder/` - For reusable queries like serch,sort,filter,pagination
  - `modules/` - Feature-based modules
  - `routes/` - Centralized routes


### **🗂️ Module Structure**

Each module follows a consistent pattern:

- `.controller.ts` - all controllers to manage requests and responses
- `.service.ts` - Handle business logics
- `.interface.ts` - declare interfaces of the module
- `.routes.ts` - Define routes of the module
- `.swagger.docs.ts` - Swagger documentation definitions
- `.swagger.schema.ts` - Define schema for responses

This structure promotes maintainability, and scalability while following modular pattern.

## 📞 API Endpoints Overview

### User

- `POST /user/register` - Register new user
- `POST /user/login` - User login
- `POST /user/refresh-token` - Refresh access token
- `GET /user/logged-user` - RLogged user info
- `GET /user/logout` - User logout

### Referral

- `GET /referral/referred-users` - List of all referred user by a user's referral link

### Product

- `GET /product` - List products with details

### Order

- `POST /order` - Create an order
