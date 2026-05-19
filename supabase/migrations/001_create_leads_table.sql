-- Create leads table for Kaizen Digital Partners lead capture
-- Run this migration in your Supabase project

CREATE TABLE IF NOT EXISTS leads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  source TEXT DEFAULT 'website',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Enable RLS (Row Level Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Anon users can insert leads (public lead capture form)
CREATE POLICY "Allow public lead insertion" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Anon users cannot read/update/delete
CREATE POLICY "Authenticated users can view all leads" ON leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update leads" ON leads
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Optional: Create an audit log trigger (if you want to track changes)
CREATE TABLE IF NOT EXISTS leads_audit (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  lead_id BIGINT NOT NULL,
  action TEXT NOT NULL,
  old_data JSONB,
  new_data JSONB,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE FUNCTION log_leads_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO leads_audit (lead_id, action, new_data)
    VALUES (NEW.id, 'INSERT', to_jsonb(NEW));
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO leads_audit (lead_id, action, old_data, new_data)
    VALUES (NEW.id, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_audit_trigger
AFTER INSERT OR UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION log_leads_changes();
