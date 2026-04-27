'use client';

import React, { useState } from 'react';

interface MapSection {
  floor: number;
  area: string;
  sections: { name: string; callNumbers: string; icon: string }[];
}

export default function InteractiveLibraryMap() {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [mapData] = useState<MapSection[]>([
    {
      floor: 1,
      area: 'Ground Floor - Reference & Circulation',
      sections: [
        { name: 'Information Desk', callNumbers: 'N/A', icon: '🏪' },
        { name: 'Reference Books', callNumbers: 'A-BZ', icon: '📖' },
        { name: 'Circulation Desk', callNumbers: 'N/A', icon: '🏪' },
        { name: 'Study Lounge', callNumbers: 'N/A', icon: '🪑' },
      ],
    },
    {
      floor: 2,
      area: 'Second Floor - Fiction & General',
      sections: [
        { name: 'Fiction (A-Z)', callNumbers: 'FIC A-Z', icon: '📚' },
        { name: 'General Science', callNumbers: '500-599', icon: '🔬' },
        { name: 'Self-Help', callNumbers: '150-199', icon: '💪' },
        { name: 'Biography', callNumbers: '920-929', icon: '👤' },
      ],
    },
    {
      floor: 3,
      area: 'Third Floor - Academic & Reference',
      sections: [
        { name: 'Business', callNumbers: '330-339', icon: '💼' },
        { name: 'Technology', callNumbers: '000-099', icon: '💻' },
        { name: 'History', callNumbers: '900-999', icon: '📜' },
        { name: 'Group Study Rooms', callNumbers: 'N/A', icon: '👥' },
      ],
    },
  ]);

  const currentFloor = mapData.find((m) => m.floor === selectedFloor);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🗺️ Interactive Library Map</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Floor Selector */}
        <div className="md:col-span-1 space-y-3">
          <h3 className="font-bold">Select Floor</h3>
          {mapData.map((map) => (
            <button
              key={map.floor}
              onClick={() => setSelectedFloor(map.floor)}
              className={`w-full px-4 py-3 rounded-lg transition font-bold ${
                selectedFloor === map.floor
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Floor {map.floor}
            </button>
          ))}
        </div>

        {/* Map Display */}
        {currentFloor && (
          <div className="md:col-span-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-8">
            {/* Floor Title */}
            <h3 className="text-2xl font-bold mb-2">{currentFloor.area}</h3>

            {/* Visual Map Grid */}
            <div className="bg-white rounded-lg p-6 mb-6 border-2 border-indigo-600">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {currentFloor.sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-lg border-2 border-indigo-400 hover:shadow-lg transition cursor-pointer"
                  >
                    <div className="text-4xl mb-2">{section.icon}</div>
                    <h4 className="font-bold text-lg mb-1">{section.name}</h4>
                    <p className="text-sm text-gray-600">
                      {section.callNumbers !== 'N/A' ? (
                        <>
                          Call #: <span className="font-mono font-bold">{section.callNumbers}</span>
                        </>
                      ) : (
                        'Special Area'
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
              <h4 className="font-bold mb-2">💡 Library Classification System</h4>
              <div className="text-sm space-y-1 text-gray-700">
                <p>• Call numbers help you locate books on shelves</p>
                <p>• Books are organized by subject matter (Dewey Decimal System)</p>
                <p>• Ask librarians at the Information Desk for help</p>
                <p>• Use our search to find call numbers for specific books</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
        <h3 className="font-bold mb-2">🎯 Navigation Tips</h3>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>✓ Use the search function to find call numbers</li>
          <li>✓ Note the call number before exploring</li>
          <li>✓ Check the floor color-coded signs</li>
          <li>✓ Ask staff if you cannot locate materials</li>
        </ul>
      </div>
    </div>
  );
}
