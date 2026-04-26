import { NextResponse } from 'next/server';

export async function GET() {
  const rooms = [
    {
      id: 1,
      name: 'Quiet Study Room A',
      capacity: 2,
      amenities: ['WiFi', 'Whiteboard', 'Desk'],
      availability: [
        {
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          slots: [
            { time: '09:00-10:00', available: true },
            { time: '10:00-11:00', available: false },
            { time: '14:00-15:00', available: true },
            { time: '15:00-16:00', available: true },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Group Study Room B',
      capacity: 6,
      amenities: ['WiFi', 'Projector', 'Whiteboard', 'Conference Table'],
      availability: [
        {
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          slots: [
            { time: '09:00-10:00', available: true },
            { time: '11:00-12:00', available: true },
            { time: '14:00-15:00', available: false },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Collaborative Room C',
      capacity: 4,
      amenities: ['WiFi', 'Monitor', 'Whiteboard'],
      availability: [
        {
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          slots: [
            { time: '10:00-11:00', available: true },
            { time: '13:00-14:00', available: true },
            { time: '15:00-16:00', available: true },
          ],
        },
      ],
    },
  ];

  return NextResponse.json({ rooms });
}
