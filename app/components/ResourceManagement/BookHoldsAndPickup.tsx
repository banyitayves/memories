'use client';

import React, { useState, useEffect } from 'react';

interface BookHold {
  id: number;
  title: string;
  author: string;
  position: number;
  estimatedReady: string;
}

interface Notification {
  id: number;
  bookId: number;
  title: string;
  message: string;
  readyDate: string;
  shelf: string;
}

export default function BookHoldsAndPickup() {
  const [holds, setHolds] = useState<BookHold[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHoldsAndNotifications();
  }, []);

  const fetchHoldsAndNotifications = async () => {
    try {
      const [holdsRes, notificationsRes] = await Promise.all([
        fetch('/api/resources/holds'),
        fetch('/api/resources/notifications'),
      ]);

      const holdsData = await holdsRes.json();
      const notificationsData = await notificationsRes.json();

      setHolds(holdsData.holds || []);
      setNotifications(notificationsData.notifications || []);
    } catch (error) {
      console.error('Error fetching holds:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelHold = async (holdId: number) => {
    try {
      const response = await fetch(`/api/resources/holds/${holdId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setHolds(holds.filter((h) => h.id !== holdId));
      }
    } catch (error) {
      console.error('Error canceling hold:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Ready for Pickup Notifications */}
      {notifications.length > 0 && (
        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            📦 Books Ready for Pickup ({notifications.length})
          </h3>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className="bg-white p-4 rounded border-l-4 border-green-600">
                <h4 className="font-bold">{notif.title}</h4>
                <p className="text-sm text-gray-600 mt-1">📍 Pickup Location: {notif.shelf}</p>
                <p className="text-sm text-gray-600">Ready Since: {new Date(notif.readyDate).toLocaleDateString()}</p>
                <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  ✓ Collected
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Holds */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">⏳ Active Holds ({holds.length})</h3>
        {holds.length === 0 ? (
          <p className="text-gray-600">No active holds</p>
        ) : (
          <div className="space-y-4">
            {holds.map((hold) => (
              <div key={hold.id} className="bg-gray-50 p-4 rounded border-l-4 border-indigo-600">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{hold.title}</h4>
                    <p className="text-sm text-gray-600">{hold.author}</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>Queue Position: #{hold.position}</p>
                      <p>Estimated Ready: {new Date(hold.estimatedReady).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => cancelHold(hold.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
