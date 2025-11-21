# Enterprise Banking Application - Setup Guide

## 📋 Overview
A full-featured Angular 20 enterprise banking application with role-based access control, featuring a professional navy blue, white, and orange color scheme.

## 🎨 Color Scheme
- **Primary Navy**: #0A2463
- **Secondary Navy**: #1E3A8A
- **Accent Orange**: #FB8500
- **Light Orange**: #FFB703
- **White**: #FFFFFF

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Visual Studio Code (recommended)

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:4200`

3. **Build for Production**
   ```bash
   npm run build
   ```

## 👥 Demo Accounts

The application comes with pre-configured demo accounts for testing. You'll need to create these users first:

### Creating Demo Users

Since the database is already set up, you need to create the following users through the application:

1. **Admin Account**
   - Email: `admin@bank.com`
   - Password: `admin123`
   - Role: admin

2. **Manager Account**
   - Email: `manager@bank.com`
   - Password: `manager123`
   - Role: manager

3. **Customer Account**
   - Email: `customer@bank.com`
   - Password: `customer123`
   - Role: customer

4. **Support Account**
   - Email: `support@bank.com`
   - Password: `support123`
   - Role: support

### How to Create Demo Users

You have two options:

#### Option 1: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Add user" and create each user with the credentials above
4. After creating each user in auth, their profile will be automatically created when they first log in

#### Option 2: Using the Application
1. Since you can't register without being logged in, you'll need to temporarily modify the app or use the Supabase dashboard

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                      # Core functionality
│   │   ├── guards/               # Route guards (auth, role-based)
│   │   │   ├── auth.guard.ts
│   │   │   └── role.guard.ts
│   │   ├── models/               # TypeScript interfaces
│   │   │   ├── user.model.ts
│   │   │   └── transaction.model.ts
│   │   └── services/             # Business logic services
│   │       ├── auth.service.ts
│   │       ├── supabase.service.ts
│   │       ├── transaction.service.ts
│   │       └── user.service.ts
│   │
│   ├── features/                 # Feature modules
│   │   ├── auth/
│   │   │   └── login/
│   │   │       └── login.component.ts
│   │   ├── dashboard/
│   │   │   └── dashboard.component.ts
│   │   ├── transactions/
│   │   │   └── transactions.component.ts
│   │   ├── admin/
│   │   │   └── admin.component.ts
│   │   └── profile/
│   │       └── profile.component.ts
│   │
│   ├── shared/                   # Shared components
│   │   └── components/
│   │       ├── navbar/
│   │       │   └── navbar.component.ts
│   │       └── sidebar/
│   │           └── sidebar.component.ts
│   │
│   ├── layout/                   # Layout components
│   │   └── main-layout.component.ts
│   │
│   └── app.routes.ts            # Application routing
│
├── environments/                 # Environment configs
│   └── environment.ts
│
├── global_styles.css            # Global styles
└── main.ts                      # Application bootstrap
```

## 🔐 Role-Based Access Control

### Access Matrix

| Feature | Admin | Manager | Customer | Support |
|---------|-------|---------|----------|---------|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Transactions | ✅ | ✅ | ✅ | ✅ |
| Admin Panel | ✅ | ❌ | ❌ | ❌ |
| User Management | ✅ | ✅ | ❌ | ❌ |
| Reports | ✅ | ✅ | ❌ | ❌ |
| Profile | ✅ | ✅ | ✅ | ✅ |

## 📦 Features

### 1. Authentication
- Email/password login
- Session management
- Automatic token refresh
- Secure logout

### 2. Dashboard
- Role-specific statistics
- Interactive charts (ECharts)
- Recent transactions
- Quick actions

### 3. Transactions
- View all transactions
- Filter by status, type
- Search functionality
- Transaction details modal
- Export capabilities

### 4. Admin Panel (Admin Only)
- User management
- Role assignment
- User statistics
- Account status control

### 5. Profile Management
- Update personal information
- Change password
- Avatar management
- Account information display

## 🛠️ Technology Stack

- **Framework**: Angular 20
- **UI Library**: NG-ZORRO (Ant Design)
- **State Management**: RxJS (Services-based)
- **Charts**: NGX-ECharts
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Ant Design Icons

## 🗄️ Database Schema

### Tables

1. **profiles**
   - User information and roles
   - Extends Supabase auth.users

2. **accounts**
   - Bank accounts
   - Account types: checking, savings, business
   - Balance and status tracking

3. **transactions**
   - All banking transactions
   - Types: deposit, withdrawal, transfer, payment
   - Status tracking and history

4. **reports**
   - System reports
   - Generated analytics
   - Historical data

## 🔒 Security Features

- Row Level Security (RLS) on all tables
- Role-based policies
- Secure password hashing
- JWT token authentication
- Protected API endpoints
- XSS protection
- CSRF protection

## 🎯 How Components Work Together

### 1. Authentication Flow
```
Login Component → Auth Service → Supabase Service → Database
                        ↓
                  Update Current User
                        ↓
                  Navigate to Dashboard
```

### 2. Data Flow
```
Component → Service → Supabase Client → Database
    ↓
Observable Stream
    ↓
Component Updates UI
```

### 3. Route Protection
```
User Navigates → Route Guard Checks Auth
                      ↓
                Role Guard Checks Permission
                      ↓
                Allow/Deny Access
```

## 📝 Component Generation Commands

If you need to create additional components:

```bash
# Generate a new component
ng generate component features/feature-name/component-name --standalone

# Generate a new service
ng generate service core/services/service-name

# Generate a new guard
ng generate guard core/guards/guard-name --functional
```

## 🐛 Troubleshooting

### Common Issues

1. **Port 4200 already in use**
   ```bash
   # Kill process on port 4200
   npx kill-port 4200
   # Or use a different port
   ng serve --port 4201
   ```

2. **Module not found errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Supabase connection issues**
   - Check `.env` file has correct credentials
   - Verify Supabase project is active
   - Check network connectivity

4. **Authentication not working**
   - Ensure users are created in Supabase Auth
   - Check browser console for errors
   - Verify environment variables

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔄 State Management

The application uses a service-based approach with RxJS:
- Services maintain state using BehaviorSubjects
- Components subscribe to observable streams
- Automatic change detection with async pipe

## 🚢 Deployment

### Building for Production

```bash
npm run build
```

The build artifacts will be in `dist/demo` directory.

### Environment Variables

Make sure to set the following in your production environment:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev)
- [NG-ZORRO Documentation](https://ng.ant.design)
- [Supabase Documentation](https://supabase.com/docs)
- [ECharts Documentation](https://echarts.apache.org)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the console for errors
3. Check Supabase logs
4. Verify database policies

## 📄 License

This is a demo application for educational purposes.
