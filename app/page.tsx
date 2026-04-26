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

type FeatureTab = 
  | 'dashboard' 
  | 'search' 
  | 'account' 
  | 'holds'
  | 'study-rooms'
  | 'occupancy'
  | 'equipment'
  | 'guides'
  | 'citations'
  | 'bookshelf'
  | 'forums'
  | 'map';

export default function LibraryDashboard() {
  const [activeTab, setActiveTab] = useState<FeatureTab>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <h1 className="text-2xl font-bold text-indigo-600">EduHub</h1>
          </div>
          <ul className="flex gap-6">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`font-medium transition ${
                  activeTab === 'dashboard'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('courses')}
                className={`font-medium transition ${
                  activeTab === 'courses'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Courses
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('notes')}
                className={`font-medium transition ${
                  activeTab === 'notes'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Notes
  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return <ResourceSearch />;
      case 'account':
        return <MyAccount />;
      case 'holds':
        return <BookHoldsAndPickup />;
      case 'study-rooms':
        return <StudyRoomBooking />;
      case 'occupancy':
        return <OccupancyTracker />;
      case 'equipment':
        return <EquipmentReservations />;
      case 'guides':
        return <ResearchGuides />;
      case 'citations':
        return <CitationGenerator />;
      case 'bookshelf':
        return <VirtualBookshelf />;
      case 'forums':
        return <DiscussionBoards />;
      case 'map':
        return <InteractiveLibraryMap />;
      case 'dashboard':
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">📚</span>
              <h1 className="text-2xl font-bold text-indigo-600">GS Busanza Library</h1>
            </div>
            <div className="text-sm text-gray-600">Welcome, Student!</div>
          </div>

          {/* Main Navigation Tabs */}
          <div className="overflow-x-auto">
            <div className="flex gap-1 whitespace-nowrap">
              <NavButton label="🏠 Home" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
              
              {/* Resource Management */}
              <div className="border-l border-gray-200 pl-2 ml-2">
                <NavButton label="🔍 Search" active={activeTab === 'search'} onClick={() => setActiveTab('search')} />
                <NavButton label="👤 My Account" active={activeTab === 'account'} onClick={() => setActiveTab('account')} />
                <NavButton label="📦 Holds & Pickup" active={activeTab === 'holds'} onClick={() => setActiveTab('holds')} />
              </div>

              {/* Space Coordination */}
              <div className="border-l border-gray-200 pl-2 ml-2">
                <NavButton label="📖 Study Rooms" active={activeTab === 'study-rooms'} onClick={() => setActiveTab('study-rooms')} />
                <NavButton label="🏢 Occupancy" active={activeTab === 'occupancy'} onClick={() => setActiveTab('occupancy')} />
                <NavButton label="🔌 Equipment" active={activeTab === 'equipment'} onClick={() => setActiveTab('equipment')} />
              </div>

              {/* Learning Support */}
              <div className="border-l border-gray-200 pl-2 ml-2">
                <NavButton label="🎓 Research Guides" active={activeTab === 'guides'} onClick={() => setActiveTab('guides')} />
                <NavButton label="📚 Citations" active={activeTab === 'citations'} onClick={() => setActiveTab('citations')} />
              </div>

              {/* Social Features */}
              <div className="border-l border-gray-200 pl-2 ml-2">
                <NavButton label="✨ New Books" active={activeTab === 'bookshelf'} onClick={() => setActiveTab('bookshelf')} />
                <NavButton label="💬 Forums" active={activeTab === 'forums'} onClick={() => setActiveTab('forums')} />
                <NavButton label="🗺️ Map" active={activeTab === 'map'} onClick={() => setActiveTab('map')} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Librarian Chat */}
      <LibrarianChat />
    </div>
  );
}

function NavButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-sm font-medium rounded transition ${
        active
          ? 'bg-indigo-600 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
}

function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Welcome to GS Busanza Library! 📚</h2>
        <p className="text-lg opacity-90">
          Your all-in-one platform for managing library resources, booking study spaces, and connecting with fellow students.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon="📖" label="Resources" value="50,000+" />
        <StatCard icon="🏢" label="Study Spaces" value="25+" />
        <StatCard icon="🔌" label="Equipment Items" value="100+" />
        <StatCard icon="👥" label="Active Students" value="5,000+" />
      </div>

      {/* Feature Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon="🔍"
          title="Search Resources"
          description="Find books, e-books, and journals all in one place"
          onClick={() => {}}
        />
        <FeatureCard
          icon="📖"
          title="Study Rooms"
          description="Book private or group study spaces instantly"
          onClick={() => {}}
        />
        <FeatureCard
          icon="🎓"
          title="Research Guides"
          description="Subject-specific resources and databases"
          onClick={() => {}}
        />
        <FeatureCard
          icon="✨"
          title="New Arrivals"
          description="Discover trending books and latest additions"
          onClick={() => {}}
        />
      </div>

      {/* Getting Started */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
        <h3 className="font-bold text-lg text-blue-900 mb-3">🚀 Getting Started</h3>
        <ul className="space-y-2 text-blue-800">
          <li>✓ Use <strong>Search</strong> to find materials by title, author, or subject</li>
          <li>✓ Click <strong>My Account</strong> to view loans, renew books, and track reading history</li>
          <li>✓ Visit <strong>Study Rooms</strong> to book your preferred space</li>
          <li>✓ Check <strong>Occupancy</strong> to find quiet areas on any floor</li>
          <li>✓ Browse <strong>Research Guides</strong> for subject-specific resources</li>
          <li>✓ Use <strong>Citation Generator</strong> for APA, MLA, and Chicago formats</li>
          <li>✓ Check <strong>New Books</strong> to see trending titles</li>
          <li>✓ Join <strong>Discussion Forums</strong> to form study groups</li>
          <li>✓ Use the interactive <strong>Library Map</strong> to locate materials</li>
          <li>✓ Ask a <strong>Librarian</strong> using the chat button (bottom right)</li>
        </ul>
      </div>

      {/* Featured Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-3">📚 Library Hours</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Monday - Friday:</strong> 8:00 AM - 10:00 PM</li>
            <li><strong>Saturday:</strong> 9:00 AM - 6:00 PM</li>
            <li><strong>Sunday:</strong> 10:00 AM - 8:00 PM</li>
            <li><strong>Holidays:</strong> Check library website</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-3">💬 Support & Resources</h3>
          <ul className="space-y-2 text-gray-700">
            <li>📧 Email: <strong>library@university.edu</strong></li>
            <li>☎️ Phone: <strong>(555) 123-4567</strong></li>
            <li>💬 Chat: Ask a Librarian (bottom right)</li>
            <li>🌐 Website: <strong>library.university.edu</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-bold text-indigo-600">{value}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description, onClick }: { icon: string; title: string; description: string; onClick: () => void }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border-t-4 border-indigo-600">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p