import { NextResponse } from 'next/server';

export async function GET() {
  const equipment = [
    {
      id: 1,
      name: 'Laptop',
      category: 'Electronics',
      quantity: 10,
      available: 7,
      description: 'MacBook Pro with Office Suite',
    },
    {
      id: 2,
      name: 'Phone Charger',
      category: 'Accessories',
      quantity: 20,
      available: 18,
      description: 'USB-C and Lightning cables available',
    },
    {
      id: 3,
      name: 'Professional Camera',
      category: 'Photography',
      quantity: 3,
      available: 1,
      description: 'Canon EOS with lenses',
    },
    {
      id: 4,
      name: 'Projector',
      category: 'AV Equipment',
      quantity: 5,
      available: 3,
      description: '4K presentation projector',
    },
  ];

  return NextResponse.json({ equipment });
}
