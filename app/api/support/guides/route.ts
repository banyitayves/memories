import { NextResponse } from 'next/server';

export async function GET() {
  const guides = [
    {
      id: 1,
      subject: 'Biology',
      icon: '🧬',
      topDatabases: ['PubMed', 'BioOne', 'JSTOR Life Sciences'],
      referenceBooks: [
        'Campbell Biology Textbook',
        'Molecular Biology of the Gene',
        'The Cell: A Molecular Approach',
      ],
      resources: [
        { title: 'Gene Sequence Database', type: 'Online Resource', url: '#' },
        { title: 'Protein Structures', type: 'Database', url: '#' },
      ],
    },
    {
      id: 2,
      subject: 'Literature',
      icon: '📖',
      topDatabases: ['JSTOR', 'Project MUSE', 'Academic OneFile'],
      referenceBooks: [
        'Oxford English Dictionary',
        'Literary Criticism: An Introduction',
        'The Norton Anthology',
      ],
      resources: [
        { title: 'Citation Index', type: 'Tool', url: '#' },
        { title: 'Author Biographies', type: 'Resource', url: '#' },
      ],
    },
    {
      id: 3,
      subject: 'Business',
      icon: '💼',
      topDatabases: ['Bloomberg Terminal', 'Business Source Premier', 'ProQuest'],
      referenceBooks: [
        'Porter Five Forces',
        'Business Strategy Guide',
        'Financial Accounting Basics',
      ],
      resources: [
        { title: 'Market Data', type: 'Database', url: '#' },
        { title: 'Case Studies', type: 'Collection', url: '#' },
      ],
    },
  ];

  return NextResponse.json({ guides });
}
