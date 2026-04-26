import { NextResponse } from 'next/server';

export async function GET() {
  const floors = [
    {
      floor: 1,
      occupancyLevel: 25,
      quietSpots: 12,
      crowdedAreas: 2,
      lastUpdated: new Date().toISOString(),
    },
    {
      floor: 2,
      occupancyLevel: 65,
      quietSpots: 4,
      crowdedAreas: 8,
      lastUpdated: new Date().toISOString(),
    },
    {
      floor: 3,
      occupancyLevel: 45,
      quietSpots: 7,
      crowdedAreas: 5,
      lastUpdated: new Date().toISOString(),
    },
  ];

  return NextResponse.json({ floors });
}
