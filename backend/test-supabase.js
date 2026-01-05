const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

async function testConnection() {
    try {
        const { data, error } = await supabase.from('_test').select('*').limit(1);

        if (error && error.code !== 'PGRST116') { // PGRST116 = table not found (expected)
            console.log('❌ Connection error:', error.message);
            process.exit(1);
        }

        console.log('✅ Supabase connected successfully!');
        console.log('Project URL:', process.env.SUPABASE_URL);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

testConnection();
