// Run: npm run seed
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/User');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const email = 'user@example.com';
  const password = 'password123';
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, password });
    await user.save();
    console.log('Seeded user:', email, 'password:', password);
  } else console.log('User already exists');
  process.exit(0);
}
run().catch(err => { console.error(err); process.exit(1); });
