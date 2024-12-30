## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Project Overview

The Book Store API is a robust, scalable, and feature-rich backend service for managing books, authors, categories, and user interactions. It’s built with ASP.NET Core and Entity Framework Core, demonstrating best practices in modern web development.

## Features

Authentication & Authorization

JWT Authentication: Secures endpoints with token-based authentication.
Role-Based Authorization: Restricts access based on user roles (Admin, User).
OAuth2 Integration: Provides optional login via Google and other providers.

Book Management (CRUD)

Create, Read, Update, Delete (CRUD) operations for:
Books: Manage details like title, author, description, price, and stock.
Authors: Add and manage author profiles with pagination support.
Categories: Organize books into categories with a many-to-many relationship.
Search & Filter: Query books by title, category, or author.

Real-Time Features

WebSockets Integration: Enables real-time notifications for:
New book releases.
Stock updates or out-of-stock alerts.
Admin-to-user announcements. 4. Caching
Redis Integration: Boosts performance by caching frequently accessed data (e.g., book listings, categories).
Efficient Invalidation: Ensures cache updates when data changes.

Error Handling

Centralized error handling with custom exception filters.
Detailed error responses in line with RESTful standards.
End-to-end request tracking and API performance monitoring.

Pagination & Sorting

Built-in support for paginated and sorted results for large datasets (e.g., authors, books).

API Documentation

Swagger/OpenAPI: Interactive API documentation with detailed endpoint descriptions and example payloads.
