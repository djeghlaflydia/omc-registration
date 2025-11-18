# Supabase Setup Instructions for OMC Registration Form

This guide will walk you through setting up Supabase for your registration form.

## Prerequisites

- A Supabase account (already created)
- Project URL: `https://ggerafogbieecricqzzb.supabase.co`

## Step 1: Create the Database Table

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/ggerafogbieecricqzzb

2. Click on the **SQL Editor** in the left sidebar

3. Click **New Query**

4. Copy the entire contents of `supabase-setup.sql` and paste it into the SQL editor

5. Click **Run** or press `Ctrl+Enter` (Windows/Linux) or `Cmd+Enter` (Mac)

6. You should see a success message indicating that the table, indexes, policies, and triggers were created

## Step 2: Verify the Table

1. Click on **Table Editor** in the left sidebar

2. You should see a table named `registrations` with the following columns:
   - `id` (UUID, Primary Key)
   - `first_name` (VARCHAR)
   - `last_name` (VARCHAR)
   - `student_id` (VARCHAR, Unique)
   - `email` (VARCHAR, Unique)
   - `phone` (VARCHAR)
   - `field_of_study` (VARCHAR)
   - `faculty` (VARCHAR)
   - `academic_level` (VARCHAR)
   - `selected_team` (VARCHAR)
   - `experience_level` (VARCHAR)
   - `motivation` (TEXT)
   - `expectation` (TEXT)
   - `expectation` (TEXT, optional)
   - `portfolio` (TEXT, optional)
   - `github` (TEXT, optional)
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

## Step 3: Verify Row Level Security (RLS)

1. In the **Table Editor**, click on the `registrations` table

2. Click the **RLS** tab at the top

3. You should see that RLS is **enabled** with the following policies:
   - **Allow public insert**: Allows anonymous users to submit registrations
   - **Allow authenticated read**: Allows authenticated users to view registrations
   - **Allow authenticated update**: Allows authenticated users to update registrations

## Step 4: Test the Registration Form

1. Make sure your environment variables are set (`.env.local` file is already created)

2. Start your development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to your registration page

4. Fill out the form and submit it

5. Go back to Supabase > **Table Editor** > `registrations` table

6. You should see your test registration entry!

## Step 5: View Registration Data

### Option 1: Using Supabase Dashboard

1. Go to **Table Editor** > `registrations`
2. You can view, search, and filter all registrations here

### Option 2: Using the Statistics View

1. Go to **SQL Editor**
2. Run this query:
   ```sql
   SELECT * FROM registration_stats;
   ```
3. This will show you statistics grouped by team and experience level

## Security Notes

### Current Setup
- ✅ Anonymous users can **INSERT** (submit registrations)
- ✅ Authenticated users can **READ** all registrations
- ✅ Authenticated users can **UPDATE** registrations
- ✅ Email and Student ID are unique (prevents duplicates)
- ✅ Environment variables are stored in `.env.local` (not committed to git)

### For Production
Consider these additional security measures:

1. **Rate Limiting**: Add rate limiting to prevent spam submissions
2. **Email Verification**: Add email verification to confirm valid emails
3. **CAPTCHA**: Add CAPTCHA to prevent bot submissions
4. **Admin Authentication**: Set up authentication for viewing registrations
5. **Backup**: Enable automatic backups in Supabase settings

## Troubleshooting

### Issue: "Table already exists" error
- This is fine! It means the table was created successfully on a previous run
- You can safely ignore this error

### Issue: Form submission fails with "Failed to submit registration"
1. Check the browser console for detailed error messages
2. Verify your Supabase URL and API key in `.env.local`
3. Check that RLS policies are enabled correctly
4. Verify the table structure matches the expected schema

### Issue: Duplicate email/student ID error
- This means someone has already registered with that email or student ID
- The error message will display: "A registration with this email or student ID already exists."
- This is expected behavior to prevent duplicate registrations

### Issue: Validation errors
- Check the console for specific validation error messages
- Ensure all required fields are filled in
- Verify email format is valid
- Ensure URLs (portfolio, github) are valid if provided

## Next Steps

### View Registrations (Admin Panel)
To view and manage registrations, you can:

1. **Use Supabase Dashboard** (easiest for now)
   - Navigate to Table Editor > registrations

2. **Build an Admin Panel** (future enhancement)
   - Create a protected admin route in your Next.js app
   - Set up Supabase Auth for admin access
   - Build a UI to view, filter, and export registrations

### Export Registrations
You can export data from Supabase:
1. Go to **Table Editor** > `registrations`
2. Click the **Export** button (top right)
3. Choose CSV or JSON format

### Connect to Other Services
You can set up webhooks or integrations to:
- Send email notifications when someone registers
- Sync to Google Sheets
- Send Slack notifications to your team
- Export to a CRM system

## API Endpoints

Your application now has the following API endpoint:

### POST `/api/register`
Submits a new registration.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "studentId": "12345678",
  "email": "john.doe@example.com",
  "phone": "0123456789",
  "fieldOfStudy": "Computer Science",
  "faculty": "Engineering",
  "academicLevel": "L3",
  "selectedTeam": "it",
  "experienceLevel": "intermediate",
  "motivation": "I want to learn and grow...",
  "expectation": "I hope to gain experience...",
  "portfolio": "https://portfolio.com",
  "github": "https://github.com/username"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration submitted successfully!",
  "data": { ... }
}
```

**Error Response (400/409/500):**
```json
{
  "success": false,
  "error": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the server logs (`npm run dev` output)
3. Review the Supabase logs in the dashboard
4. Verify your environment variables are correct

## Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zod Validation](https://zod.dev/)