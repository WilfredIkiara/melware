require('dotenv').config(); // Load environment variables from .env file

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.REACT_APP_ANON_KEY;

let supabase = null;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('⚠️ Supabase client not initialized. Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env');
} else {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase JS client initialized.');

    // Test connection by querying the 'users' table
    (async () => {
        try {
            // Just try to fetch one record from the users table to test the connection
            const { data, error } = await supabase.from('users').select('user_id').limit(1);

            if (error) {
                console.error('❌ Database connection failed:', error.message);
            } else {
                console.log('✅ Database connection successful!');
                if (data && data.length > 0) {
                    console.log(`ℹ️ Found ${data.length} user(s) in the database.`);
                } else {
                    console.log('ℹ️ No users found in the database yet.');
                }
            }
        } catch (err) {
            console.error('❌ Database connection failed:', err.message);
        }
    })();
}

module.exports = supabase;
