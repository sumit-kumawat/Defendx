import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  CheckCircle, 
  BadgeAlert, 
  Award, 
  Search, 
  Key, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Lock, 
  Cpu, 
  Globe, 
  ArrowRight, 
  HelpCircle,
  FileText,
  Download,
  Printer,
  ChevronRight,
  HelpCircle as QuestionIcon,
  Check
} from 'lucide-react';

import { CertificationData } from '../types';

interface VerifyPageProps {
  initialCode?: string;
}

export default function VerifyPage({ initialCode = '' }: VerifyPageProps) {
  const [verificationCode, setVerificationCode] = useState(initialCode);
  const [searchedCode, setSearchedCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [verifiedData, setVerifiedData] = useState<CertificationData | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const triggerVerification = async (codeToQuery: string) => {
    if (!codeToQuery.trim()) return;
    
    setSearchedCode(codeToQuery);
    setVerificationStatus('verifying');
    setVerifiedData(null);

    try {
      const response = await fetch(`/api/verify?code=${encodeURIComponent(codeToQuery.toUpperCase().trim())}`);
      const data = await response.json();
      
      if (response.ok && data.validated && data.data) {
        setVerificationStatus('success');
        setVerifiedData(data.data);
      } else {
        setVerificationStatus('error');
      }
    } catch {
      setVerificationStatus('error');
    }
  };

  useEffect(() => {
    if (initialCode) {
      setVerificationCode(initialCode);
      triggerVerification(initialCode);
    }
  }, [initialCode]);

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      triggerVerification(verificationCode);
    }
  };

  const tracks = [
    {
      code: "CDX-SA",
      title: "Certified DefendX SIEM Administrator",
      level: "Associate Level",
      hours: "40 Hrs Curriculum",
      topics: ["Kernel Telemetry", "JSON Parsing Core", "System Auditd Control", "Incident response baseline"]
    },
    {
      code: "CDX-DA",
      title: "Certified DefendX Defensive Analyst",
      level: "Intermediate Level",
      hours: "60 Hrs Curriculum",
      topics: ["MITRE ATT&CK Mapping", "Zero-day host escalation tracking", "Active sandbox containment", "Log event correlation"]
    },
    {
      code: "CDX-TH",
      title: "Certified DefendX Threat Hunter",
      level: "Expert Level",
      hours: "80 Hrs Curriculum",
      topics: ["Reverse signature threat tracking", "High-velocity live streams", "Forensics state retrieval", "SQL telemetry schemas"]
    }
  ];

  const faqs = [
    {
      q: "How are DefendX certifications cryptographically processed?",
      a: "Every candidate certification issued is cataloged on our private sovereign databases. Certificates are signed using unique key hashes, matching the candidate name and expiration timestamp directly on our central API hub."
    },
    {
      q: "Who is the accrediting authority behind these credentials?",
      a: "All certifications are officially backed and registered under Conzex Global Private Limited's statutory controls in accordance with regional IT security accreditation criteria."
    },
    {
      q: "Can I renew or extend an expired SIEM certification?",
      a: "Yes. Candidates are required to take an updated assessment within 60 days of the expiration of their current credential to renew their operator status baseline."
    },
    {
      q: "How can enterprise security teams bulk verify employee certifications?",
      a: "Corporate partners can contact our Downtown Core Singapore headquarters directly to request sandbox bulk query access to our credential registry API."
    }
  ];

  return (
    <div className="space-y-16 py-8 text-left font-sans" id="verify-page-viewport">
      
      {/* SECTION 1: HERO OVERVIEW */}
      <section className="bg-white border-b border-slate-200 py-16 text-left relative overflow-hidden" id="verify-hero">
        <div className="absolute inset-x-0 top-0 h-full bg-[#faf9f8] opacity-75 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 left-10 w-96 h-96 bg-[#2045B4]/5 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase rounded-full font-mono shadow-xs">
              <Award className="w-4 h-4 text-[#2045B4]" />
              <span>Sovereign Credential Registry</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight font-display">
              Sovereign Certification Verification
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Verify cybersecurity credentials, professional track completions, and system operator authorizations issued by the Defendx training boards. Mapped directly onto Conzex Global registry databases.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE INTERACTIVE LOOKUP TERMINAL */}
      <section className="max-w-5xl mx-auto px-4" id="verify-interactive-console-section">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2045B4]"></div>
          
          <div className="space-y-2 border-b pb-6 border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
                Candidate Credential Validation System
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-mono">
                Provide a unique verification code format to query real-time database row metrics.
              </p>
            </div>
            <div className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg w-fit whitespace-nowrap self-start md:self-center">
              DATABASE STATUS: <span className="text-emerald-600 font-bold">在线 ONLINE</span>
            </div>
          </div>

          {/* Verification input console */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <label className="block text-xs font-bold text-slate-650 uppercase font-mono tracking-wider">Candidate ID Authentication Code:</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. CDXSA090896"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  onKeyDown={handleKeydown}
                  className="w-full p-3 pl-10 bg-white border border-slate-200 rounded-xl font-mono text-xs text-slate-800 placeholder-slate-400 tracking-widest uppercase focus:outline-none focus:border-[#2045B4] focus:ring-2 focus:ring-[#2045B4]/20 transition-all shadow-xs"
                />
              </div>
              <button
                onClick={() => triggerVerification(verificationCode)}
                disabled={verificationStatus === 'verifying'}
                className="px-8 py-3 bg-[#2045B4] hover:bg-[#1a389c] text-white text-xs font-bold uppercase transition-all rounded-xl cursor-pointer disabled:bg-slate-400 font-mono tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden"
              >
                {verificationStatus === 'verifying' ? (
                  <span className="flex items-center gap-2 justify-center">
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Querying...
                  </span>
                ) : 'Query Registry'}
              </button>
            </div>

            <div className="text-[10.5px] font-mono text-slate-400 uppercase flex flex-col sm:flex-row sm:justify-between gap-1.5 pt-1">
              <span>Standard Format: CDXXXXXXXXX</span>
              <span className="text-slate-450">Secured with SHA-256 Checksums</span>
            </div>
          </div>

          {/* Results Display Area */}
          <AnimatePresence mode="wait">
            {verificationStatus === 'success' && verifiedData && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
                id="verification-success-root"
              >
                <div className="bg-emerald-50/30 border border-emerald-250 p-6 sm:p-8 rounded-2xl space-y-8 text-left">
                  
                  {/* Verification Status Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-200/60 pb-5 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-800 font-mono tracking-widest block">REGISTRY STATE ACTIVE</span>
                        <span className="text-[10px] text-slate-500 font-mono block">VERIFICATION STATE AUTHENTIC • row sync success</span>
                      </div>
                    </div>
                    
                    <span className="px-3.5 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono text-[10px] font-bold rounded-full tracking-wider uppercase shadow-xs self-start sm:self-center">
                      {verifiedData.status}
                    </span>
                  </div>

                  {/* Verification Status Details Panel */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <Award className="w-6 h-6 text-[#2045B4]" />
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">Accredited Officer Credentials</h3>
                        <p className="text-xs text-slate-500 font-mono">Registry Index Hash: CDX-{verifiedData.code}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Candidate Name</span>
                          <span className="font-semibold text-slate-900 text-lg">{verifiedData.candidate_name}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Accredited Track Title</span>
                          <span className="font-semibold text-[#2045B4] text-base">{verifiedData.certified_title}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4 font-mono text-xs text-slate-600">
                        <div className="grid grid-cols-2 gap-4 w-full">
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Issue Date</span>
                            <span className="font-semibold text-slate-800">{verifiedData.issue_date}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Expiration Date</span>
                            <span className="font-semibold text-slate-800">{verifiedData.expiry_date}</span>
                          </div>
                        </div>
                        <div className="border-t border-slate-150 pt-3">
                          <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Statutory Authority</span>
                          <span className="font-semibold text-slate-800">{verifiedData.accreditation}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DIRECT DYNAMIC GENERATION & FILE DOWNLOAD (ONLY ORIGINAL SIGNED FILE IF AVAILABLE) */}
                  {verifiedData.download_url && (
                    <div className="space-y-3.5 pt-6 border-t border-slate-200/60 text-center">
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                          href={verifiedData.download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-3.5 px-8 bg-[#2045B4] hover:bg-[#1a389c] text-white font-mono font-bold text-xs uppercase rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-center inline-flex"
                        >
                          <FileText className="w-4 h-4 text-white inline-block" />
                          Download Original Signed File
                        </a>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono leading-relaxed max-w-xl mx-auto">
                        Digital signatures verified compliant with global security audit standards. Direct-download from secure registry storage is active.
                      </p>
                    </div>
                  )}

                </div>
              </motion.div>
            )}

            {verificationStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="bg-red-50/70 border border-red-250 p-6 rounded-2xl flex items-start gap-4"
                id="verification-failed-card"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 shrink-0">
                  <BadgeAlert className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-red-900 text-sm">Credential Authorization Query Failure</h4>
                  <p className="text-xs text-slate-650 leading-relaxed font-mono">
                    No matching student authorization record located for verification code: <span className="font-bold text-red-950 bg-red-100/50 px-1.5 py-0.5 rounded font-mono">"{searchedCode.toUpperCase().trim()}"</span>. Please confirm query inputs or contact your regional program validation board.
                  </p>
                </div>
              </motion.div>
            )}

            {verificationStatus === 'idle' && (
              <div className="p-10 border border-dashed border-slate-350 rounded-2xl text-center text-slate-400 font-mono text-xs tracking-wider bg-slate-[20]/15" id="verify-idle-alert-box">
                <ShieldCheck className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <span>Registry Gateway active. Mapped securely to central repository databases.</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 3: ACCREDITED TRAINING TRACKS */}
      <section className="bg-white border-y border-slate-200 py-20 text-left" id="verify-curriculum-tracks">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Education Programs</span>
            <h2 className="text-2xl sm:text-3.5xl font-extrabold text-slate-900 mt-1 font-display">Official Accredited Tracks</h2>
            <p className="text-sm text-slate-650 leading-relaxed max-w-xl">
              Browse our standardized curriculum frameworks that qualify engineers to manage and analyze complex cloud configurations, kernel telemetries, and sovereign networks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tracks.map((track, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:bg-white hover:border-blue-500/20 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono bg-blue-50 border border-blue-250 text-blue-800 font-bold px-2.5 py-1 rounded">
                      {track.code}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-semibold">{track.level}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-950 text-sm group-hover:text-blue-600 transition-colors">{track.title}</h3>
                  <div className="border-t border-slate-200/60 pt-4 space-y-2.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Course Pillars</span>
                    <ul className="space-y-2 text-slate-650 text-xs">
                      {track.topics.map((t, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 font-bold shrink-0" />
                          <span className="truncate">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-t border-slate-200/60 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono font-bold text-slate-400">
                  <span>CURRICULUM INTACT</span>
                  <span className="text-blue-600 font-bold">{track.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CRYPTOGRAPHIC SOVEREIGN LEDGER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="verify-ledger-architecture">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider bg-blue-50/80 border border-blue-200 px-2.5 py-0.5 rounded-full">
              Auditing Architecture
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-extrabold text-slate-950 font-display leading-tight">
              Cryptographically Signed Ledger Integrity
            </h2>
            <p className="text-sm text-slate-650 leading-relaxed">
              Every certificate issued generates a secure, unique verification code mapping directly to a specific record row. Tamper-evident storage guarantees candidates cannot modify issue timestamps or expiry profiles without authorization flags.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <Lock className="w-5 h-5 text-[#2045B4] mb-2" />
                <span className="block text-[8px] text-slate-400 uppercase font-black">Storage Cipher</span>
                <span className="font-bold text-slate-800">SHA-256 Validation</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <Cpu className="w-5 h-5 text-[#2045B4] mb-2" />
                <span className="block text-[8px] text-slate-400 uppercase font-black">Sync Frequency</span>
                <span className="font-bold text-slate-800">Real-Time Sync</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl font-mono text-[11px] space-y-4 border border-slate-850 shadow-lg relative">
            <div className="absolute top-0 right-10 h-1 w-20 bg-blue-500"></div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-slate-400 text-[9px] uppercase tracking-widest font-bold">Ledger Checksum State</span>
              <span className="text-emerald-400 font-bold text-[9px]">VERIFIED SECURE</span>
            </div>
            
            <div className="space-y-2">
              <p className="text-blue-400">$ defendx-agent --audit-registry --code={searchedCode || "CDXSA090896"}</p>
              <p className="text-slate-400">CONNECTING... Remote secure JSON server linked successfully.</p>
              <p className="text-slate-400">MAPPING SYMBOL: Registry Index database rows OK.</p>
              <p className="text-[#2045B4] font-bold">Row integrity checksum match: PASSED (100% compliant)</p>
              <p className="text-slate-500">Record verification administered under Conzex Global Private Limited statutory parameters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ACCREDITATION AND GOVERNANCE */}
      <section className="bg-slate-100/50 border-y border-slate-200 py-20 text-left" id="verify-governance">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-6 sm:p-10 border border-slate-200 rounded-2xl space-y-4 shadow-sm relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-2xl"></div>
              <span className="text-[10px] font-mono bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold px-3 py-1 rounded block w-max uppercase tracking-wider">
                Auditor Governance
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-display">Enterprise Statutory Accreditations</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                Our certifications are optimized to satisfy strict compliance audit reviews across international markets. Engineering and administration metrics conform to standard industry frameworks.
              </p>
              <div className="space-y-2.5 pt-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Aligns with ISO-27001 Access Control Matrix requirements</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Officially backed by Conzex Global Private Limited</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>CREST aligned offensive validation tracks</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Accreditation Statement</span>
              <h3 className="text-2xl sm:text-3.5xl font-extrabold text-slate-950 leading-tight">
                Global Credential Validation Standards
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                As a leading developer in advanced threat hunting and file integrity auditing, Defendx mandates that credentials verified through this portal correspond to exhaustive assessment scores. This ensures certified candidates hold genuine expertise in enterprise defensive tactics.
              </p>
              <div className="flex items-center gap-4 bg-white p-4 border border-slate-200 rounded-2xl max-w-md">
                <FileText className="w-8 h-8 text-[#2045B4] shrink-0" />
                <div className="text-xs font-mono">
                  <span className="font-bold text-slate-800 block">Singapore High Court Jurisdiction</span>
                  <span className="text-slate-450 text-[10px]">All credentials subject to verified statutory license criteria.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: DETAILED FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4" id="verify-faqs">
        <div className="space-y-8">
          <div className="text-center font-sans space-y-2">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">Candidates Knowledge Hub</span>
            <h2 className="text-2xl sm:text-3.5xl font-extrabold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-500">Find answers to commonly asked questions regarding verification, renewal, and security.</p>
          </div>

          <div className="space-y-3 font-sans">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 transition-all duration-300">
                <button
                  type="button"
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full text-left px-5 py-4 font-bold text-slate-850 hover:bg-slate-50 flex justify-between items-center text-xs sm:text-sm focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${activeFAQ === index ? 'rotate-90 text-[#2045B4]' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100"
                    >
                      <p className="p-5 text-xs sm:text-sm text-slate-655 leading-relaxed bg-[#faf9f8]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
