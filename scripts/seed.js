require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Seeding database...');

    const passwordHash = await bcrypt.hash('Password123', 10);

    // ---- Users ----
    const usersResult = await client.query(
      `INSERT INTO users (name, email, password_hash, role, phone, state, category)
       VALUES
        ('Admin User', 'admin@sih.test', $1, 'admin', '9990000001', 'Delhi', 'ST'),
        ('Officer User', 'officer@sih.test', $1, 'officer', '9990000002', 'Madhya Pradesh', 'ST'),
        ('Student User', 'student@sih.test', $1, 'student', '9990000003', 'Odisha', 'ST')
       ON CONFLICT (email) DO NOTHING
       RETURNING id, name, email, role`,
      [passwordHash]
    );
    console.log('Users seeded:', usersResult.rows);

    // ---- Schemes ----
    const scheme1 = await client.query(
      `INSERT INTO schemes (name, description, department, required_docs, eligibility)
       VALUES (
         'Post-Matric Scholarship for ST Students',
         'Financial assistance for ST students pursuing post-matriculation studies.',
         'Ministry of Tribal Affairs',
         $1, $2
       ) RETURNING *`,
      [
        JSON.stringify(['caste_certificate', 'income_certificate', 'marksheet', 'bank_passbook']),
        JSON.stringify({ category: 'ST', income_limit: 250000, min_percentage: 50, education_level: ['Class 11', 'Class 12', 'UG', 'PG'] }),
      ]
    );

    const scheme2 = await client.query(
      `INSERT INTO schemes (name, description, department, required_docs, eligibility)
       VALUES (
         'National Fellowship for ST Students (PhD)',
         'Fellowship support for ST students pursuing M.Phil/PhD.',
         'Ministry of Tribal Affairs',
         $1, $2
       ) RETURNING *`,
      [
        JSON.stringify(['caste_certificate', 'income_certificate', 'admission_letter', 'marksheet']),
        JSON.stringify({ category: 'ST', income_limit: 600000, min_percentage: 55, education_level: ['PG'], min_age: 20, max_age: 35 }),
      ]
    );

    const scheme3 = await client.query(
      `INSERT INTO schemes (name, description, department, required_docs, eligibility)
       VALUES (
         'Top Class Education Scheme for ST Students (State Restricted Pilot)',
         'Merit-based support for ST students in select states studying at top institutions.',
         'Ministry of Tribal Affairs',
         $1, $2
       ) RETURNING *`,
      [
        JSON.stringify(['caste_certificate', 'income_certificate', 'marksheet', 'admission_letter']),
        JSON.stringify({ category: 'ST', income_limit: 800000, min_percentage: 60, education_level: ['UG', 'PG'], states: ['Odisha', 'Madhya Pradesh', 'Chhattisgarh', 'Jharkhand'] }),
      ]
    );

    console.log('Schemes seeded:', [scheme1.rows[0].id, scheme2.rows[0].id, scheme3.rows[0].id]);

    // ---- Optional granular scheme_rules (extra example beyond the JSONB eligibility) ----
    await client.query(
      `INSERT INTO scheme_rules (scheme_id, rule_type, operator, value, message)
       VALUES ($1, 'percentage', '>=', $2, 'Minimum 50% marks required in previous qualifying exam')`,
      [scheme1.rows[0].id, JSON.stringify(50)]
    );

    console.log('Seed complete.');
    console.log('\nDemo credentials (development only):');
    console.log('  Admin:   admin@sih.test / Password123');
    console.log('  Officer: officer@sih.test / Password123');
    console.log('  Student: student@sih.test / Password123');
  } catch (err) {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
