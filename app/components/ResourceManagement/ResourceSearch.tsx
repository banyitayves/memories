'use client';

import React, { useState } from 'react';

interface SearchResult {
  id: number;
  title: string;
  author: string;
  type: 'book' | 'ebook' | 'journal';
  available: boolean;
  location?: string;
}

export default function ResourceSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/resources/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books, e-books, journals, authors..."
            className="w-full px-6 py-4 text-lg border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-600 shadow-md"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            🔍 Search
          </button>
        </div>
      </form>

      {/* Results */}
      {loading ? (
        <div className="text-center py-8">Searching...</div>
      ) : results.length === 0 && query ? (
        <div className="text-center py-8 text-gray-600">No results found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-white p-4 rounded-lg border-l-4 border-indigo-600 shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">{result.title}</h4>
                  <p className="text-gray-600">{result.author}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-gray-200 text-sm rounded">
                    {result.type.toUpperCase()}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm font-bold ${
                    result.available ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}
                >
                  {result.available ? '✓ Available' : '✗ Unavailable'}
                </span>
              </div>
              {result.location && (
                <p className="text-sm text-gray-500 mt-2">📍 {result.location}</p>
              )}
              <button className="mt-3 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                {result.available ? 'Borrow' : 'Place Hold'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
