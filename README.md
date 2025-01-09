# Event Management Platform

## Overview

The Event Management Platform is a web application built with Next.js 14 that enables users to create, manage, and view events. It includes authentication, role-based access control, and responsive design, making it suitable for both users and administrators.

## Features

1. **Authentication:**

   - User sign-up and sign-in using NextAuth.
   - Role-based access control for Admin and User roles.

2. **Event Management:**

   - Authenticated users can create, view, update, and deletes their own events.
   - Admins can manage all events, while users can manage all events.

3. **Server Actions:**

   - All CRUD operations use server actions instead of API routes.

4. **Form Validation:**

   - User inputs are validated using Zod, ensuring robust data integrity.
   - Error messages are displayed for invalid inputs.

5. **Database:**

   - PostgreSQL database schema designed using Prisma ORM.
   - Two tables:
     - `User`: Stores user information.
     - `Event`: Stores event details and is linked to the User table.

6. **UI/UX:**
   - Responsive and user-friendly interface built with Tailwind CSS.
   - User dashboard for managing events.
   - Admin dashboard for overseeing all events.

## Technical Stack

- **Frontend:** Next.js 14, Tailwind CSS.
- **Backend:** Prisma ORM, PostgreSQL.
- **Authentication:** NextAuth.
- **Validation:** Zod.
- **Deployment:** Vercel.

## Folder Structure

The project is organized as follows:

├── .next/ # Next.js build output (auto-generated)
├── node_modules/ # Installed dependencies (auto-generated)
├── prisma/ # Prisma schema and migrations
├── public/ # Static assets (favicon, images, etc.)
├── src/ # Main source code
│ ├── app/ # App directory for Next.js routing
│ │ ├── components/ # Reusable UI components
│ │ ├── context/ # Context providers
│ │ ├── dashboard/ # Admin and user dashboard pages
│ │ ├── globals.css # Global CSS styles
│ │ ├── layout.tsx # Root layout for the application
│ │ └── page.tsx # Main page component
│ ├── lib/ # Utility functions and helpers
├── .env # Environment variables (not included in the repository)
├── .eslintrc.js # ESLint configuration
├── .gitignore # Files and directories to ignore in Git
├── docker-compose.yml # Docker configuration file
├── eslint.config.mjs # ESLint configuration in modern syntax
├── next-env.d.ts # Next.js environment type definitions
├── next.config.js # Next.js configuration
├── package.json # Project metadata and dependencies
├── pnpm-lock.yaml # Lock file for pnpm
├── postcss.config.js # PostCSS configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation

## Setup Instructions

### Prerequisites

- Node.js installed (v18 or above recommended)
- PostgreSQL database instance set up
- Vercel CLI (optional, for deployment)

### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-link>
   cd <repository-folder>
   ```
2. **Install dependencies:**
   npm install
3. **Set up environment variables:**
   Rename .env.example to .env and provide the necessary values
   DATABASE_URL=your_postgresql_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
4. **Push the database schema to PostgreSQL:**
   npx prisma migrate dev
5. **Start the development server:**
   npm run dev
6. **Access the application:**
   Open http://localhost:3000 in your browser.

### Deployment

The application has been deployed to Vercel. You can view the live demo at:
https://event-management-software.vercel.app/
For local testing, follow the setup instructions above.

### Notes

Admin role functionality requires database configuration. By default, users signing up are assigned the "User" role.
Optional features like filtering, sorting, and pagination are implemented.

### Demo Instructions

During the demo, you can showcase:

1.  User authentication and role-based access control.
2.  Event CRUD operations:
    i. Create an event.
    ii. View your own events as a User or all events as an Admin.
    iii. Update and delete events.
3.  Validation error messages for invalid inputs.
4.  Responsive design on various screen sizes.

### Setup Instructions

For now there is only one Admin, you can test Admin role from following credentials:
Email:- kasambhusal123@gmail.com
password:- kasam123
