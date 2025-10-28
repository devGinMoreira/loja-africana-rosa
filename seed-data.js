const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with sample data...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!@', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@loja-africana.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      cart: {
        create: {},
      },
    },
  });
  console.log('✓ Created admin user:', admin.email);

  // Create sample customer
  const customerPassword = await bcrypt.hash('Customer123!@', 10);
  const customer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      role: 'CUSTOMER',
      cart: {
        create: {},
      },
      addresses: {
        create: {
          street: '123 Main Street',
          city: 'Lisbon',
          state: 'Lisboa',
          zipCode: '1000-001',
          country: 'Portugal',
          isDefault: true,
        },
      },
    },
  });
  console.log('✓ Created customer user:', customer.email);

  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'African Shea Butter',
        slug: 'african-shea-butter',
        description: 'Pure, organic shea butter from West Africa. Rich in vitamins and perfect for skin care.',
        price: 24.99,
        originalPrice: 34.99,
        category: 'Beauty & Care',
        image: 'https://via.placeholder.com/300x300?text=Shea+Butter',
        images: JSON.stringify(['https://via.placeholder.com/300x300?text=Shea+Butter+1']),
        stock: 50,
        sku: 'SKU-SHEA-001',
        isFeatured: true,
        isTopSeller: true,
        promoPercentage: 25,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Traditional Kente Cloth',
        slug: 'traditional-kente-cloth',
        description: 'Authentic Ghanaian Kente cloth with traditional patterns. Perfect for home decor or clothing.',
        price: 45.00,
        category: 'Textiles',
        image: 'https://via.placeholder.com/300x300?text=Kente+Cloth',
        stock: 30,
        sku: 'SKU-KENTE-001',
        isFeatured: true,
        rating: 4.5,
        reviewCount: 8,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Ethiopian Coffee Beans',
        slug: 'ethiopian-coffee-beans',
        description: 'Premium Ethiopian Yirgacheffe coffee beans. Single origin, freshly roasted.',
        price: 18.50,
        category: 'Food & Beverages',
        image: 'https://via.placeholder.com/300x300?text=Coffee+Beans',
        stock: 100,
        sku: 'SKU-COFFEE-001',
        isTopSeller: true,
        rating: 4.8,
        reviewCount: 25,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Beaded Necklace',
        slug: 'beaded-necklace',
        description: 'Handmade beaded necklace with traditional African designs. Each piece is unique.',
        price: 32.00,
        category: 'Jewelry',
        image: 'https://via.placeholder.com/300x300?text=Beaded+Necklace',
        stock: 25,
        sku: 'SKU-NECK-001',
        isFeatured: true,
        rating: 4.7,
        reviewCount: 12,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Wooden Mask',
        slug: 'wooden-mask',
        description: 'Traditional carved wooden mask from West Africa. Perfect for collectors and home decor.',
        price: 55.00,
        originalPrice: 75.00,
        category: 'Art & Crafts',
        image: 'https://via.placeholder.com/300x300?text=Wooden+Mask',
        stock: 15,
        sku: 'SKU-MASK-001',
        promoPercentage: 26,
        rating: 4.6,
        reviewCount: 9,
      },
    }),
  ]);
  console.log('✓ Created 5 sample products');

  // Create promotions
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 30);

  await prisma.promotion.create({
    data: {
      code: 'WELCOME20',
      description: '20% off for new customers',
      discountType: 'percentage',
      discountValue: 20,
      minOrderValue: 50,
      maxUsage: 100,
      startDate: new Date(),
      endDate: futureDate,
      isActive: true,
    },
  });

  await prisma.promotion.create({
    data: {
      code: 'FLAT10',
      description: 'Flat $10 off orders over $100',
      discountType: 'fixed',
      discountValue: 10,
      minOrderValue: 100,
      maxUsage: 50,
      startDate: new Date(),
      endDate: futureDate,
      isActive: true,
    },
  });
  console.log('✓ Created 2 sample promotions');

  // Create sample reviews
  await prisma.review.create({
    data: {
      productId: products[0].id,
      rating: 5,
      comment: 'Excellent quality! Very satisfied with this purchase.',
    },
  });

  await prisma.review.create({
    data: {
      productId: products[2].id,
      rating: 5,
      comment: 'Best Ethiopian coffee I have ever tasted!',
    },
  });
  console.log('✓ Created 2 sample reviews');

  console.log('\n✅ Database seeded successfully!');
  console.log('\nTest Credentials:');
  console.log('Admin: admin@loja-africana.com / Admin123!@');
  console.log('Customer: customer@example.com / Customer123!@');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
