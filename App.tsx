import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CitizenInterface from './components/CitizenInterface';
import InfluencerDashboard from './components/InfluencerDashboard';
import Architecture from './components/Architecture';
import { AppTab, Comment } from './types';
import { Menu } from 'lucide-react';

const INITIAL_COMMENTS: Comment[] = [
  {
    id: '1',
    userRole: 'Farmer',
    text: 'మా గ్రామంలో నీటి సమస్య చాలా ఎక్కువగా ఉంది. దీనికి పరిష్కారం ఏమిటి?',
    lang: 'Telugu',
    category: 'Water/Irrigation',
    sentiment: 'Negative',
    reply: 'నమస్కారం రమేష్ గారు. మీ సమస్యను గుర్తించాము. మిషన్ భగీరథ ద్వారా పైప్‌లైన్ పనులు మీ గ్రామంలో వచ్చే నెలలో ప్రారంభమవుతాయి. వివరాల కోసం స్థానిక పంచాయతీని సంప్రదించండి.',
    flagged: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
  },
  {
    id: '2',
    userRole: 'Student',
    text: 'When will the scholarship results be announced?',
    lang: 'English',
    category: 'Education',
    sentiment: 'Neutral',
    reply: 'Hello. The State Scholarship results are scheduled for release on October 15th. Please check the e-Pass website.',
    flagged: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
  },
  {
    id: '3',
    userRole: 'Citizen',
    text: 'Great initiative by the government!',
    lang: 'English',
    category: 'General',
    sentiment: 'Positive',
    reply: 'Thank you for your support! We are committed to serving you better.',
    flagged: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 180) // 3 hours ago
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.CITIZEN);
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAddComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.CITIZEN:
        return <CitizenInterface comments={comments} addComment={handleAddComment} />;
      case AppTab.DASHBOARD:
        return <InfluencerDashboard comments={comments} />;
      case AppTab.ARCHITECTURE:
        return <Architecture />;
      default:
        return <CitizenInterface comments={comments} addComment={handleAddComment} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900 text-white z-50 p-4 flex justify-between items-center shadow-lg">
          <span className="font-bold text-lg">AI Connect</span>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
             <Menu />
          </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
          <div className="md:hidden fixed top-14 left-0 w-full bg-slate-800 z-40 p-4 shadow-xl border-t border-slate-700">
            <div className="flex flex-col gap-2">
                 <button onClick={() => {setActiveTab(AppTab.CITIZEN); setMobileMenuOpen(false);}} className="p-3 text-left text-white bg-slate-700 rounded">Citizen Interface</button>
                 <button onClick={() => {setActiveTab(AppTab.DASHBOARD); setMobileMenuOpen(false);}} className="p-3 text-left text-white bg-slate-700 rounded">Dashboard</button>
                 <button onClick={() => {setActiveTab(AppTab.ARCHITECTURE); setMobileMenuOpen(false);}} className="p-3 text-left text-white bg-slate-700 rounded">Architecture</button>
            </div>
          </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 transition-all">
         <div className="max-w-7xl mx-auto">
            {renderContent()}
         </div>
      </main>
    </div>
  );
};

export default App;