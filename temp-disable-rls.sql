-- Temporary script to disable RLS for testing
-- This will help us identify if RLS is the issue

-- Disable RLS on the registrations table
ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'registrations';

-- Note: After testing, you should re-enable RLS with:
-- ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
