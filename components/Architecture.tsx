import React from 'react';
import { Database, Server, Shield, Cpu, Layers } from 'lucide-react';

const Architecture: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">System Architecture</h2>
        <p className="text-slate-500">High-level overview of the AI Connect stack</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TechCard 
          icon={Layers}
          title="Ingestion Layer"
          desc="Webhooks (X/YouTube APIs), Citizen App inputs."
          tags={['React', 'Webhooks', 'REST']}
        />
        <TechCard 
          icon={Database}
          title="DPI Layer"
          desc="Bhashini for translation & e-KYC for authentication."
          tags={['Bhashini', 'Aadhaar', 'e-KYC']}
        />
        <TechCard 
          icon={Cpu}
          title="Intelligence"
          desc="Gemini 3 Pro for reasoning + Pinecone Vector DB for RAG."
          tags={['Gemini 3 Pro', 'Pinecone', 'LangChain']}
        />
        <TechCard 
          icon={Shield}
          title="Safety & Guardrails"
          desc="NeMo Guardrails & proprietary filters for PII redaction."
          tags={['NeMo', 'OAuth 2.0', 'AES-256']}
        />
      </div>

      <div className="bg-slate-900 text-slate-300 p-8 rounded-xl shadow-lg font-mono text-sm overflow-x-auto">
         <h3 className="text-blue-400 font-bold mb-4 text-base flex items-center gap-2">
            <Server size={18} /> RAG Pipeline Logic
         </h3>
<pre>{`// Pseudo-code for Gemini RAG Pipeline logic

async function process_comment(comment_text, user_lang) {
    
    // 1. DPI Integration: Translate to English
    const translation = await bhashini.translate(comment_text, 'en');
    
    // 2. Vector Search (RAG)
    const vectors = await pinecone.embed(translation);
    const context = await retrieve_policy_docs(vectors);
    
    // 3. Reasoning with Gemini 3 Pro
    const response = await googleGenAI.generateContent({
        model: 'gemini-3-pro-preview',
        prompt: translation,
        context: context,
        systemInstruction: "Act as a helpful government liaison."
    });
    
    // 4. Native Response
    const final_output = await bhashini.translate(response.text, user_lang);
    
    return final_output;
}`}</pre>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl text-center">
        <p className="text-blue-800 font-medium">
            This architecture is designed for scale, capable of handling 10M+ concurrent citizen requests using serverless edge functions.
        </p>
      </div>
    </div>
  );
};

const TechCard = ({ icon: Icon, title, desc, tags }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors">
        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 mb-4">
            <Icon size={24} />
        </div>
        <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
        <p className="text-sm text-slate-500 mb-4 h-10">{desc}</p>
        <div className="flex flex-wrap gap-2">
            {tags.map((t: string) => (
                <span key={t} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">
                    {t}
                </span>
            ))}
        </div>
    </div>
)

export default Architecture;