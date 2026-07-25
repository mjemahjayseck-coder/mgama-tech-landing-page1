/*
# Create quote_requests table (single-tenant, no auth)

1. Purpose
   Stores quote requests submitted from the Mgama Tech landing page contact form.
   This is a public-facing lead-capture form with no sign-in, so anon inserts are allowed.

2. New Tables
   - `quote_requests`
     - id (uuid, primary key)
     - name (text, not null) - customer name
     - phone (text, not null) - contact phone number
     - service (text, not null) - requested service type
     - message (text) - optional message
     - created_at (timestamptz) - submission timestamp

3. Security
   - Enable RLS on quote_requests.
   - Allow anon + authenticated to INSERT (public form submission).
   - No SELECT/UPDATE/DELETE for anon — only authenticated (admin) can read leads.
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_quote_requests" ON quote_requests;
CREATE POLICY "anon_insert_quote_requests" ON quote_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_quote_requests" ON quote_requests;
CREATE POLICY "auth_select_quote_requests" ON quote_requests FOR SELECT
  TO authenticated USING (true);
