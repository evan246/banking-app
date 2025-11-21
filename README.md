# 🏦 Enterprise Banking Application

<div align="center">

![Angular](https://img.shields.io/badge/Angular-20-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-2.83-green?logo=supabase)
![NG-ZORRO](https://img.shields.io/badge/NG--ZORRO-20.4-orange)

A full-featured, production-ready enterprise banking application built with Angular 20, featuring role-based access control, real-time transactions, and a beautiful modern UI.

[Quick Start](#-quick-start) • [Features](#-features) • [Documentation](#-documentation) • [Demo](#-demo-accounts)

</div>

---

## 🎨 Preview

- **Color Scheme**: Professional navy blue, white, and orange
- **Design**: Clean, modern, responsive Material Design
- **UX**: Intuitive navigation with role-based menu items

## ✨ Features

### 🔐 Authentication & Authorization
- Email/password authentication via Supabase
- JWT token-based sessions
- Automatic token refresh
- Role-based access control (RBAC)
- Secure logout with session cleanup

### 👥 User Roles
- **Admin**: Full system access, user management, reports
- **Manager**: View users, transactions, generate reports
- **Customer**: Personal dashboard, own transactions
- **Support**: View customer data, help customers

### 📊 Dashboard
- Real-time statistics (balance, transactions, income, expense)
- Interactive charts with ECharts
- Transaction distribution visualization
- Recent transactions widget
- Role-specific data display

### 💳 Transaction Management
- View all transactions with pagination
- Advanced search and filtering
- Filter by status (completed, pending, failed)
- Filter by type (deposit, withdrawal, transfer, payment)
- Transaction detail modal
- Export-ready data structure

### 👔 Admin Panel
- User management dashboard
- Role assignment and editing
- User statistics and analytics
- Search users by name, email, or role
- Filter by role type
- Bulk operations ready

### 👤 Profile Management
- Update personal information
- Change password securely
- View account details
- Avatar management
- Activity history

### 🎨 UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Loading states and skeletons
- Error handling with user-friendly messages
- Toast notifications
- Modal dialogs
- Collapsible sidebar
- Sticky navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works!)

### Installation

1. **Clone or navigate to your project**
   ```bash
   cd your-project-folder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create demo users**

   Go to your [Supabase Dashboard](https://supabase.com/dashboard) → Authentication → Users

   Create these users (click "Add user"):
   - `admin@bank.com` / `admin123` (role: admin)
   - `manager@bank.com` / `manager123` (role: manager)
   - `customer@bank.com` / `customer123` (role: customer)
   - `support@bank.com` / `support123` (role: support)

   ✅ Check "Auto Confirm User" for each!

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open browser**
   ```
   http://localhost:4200
   ```

🎉 You're ready! Click any demo account button to login.

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                          # Core functionality
│   │   ├── guards/                    # Route protection
│   │   │   ├── auth.guard.ts         # Authentication guard
│   │   │   └── role.guard.ts         # Role-based guard
│   │   ├── models/                    # TypeScript interfaces
│   │   │   ├── user.model.ts         # User types
│   │   │   └── transaction.model.ts  # Transaction types
│   │   └── services/                  # Business logic
│   │       ├── supabase.service.ts   # Database client
│   │       ├── auth.service.ts       # Authentication
│   │       ├── transaction.service.ts # Transactions
│   │       └── user.service.ts       # User operations
│   │
│   ├── features/                      # Feature modules
│   │   ├── auth/login/               # Login page
│   │   ├── dashboard/                # Main dashboard
│   │   ├── transactions/             # Transaction list
│   │   ├── admin/                    # Admin panel
│   │   └── profile/                  # User profile
│   │
│   ├── shared/                        # Shared components
│   │   └── components/
│   │       ├── navbar/               # Top navigation
│   │       └── sidebar/              # Side menu
│   │
│   ├── layout/                        # Layout components
│   │   └── main-layout.component.ts
│   │
│   └── app.routes.ts                 # Routing config
│
├── environments/                      # Environment configs
│   └── environment.ts                # Supabase credentials
│
├── global_styles.css                 # Global styles & theme
└── main.ts                           # App bootstrap
```

## 🔒 Security Features

### Database Security
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Role-based policies for data access
- ✅ User ID validation on all queries
- ✅ Automatic ownership checks
- ✅ Admin-only data modification

### Application Security
- ✅ JWT authentication tokens
- ✅ Route guards (authentication + role-based)
- ✅ Automatic token refresh
- ✅ Secure password hashing (Supabase)
- ✅ XSS protection
- ✅ CSRF protection

### API Security
- ✅ Supabase security rules
- ✅ Protected endpoints
- ✅ Request validation
- ✅ Error message sanitization

## 🛠️ Technology Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Angular | 20.3 | Frontend framework |
| **Language** | TypeScript | 5.8 | Type-safe JavaScript |
| **UI Library** | NG-ZORRO | 20.4 | Ant Design components |
| **Database** | Supabase | 2.83 | PostgreSQL + Auth |
| **State** | RxJS | 7.8 | Reactive state management |
| **Charts** | ECharts | 6.0 | Data visualization |
| **Icons** | Ant Design | 20.0 | Icon library |
| **HTTP** | Angular HTTP | 20.3 | API calls |
| **Forms** | Reactive Forms | 20.3 | Form handling |
| **Router** | Angular Router | 20.3 | Navigation |

## 📊 Database Schema

### Tables

#### profiles
Extends auth.users with application-specific data
```sql
- id: uuid (primary key, references auth.users)
- email: text (unique)
- full_name: text
- role: text (admin/manager/customer/support)
- phone: text
- avatar_url: text
- created_at: timestamp
- updated_at: timestamp
```

#### accounts
Bank accounts for customers
```sql
- id: uuid (primary key)
- user_id: uuid (references profiles)
- account_number: text (unique)
- account_type: text (checking/savings/business)
- balance: numeric
- currency: text
- status: text (active/inactive/frozen)
- created_at: timestamp
```

#### transactions
All banking transactions
```sql
- id: uuid (primary key)
- user_id: uuid (references profiles)
- account_id: uuid (references accounts)
- transaction_type: text (deposit/withdrawal/transfer/payment)
- amount: numeric
- currency: text
- status: text (pending/completed/failed/cancelled)
- description: text
- reference_number: text (unique)
- recipient_account: text
- created_at: timestamp
```

#### reports
System reports and analytics
```sql
- id: uuid (primary key)
- title: text
- report_type: text (daily/weekly/monthly/custom)
- generated_by: uuid (references profiles)
- data: jsonb
- created_at: timestamp
```

## 🎯 User Access Matrix

| Feature | Admin | Manager | Customer | Support |
|---------|-------|---------|----------|---------|
| Dashboard | ✅ All data | ✅ All data | ✅ Own data | ✅ All data |
| Transactions | ✅ All | ✅ All (read) | ✅ Own only | ✅ All (read) |
| Admin Panel | ✅ | ❌ | ❌ | ❌ |
| User Management | ✅ Full | ✅ View only | ❌ | ❌ |
| Reports | ✅ Create/View | ✅ View | ❌ | ❌ |
| Profile | ✅ | ✅ | ✅ | ✅ |
| Settings | ✅ | ❌ | ❌ | ❌ |

## 🎨 Design System

### Color Palette
```css
--primary-navy:    #0A2463   /* Headers, primary buttons */
--secondary-navy:  #1E3A8A   /* Secondary backgrounds */
--light-navy:      #3B5998   /* Hover states */
--accent-orange:   #FB8500   /* Call-to-action, highlights */
--light-orange:    #FFB703   /* Hover, accents */
--white:           #FFFFFF   /* Text, cards */
--light-gray:      #F5F5F5   /* Backgrounds */
--medium-gray:     #E0E0E0   /* Borders */
--dark-gray:       #757575   /* Secondary text */
```

### Typography
- **Font Family**: System fonts (-apple-system, Roboto, sans-serif)
- **Headings**: 600-700 weight
- **Body**: 400 weight
- **Line Height**: 1.6 for body, 1.2 for headings

### Spacing
- **Base Unit**: 8px
- **Common Spacing**: 8px, 16px, 24px, 32px, 48px

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get up and running in 5 minutes
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Comprehensive setup instructions
- **[COPY_PASTE_GUIDE.md](./COPY_PASTE_GUIDE.md)** - VS Code copy-paste instructions
- **[CREATE_DEMO_USERS.md](./CREATE_DEMO_USERS.md)** - How to create demo users
- **[FILE_CHECKLIST.md](./FILE_CHECKLIST.md)** - Verify all files exist

## 🎮 Demo Accounts

The login page includes quick-access buttons for all demo accounts:

| Role | Email | Password | Features |
|------|-------|----------|----------|
| **Admin** | admin@bank.com | admin123 | Full access, all features |
| **Manager** | manager@bank.com | manager123 | View users & reports |
| **Customer** | customer@bank.com | customer123 | Personal banking |
| **Support** | support@bank.com | support123 | Customer assistance |

💡 **Tip**: Click any demo account button on the login page to auto-fill credentials!

## 🔧 Development

### Available Scripts

```bash
# Start dev server (http://localhost:4200)
npm start

# Build for production
npm run build

# Run tests (if configured)
npm test

# Lint code (if configured)
npm run lint
```

### Development Workflow

1. **Make changes** to TypeScript files
2. **Auto-reload** happens instantly
3. **Check console** for errors
4. **Test in browser** at localhost:4200

### Adding New Features

1. **Create service** in `src/app/core/services/`
2. **Create component** in `src/app/features/`
3. **Add route** in `src/app/app.routes.ts`
4. **Add to sidebar** in `sidebar.component.ts`
5. **Test with each role**

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/demo/` folder

### Environment Variables

Set these in your hosting platform:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

### Hosting Options
- **Vercel**: Automatic Angular support
- **Netlify**: Easy drag-and-drop
- **Firebase**: Google Cloud integration
- **AWS S3**: Static site hosting
- **GitHub Pages**: Free hosting

## 🐛 Troubleshooting

### Common Issues

**App won't start**
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

**Login fails**
- Verify demo users created in Supabase
- Check passwords are exactly as specified
- Ensure "Auto Confirm User" was checked

**Access denied after login**
- Verify user profile exists with correct role
- Check RLS policies in Supabase
- Review browser console for errors

**Styles look broken**
- Clear browser cache
- Check `global_styles.css` was updated
- Verify NG-ZORRO is installed

**Charts not showing**
- Check `echarts` is installed
- Verify `ngx-echarts` is configured
- Check browser console for errors

## 🤝 Contributing

This is a demo/template project. Feel free to:
- Fork and customize
- Add new features
- Improve the design
- Report issues
- Share your improvements

## 📄 License

This project is provided as-is for educational and commercial use.

## 🙏 Acknowledgments

- **Angular Team** - Amazing framework
- **NG-ZORRO** - Beautiful UI components
- **Supabase** - Incredible backend platform
- **Apache ECharts** - Powerful charting library

## 📞 Support

- Check documentation files in project root
- Review Supabase logs for backend issues
- Check browser console for frontend errors
- Verify all files exist using FILE_CHECKLIST.md

## 🎉 Success!

Your enterprise banking application includes:

✅ 5 fully functional pages
✅ 4 user roles with different permissions
✅ Real-time data with Supabase
✅ Beautiful responsive UI
✅ Secure authentication
✅ Role-based access control
✅ Interactive dashboards
✅ Transaction management
✅ User administration
✅ Profile management

**Start building your next big thing!** 🚀

---

<div align="center">

Made with ❤️ using Angular 20 + Supabase + NG-ZORRO

**[⬆ Back to Top](#-enterprise-banking-application)**

</div>
