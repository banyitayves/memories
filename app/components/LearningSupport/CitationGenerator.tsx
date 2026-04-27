'use client';

import React, { useState } from 'react';

type CitationStyle = 'APA' | 'MLA' | 'Chicago';

interface Citation {
  title: string;
  author: string;
  year: number;
  url?: string;
  publisher?: string;
}

export default function CitationGenerator() {
  const [citationType, setCitationType] = useState<CitationStyle>('APA');
  const [citation, setCitation] = useState<Citation>({
    title: '',
    author: '',
    year: new Date().getFullYear(),
  });
  const [generatedCitation, setGeneratedCitation] = useState('');

  const generateCitation = () => {
    let formatted = '';

    switch (citationType) {
      case 'APA':
        formatted = `${citation.author} (${citation.year}). ${citation.title}. ${
          citation.publisher ? citation.publisher + '.' : ''
        } ${citation.url ? `Retrieved from ${citation.url}` : ''}`;
        break;

      case 'MLA':
        formatted = `${citation.author}. "${citation.title}." ${citation.year}. ${
          citation.url ? `Web. ${citation.url}` : ''
        }`;
        break;

      case 'Chicago':
        formatted = `${citation.author}. ${citation.title}. ${
          citation.publisher ? citation.publisher + ', ' : ''
        }${citation.year}. ${citation.url ? `${citation.url}` : ''}`;
        break;
    }

    setGeneratedCitation(formatted);
  };

  const copyCitation = () => {
    navigator.clipboard.writeText(generatedCitation);
    alert('Citation copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🔗 Citation Generator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Citation Form */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h3 className="font-bold text-lg">Citation Style</h3>

          <div className="flex gap-3">
            {(['APA', 'MLA', 'Chicago'] as CitationStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => setCitationType(style)}
                className={`px-4 py-2 rounded font-bold transition ${
                  citationType === style
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Author</label>
            <input
              type="text"
              value={citation.author}
              onChange={(e) => setCitation({ ...citation, author: e.target.value })}
              placeholder="e.g., John Smith"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              value={citation.title}
              onChange={(e) => setCitation({ ...citation, title: e.target.value })}
              placeholder="Title of work"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Year</label>
            <input
              type="number"
              value={citation.year}
              onChange={(e) => setCitation({ ...citation, year: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Publisher (Optional)</label>
            <input
              type="text"
              value={citation.publisher || ''}
              onChange={(e) => setCitation({ ...citation, publisher: e.target.value })}
              placeholder="Publisher name"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">URL (Optional)</label>
            <input
              type="url"
              value={citation.url || ''}
              onChange={(e) => setCitation({ ...citation, url: e.target.value })}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <button
            onClick={generateCitation}
            className="w-full py-3 bg-indigo-600 text-white rounded font-bold hover:bg-indigo-700 transition"
          >
            Generate Citation
          </button>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 rounded-lg shadow-md p-6 space-y-4">
          <h3 className="font-bold text-lg">Generated Citation</h3>

          {generatedCitation ? (
            <>
              <div className="bg-white p-4 rounded border-l-4 border-indigo-600 min-h-24">
                <p className="text-sm leading-relaxed">{generatedCitation}</p>
              </div>
              <button
                onClick={copyCitation}
                className="w-full py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition"
              >
                📋 Copy to Clipboard
              </button>
            </>
          ) : (
            <div className="bg-white p-4 rounded text-center text-gray-600">
              Fill in the form and generate a citation
            </div>
          )}

          {/* Quick Tips */}
          <div className="bg-blue-50 p-4 rounded">
            <h4 className="font-bold text-blue-900 mb-2">💡 Citation Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Always cite your sources</li>
              <li>• Use consistent formatting</li>
              <li>• Include page numbers for quotes</li>
              <li>• Check with your instructor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
