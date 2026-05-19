# Supabase Setup

## Migrations

The `migrations/` directory contains SQL scripts to set up the database schema for Kaizen Digital Partners.

### Deploy Migrations

To run migrations in your Supabase project:

1. **Via Supabase Dashboard:**
   - Go to your Supabase project → SQL Editor
   - Create a new query
   - Copy the contents of `migrations/001_create_leads_table.sql`
   - Execute the query

2. **Via Supabase CLI (recommended):**
   ```bash
   supabase migration up
   ```

## Tables

### `leads`
Stores lead capture submissions from the landing page form.

**Columns:**
- `id` - Auto-incrementing primary key
- `email` - Company/work email (required)
- `company` - Company name (required)
- `message` - Inquiry message (required)
- `created_at` - Timestamp of submission
- `updated_at` - Last modified timestamp
- `status` - Lead status ('new', 'contacted', 'qualified', 'closed')
- `source` - Where the lead came from (default: 'website')
- `user_id` - Optional link to Supabase auth user

**Indexes:**
- `email` - For lookups
- `created_at` - For time-based queries
- `status` - For filtering and reporting

**RLS Policies:**
- Public: Can INSERT leads (anonymous form submission)
- Authenticated: Can SELECT, UPDATE (for internal team)

### `leads_audit` (optional)
Audit log tracking all changes to leads. Populated automatically via trigger.

## Environment Variables

After setting up Supabase, add to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Integration in React

To wire up the form in `app/page.tsx`:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const handleLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  
  const { error } = await supabase.from("leads").insert({
    email: form.get("email"),
    company: form.get("company"),
    message: form.get("message"),
  });

  if (error) {
    console.error("Lead submission failed:", error);
  } else {
    e.currentTarget.reset();
    // Show success message to user
  }
};
```

## Next Steps

1. Install `@supabase/supabase-js`:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Update the form handler in `app/page.tsx` with the integration code above.

3. Test form submission and verify leads appear in Supabase Dashboard → leads table.
