'use client';

import React, { useState, useEffect } from 'react';

interface ResearchGuide {
  id: number;
  subject: string;
  icon: string;
  resources: { title: string; type: string; url?: string }[];
  topDatabases: string[];
  referenceBooks: string[];
}

export default function ResearchGuides() {
  const [guides, setGuides] = useState<ResearchGuide[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<ResearchGuide | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch('/api/support/guides');
      const data = await response.json();
      setGuides(data.guides || []);
      if (data.guides && data.guides.length > 0) {
        setSelectedSubject(data.guides[0]);
      }
    } catch (error) {
      console.error('Error fetching guides:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading guides...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">📚 Subject-Specific Research Guides</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Subject Selector */}
        <div className="md:col-span-1 space-y-2">
          {guides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => setSelectedSubject(guide)}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                selectedSubject?.id === guide.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span className="text-xl mr-2">{guide.icon}</span>
              {guide.subject}
            </button>
          ))}
        </div>

        {/* Guide Content */}
        {selectedSubject && (
          <div className="md:col-span-3 bg-white rounded-lg shadow-md p-6 space-y-6">
            <h3 className="text-2xl font-bold">{selectedSubject.icon} {selectedSubject.subject}</h3>

            {/* Top Databases */}
            <div>
              <h4 className="font-bold text-lg mb-3">🔍 Top Databases</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedSubject.topDatabases.map((db, idx) => (
                  <div key={idx} className="bg-blue-50 p-3 rounded border-l-4 border-blue-600">
                    <p className="font-bold text-blue-800">{db}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reference Books */}
            <div>
              <h4 className="font-bold text-lg mb-3">📖 Essential Reference Books</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedSubject.referenceBooks.map((book, idx) => (
                  <div key={idx} className="bg-purple-50 p-3 rounded border-l-4 border-purple-600">
                    <p className="font-bold text-purple-800">{book}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-lg mb-3">🔗 Useful Resources</h4>
              <div className="space-y-2">
                {selectedSubject.resources.map((resource, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                    <span className="text-lg">📄</span>
                    <div className="flex-1">
                      <p className="font-bold">{resource.title}</p>
                      <p className="text-xs text-gray-600">{resource.type}</p>
                    </div>
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
                      >
                        View
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
