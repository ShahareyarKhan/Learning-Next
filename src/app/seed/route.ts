
import bcrypt from 'bcryptjs';
// Import bcrypt for password hashing
import postgres from 'postgres'; 
// Import postgres for database interaction

import { invoices, customers, revenue, users } from '../lib/placeholder-data'; // Import sample data

// Establish connection to PostgreSQL database using environment variable
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Function to seed Users table
async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`; 
  // Ensure UUID extension exists

  // Create Users table if it does not exist
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  // Insert users into the database with hashed passwords
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10); 
      // Hash password before storing
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

// Function to seed Invoices table
async function seedInvoices() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`; // Ensure UUID extension exists

  // Create Invoices table if it does not exist
  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  // Insert invoices into the database
  const insertedInvoices = await Promise.all(
    invoices.map((invoice) => sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
      ON CONFLICT (id) DO NOTHING;
    `),
  );

  return insertedInvoices;
}

// Function to seed Customers table
async function seedCustomers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`; // Ensure UUID extension exists

  // Create Customers table if it does not exist
  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  // Insert customers into the database
  const insertedCustomers = await Promise.all(
    customers.map((customer) => sql`
      INSERT INTO customers (id, name, email, image_url)
      VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
      ON CONFLICT (id) DO NOTHING;
    `),
  );

  return insertedCustomers;
}

// Function to seed Revenue table
async function seedRevenue() {
  // Create Revenue table if it does not exist
  await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  // Insert revenue data into the database
  const insertedRevenue = await Promise.all(
    revenue.map((rev) => sql`
      INSERT INTO revenue (month, revenue)
      VALUES (${rev.month}, ${rev.revenue})
      ON CONFLICT (month) DO NOTHING;
    `),
  );

  return insertedRevenue;
}

// API handler function for seeding the database
export async function GET() {
  try {
    // Execute all seeding functions inside a transaction to ensure consistency
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedCustomers(),
      seedInvoices(),
    //   seedRevenue(),
    ]);

    // Return success response if seeding completes successfully
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    // Return error response if any issue occurs
    return Response.json({ error }, { status: 500 });
  }
}
