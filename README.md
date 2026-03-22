# TokenVault

Secure token management system with modern full-stack architecture  
ASP.NET Core Web API + React + SQL Server + Entity Framework Core

<p align="center">
  <img src="https://img.shields.io/badge/.NET-8-blue?style=for-the-badge&logo=dotnet" alt=".NET 8" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoftsqlserver" alt="SQL Server" />
  <img src="https://img.shields.io/badge/Entity%20Framework%20Core-8-512BD4?style=for-the-badge" alt="EF Core" />
</p>

## ✨ Features

- JWT-based authentication & authorization (assumed)
- RESTful API endpoints for token operations
- React frontend with clean UI
- Automatic database migrations
- One-time initial data seeding
- CORS & HTTPS configured for local development

## 🛠 Tech Stack

| Layer       | Technology                          | Version   |
|-------------|-------------------------------------|-----------|
| Backend     | ASP.NET Core Web API                | .NET 8    |
| Frontend    | React + Vite                        | 18.x      |
| Database    | Microsoft SQL Server                | —         |
| ORM         | Entity Framework Core               | 8.x       |
| HTTP Client | Axios (frontend)                    | —         |
| Styling     | (Tailwind / CSS Modules / etc.)     | —         |

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/tharuka-tech/TokenVault.git
cd TokenVault
```
### 2. Database Setup
- Open SQL Server Management Studio (SSMS)
- Run the following query to create the database:

```bash
  CREATE DATABASE TokenVault;
  GO
```


### 🔐 Database Setup (Production / IIS Permissions)

```bash
- Run the following SQL script to configure database access for IIS:

-- 1️⃣ Create database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TokenVault')
BEGIN
    CREATE DATABASE TokenVault;
END
GO

-- 2️⃣ Create login for IIS App Pool
IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'IIS APPPOOL\TokenVaultBackend')
BEGIN
    CREATE LOGIN [IIS APPPOOL\TokenVaultBackend] FROM WINDOWS;
END
GO

-- 3️⃣ Create database user and grant permissions
USE TokenVault;
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'IIS APPPOOL\TokenVaultBackend')
BEGIN
    CREATE USER [IIS APPPOOL\TokenVaultAppPool] FOR LOGIN [IIS APPPOOL\TokenVaultBackend];
END
GO

-- 4️⃣ Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA::dbo TO [IIS APPPOOL\TokenVaultBackend];
GO

```
*** ⚠️ Make sure your IIS Application Pool name is exactly: ***

```bash
bashTokenVaultBackend
```

### After granting permissions:
- Run this command in the PowerShell Admin Privillagess Using
```bash
iisreset
```


</hr>


### 3. Configure appsettings.json
 - Update the connection string to match your SQL Server instance.
### 4. Apply EF Core Migrations
```bash
dotnet ef database update
```

### 5. Seed Data
- The project includes a DataSeeder class.
- Run the backend once via Visual Studio or IIS.
- Initial data will be automatically inserted into the database tables.



## IIS Hosting Instructions (Windows Server / Windows 10–11)

### Prerequisites

- Windows Server 2016+ / Windows 10/11
- IIS installed with **ASP.NET Core Hosting Bundle** (very important!)
  → Download: https://dotnet.microsoft.com/en-us/download/dotnet/8.0 (choose **Hosting Bundle**)
- .NET 8 Runtime & Hosting Bundle installed on the server

### Step 1 – Publish the Backend

1. In Visual Studio
   - Right-click the **backend project** → **Publish...**
   - Choose **Folder** → Select an empty folder (e.g. `C:\publish\TokenVault\backend`)
   - Click **Publish**

2. Create IIS Site
    - Open IIS Manager → Add Website
    - Site name: TokenVaultBackend
    - Physical path: folder where you published backend
    - **Port: 7061**
    - **Protocol: https**
  
### Step 2 – Publish the Frontend

1. Build React App
   - Go to the **fronrend project folder** → **Terminal**
    ```bash
      cd Frontend
      npm install
      npm run build
    ```

3. Create IIS Site
    - Open IIS Manager → Add Website
    - Site name: TokenVaultFrontend
    - Physical path: path to Frontend/build folder
    - **Port: 3000**
    - **Protocol: http**
 
  
