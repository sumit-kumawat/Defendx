import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Users, 
  FileText, 
  CheckCircle, 
  Trash2, 
  Plus, 
  Edit, 
  RefreshCw, 
  Award, 
  Database, 
  Mail, 
  ShieldCheck, 
  X, 
  Search, 
  Download, 
  Settings,
  HelpCircle,
  FileCheck2,
  Trash
} from 'lucide-react';
import { CertificationData } from '../types';

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');

  // Main state
  const [certifications, setCertifications] = useState<CertificationData[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [trials, setTrials] = useState<any[]>([]);
  const [dbStatus, setDbStatus] = useState<any>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'certs' | 'logs'>('certs');

  // Form states (Create/Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentCode, setCurrentCode] = useState('');
  
  // Fields
  const [formCode, setFormCode] = useState('');
  const [formName, setFormName] = useState('');
  const [formTitle, setFormTitle] = useState('Certified DefendX SIEM Administrator');
  const [formIssueDate, setFormIssueDate] = useState('');
  const [formExpiryDate, setFormExpiryDate] = useState('');
  const [formAccreditation, setFormAccreditation] = useState('DefendX Training Authority Accreditation');
  const [formStatus, setFormStatus] = useState('ACTIVE');
  const [formDownloadUrl, setFormDownloadUrl] = useState('');
  const [formMessage, setFormMessage] = useState({ text: '', type: 'success' as 'success' | 'error' });

  // Load state check
  useEffect(() => {
    const savedAuth = localStorage.getItem('defendx_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthorized(true);
      setAuthError('');
      localStorage.setItem('defendx_admin_auth', 'true');
    } else {
      setAuthError('Unauthorized Passcode Key. Please check corporate guidelines.');
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    localStorage.removeItem('defendx_admin_auth');
    setPasscode('');
  };

  // Fetch admin stats and data
  const fetchData = async () => {
    if (!isAuthorized) return;
    setIsLoading(true);
    try {
      // Certifications list
      const resCerts = await fetch('/api/admin/certifications');
      const dataCerts = await resCerts.json();
      if (resCerts.ok && dataCerts.success) {
        setCertifications(dataCerts.data);
      }

      // Contact inquiries
      const resContacts = await fetch('/api/admin/contacts');
      const dataContacts = await resContacts.json();
      if (resContacts.ok && dataContacts.success) {
        setContacts(dataContacts.data);
      }

      // Trial inquiries
      const resTrials = await fetch('/api/admin/trials');
      const dataTrials = await resTrials.json();
      if (resTrials.ok && dataTrials.success) {
        setTrials(dataTrials.data);
      }

      // Live DB stats
      const resStatus = await fetch('/api/db-status');
      const dataStatus = await resStatus.json();
      if (resStatus.ok) {
        setDbStatus(dataStatus);
      }
    } catch (err) {
      console.error('Failure fetching administrative state rows:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchData();
    }
  }, [isAuthorized]);

  // Handle open modal for Create
  const openCreateModal = () => {
    setModalMode('create');
    setFormCode('CDXSA' + Math.floor(100000 + Math.random() * 900000));
    setFormName('');
    setFormTitle('Certified DefendX SIEM Administrator');
    const today = new Date();
    const formattedToday = today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    setFormIssueDate(formattedToday);
    
    // expiry 2 years later
    const futureDate = new Date(today.setFullYear(today.getFullYear() + 2));
    const formattedFuture = futureDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    setFormExpiryDate(formattedFuture);
    
    setFormAccreditation('DefendX Training Authority Accreditation');
    setFormStatus('ACTIVE');
    setFormDownloadUrl('');
    setFormMessage({ text: '', type: 'success' });
    setIsModalOpen(true);
  };

  // Handle open modal for Edit
  const openEditModal = (cert: CertificationData) => {
    setModalMode('edit');
    setCurrentCode(cert.code);
    setFormCode(cert.code);
    setFormName(cert.candidate_name);
    setFormTitle(cert.certified_title);
    setFormIssueDate(cert.issue_date);
    setFormExpiryDate(cert.expiry_date);
    setFormAccreditation(cert.accreditation);
    setFormStatus(cert.status);
    setFormDownloadUrl(cert.download_url || '');
    setFormMessage({ text: '', type: 'success' });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCode.trim() || !formName.trim() || !formTitle.trim()) {
      setFormMessage({ text: 'All core parameters (Name, Code, Title) are required.', type: 'error' });
      return;
    }

    try {
      const url = modalMode === 'create' 
        ? '/api/admin/certifications' 
        : `/api/admin/certifications/${encodeURIComponent(currentCode)}`;
      const method = modalMode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: formCode.trim().toUpperCase(),
          candidate_name: formName.trim(),
          certified_title: formTitle.trim(),
          issue_date: formIssueDate.trim(),
          expiry_date: formExpiryDate.trim(),
          accreditation: formAccreditation.trim(),
          status: formStatus,
          download_url: formDownloadUrl.trim()
        })
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setFormMessage({ text: resData.message || 'Registry successfully modified.', type: 'success' });
        setTimeout(() => {
          setIsModalOpen(false);
          fetchData();
        }, 800);
      } else {
        setFormMessage({ text: resData.error || 'Authorization denied.', type: 'error' });
      }
    } catch {
      setFormMessage({ text: 'Network failure communication with JSON Database.', type: 'error' });
    }
  };

  const deleteCertProfile = async (code: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete certificate code ${code}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/certifications/${encodeURIComponent(code)}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok && data.success) {
        fetchData();
      } else {
        alert(data.error || 'Erasure request denied.');
      }
    } catch {
      alert('Communication failure during erasure request.');
    }
  };

  const clearLeadLogs = async () => {
    if (!window.confirm('Are you sure you want to erase all Contact and Sandbox Trial request rows permanently?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/clear-logs', {
        method: 'POST'
      });
      const data = await response.json();
      if (response.ok && data.success) {
        fetchData();
      }
    } catch {
      alert('Failure communication with server reset.');
    }
  };

  const prefillSampleCredentials = async () => {
    try {
      const samples = [
        {
          code: "CDXSA090896",
          candidate_name: "Sumit RoshanLal Kumawat",
          certified_title: "Certified DefendX SIEM Administrator",
          issue_date: "2 July, 2026",
          expiry_date: "30 June, 2028",
          accreditation: "DefendX Training Authority Accreditation",
          status: "ACTIVE"
        },
        {
          code: "CDXDA776102",
          candidate_name: "Aisha binti Mansor",
          certified_title: "Certified DefendX Defensive Analyst",
          issue_date: "14 May, 2026",
          expiry_date: "13 May, 2028",
          accreditation: "DefendX Training Authority Accreditation",
          status: "ACTIVE"
        },
        {
          code: "CDXTH551230",
          candidate_name: "David Chen Wei",
          certified_title: "Certified DefendX Threat Hunter",
          issue_date: "28 January, 2026",
          expiry_date: "27 January, 2028",
          accreditation: "DefendX Training Authority Accreditation",
          status: "REVOKED"
        }
      ];

      for (const s of samples) {
        await fetch('/api/admin/certifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(s)
        });
      }
      fetchData();
    } catch {
      console.error('Failed to prefill sample profiles.');
    }
  };

  const filteredCerts = certifications.filter(c => 
    c.candidate_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.certified_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-left font-sans animate-fade-in" id="admin-auth-console">
        <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-6 sm:p-8 space-y-6 relative">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2045B4] rounded-t-xl"></div>
          
          <div className="space-y-2 border-b pb-4 text-center">
            <div className="mx-auto w-12 h-12 bg-blue-50 border border-blue-200 text-[#2045B4] rounded-full flex items-center justify-center mb-2">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Administrative Authentication</h2>
            <p className="text-xs text-slate-500 font-mono">
              DefendX Registry Operations Control Console
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-mono text-red-800">
              [Authentication Failure] {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase font-mono">Operations Passcode Key:</label>
              <input
                type="password"
                required
                value={passcode}
                placeholder="Enter passcode key..."
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#2045B4] focus:ring-1 focus:ring-[#2045B4]"
              />
              <span className="block text-[10px] text-slate-400 font-mono">Default sandbox passcode is <code className="bg-slate-100 px-1 py-0.5 font-bold rounded">admin123</code></span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2045B4] hover:bg-[#1a389c] text-white font-bold py-2.5 text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              Sign In Control Hub
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8 text-left font-sans animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="admin-dashboard-viewport">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold tracking-wider uppercase rounded font-mono">
            <Database className="w-3.5 h-3.5" /> Registry Control Server
          </span>
          <h1 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight mt-1">
            System Administration Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage student profile certification, verify parameters, and organize lead logs inside local state.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={fetchData}
            title="Refresh database records"
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-all border border-slate-250 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            Log Out Manager
          </button>
        </div>
      </div>

      {/* METRIC CARD WIDGET GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-blue-50 rounded-bl-full flex items-center justify-end p-2.5">
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <span className="block text-[9px] font-mono text-slate-400 uppercase font-black">Authorized Certificates</span>
          <strong className="block text-2xl font-mono text-slate-900">{certifications.length}</strong>
          <span className="block text-[10px] text-slate-500 font-sans">Active student rows in memory</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-50 rounded-bl-full flex items-center justify-end p-2.5">
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="block text-[9px] font-mono text-slate-400 uppercase font-black">Sandbox Trial Leads</span>
          <strong className="block text-2xl font-mono text-slate-900">{trials.length}</strong>
          <span className="block text-[10px] text-slate-500 font-sans">SLA deployment proposals</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-amber-50 rounded-bl-full flex items-center justify-end p-2.5">
            <Mail className="w-4 h-4 text-amber-600" />
          </div>
          <span className="block text-[9px] font-mono text-slate-400 uppercase font-black">Corporate Inquiries</span>
          <strong className="block text-2xl font-mono text-slate-900">{contacts.length}</strong>
          <span className="block text-[10px] text-slate-505 font-sans">System messages saved</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-purple-50 rounded-bl-full flex items-center justify-end p-2.5">
            <Database className="w-4 h-4 text-purple-600" />
          </div>
          <span className="block text-[9px] font-mono text-slate-400 uppercase font-black">Database Store</span>
          <strong className="block text-xs font-mono text-slate-800 truncate">defendx_store.json</strong>
          <span className="block text-[9px] text-[#2045B4] font-mono font-bold">100% Secure Local JSON</span>
        </div>

      </div>

      {/* TABS SELECTOR */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('certs')}
          className={`px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'certs' 
              ? 'border-[#2045B4] text-[#2045B4] font-black' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Student Credentials ({certifications.length})
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'logs' 
              ? 'border-[#2045B4] text-[#2045B4] font-black' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Inbound Inquiries ({contacts.length + trials.length})
        </button>
      </div>

      {/* FILTER SEARCH AND ACTION BAR */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {activeTab === 'certs' ? (
          <>
            <div className="relative w-full md:w-96 text-xs">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidate, code ID, or program..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2.5 pl-9 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              {certifications.length === 0 && (
                <button
                  onClick={prefillSampleCredentials}
                  className="px-3.5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex-1"
                >
                  Prefill Sample Student Profiles
                </button>
              )}
              <button
                onClick={openCreateModal}
                className="px-4 py-2.5 bg-[#2045B4] hover:bg-[#1a389c] text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 flex-1"
              >
                <Plus className="w-4 h-4" /> Create Student Profile
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center w-full">
            <p className="text-xs text-slate-550 font-mono">
              View corporate leads processed dynamically inside local JSON.
            </p>
            {(contacts.length > 0 || trials.length > 0) && (
              <button
                onClick={clearLeadLogs}
                className="px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Clear Logs Data
              </button>
            )}
          </div>
        )}
      </div>

      {/* MAIN DATA TAB DISPLAY */}
      {activeTab === 'certs' ? (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          {filteredCerts.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-mono text-xs">
              No student profiles synchronized in registry. Click "Create Student Profile" to sign custom certificate identifiers!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                    <th className="px-5 py-3">Auth Code</th>
                    <th className="px-5 py-3">Candidate Student</th>
                    <th className="px-5 py-3">Certified Professional Program</th>
                    <th className="px-5 py-3">Issue Expire Baseline</th>
                    <th className="px-5 py-3">Verification Limit</th>
                    <th className="px-5 py-3 text-right">Administrative Options</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600 font-sans">
                  {filteredCerts.map((cert) => (
                    <tr key={cert.code} className="hover:bg-slate-50/40">
                      <td className="px-5 py-3.5 font-bold text-slate-800 font-mono text-[11px] tracking-wider">
                        {cert.code}
                      </td>
                      <td className="px-5 py-3.5">
                        <strong className="text-slate-900 block">{cert.candidate_name}</strong>
                        <span className="block text-[10px] text-slate-500 font-mono">{cert.accreditation}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50/50 border border-blue-200/50 text-[#2045B4] font-mono text-[9px] font-bold rounded">
                          {cert.certified_title}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[10.5px]">
                        <span className="block text-slate-700">Issue: {cert.issue_date}</span>
                        <span className="block text-slate-450">Expire: {cert.expiry_date}</span>
                      </td>
                      <td className="px-5 py-3.5 font-mono">
                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                          cert.status === 'ACTIVE' 
                            ? 'bg-emerald-150 border border-emerald-300 text-emerald-800' 
                            : 'bg-red-150 border border-red-300 text-red-800'
                        }`}>
                          {cert.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => {
                            window.location.hash = `#invoice?code=${cert.code}`;
                          }}
                          title="Generate Invoice Receipt"
                          className="p-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-750 rounded-md transition-colors inline-flex items-center gap-1 cursor-pointer text-[10px] font-bold"
                        >
                          <FileText className="w-3.5 h-3.5" /> Invoice
                        </button>
                        <button
                          onClick={() => window.location.hash = `#verify?code=${cert.code}`}
                          title="Verify Status Link"
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-md transition-colors inline-flex items-center gap-1 cursor-pointer text-[10px] font-bold"
                        >
                          Verify
                        </button>
                        {cert.download_url ? (
                          <a
                            href={cert.download_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            title="Direct Download Certificate"
                            className="p-1.5 bg-emerald-55 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-md transition-colors inline-flex items-center gap-1 cursor-pointer text-[10px] font-bold"
                          >
                            <Download className="w-3.5 h-3.5" /> Download
                          </a>
                        ) : (
                          <button
                            disabled
                            title="Direct link not configured"
                            className="p-1.5 bg-slate-100 border border-slate-200 text-slate-400 rounded-md inline-flex items-center gap-1 text-[10px] font-medium opacity-60 cursor-not-allowed"
                          >
                            No Link
                          </button>
                        )}
                        <button
                          onClick={() => openEditModal(cert)}
                          title="Modify student profile"
                          className="p-1 px-1.5 bg-slate-105 hover:bg-slate-200 text-slate-600 rounded-md transition-colors inline-block cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5 inline" />
                        </button>
                        <button
                          onClick={() => deleteCertProfile(cert.code)}
                          title="Delete profile permanently"
                          className="p-1 px-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-md transition-colors inline-block cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6" id="lead-logs-monitoring">
          
          {/* Column A: Contact Messages */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <h3 className="text-xs font-black font-mono uppercase tracking-wider text-slate-900 border-b pb-2 flex items-center gap-1.5 text-amber-700">
              <Mail className="w-4 h-4" /> Consolidated Corporate Contact Messages ({contacts.length})
            </h3>
            {contacts.length === 0 ? (
              <p className="p-8 text-center text-slate-400 font-mono text-xs">No direct contacts logged inside memory.</p>
            ) : (
              <div className="space-y-3.5 overflow-y-auto max-h-96">
                {contacts.map((c, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
                    <div className="flex justify-between items-start font-mono text-[10px]">
                      <div>
                        <strong className="text-slate-800 text-xs block">{c.name}</strong>
                        <span className="text-slate-500 font-bold block mt-0.5">{c.email} {c.company ? `| ${c.company}` : ''}</span>
                      </div>
                      <span className="text-slate-400 text-[9px]">{new Date(c.created_at).toLocaleString()}</span>
                    </div>
                    <p className="p-2.5 bg-white border border-slate-200 rounded leading-relaxed text-slate-700 italic">
                      "{c.message || 'No written corporate message notes provided.'}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Column B: Sandbox Trial leads */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
            <h3 className="text-xs font-black font-mono uppercase tracking-wider text-slate-900 border-b pb-2 flex items-center gap-1.5 text-emerald-700">
              <FileCheck2 className="w-4 h-4" /> Sandbox Evaluation Leads ({trials.length})
            </h3>
            {trials.length === 0 ? (
              <p className="p-8 text-center text-slate-400 font-mono text-xs">No evaluation requests registered in storage.</p>
            ) : (
              <div className="space-y-3.5 overflow-y-auto max-h-96">
                {trials.map((t, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
                    <div className="flex justify-between items-start font-mono text-[10px]">
                      <div>
                        <strong className="text-slate-800 text-xs block">{t.name}</strong>
                        <span className="text-slate-500 font-bold block mt-0.5">{t.email} {t.company ? `| ${t.company}` : ''}</span>
                      </div>
                      <span className="text-slate-400 text-[9px]">{new Date(t.created_at).toLocaleString()}</span>
                    </div>
                    <div className="p-2.5 bg-white border border-slate-202 rounded font-mono text-[10.5px] text-slate-750 space-y-1">
                      <div><span className="text-slate-450 uppercase text-[9px] block">Bound Nodes Ingest Limit:</span> <strong>{t.endpoints} endpoints</strong></div>
                      <div><span className="text-slate-450 uppercase text-[9px] block">Target Infrastructure Deploy:</span> <strong className="text-blue-700">{t.deployment} configuration</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* CREATE / EDIT CANDIDATE PROFILE POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 flex items-center justify-center p-4" id="candidate-crud-modal">
          <div className="bg-white border border-slate-200 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-fade-in text-left">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-5 sm:p-6 border-b border-slate-100">
              <h3 className="text-base font-black font-mono uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Award className="w-5 h-5 text-[#2045B4]" />
                {modalMode === 'create' ? 'Register New Student Profile' : 'Modify Registered Profile'}
              </h3>
              <p className="text-[11px] text-slate-505">Integrates and cryptographically seals authorization codes inside local state.</p>
            </div>

            {formMessage.text && (
              <div className={`p-3.5 mx-5 sm:mx-6 mt-4 rounded-lg text-xs font-mono leading-relaxed ${
                formMessage.type === 'success' 
                  ? 'bg-emerald-50 border border-emerald-250 text-emerald-800' 
                  : 'bg-red-50 border border-red-250 text-red-800'
              }`}>
                {formMessage.text}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="p-5 sm:p-6 space-y-4 text-xs font-sans">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-550 font-mono uppercase text-[9px]">Auth Code ID:</label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    disabled={modalMode === 'edit'}
                    placeholder="CDXXXXXXXXX"
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none disabled:bg-slate-105 disabled:text-slate-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-550 font-mono uppercase text-[9px]">Verification Status:</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-250 rounded text-xs font-bold text-slate-800"
                  >
                    <option value="ACTIVE">ACTIVE (Verified Valid)</option>
                    <option value="REVOKED">REVOKED (Suspended/Invalid)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-550 font-mono uppercase text-[9px]">Candidate Full Name:</label>
                <input
                  type="text"
                  required
                  value={formName}
                  placeholder="Sumit RoshanLal Kumawat"
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-850"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-550 font-mono uppercase text-[9px]">Certified Tracks Program Title:</label>
                <select
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-250 rounded text-xs font-bold text-slate-800"
                >
                  <option value="Certified DefendX SIEM Administrator">Certified DefendX SIEM Administrator</option>
                  <option value="Certified DefendX Defensive Analyst">Certified DefendX Defensive Analyst</option>
                  <option value="Certified DefendX Threat Hunter">Certified DefendX Threat Hunter</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-550 font-mono uppercase text-[9px]">Official Date of Issue:</label>
                  <input
                    type="text"
                    required
                    value={formIssueDate}
                    placeholder="e.g. 2 July, 2026"
                    onChange={(e) => setFormIssueDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-800 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-550 font-mono uppercase text-[9px]">Official Date of Expiration:</label>
                  <input
                    type="text"
                    required
                    value={formExpiryDate}
                    placeholder="e.g. 30 June, 2028"
                    onChange={(e) => setFormExpiryDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-550 font-mono uppercase text-[9px]">Governing Accreditation Authority:</label>
                <input
                  type="text"
                  required
                  value={formAccreditation}
                  onChange={(e) => setFormAccreditation(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-220 rounded text-xs text-slate-800 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-550 font-mono uppercase text-[9px]">Direct Certificate Download Link:</label>
                <input
                  type="text"
                  value={formDownloadUrl}
                  placeholder="e.g. https://example.com/certificates/verify-student.pdf"
                  onChange={(e) => setFormDownloadUrl(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 font-mono"
                />
                <span className="text-[10px] text-slate-400 block">Pasting a link here allows candidate to download this file directly.</span>
              </div>

              <div className="border-t pt-4 flex gap-2 justify-end text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2045B4] hover:bg-[#1a389c] text-white rounded cursor-pointer shadow"
                >
                  {modalMode === 'create' ? 'Seal Registry Record' : 'Save Modified Profile'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
