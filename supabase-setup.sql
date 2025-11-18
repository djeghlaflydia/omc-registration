-- Create the registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  student_id VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL,
  field_of_study VARCHAR(100) NOT NULL,
  faculty VARCHAR(100) NOT NULL,
  academic_level VARCHAR(10) NOT NULL,
  selected_team VARCHAR(50) NOT NULL,
  experience_level VARCHAR(50) NOT NULL,
  motivation TEXT NOT NULL,
  expectation TEXT,
  portfolio TEXT,
  github TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_student_id ON registrations(student_id);
CREATE INDEX IF NOT EXISTS idx_registrations_selected_team ON registrations(selected_team);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert" ON registrations;
DROP POLICY IF EXISTS "Allow authenticated read" ON registrations;
DROP POLICY IF EXISTS "Allow authenticated update" ON registrations;

-- Create a policy that allows anyone (including anon) to insert
CREATE POLICY "Allow public insert" ON registrations
  FOR INSERT
  WITH CHECK (true);

-- Create a policy that allows authenticated users to read all registrations
CREATE POLICY "Allow authenticated read" ON registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Create a policy that allows authenticated users to update registrations
CREATE POLICY "Allow authenticated update" ON registrations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_registrations_updated_at ON registrations;

-- Create a trigger to call the function before any update
CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for statistics (useful for admin dashboard)
CREATE OR REPLACE VIEW registration_stats AS
SELECT
  selected_team,
  experience_level,
  COUNT(*) as count,
  DATE(created_at) as registration_date
FROM registrations
GROUP BY selected_team, experience_level, DATE(created_at)
ORDER BY registration_date DESC, selected_team;

-- Grant access to the view
GRANT SELECT ON registration_stats TO authenticated;
