const bcrypt = require('bcryptjs');
const pool = require('../src/config/database');

const seedDatabase = async () => {
  try {
    // Hash password: username = admin, password = admin123
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const query = 'INSERT INTO users (username, password, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) ON CONFLICT (username) DO NOTHING';
    
    await pool.query(query, ['admin', hashedPassword]);
    console.log('✓ Admin user seeded successfully');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
