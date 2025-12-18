'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

interface Report {
  name: string;
  report: string;
  timeAgo: string;
  avatar: string;
  image: string;
}

interface Issue {
  id: number;
  image: string;
  title: string;
  location: string;
  category: string;
  categoryColor: string;
  priority: number;
  status: string;
  statusColor: string;
  submitted: string;
  description: string;
  reportsCount: number;
  engagement: string;
  timeAgo: string;
  recentReports: Report[];
}

export default function CitizenIssues() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('citizen-issues');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showReports, setShowReports] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  // nicer controls state
  const priorityOptions = ['All Priorities', 'High', 'Medium', 'Low'];
  const statusOptions = ['All Statuses', 'Pending', 'In Review', 'Resolved'];
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  // (font) Poppins is loaded globally from RootLayout
  
  const selectPriority = (val: string) => { setPriorityFilter(val); setPriorityOpen(false); };
  const selectStatus = (val: string) => { setStatusFilter(val); setStatusOpen(false); };
  
  const handleLogout = () => {
    router.push('/login');
  };
  const issuesData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop',
      title: 'Water pipe leak causing flooding',
      location: '201 Commerce Street',
      category: 'Water Supply',
      categoryColor: 'text-blue-700',
      priority: 95,
      status: 'In Review',
      statusColor: 'text-blue-700',
      submitted: 'about 1 year ago',
      description: 'Multiple reports of severe water pipe leak causing flooding in residential area',
      reportsCount: 45,
      engagement: 'High Engagement',
      timeAgo: '2 hours ago',
      recentReports: [
        {
          name: 'Pradip Khadka',
          report: 'Water flooding in street, urgent repair needed.',
          timeAgo: '2h ago',
          avatar: 'P',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop'
        },
        {
          name: 'Sajan Shrestha',
          report: 'No water supply since yesterday due to pipe damage.',
          timeAgo: '4h ago',
          avatar: 'S',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
        }
      ]
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop',
      title: 'Large pothole on Main Street',
      location: '123 Main Street, Downtown',
      category: 'Road Damage',
      categoryColor: 'text-blue-700',
      priority: 92,
      status: 'Pending',
      statusColor: 'text-yellow-700',
      submitted: 'about 1 year ago',
      description: 'Multiple reports of severe potholes causing vehicle damage on Main Street',
      reportsCount: 45,
      engagement: 'High Engagement',
      timeAgo: '3 hours ago',
      recentReports: [
        {
          name: 'Pradip Khadka',
          report: 'Huge pothole on Main Street area, nearly popped my tire.',
          timeAgo: '2h ago',
          avatar: 'P',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop'
        },
        {
          name: 'Sajan Shrestha',
          report: 'Road condition is terrible near the downtown area.',
          timeAgo: '4h ago',
          avatar: 'S',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
        }
      ]
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=80&h=80&fit=crop',
      title: 'Missing stop sign at intersection',
      location: 'Pine Street & 3rd Avenue',
      category: 'Other',
      categoryColor: 'text-blue-700',
      priority: 90,
      status: 'Resolved',
      statusColor: 'text-green-700',
      submitted: 'about 1 year ago',
      description: 'Traffic safety issue due to missing stop sign at busy intersection',
      reportsCount: 28,
      engagement: 'Medium Engagement',
      timeAgo: '5 hours ago',
      recentReports: [
        {
          name: 'Maya Gurung',
          report: 'Dangerous intersection without stop sign.',
          timeAgo: '1h ago',
          avatar: 'M',
          image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=300&h=200&fit=crop'
        }
      ]
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=80&h=80&fit=crop',
      title: 'Overflowing garbage bins at Central Park',
      location: 'Central Park, Playground Area',
      category: 'Waste Management',
      categoryColor: 'text-blue-700',
      priority: 88,
      status: 'In Review',
      statusColor: 'text-blue-700',
      submitted: 'about 1 year ago',
      description: 'Waste bins overflowing causing hygiene and environmental issues',
      reportsCount: 35,
      engagement: 'High Engagement',
      timeAgo: '8 hours ago',
      recentReports: [
        {
          name: 'Kiran Thapa',
          report: 'Garbage scattered all around playground area.',
          timeAgo: '3h ago',
          avatar: 'K',
          image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop'
        }
      ]
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=80&h=80&fit=crop',
      title: 'Power outage in residential block',
      location: 'Riverside Drive, Block 12-18',
      category: 'Electricity',
      categoryColor: 'text-blue-700',
      priority: 85,
      status: 'Resolved',
      statusColor: 'text-green-700',
      submitted: 'about 1 year ago',
      description: 'Extended power outage affecting multiple residential buildings',
      reportsCount: 42,
      engagement: 'High Engagement',
      timeAgo: '12 hours ago',
      recentReports: [
        {
          name: 'Raj Magar',
          report: 'No electricity since morning in our block.',
          timeAgo: '6h ago',
          avatar: 'R',
          image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop'
        }
      ]
    }
  ];

  const filteredIssues = issuesData.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = priorityFilter === 'All Priorities' || 
                           (priorityFilter === 'High' && issue.priority >= 90) ||
                           (priorityFilter === 'Medium' && issue.priority >= 70 && issue.priority < 90) ||
                           (priorityFilter === 'Low' && issue.priority < 70);
    
    const matchesStatus = statusFilter === 'All Statuses' || issue.status === statusFilter;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handleBackToList = () => {
    setSelectedIssue(null);
  };

  // If an issue is selected, show the detailed view
  if (selectedIssue) {
    return (
      <div className="min-h-screen bg-slate-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="ml-64 flex flex-col min-h-screen">
          <div className="sticky top-0 z-20">
            <Topbar activeTab={activeTab} onLogout={handleLogout} />
          </div>
          
          <div className="flex-1 p-8">
            <div className="max-w-5xl mx-auto">
              {/* Back Button */}
              <button 
                onClick={handleBackToList}
                className="mb-6 flex items-center gap-2 text-[#2D3F7B] hover:text-[#19295C] font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Issues List
              </button>

              {/* Header - simplified, removed time range & refresh */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold" style={{color: '#19295C'}}>Priority Issues</h1>
                    <p className="text-slate-500 mt-1">AI-grouped citizen reports ranked by community impact.</p>
                  </div>

                  {/* Compact info chips */}
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-2 bg-blue-50 rounded-lg border border-blue-100 text-sm font-semibold" style={{color: '#2D3F7B'}}>
                      {selectedIssue.reportsCount} Reports
                    </div>
                    <div className="px-3 py-2 bg-white rounded-lg border border-blue-100 text-sm font-semibold" style={{color: '#19295C'}}>
                      Priority {selectedIssue.priority}
                    </div>
                  </div>
                </div>
              </div>

              {/* Issue Detail Card */}
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                <div className="p-8">
                  <div className="flex gap-8">
                    {/* Left Content */}
                    <div className="flex-1">
                      {/* Header Tags */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-semibold text-black">
                          {selectedIssue.category}
                        </span>

                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{selectedIssue.location}</span>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-slate-500 ml-3">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{selectedIssue.timeAgo}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-bold mb-4" style={{color: '#19295C'}}>{selectedIssue.title}</h2>

                      {/* AI Summary */}
                      <div className="flex items-start gap-3 mb-6">
                        <div className="w-7 h-7 bg-gradient-to-r from-[#2D3F7B] to-[#19295C] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 mb-2">AI Summary</p>
                          <p className="text-slate-600 leading-relaxed">{selectedIssue.description}</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 mb-8">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="font-semibold text-slate-900">{selectedIssue.reportsCount} Reports</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l3-3 3 3m-3-3v8" />
                          </svg>
                          <span className="text-green-600 font-semibold">{selectedIssue.engagement}</span>
                        </div>
                      </div>

                      {/* Hide/Show Reports Toggle */}
                      <div className="mb-6">
                        <button 
                          onClick={() => setShowReports(!showReports)}
                          className="flex items-center gap-2 text-[#2D3F7B] hover:text-[#19295C] font-medium"
                        >
                          <span>{showReports ? 'Hide Reports' : 'Show Reports'}</span>
                          <svg className={`w-4 h-4 transition-transform ${showReports ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* Recent Citizen Reports */}
                      {showReports && (
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-4">Recent Citizen Reports</h3>
                          <div className="space-y-4">
                            {selectedIssue.recentReports.map((report: Report, index: number) => (
                              <div key={index} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                <div className="w-10 h-10 bg-[#2D3F7B] rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-semibold">{report.avatar}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="font-semibold text-slate-900">{report.name}</span>
                                    <span className="text-sm text-slate-500">{report.timeAgo}</span>
                                  </div>
                                  <p className="text-slate-700 mb-3 leading-relaxed">{report.report}</p>
                                  {report.image && (
                                    <div className="mt-3">
                                      <img 
                                        src={report.image} 
                                        alt="Issue reported by citizen" 
                                        className="w-48 h-32 object-cover rounded-lg border border-slate-200"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Side - Priority Score & Action */}
                    <div className="flex flex-col items-center gap-6 w-56">
                      <div className="text-center">
                        <div className="text-6xl font-bold mb-2" style={{color: '#19295C'}}>{selectedIssue.priority}</div>
                        <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">PRIORITY SCORE</div>
                      </div>
                      
                      <button className="px-6 py-3 bg-[#2D3F7B] text-white rounded-xl font-semibold hover:bg-[#19295C] transition-colors shadow-sm">
                        Draft Proposal
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default view - Issues table/list
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="ml-64 flex flex-col min-h-screen">
        <div className="sticky top-0 z-20">
          <Topbar activeTab={activeTab} onLogout={handleLogout} />
        </div>
        
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Search and Filters */}
            <div className="bg-transparent p-4 rounded-2xl mb-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                {/* Search */}
                <div className="flex-1 relative w-full lg:w-auto">
                  <div className="flex items-center bg-gradient-to-r from-white to-blue-50/40 border border-slate-200 rounded-full px-3 py-2 shadow-sm">
                    <svg className="w-5 h-5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search issues, location or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400"
                    />
                    {searchTerm && (
                      <button onClick={() => setSearchTerm('')} className="ml-2 text-slate-400 hover:text-slate-600">
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                {/* Priority dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setPriorityOpen(!priorityOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md focus:outline-none"
                  >
                    <span className="text-sm text-slate-700">{priorityFilter}</span>
                    <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {priorityOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-md shadow-lg z-30">
                      {priorityOptions.map(opt => (
                        <button
                          key={opt}
                          onClick={() => selectPriority(opt)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${priorityFilter === opt ? 'font-semibold text-blue-700' : 'text-slate-700'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Status dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setStatusOpen(!statusOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md focus:outline-none"
                  >
                    <span className="text-sm text-slate-700">{statusFilter}</span>
                    <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {statusOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-md shadow-lg z-30">
                      {statusOptions.map(opt => (
                        <button
                          key={opt}
                          onClick={() => selectStatus(opt)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${statusFilter === opt ? 'font-semibold text-blue-700' : 'text-slate-700'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mb-4">
              <p className="text-slate-600">Showing {filteredIssues.length} of {issuesData.length} issues</p>
            </div>

            {/* Issues List - alternating light blue / white cards with gap */}
            <div className="space-y-4">
              {filteredIssues.map((issue, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={issue.id}
                    onClick={() => handleIssueClick(issue)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-shadow cursor-pointer hover:shadow-md ${
                      isEven ? 'bg-blue-50 border-blue-100' : 'bg-white border-slate-200'
                    }`}
                  >
                    <img
                      src={issue.image}
                      alt="Issue"
                      className={`w-12 h-12 rounded-lg object-cover ${isEven ? 'border-blue-100' : 'border-slate-200'} shadow-sm`}
                    />

                    {/* Priority column moved left (right after image) */}
                    <div className="w-20 flex flex-col items-center justify-center">
                      <div className="text-2xl font-extrabold leading-none" style={{color: '#19295C'}}>
                        {issue.priority}
                      </div>
                      <div className="text-xs text-slate-500 tracking-wider">PRIORITY</div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 mb-1 truncate">{issue.title}</h4>
                      <p className="text-sm text-slate-500 flex items-center gap-1 truncate">
                        <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate" style={{color: '#2D3F7B', opacity: 0.85}}>{issue.location}</span>
                      </p>
                    </div>

                    <div className="w-56 flex items-center justify-end gap-4">
                      <span className="text-sm font-semibold text-black mr-6 whitespace-nowrap">{issue.category}</span>
                      <span className={`text-sm font-semibold whitespace-nowrap ${issue.statusColor}`}>{issue.status}</span>
                      <span className="text-xs text-slate-500 whitespace-nowrap">{issue.submitted}</span>
                    </div>
                    
                    <div className="shrink-0 pl-2">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}