'use client';

import React, { useState, useEffect } from 'react';

interface Room {
  id: number;
  name: string;
  capacity: number;
  amenities: string[];
  availability: { date: string; slots: { time: string; available: boolean }[] }[];
  image?: string;
}

export default function StudyRoomBooking() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('/api/spaces/rooms');
      const data = await response.json();
      setRooms(data.rooms || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const bookRoom = async () => {
    if (!selectedRoom || !selectedDate || !selectedTime) {
      alert('Please select a room, date, and time');
      return;
    }

    try {
      const response = await fetch('/api/spaces/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: selectedRoom.id,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      if (response.ok) {
        alert('✓ Room booked successfully!');
        setSelectedRoom(null);
        setSelectedDate('');
        setSelectedTime('');
        fetchRooms();
      }
    } catch (error) {
      console.error('Error booking room:', error);
    }
  };

  if (loading) return <div>Loading rooms...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">📖 Interactive Study Room Booking</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Room Selection */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid gap-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  selectedRoom?.id === room.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-300 hover:border-indigo-400'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">{room.name}</h4>
                    <p className="text-sm text-gray-600">Capacity: {room.capacity} people</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {room.amenities.map((amenity, idx) => (
                        <span key={idx} className="bg-gray-200 text-xs px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRoom(room);
                    }}
                    className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Panel */}
        {selectedRoom && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-bold mb-4">Booking Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {selectedDate && (
                <div>
                  <label className="block text-sm font-bold mb-2">Select Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">-- Choose Time --</option>
                    {selectedRoom.availability
                      .find((a) => a.date === selectedDate)
                      ?.slots.filter((s) => s.available)
                      .map((slot, idx) => (
                        <option key={idx} value={slot.time}>
                          {slot.time}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <button
                onClick={bookRoom}
                disabled={!selectedDate || !selectedTime}
                className="w-full py-3 bg-green-600 text-white rounded font-bold hover:bg-green-700 disabled:bg-gray-400 transition"
              >
                ✓ Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
