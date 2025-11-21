# Creating Demo Users Guide

## 🎯 Overview

This guide will help you create the demo users needed to test all features of the banking application.

## 🔐 Demo Accounts Needed

You need to create 4 users with different roles:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| Admin | admin@bank.com | admin123 | Full access to everything |
| Manager | manager@bank.com | manager123 | View users and reports |
| Customer | customer@bank.com | customer123 | Own transactions only |
| Support | support@bank.com | support123 | View customer data |

## 📝 Method 1: Using Supabase Dashboard (Recommended)

### Step 1: Access Supabase Dashboard

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project

### Step 2: Navigate to Authentication

1. Click on "Authentication" in the left sidebar
2. Click on "Users" tab

### Step 3: Create Each User

For each demo account, follow these steps:

#### Creating Admin User

1. Click the "Add user" button (top right)
2. Fill in the form:
   - **Email**: `admin@bank.com`
   - **Password**: `admin123`
   - **Confirm Password**: `admin123`
   - **Auto Confirm User**: ✅ (check this box)
3. Click "Create user"
4. The user will be created in `auth.users`

#### Creating Manager User

1. Click "Add user" button
2. Fill in:
   - **Email**: `manager@bank.com`
   - **Password**: `manager123`
   - **Confirm Password**: `manager123`
   - **Auto Confirm User**: ✅
3. Click "Create user"

#### Creating Customer User

1. Click "Add user" button
2. Fill in:
   - **Email**: `customer@bank.com`
   - **Password**: `customer123`
   - **Confirm Password**: `customer123`
   - **Auto Confirm User**: ✅
3. Click "Create user"

#### Creating Support User

1. Click "Add user" button
2. Fill in:
   - **Email**: `support@bank.com`
   - **Password**: `support123`
   - **Confirm Password**: `support123`
   - **Auto Confirm User**: ✅
3. Click "Create user"

### Step 4: Create User Profiles

After creating users in Authentication, you need to create their profiles with roles.

1. Click on "Table Editor" in the left sidebar
2. Select the "profiles" table
3. Click "Insert" → "Insert row"

For each user, insert a row with:

#### Admin Profile
- **id**: Copy the UUID from auth.users for admin@bank.com
- **email**: `admin@bank.com`
- **full_name**: `Amaka Okoro`
- **role**: `admin`
- **phone**: `555-0001` (optional)

#### Manager Profile
- **id**: Copy the UUID from auth.users for manager@bank.com
- **email**: `manager@bank.com`
- **full_name**: `Somy Nwafor`
- **role**: `manager`
- **phone**: `555-0002` (optional)

#### Customer Profile
- **id**: Copy the UUID from auth.users for customer@bank.com
- **email**: `customer@bank.com`
- **full_name**: `Amanda Eze`
- **role**: `customer`
- **phone**: `555-0003` (optional)

#### Support Profile
- **id**: Copy the UUID from auth.users for support@bank.com
- **email**: `support@bank.com`
- **full_name**: `Kamsi Obi`
- **role**: `support`
- **phone**: `555-0004` (optional)

## 📝 Method 2: Using SQL Editor

### Step 1: Access SQL Editor

1. In Supabase Dashboard, click "SQL Editor"
2. Click "New query"

### Step 2: Create Users and Profiles

Copy and paste this SQL script:

```sql
-- Note: This creates profiles only. You still need to create auth users manually
-- through the Supabase Dashboard as shown in Method 1

-- After creating auth users, get their IDs and update this script

-- Example: Create profiles (replace UUIDs with actual auth.users IDs)
INSERT INTO profiles (id, email, full_name, role, phone) VALUES
  ('REPLACE-WITH-ACTUAL-UUID-1', 'admin@bank.com', 'Admin User', 'admin', '555-0001'),
  ('REPLACE-WITH-ACTUAL-UUID-2', 'manager@bank.com', 'Manager User', 'manager', '555-0002'),
  ('REPLACE-WITH-ACTUAL-UUID-3', 'customer@bank.com', 'Customer User', 'customer', '555-0003'),
  ('REPLACE-WITH-ACTUAL-UUID-4', 'support@bank.com', 'Support User', 'support', '555-0004')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  phone = EXCLUDED.phone;
```

### Step 3: Create Sample Data (Optional)

After creating the customer user, you can add sample accounts and transactions:

```sql
-- Create sample accounts for customer
-- Replace 'customer-uuid-here' with the actual customer user ID
INSERT INTO accounts (user_id, account_number, account_type, balance, currency, status) VALUES
  ('customer-uuid-here', 'ACC-1001', 'checking', 125430.50, 'USD', 'active'),
  ('customer-uuid-here', 'ACC-1002', 'savings', 50000.00, 'USD', 'active')
ON CONFLICT (account_number) DO NOTHING;

-- Create sample transactions
-- Replace 'customer-uuid-here' and 'account-uuid-here' with actual IDs
INSERT INTO transactions (user_id, account_id, transaction_type, amount, currency, status, description, reference_number) VALUES
  ('customer-uuid-here', 'account-uuid-here', 'deposit', 5000.00, 'USD', 'completed', 'Monthly salary deposit', 'TXN001234'),
  ('customer-uuid-here', 'account-uuid-here', 'withdrawal', 200.00, 'USD', 'completed', 'ATM withdrawal', 'TXN001235'),
  ('customer-uuid-here', 'account-uuid-here', 'payment', 150.00, 'USD', 'completed', 'Utility payment', 'TXN001236'),
  ('customer-uuid-here', 'account-uuid-here', 'transfer', 1000.00, 'USD', 'completed', 'Transfer to savings', 'TXN001237'),
  ('customer-uuid-here', 'account-uuid-here', 'deposit', 3000.00, 'USD', 'completed', 'Freelance payment', 'TXN001238')
ON CONFLICT (reference_number) DO NOTHING;
```

## ✅ Verification Steps

After creating all users:

1. **Test Login**
   - Open your app at `http://localhost:4200`
   - Try logging in with each demo account
   - Verify you can access the dashboard

2. **Test Admin Access**
   - Login as admin@bank.com
   - You should see:
     - Dashboard ✅
     - Transactions ✅
     - Admin Panel ✅
     - Profile ✅

3. **Test Manager Access**
   - Login as manager@bank.com
   - You should see:
     - Dashboard ✅
     - Transactions ✅
     - User Management ✅
     - Profile ✅
   - You should NOT see:
     - Admin Panel ❌

4. **Test Customer Access**
   - Login as customer@bank.com
   - You should see:
     - Dashboard ✅
     - Transactions ✅ (only their own)
     - Profile ✅
   - You should NOT see:
     - Admin Panel ❌
     - User Management ❌

5. **Test Support Access**
   - Login as support@bank.com
   - You should see:
     - Dashboard ✅
     - Transactions ✅ (all users)
     - Profile ✅
   - You should NOT see:
     - Admin Panel ❌
     - User Management ❌

## 🔍 Finding User IDs

If you need to find a user's ID:

1. Go to Supabase Dashboard
2. Click "Authentication" → "Users"
3. Find the user in the list
4. The ID is shown in the "UID" column
5. Click to copy it

Alternatively, use SQL:

```sql
SELECT id, email FROM auth.users WHERE email = 'admin@bank.com';
```

## 🐛 Troubleshooting

### Issue: Can't create user in Supabase Dashboard

**Solution**:
- Make sure you're logged into Supabase
- Check your project is active
- Verify your plan allows user creation
- Try refreshing the page

### Issue: User created but can't login

**Solution**:
- Check "Auto Confirm User" was enabled
- Verify the password meets requirements (min 6 characters)
- Clear browser cache
- Try password reset

### Issue: Login works but shows "Access Denied"

**Solution**:
- Make sure profile was created in profiles table
- Verify the role is set correctly
- Check RLS policies are enabled
- Review browser console for errors

### Issue: Wrong role assigned

**Solution**:
```sql
-- Update user role
UPDATE profiles
SET role = 'admin'
WHERE email = 'admin@bank.com';
```

### Issue: User sees blank dashboard

**Solution**:
- Check browser console for errors
- Verify Supabase connection
- Ensure user has a profile record
- Test with different role

## 🎉 Quick Test Script

After creating all users, test each one:

```bash
# Test sequence:
1. Login as admin@bank.com → See all features
2. Login as manager@bank.com → See limited admin features
3. Login as customer@bank.com → See only customer features
4. Login as support@bank.com → See support features
```

## 📱 Using Demo Accounts

On the login page, you'll see demo account buttons. Click any button to:
1. Auto-fill the email and password
2. Just click "Sign In"
3. Access the application

## 💡 Pro Tips

1. **Save Credentials**: Bookmark the login page with credentials in a password manager

2. **Quick Switch**: Logout and use the demo buttons to quickly switch between roles

3. **Test Permissions**: Try accessing restricted URLs directly to test guards

4. **Create More Users**: Use the Admin Panel once logged in as admin to create more users

5. **Reset Password**: If you forget a password, use Supabase Dashboard to reset it

## 🔄 Reset Demo Data

If you want to start fresh:

```sql
-- Delete all transactions
DELETE FROM transactions;

-- Delete all accounts
DELETE FROM accounts;

-- Delete all reports
DELETE FROM reports;

-- Keep users and profiles intact
```

## 📞 Need Help?

Common issues:
- **Email already exists**: User was created before, just add profile
- **Invalid credentials**: Check password is exactly as specified
- **Access denied**: Profile role might be wrong
- **Can't see features**: Role-based access is working correctly

## ✨ Success Checklist

- [ ] All 4 users created in auth.users
- [ ] All 4 profiles created with correct roles
- [ ] Tested login for each user
- [ ] Verified role-based access works
- [ ] Created sample transactions (optional)
- [ ] Bookmarked login page
- [ ] Ready to demonstrate the app!

**You're all set!** 🎊
