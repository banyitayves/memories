'use client';

import React, { useState, useEffect } from 'react';

interface Thread {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
}

interface Post {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

export default function DiscussionBoards() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const response = await fetch('/api/social/threads');
      const data = await response.json();
      setThreads(data.threads || []);
    } catch (error) {
      console.error('Error fetching threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchThreadPosts = async (threadId: number) => {
    try {
      const response = await fetch(`/api/social/threads/${threadId}/posts`);
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleThreadSelect = (thread: Thread) => {
    setSelectedThread(thread);
    fetchThreadPosts(thread.id);
  };

  const submitPost = async () => {
    if (!newPost.trim() || !selectedThread) return;

    try {
      const response = await fetch(`/api/social/threads/${selectedThread.id}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPost }),
      });

      if (response.ok) {
        setNewPost('');
        fetchThreadPosts(selectedThread.id);
      }
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  if (loading) return <div>Loading discussions...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">💬 Student Discussion Boards</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Thread List */}
        <div className="md:col-span-1 space-y-2">
          <h3 className="font-bold mb-4">Recent Discussions</h3>
          {threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => handleThreadSelect(thread)}
              className={`w-full text-left p-3 rounded-lg transition ${
                selectedThread?.id === thread.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <h4 className="font-bold text-sm line-clamp-2">{thread.title}</h4>
              <div className="text-xs mt-1 opacity-75 space-y-1">
                <p>By {thread.author}</p>
                <p>{thread.replies} replies • {thread.views} views</p>
              </div>
            </button>
          ))}
        </div>

        {/* Thread Details */}
        <div className="md:col-span-2">
          {selectedThread ? (
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              {/* Thread Info */}
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedThread.title}</h3>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>👤 {selectedThread.author}</span>
                  <span>💬 {selectedThread.replies} replies</span>
                  <span>👁️ {selectedThread.views} views</span>
                </div>
              </div>

              {/* Posts */}
              <div className="space-y-4 max-h-96 overflow-y-auto border-t pt-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-gray-50 p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold">{post.author}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(post.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-gray-800 mb-2">{post.content}</p>
                    <button className="text-sm text-indigo-600 hover:text-indigo-700">
                      👍 {post.likes}
                    </button>
                  </div>
                ))}
              </div>

              {/* New Post */}
              <div className="border-t pt-4 space-y-3">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  rows={3}
                />
                <button
                  onClick={submitPost}
                  disabled={!newPost.trim()}
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
                >
                  Post Reply
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-600">
              Select a discussion thread to view and reply
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
