'use client';

import React, { useState, useEffect } from 'react';

interface Equipment {
  id: number;
  name: string;
  category: string;
  quantity: number;
  available: number;
  description: string;
}

interface EquipmentRental {
  id: number;
  equipmentId: number;
  equipmentName: string;
  dueDate: string;
  status: 'active' | 'returned';
}

export default function EquipmentReservations() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [rentals, setRentals] = useState<EquipmentRental[]>([]);
  const [activeTab, setActiveTab] = useState<'available' | 'myRentals'>('available');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEquipment();
    fetchRentals();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await fetch('/api/spaces/equipment');
      const data = await response.json();
      setEquipment(data.equipment || []);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRentals = async () => {
    try {
      const response = await fetch('/api/spaces/rentals');
      const data = await response.json();
      setRentals(data.rentals || []);
    } catch (error) {
      console.error('Error fetching rentals:', error);
    }
  };

  const rentEquipment = async (equipmentId: number) => {
    try {
      const response = await fetch('/api/spaces/rentals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equipmentId }),
      });
      if (response.ok) {
        alert('✓ Equipment rented successfully!');
        fetchEquipment();
        fetchRentals();
      }
    } catch (error) {
      console.error('Error renting equipment:', error);
    }
  };

  const returnEquipment = async (rentalId: number) => {
    try {
      const response = await fetch(`/api/spaces/rentals/${rentalId}/return`, {
        method: 'POST',
      });
      if (response.ok) {
        alert('✓ Equipment returned!');
        fetchEquipment();
        fetchRentals();
      }
    } catch (error) {
      console.error('Error returning equipment:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🔌 Equipment Reservations</h2>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 font-bold transition ${
            activeTab === 'available'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-indigo-600'
          }`}
        >
          Available Equipment
        </button>
        <button
          onClick={() => setActiveTab('myRentals')}
          className={`px-4 py-2 font-bold transition ${
            activeTab === 'myRentals'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-600 hover:text-indigo-600'
          }`}
        >
          My Rentals ({rentals.length})
        </button>
      </div>

      {/* Equipment Catalog */}
      {activeTab === 'available' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipment.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-indigo-600">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm font-bold ${
                    item.available > 0
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {item.available}/{item.quantity}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              <button
                onClick={() => rentEquipment(item.id)}
                disabled={item.available === 0}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400 transition"
              >
                {item.available > 0 ? 'Rent Now' : 'No Available Units'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* My Rentals */}
      {activeTab === 'myRentals' && (
        <div className="space-y-4">
          {rentals.length === 0 ? (
            <p className="text-gray-600">No active rentals</p>
          ) : (
            rentals.map((rental) => (
              <div key={rental.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-600">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{rental.equipmentName}</h4>
                    <p className="text-sm text-gray-600">
                      Due: {new Date(rental.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => returnEquipment(rental.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Return
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
