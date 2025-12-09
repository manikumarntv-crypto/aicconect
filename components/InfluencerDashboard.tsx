import React from 'react';
import { Comment } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, ThumbsUp, Clock, ArrowUpRight } from 'lucide-react';

interface InfluencerDashboardProps {
  comments: Comment[];
}

const InfluencerDashboard: React.FC<InfluencerDashboardProps> = ({ comments }) => {
  // Calculate dynamic stats
  const totalComments = comments.length;
  const flaggedCount = comments.filter(c => c.flagged).length;
  // Mock calculation for display purposes
  const positiveSentiment = Math.floor((comments.length / (comments.length + 1)) * 100);

  const data = [
    { name: 'Water', value: 45 },
    { name: 'Education', value: 30 },
    { name: 'Roads', value: 25 },
    { name: 'Health', value: 15 },
    { name: 'Transport', value: 10 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-slate-800">Governance Dashboard</h2>
        <p className="text-slate-500">Real-time insights filtered by Gemini 3 Pro</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Escalated Issues" 
          value={flaggedCount.toString()} 
          subtext="Requires urgent attention" 
          icon={AlertTriangle} 
          color="text-red-500"
          bgColor="bg-red-50"
        />
        <MetricCard 
          title="Sentiment Score" 
          value={`${positiveSentiment}%`} 
          subtext="Positive citizen feedback" 
          icon={ThumbsUp} 
          color="text-green-500"
          bgColor="bg-green-50"
        />
         <MetricCard 
          title="Man-Hours Saved" 
          value="124 hrs" 
          subtext="This week via automation" 
          icon={Clock} 
          color="text-blue-500"
          bgColor="bg-blue-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Priority Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-amber-500 rounded-sm"></span>
              High Priority Escalations
            </h3>
            <button className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Category</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Sentiment</th>
                  <th className="px-4 py-3 rounded-r-lg">Lang</th>
                </tr>
              </thead>
              <tbody>
                {comments.slice(0, 5).map((comment, idx) => (
                  <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-700">{comment.category}</td>
                    <td className="px-4 py-3 text-slate-600">{comment.userRole}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        comment.sentiment === 'Negative' ? 'bg-red-100 text-red-600' :
                        comment.sentiment === 'Positive' ? 'bg-green-100 text-green-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {comment.sentiment}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{comment.lang}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-sm"></span>
            Topic Analysis Volume
          </h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, subtext, icon: Icon, color, bgColor }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      <p className="text-xs text-slate-400 mt-2">{subtext}</p>
    </div>
    <div className={`p-3 rounded-lg ${bgColor} ${color}`}>
      <Icon size={24} />
    </div>
  </div>
);

export default InfluencerDashboard;