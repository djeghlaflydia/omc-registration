-- Comprehensive RLS Policy Fix for Registrations Table
-- Run this in Supabase SQL Editor

-- Step 1: Disable RLS temporarily
ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop all existing policies
DROP POLICY IF EXISTS "Allow public insert" ON registrations;
DROP POLICY IF EXISTS "Allow authenticated read" ON registrations;
DROP POLICY IF EXISTS "Allow authenticated update" ON registrations;
DROP POLICY IF EXISTS "Enable insert for anon users" ON registrations;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON registrations;

-- Step 3: Grant necessary permissions to anon role
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON registrations TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;

-- Step 4: Grant permissions to authenticated role
GRANT ALL ON registrations TO authenticated;

-- Step 5: Re-enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Step 6: Create the insert policy for anonymous users
CREATE POLICY "Enable insert for anon users"
ON registrations
FOR INSERT
TO anon
WITH CHECK (true);

-- Step 7: Create the insert policy for authenticated users
CREATE POLICY "Enable insert for authenticated users"
ON registrations
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Step 8: Create read policy for authenticated users
CREATE POLICY "Enable read access for authenticated users"
ON registrations
FOR SELECT
TO authenticated
USING (true);

-- Step 9: Create update policy for authenticated users
CREATE POLICY "Enable update for authenticated users"
ON registrations
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Step 10: Verify the setup
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'registrations'
ORDER BY policyname;

-- Step 11: Check table permissions
SELECT
    grantee,
    privilege_type
FROM information_schema.role_table_grants
WHERE table_name = 'registrations';
