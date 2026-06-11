import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldAlert, Cpu, HardDrive, Network, Landmark } from 'lucide-react';

interface ContactPageProps {
  initialForm?: 'contact' | 'trial';
}

export default function ContactPage({ initialForm = 'contact' }: ContactPageProps) {
  const [activeForm, setActiveForm] = useState<'contact' | 'trial'>(initialForm);

  // Form states for general contact
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [contactFeedback, setContactFeedback] = useState('');

  // Form states for trial
  const [trialName, setTrialName] = useState('');
  const [trialEmail, setTrialEmail] = useState('');
  const [trialCompany, setTrialCompany] = useState('');
  const [trialNodes, setTrialNodes] = useState(50);
  const [trialDeploy, setTrialDeploy] = useState('saas');
  const [trialStatus, setTrialStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [trialFeedback, setTrialFeedback] = useState('');

  const submitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim()) {
      setContactStatus('error');
      setContactFeedback('Contact name and corporate email address are required fields.');
      return;
    }

    setContactStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          company: contactCompany,
          message: contactMsg
        })
      });
      const data = await response.json();
      if (response.ok) {
        setContactStatus('success');
        setContactFeedback(data.message || 'Corporate requirements sent successfully to our Singapore vault.');
        // clear
        setContactName('');
        setContactEmail('');
        setContactCompany('');
        setContactMsg('');
      } else {
        setContactStatus('error');
        setContactFeedback(data.error || 'Unable to store communications query.');
      }
    } catch {
      setContactStatus('error');
      setContactFeedback('Network error. Database is unreachable.');
    }
  };

  const submitTrialForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialName.trim() || !trialEmail.trim()) {
      setTrialStatus('error');
      setTrialFeedback('Corporate contact name and email address are required.');
      return;
    }

    setTrialStatus('submitting');
    try {
      const response = await fetch('/api/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trialName,
          email: trialEmail,
          company: trialCompany,
          endpoints: trialNodes,
          deployment: trialDeploy
        })
      });
      const data = await response.json();
      if (response.ok) {
        setTrialStatus('success');
        setTrialFeedback(data.message || 'Trial application authorized in database.');
        // clear
        setTrialName('');
        setTrialEmail('');
        setTrialCompany('');
        setTrialNodes(50);
      } else {
        setTrialStatus('error');
        setTrialFeedback(data.error || 'Authorization denied by administrator rules.');
      }
    } catch {
      setTrialStatus('error');
      setTrialFeedback('Network failure communicating with db store.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-left font-sans" id="contact-hub-viewport">
      {/* Segmented Top Selection Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 sm:p-8 space-y-6 relative overflow-hidden mb-8">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600"></div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Unrivaled Security Command Coordination
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-mono">
              All communications log directly into an encrypted, isolated local relational table.
            </p>
          </div>
          
          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200/80">
            <button
              onClick={() => setActiveForm('contact')}
              className={`px-4 py-1.5 text-[11px] font-bold font-mono uppercase tracking-wider rounded-md transition-all ${
                activeForm === 'contact' ? 'bg-[#2045B4] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Contact Specialists
            </button>
            <button
              onClick={() => setActiveForm('trial')}
              className={`px-4 py-1.5 text-[11px] font-bold font-mono uppercase tracking-wider rounded-md transition-all ${
                activeForm === 'trial' ? 'bg-[#2045B4] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Request License Trial
            </button>
          </div>
        </div>

        {/* General Contact Form */}
        {activeForm === 'contact' && (
          <form onSubmit={submitContactForm} className="space-y-4 text-xs sm:text-sm animate-fade-in" id="contact-form-block">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-500 font-mono uppercase text-[10px]">Corporate Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-850 font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-500 font-mono uppercase text-[10px]">Company Email ID:</label>
                <input
                  type="email"
                  required
                  placeholder="name@corporation.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-850 font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-500 font-mono uppercase text-[10px]">Company / Organization Name:</label>
              <input
                type="text"
                placeholder="Conzex Enterprises"
                value={contactCompany}
                onChange={(e) => setContactCompany(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-850"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-500 font-mono uppercase text-[10px]">Specific security requirements / message:</label>
              <textarea
                rows={4}
                placeholder="Detail your host endpoint configurations, expected logging throughput, or regulatory compliance timelines..."
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-850 text-xs resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={contactStatus === 'submitting'}
                className="px-6 py-2.5 bg-[#2045B4] hover:bg-[#1a389c] text-white text-xs font-bold uppercase transition-colors rounded cursor-pointer disabled:bg-slate-400"
                id="contact-submit-btn"
              >
                {contactStatus === 'submitting' ? 'Transmitting...' : 'Transmit Corporate Communication'}
              </button>
            </div>

            {/* Notification panels */}
            {contactStatus === 'success' && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded flex gap-3 text-emerald-800 text-xs">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                <p>{contactFeedback}</p>
              </div>
            )}
            {contactStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-300 rounded flex gap-3 text-red-800 text-xs">
                <ShieldAlert className="w-5 h-5 shrink-0 text-red-500" />
                <p>{contactFeedback}</p>
              </div>
            )}
          </form>
        )}

        {/* Trial Request Form */}
        {activeForm === 'trial' && (
          <form onSubmit={submitTrialForm} className="space-y-4 text-xs sm:text-sm animate-fade-in" id="trial-form-block">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-500 font-mono uppercase text-[10px]">Corporate Specialist Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={trialName}
                  onChange={(e) => setTrialName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-850 font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-500 font-mono uppercase text-[10px]">Work Domain Email ID:</label>
                <input
                  type="email"
                  required
                  placeholder="john@conzex.com"
                  value={trialEmail}
                  onChange={(e) => setTrialEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-850 font-medium"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="block font-bold text-slate-500 font-mono uppercase text-[10px]">Corporate Affiliation:</label>
                <input
                  type="text"
                  placeholder="Conzex Enterprises"
                  value={trialCompany}
                  onChange={(e) => setTrialCompany(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-850"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-500 font-mono uppercase text-[10px]">Target Endpoints:</label>
                <input
                  type="number"
                  placeholder="50"
                  min="5"
                  max="10000"
                  value={trialNodes}
                  onChange={(e) => setTrialNodes(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-850 font-bold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-500 font-mono uppercase text-[10px]">Deployment Target Structure:</label>
              <select
                value={trialDeploy}
                onChange={(e) => setTrialDeploy(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-700 font-bold"
              >
                <option value="saas">SaaS Managed Sandbox Array</option>
                <option value="onprem">On-Premises Air-Gapped Registry</option>
                <option value="hybrid">Hybrid Multi-Region Cloud</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={trialStatus === 'submitting'}
                className="px-6 py-2.5 bg-[#2045B4] hover:bg-[#1a389c] text-white text-xs font-bold uppercase transition-colors rounded cursor-pointer disabled:bg-slate-400"
                id="trial-submit-btn"
              >
                {trialStatus === 'submitting' ? 'Processing secure order...' : 'Submit Secure Setup Application'}
              </button>
            </div>

            {/* Notification panels */}
            {trialStatus === 'success' && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded flex gap-3 text-emerald-800 text-xs">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                <p>{trialFeedback}</p>
              </div>
            )}
            {trialStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-300 rounded flex gap-3 text-red-800 text-xs">
                <ShieldAlert className="w-5 h-5 shrink-0 text-red-500" />
                <p>{trialFeedback}</p>
              </div>
            )}
          </form>
        )}
      </div>

      {/* Database transparency report */}
      <div className="bg-[#faf9f8] p-5 sm:p-6 border border-slate-200 rounded-xl grid sm:grid-cols-3 gap-6 font-mono text-xs">
        <div className="space-y-1">
          <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Encrypted Standby</span>
          <p className="font-bold text-slate-800 flex items-center gap-1">
            <Cpu className="w-4 h-4 text-blue-600" /> AES-256 TLS 1.3
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Relational Endpoint</span>
          <p className="font-bold text-slate-800 flex items-center gap-1">
            <HardDrive className="w-4 h-4 text-blue-600" /> SQLite Fallback Caches
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Global Authority</span>
          <p className="font-bold text-[#2045B4] flex items-center gap-1">
            <Landmark className="w-4 h-4" /> Conzex Global Singapore
          </p>
        </div>
      </div>
    </div>
  );
}
