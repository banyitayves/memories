'use client';

import React, { useState } from 'react';
import ResourceSearch from './components/ResourceManagement/ResourceSearch';
import MyAccount from './components/ResourceManagement/MyAccount';
import BookHoldsAndPickup from './components/ResourceManagement/BookHoldsAndPickup';
import StudyRoomBooking from './components/SpaceCoordination/StudyRoomBooking';
import OccupancyTracker from './components/SpaceCoordination/OccupancyTracker';
import EquipmentReservations from './components/SpaceCoordination/EquipmentReservations';
import ResearchGuides from './components/LearningSupport/ResearchGuides';
import LibrarianChat from './components/LearningSupport/LibrarianChat';
import CitationGenerator from './components/LearningSupport/CitationGenerator';
import VirtualBookshelf from './components/SocialFeatures/VirtualBookshelf';
import DiscussionBoards from './components/SocialFeatures/DiscussionBoards';
import InteractiveLibraryMap from './components/SocialFeatures/InteractiveLibraryMap';

type FeatureTab = 'dashboard' | 'search' | 'account' | 'holds' | 'study-rooms' | 'occupancy' | 'equipment' | 'guides' | 'chat' | 'citations' | 'bookshelf' | 'forums' | 'map';

interface NavButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition ${
      active
        ? 'bg-indigo-600 text-white'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {label}
  </button>
);

export default function LibraryDashboard() {
  const [activeTab, setActiveTab] = useState<FeatureTab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'search': return <ResourceSearch />;
      case 'account': return <MyAccount />;
      case 'holds': return <BookHoldsAndPickup />;
      case 'study-rooms': return <StudyRoomBooking />;
      case 'occupancy': return <OccupancyTracker />;
      case 'equipment': return <EquipmentReservations />;
      case 'guides': return <ResearchGuides />;
      case 'chat': return <LibrarianChat />;
      case 'citations': return <CitationGenerator />;
      case 'bookshelf': return <VirtualBookshelf />;
      case 'forums': return <DiscussionBoards />;
      case 'map': return <InteractiveLibraryMap />;
      default: return (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Welcome to GS Busanza Library! 📚</h2>
            <p className="text-lg opacity-90">Your all-in-one platform for managing library resources, booking study spaces, and connecting with fellow students.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md"><div className="text-3xl mb-2">📖</div><p className="text-gray-600 text-sm">Resources</p><p className="text-2xl font-bold text-indigo-600">50,000+</p></div>
            <div className="bg-white p-6 rounded-lg shadow-md"><div className="text-3xl mb-2">🏢</div><p className="text-gray-600 text-sm">Study Spaces</p><p className="text-2xl font-bold text-indigo-600">25+</p></div>
            <div className="bg-white p-6 rounded-lg shadow-md"><div className="text-3xl mb-2">🔌</div><p className="text-gray-600 text-sm">Equipment Items</p><p className="text-2xl font-bold text-indigo-600">100+</p></div>
            <div className="bg-white p-6 rounded-lg shadow-md"><div className="text-3xl mb-2">👥</div><p className="text-gray-600 text-sm">Active Students</p><p className="text-2xl font-bold text-indigo-600">5,000+</p></div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
            <h3 className="font-bold text-lg text-blue-900 mb-3">🚀 Getting Started</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>✓ Use <strong>Search</strong> to find books, e-books, and journals</li>
              <li>✓ Click <strong>My Account</strong> to view loans and reading history</li>
              <li>✓ Visit <strong>Study Rooms</strong> to book private or group spaces</li>
              <li>✓ Check <strong>Occupancy</strong> to find quiet areas</li>
              <li>✓ Browse <strong>Research Guides</strong> for subject-specific resources</li>
              <li>✓ Use <strong>Citations</strong> for APA, MLA, and Chicago formats</li>
              <li>✓ Check <strong>New Books</strong> to see trending titles</li>
              <li>✓ Join <strong>Forums</strong> to form study groups</li>
              <li>✓ Use <strong>Library Map</strong> to locate materials</li>
              <li>✓ Ask a <strong>Librarian</strong> using the chat button</li>
            </ul>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">📚</span>
              <h1 className="text-2xl font-bold text-indigo-600">GS Busanza Library</h1>
            </div>
            <div className="text-sm text-gray-600">Welcome, Student!</div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-1 flex-wrap">
              <NavButton label="🏠 Home" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
              <div className="border-l border-gray-200 pl-2 ml-2 flex gap-1">
                <NavButton label="🔍 Search" active={activeTab === 'search'} onClick={() => setActiveTab('search')} />
                <NavButton label="👤 My Account" active={activeTab === 'account'} onClick={() => setActiveTab('account')} />
                <NavButton label="📦 Holds" active={activeTab === 'holds'} onClick={() => setActiveTab('holds')} />
              </div>
              <div className="border-l border-gray-200 pl-2 ml-2 flex gap-1">
                <NavButton label="📖 Study Rooms" active={activeTab === 'study-rooms'} onClick={() => setActiveTab('study-rooms')} />
                <NavButton label="🏢 Occupancy" active={activeTab === 'occupancy'} onClick={() => setActiveTab('occupancy')} />
                <NavButton label="🔌 Equipment" active={activeTab === 'equipment'} onClick={() => setActiveTab('equipment')} />
              </div>
              <div className="border-l border-gray-200 pl-2 ml-2 flex gap-1">
                <NavButton label="🎓 Guides" active={activeTab === 'guides'} onClick={() => setActiveTab('guides')} />
                <NavButton label="💬 Chat" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
                <NavButton label="📚 Citations" active={activeTab === 'citations'} onClick={() => setActiveTab('citations')} />
              </div>
              <div className="border-l border-gray-200 pl-2 ml-2 flex gap-1">
                <NavButton label="✨ Books" active={activeTab === 'bookshelf'} onClick={() => setActiveTab('bookshelf')} />
                <NavButton label="💬 Forums" active={activeTab === 'forums'} onClick={() => setActiveTab('forums')} />
                <NavButton label="🗺️ Map" active={activeTab === 'map'} onClick={() => setActiveTab('map')} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
