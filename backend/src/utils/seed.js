const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample parts
  const parts = [
    {
      name: 'Engine Oil Filter',
      partNumber: 'EOF-001',
      brand: 'ACDelco',
      category: 'Engine',
      price: 12.99,
      description: 'Premium oil filter for most vehicles',
      inStock: true,
      rating: 4.5,
      reviews: 230
    },
    {
      name: 'Brake Pads Front Set',
      partNumber: 'BPF-002',
      brand: 'Brembo',
      category: 'Brakes',
      price: 89.99,
      description: 'High-performance ceramic brake pads',
      inStock: true,
      rating: 4.8,
      reviews: 450
    },
    {
      name: 'Air Filter',
      partNumber: 'AF-003',
      brand: 'K&N',
      category: 'Engine',
      price: 45.50,
      description: 'Reusable high-flow air filter',
      inStock: true,
      rating: 4.7,
      reviews: 320
    }
  ];

  for (const part of parts) {
    await prisma.part.upsert({
      where: { partNumber: part.partNumber },
      update: {},
      create: part
    });
  }

  // Create sample mechanics
  const mechanics = [
    {
      name: 'Advanced Auto Repair',
      shopName: 'Advanced Auto',
      address: '123 Main St, Indianapolis, IN',
      latitude: 39.7684,
      longitude: -86.1581,
      phone: '(317) 555-0100',
      email: 'info@advancedauto.com',
      rating: 4.8,
      reviews: 540,
      specialties: ['Engine', 'Transmission', 'Brakes'],
      certified: true
    },
    {
      name: 'Quick Fix Auto Service',
      shopName: 'Quick Fix',
      address: '456 Oak Ave, Indianapolis, IN',
      latitude: 39.7783,
      longitude: -86.1480,
      phone: '(317) 555-0200',
      rating: 4.5,
      reviews: 320,
      specialties: ['Oil Change', 'Tire Service', 'Diagnostics'],
      certified: true
    }
  ];

  for (const mechanic of mechanics) {
    await prisma.mechanic.create({ data: mechanic });
  }

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
