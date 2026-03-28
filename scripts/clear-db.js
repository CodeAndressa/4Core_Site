const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

async function main() {
  const envFile = fs.readFileSync(path.resolve(__dirname, '../.env.local'), 'utf8');
  const env = {};
  envFile.split(/\r?\n/).forEach(line => {
    const match = line.match(/^([^#\s][^=]+)=(.*)$/);
    if (match) {
      env[match[1].trim()] = match[2].trim();
    }
  });

  const supabaseUrl = env['SUPABASE_URL'] || env['NEXT_PUBLIC_SUPABASE_URL'];
  const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'];

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('Cleaning analytics data (events)...');
  const { error: err1 } = await supabase.from('events').delete().not('id', 'is', null);
  if (err1) {
    console.error('Error cleaning analytics:', err1.message);
  } else {
    console.log('Analytics data cleared successfully.');
  }

  console.log('Cleaning fake leads...');
  const { error: err2 } = await supabase.from('leads').delete().not('id', 'is', null);
  if (err2) {
    console.error('Error cleaning leads:', err2.message);
  } else {
    console.log('Fake leads cleared successfully.');
  }
}

main().catch(console.error);
