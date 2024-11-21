import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ypukfosguryiskxuftdc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwdWtmb3NndXJ5aXNreHVmdGRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDk5ODU2OSwiZXhwIjoyMDQ2NTc0NTY5fQ.79sPvQNdN4F3OHd4tRWU5lva7hJY9Pp1MnDjnO2sSx8"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase