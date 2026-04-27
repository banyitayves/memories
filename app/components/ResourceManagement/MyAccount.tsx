'use client';

import React, { useState, useEffect } from 'react';

interface UserAccount {
  name: string;
  studentId: string;
  email: string;
  currentLoans: number;
  fineAmount: number;
}

interface Loan {
  id: number;
  title: string;
  author: string;
  dueDate: string;
  status: 'active' | 'overdue';
}

interface ReadingHistory {
  id: number;
  title: string;
  author: string;
  finishedDate: string;
}

export default function MyAccount() {
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [history, setHistory] = useState<ReadingHistory[]>([]);
  const [activeTab, setActiveTab] = useState<'loans' | 'history'>('loans');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const [accountRes, loansRes, historyRes] = await Promise.all([
        fetch('/api/resources/account'),
        fetch('/api/resources/loans'),
        fetch('/api/resources/history'),
      ]);

      const accountData = await accountRes.json();
      const loansData = await loansRes.json();
      const historyData = await historyRes.json();

      setAccount(accountData.account);
      setLoans(loansData.loans || []);
      setHistory(historyData.history || []);
    } catch (error) {
      console.error('Error fetching account data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renewBook = async (loanId: number) => {
    try {
      const response = await fetch(`/api/resources/loans/${loanId}/renew`, {
        method: 'POST',
      });
      if (response.ok) {
        fetchAccountData();
      }
    } catch (error) {
      console.error('Error renewing book:', error);
    }
  };

  if (loading) return <div>Loading account...</div>;
  if (!account) return <div>Failed to load account</div>;

  return (
    <div className="space-y-6">
      {/* Account Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold mb-4">👤 My Account</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Name</p>
            <p className="font-bold">{account.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Student ID</p>
            <p className="font-bold">{account.studentId}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Current Loans</p>
            <p className="font-bold text-indigo-600">{account.currentLoans}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Outstanding Fines</p>
            <p className={`font-bold ${account.fineAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${account.fineAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Loans & History Tabs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('loans')}
            className={`px-4 py-2 font-bold transition ${
              activeTab === 'loans'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Current Loans ({loans.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 font-bold transition ${
              activeTab === 'history'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Reading History ({history.length})
          </button>
        </div>

        {activeTab === 'loans' && (
          <div className="space-y-4">
            {loans.length === 0 ? (
              <p className="text-gray-600">No active loans</p>
            ) : (
              loans.map((loan) => (
                <div
                  key={loan.id}
                  className={`p-4 border-l-4 rounded ${
                    loan.status === 'overdue'
                      ? 'bg-red-50 border-red-600'
                      : 'bg-gray-50 border-green-600'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{loan.title}</h4>
                      <p className="text-sm text-gray-600">{loan.author}</p>
                      <p className={`text-sm mt-1 ${
                        loan.status === 'overdue' ? 'text-red-600 font-bold' : 'text-gray-600'
                      }`}>
                        Due: {new Date(loan.dueDate).toLocaleDateString()}
                        {loan.status === 'overdue' && ' (OVERDUE)'}
                      </p>
                    </div>
                    <button
                      onClick={() => renewBook(loan.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Renew
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history.length === 0 ? (
              <p className="text-gray-600">No reading history</p>
            ) : (
              history.map((item) => (
                <div key={item.id} className="bg-gray-50 p-4 rounded border-l-4 border-purple-600">
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.author}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Finished: {new Date(item.finishedDate).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
