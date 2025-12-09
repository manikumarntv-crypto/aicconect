import React, { useState } from 'react';
import { UserRole, Comment } from '../types';
import { detectLanguage, generateAIResponse } from '../services/geminiService';
import { Send, User, Bot, AlertTriangle, Languages } from 'lucide-react';

interface CitizenInterfaceProps {
  comments: Comment[];
  addComment: (comment: Comment) => void;
}

const CitizenInterface: React.FC<CitizenInterfaceProps> = ({ comments, addComment }) => {
  const [inputText, setInputText] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Citizen');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsProcessing(true);
    const lang = detectLanguage(inputText);

    // Initial Optimistic UI update could happen here, but we wait for AI for simplicity in this demo
    try {
      const aiResponse = await generateAIResponse(inputText, lang);

      const newComment: Comment = {
        id: Date.now().toString(),
        userRole: selectedRole,
        text: inputText,
        lang: lang,
        category: 'General Query', // Would be AI classified in prod
        sentiment: 'Neutral', // Would be AI classified in prod
        reply: aiResponse,
        flagged: false,
        timestamp: new Date()
      };

      addComment(newComment);
      setInputText('');
    } catch (err) {
      console.error("Failed to post comment", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      {/* Input Section */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MessageInputIcon /> New Query
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">I am a...</label>
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="Student">Student</option>
                <option value="Farmer">Farmer</option>
                <option value="Gig Worker">Gig Worker</option>
                <option value="Citizen">Citizen</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Your Message</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type in your local language..."
                className="w-full h-32 p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                disabled={isProcessing}
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing || !inputText.trim()}
              className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
                isProcessing 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              }`}
            >
              {isProcessing ? (
                <>Processing <span className="animate-spin text-lg">C</span></>
              ) : (
                <><Send size={18} /> Post Comment</>
              )}
            </button>
            <p className="text-xs text-center text-slate-500 mt-2">
              Powered by Bhashini & Gemini 3 Pro
            </p>
          </form>
        </div>
      </div>

      {/* Feed Section */}
      <div className="lg:col-span-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Live Feed (Bidirectional)</h2>
          <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
             <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Live
          </span>
        </div>
        
        <div className="space-y-6 pb-12">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* User Part */}
              <div className="p-5 border-b border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{comment.userRole}</p>
                      <p className="text-xs text-slate-500">{new Date(comment.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {comment.flagged && <AlertTriangle size={16} className="text-amber-500" />}
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                      <Languages size={12} /> {comment.lang}
                    </span>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                  {comment.text}
                </p>
              </div>

              {/* AI Reply Part */}
              <div className="p-5 bg-blue-50/50">
                <div className="flex gap-3">
                  <div className="mt-1 min-w-[32px]">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm">
                      <Bot size={18} />
                    </div>
                  </div>
                  <div className="flex-1">
                     <p className="text-xs font-bold text-blue-700 mb-1 uppercase tracking-wide">AI Connect Response</p>
                     <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                       {comment.reply}
                     </p>
                     <div className="mt-3 flex gap-2">
                        <button className="text-xs text-blue-600 font-medium hover:underline">View Policy</button>
                        <span className="text-slate-300">•</span>
                        <button className="text-xs text-blue-600 font-medium hover:underline">Escalate</button>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper icon component
const MessageInputIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
)

export default CitizenInterface;