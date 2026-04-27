'use client';

import React, { useState, useEffect } from 'react';

interface FloorOccupancy {
  floor: number;
  occupancyLevel: number; // 0-100
  quietSpots: number;
  crowdedAreas: number;
  lastUpdated: string;
}

export default function OccupancyTracker() {
  const [floors, setFloors] = useState<FloorOccupancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOccupancy();
    // Refresh every 5 minutes
    const interval = setInterval(fetchOccupancy, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchOccupancy = async () => {
    try {
      const response = await fetch('/api/spaces/occupancy');
      const data = await response.json();
      setFloors(data.floors || []);
    } catch (error) {
      console.error('Error fetching occupancy:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOccupancyColor = (level: number) => {
    if (level < 33) return 'bg-green-100 border-green-600';
    if (level < 66) return 'bg-yellow-100 border-yellow-600';
    return 'bg-red-100 border-red-600';
  };

  const getOccupancyLabel = (level: number) => {
    if (level < 33) return '✓ Quiet';
    if (level < 66) return '⚠ Moderate';
    return '✗ Crowded';
  };

  if (loading) return <div>Loading occupancy data...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🏢 Real-time Occupancy Tracker</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {floors.map((floor) => (
          <div
            key={floor.floor}
            className={`p-6 rounded-lg border-l-4 shadow-md ${getOccupancyColor(floor.occupancyLevel)}`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Floor {floor.floor}</h3>
              <span className="text-2xl font-bold">{floor.occupancyLevel}%</span>
            </div>

            {/* Occupancy Bar */}
            <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
              <div
                className={`h-4 rounded-full transition-all ${
                  floor.occupancyLevel < 33
                    ? 'bg-green-600'
                    : floor.occupancyLevel < 66
                    ? 'bg-yellow-600'
                    : 'bg-red-600'
                }`}
                style={{ width: `${floor.occupancyLevel}%` }}
              />
            </div>

            {/* Status */}
            <p className="font-bold text-lg mb-3">{getOccupancyLabel(floor.occupancyLevel)}</p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600">Quiet Spots</p>
                <p className="font-bold text-green-700">{floor.quietSpots}</p>
              </div>
              <div>
                <p className="text-gray-600">Crowded Areas</p>
                <p className="font-bold text-red-700">{floor.crowdedAreas}</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Last updated: {new Date(floor.lastUpdated).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
