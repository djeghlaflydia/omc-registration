# Quick Start Guide - OMC Registration with Supabase

This is a quick reference to get your registration form up and running with Supabase in 5 minutes.

## ✅ What's Already Done

- ✅ Supabase client installed and configured
- ✅ Environment variables set up (`.env.local`)
- ✅ API route created (`/api/register`)
- ✅ Form validation with Zod (frontend + backend)
- ✅ Registration form updated with submission handling
- ✅ Loading states and error handling implemented

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create the Database Table (2 minutes)

1. Open your Supabase dashboard: https://supabase.com/dashboard/project/ggerafogbieecricqzzb

2. Click **SQL Editor** in the left sidebar

3. Click **New Query**

4. Copy and paste the entire content of `supabase-setup.sql` into the editor

5. Click **Run** (or press `Cmd/Ctrl + Enter`)

6. ✅ Done! Your table is created with proper indexes and security policies

### Step 2: Test the Form (1 minute)

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Open your browser to the registration page

3. Fill out the form and submit

4. Check your Supabase dashboard → **Table Editor** → `registrations` to see your entry!

## 📊 View Registrations

### Option 1: Supabase Dashboard (Easiest)
- Go to: **Table Editor** → `registrations`
- You can view, search, filter, and export data here

### Option 2: SQL Query
Go to **SQL Editor** and run:
```sql
SELECT * FROM registrations ORDER BY created_at DESC;
```

### Export Data
1. **Table Editor** → `registrations`
2. Click **Export** (top right)
3. Choose CSV or JSON

## 🔒 Security Features

✅ **Row Level Security (RLS)** enabled
- Anonymous users can only INSERT (submit registrations)
- Authenticated users can view and manage registrations

✅ **Unique Constraints**
- Email and Student ID are unique
- Prevents duplicate registrations

✅ **Validation**
- Frontend validation with Zod
- Backend validation in API route
- Type-safe with TypeScript

## 🎯 Key Files

```
omc-registration/
├── .env.local                           # ✅ Supabase credentials (DO NOT commit)
├── lib/
│   ├── supabase.ts                      # ✅ Supabase client
│   └── validation.ts                    # ✅ Zod validation schema
├── app/
│   ├── api/register/route.ts            # ✅ POST endpoint for submissions
│   └── components/RegistrationForm.tsx  # ✅ Updated form component
└── supabase-setup.sql                   # ✅ Database setup script
```

## 🧪 Test the API Directly

You can test the API endpoint using curl:

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "studentId": "12345678",
    "email": "john@example.com",
    "phone": "0123456789",
    "fieldOfStudy": "Computer Science",
    "faculty": "Engineering",
    "academicLevel": "L3",
    "selectedTeam": "it",
    "experienceLevel": "intermediate",
    "motivation": "I want to learn and grow with the club",
    "expectation": "Gain practical experience",
    "portfolio": "",
    "github": ""
  }'
```

## 🐛 Troubleshooting

### Issue: Form submission fails
1. Check browser console for errors
2. Verify `.env.local` has correct Supabase URL and API key
3. Ensure you ran the `supabase-setup.sql` script
4. Check Supabase dashboard → **Logs** for errors

### Issue: "Table does not exist"
- You need to run the `supabase-setup.sql` script in Supabase SQL Editor

### Issue: "Duplicate email/student ID"
- This is expected! Someone already registered with that email/ID
- The form will show an error message

### Issue: Validation errors
- Check that all required fields are filled
- Ensure email format is valid
- URLs (portfolio, github) must be valid if provided

## 📈 Next Steps

### 1. Monitor Registrations
- Set up email notifications when someone registers
- Create a simple admin dashboard to view registrations

### 2. Enhance Security
- Add CAPTCHA to prevent bots
- Add rate limiting to prevent spam
- Set up email verification

### 3. Analytics
```sql
-- Get registration counts by team
SELECT selected_team, COUNT(*) as count
FROM registrations
GROUP BY selected_team
ORDER BY count DESC;

-- Get registrations by date
SELECT DATE(created_at) as date, COUNT(*) as count
FROM registrations
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

## 🎉 You're All Set!

Your registration form is now:
- ✅ Storing data in Supabase
- ✅ Validating inputs on frontend and backend
- ✅ Preventing duplicate registrations
- ✅ Showing helpful error messages
- ✅ Secure with Row Level Security

For detailed information, see `SETUP_INSTRUCTIONS.md`

## 📞 Support

If you encounter issues:
1. Check the browser console (F12)
2. Check the terminal where `npm run dev` is running
3. Check Supabase Dashboard → **Logs**
4. Review `SETUP_INSTRUCTIONS.md` for detailed troubleshooting