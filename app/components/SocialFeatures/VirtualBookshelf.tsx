'use client';

import React, { useState, useEffect } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  cover?: string;
  tags: string[];
  arrivalDate: string;
  trending: boolean;
}

export default function VirtualBookshelf() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filterTrending, setFilterTrending] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/social/bookshelf');
      const data = await response.json();
      setBooks(data.books || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = filterTrending ? books.filter((b) => b.trending) : books;

  if (loading) return <div>Loading bookshelf...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📚 What's New Virtual Bookshelf</h2>
        <button
          onClick={() => setFilterTrending(!filterTrending)}
          className={`px-4 py-2 rounded font-bold transition ${
            filterTrending
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          🔥 Trending Only
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer overflow-hidden group"
          >
            {/* Book Cover Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-4xl relative overflow-hidden">
              📖
              {book.trending && (
                <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                  🔥
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-3 space-y-2 hidden group-hover:block">
              <h4 className="font-bold text-sm line-clamp-2">{book.title}</h4>
              <p className="text-xs text-gray-600">{book.author}</p>
              <div className="flex gap-1 flex-wrap">
                {book.tags.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="bg-gray-100 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                📅 {new Date(book.arrivalDate).toLocaleDateString()}
              </p>
              <button className="w-full py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          No books found in this category
        </div>
      )}
    </div>
  );
}
