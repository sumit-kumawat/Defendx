import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Search, Check, Copy, Flame, Terminal, Play, AlertTriangle, Cpu } from 'lucide-react';

export default function CtiPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'persistence' | 'execution' | 'credentials' | 'exfiltration'>('all');
  const [iocQuery, setIocQuery] = useState('');
  const [iocResult, setIocResult] = useState<{ status: 'idle' | 'clean' | 'threat'; score?: number; signature?: string }>({ status: 'idle' });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const testThreatIndicators = [
    { code: "T1098.004", name: "SSH Authorized Keys Modify", cat: "persistence", risk: "HIGH", severity: "amber" },
    { code: "T1059.004", name: "Unix Shell execution fork", cat: "execution", risk: "CRITICAL", severity: "red" },
    { code: "T1003.011", name: "Kernel memory payload export", cat: "credentials", risk: "CRITICAL", severity: "red" },
    { code: "T1041.002", name: "Socket Exfiltration Tunnel", cat: "exfiltration", risk: "MEDIUM", severity: "slate" }
  ];

  const handleIocSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!iocQuery.trim()) return;

    const query = iocQuery.toLowerCase().trim();
    if (query.includes('198.51.100.42') || query.includes('malware') || query.includes('sha')) {
      setIocResult({
        status: 'threat',
        score: 98,
        signature: 'Trojan.Unix.Shellfork.dx42'
      });
    } else {
      setIocResult({
        status: 'clean'
      });
    }
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-12 py-8 text-left font-sans" id="cti-page-content">
      {/* SECTION 1: HERO - INTERACTIVE ATTACK MODEL */}
      <section className="bg-white border-b border-slate-200 py-16 text-left relative overflow-hidden" id="cti-hero-interactive">
        <div className="absolute inset-0 bg-[#faf9f8] opacity-75 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left-side CTI Info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold tracking-wider uppercase rounded">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                Operational CTI Feed
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Cyber Threat Intelligence (CTI) Hub
              </h1>
              <p className="text-sm sm:text-base text-slate-650 leading-relaxed max-w-xl">
                Intercept zero-day compromises. Our thread modeling algorithms parse hacker tactical procedures, cataloging hostile IP domains and signature structures directly into your dashboard.
              </p>
              
              <div className="p-4 bg-amber-50/70 border border-amber-200 text-amber-900 text-xs rounded-xl flex gap-3 items-center">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                <p>
                  <strong>Defendx Labs Advisory</strong>: Active unauthorized privilege escalation telemetry flagged across Singapore datacenters. Run <code className="bg-amber-100 border border-amber-200 px-1 py-0.5 rounded font-mono font-bold text-[10px]">defendx-agent --compliance-check</code> inside host servers.
                </p>
              </div>
            </div>

            {/* Right-side: Interactive IOC Query cockpit */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-xl shadow-md font-mono text-xs text-slate-700 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#2045B4]"></div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <Terminal className="w-4 h-4 text-[#2045B4]" />
                  <span>IOC_INDICATOR_LOOKUP</span>
                </div>
                <span className="text-[10px] bg-blue-50 text-[#2045B4] font-bold px-2 py-0.5 rounded">REAL-TIME</span>
              </div>

              <form onSubmit={handleIocSearch} className="space-y-3">
                <label className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Query IP Address / Malware Signature Hash:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. 198.51.100.42"
                    value={iocQuery}
                    onChange={(e) => setIocQuery(e.target.value)}
                    className="p-2.5 bg-slate-50 font-mono text-slate-800 border border-slate-205 rounded-lg text-xs w-full focus:bg-white focus:border-[#2045B4] focus:outline-none"
                  />
                  <button type="submit" className="px-4 py-2 bg-[#2045B4] hover:bg-[#1a389c] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer">Search</button>
                </div>
                <div className="text-[10px] text-slate-500">Test with: <span className="text-blue-650 underline cursor-pointer select-all">198.51.100.42</span></div>
              </form>

              {/* Dynamic feedback pane */}
              <div className="mt-4 border-t border-slate-100 pt-4">
                {iocResult.status === 'idle' && (
                  <p className="text-slate-400 italic text-[11px] text-center">Standby. Enter an IOC parameter code above to scanner details.</p>
                )}
                {iocResult.status === 'clean' && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-center text-[11px]">
                    ● No known hazards. Query is green and cleared on global feeds.
                  </div>
                )}
                {iocResult.status === 'threat' && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-[11px] space-y-1">
                    <p className="font-bold text-red-700 flex items-center gap-1">⚠️ CRITICAL THREAT DETECTED</p>
                    <p className="flex justify-between"><span>Risk Index:</span><span className="font-bold text-red-700">{iocResult.score}/100</span></p>
                    <p className="flex justify-between"><span>Malware Class:</span><span>{iocResult.signature}</span></p>
                    <p className="text-[10px] text-slate-500">Threat vectors isolated inside standard Defendx rulesets.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: MITRE ATT&CK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="cti-mitre-taxonomy-matrix">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b pb-4 mb-6 border-slate-200 gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">MITRE ATT&amp;CK Matrix Taxonomy</h3>
            <p className="text-slate-505 text-xs">Analyze dynamic system call interception patterns organized by vector classification.</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['all', 'persistence', 'execution', 'credentials', 'exfiltration'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-3 py-1 text-xs font-mono rounded border capitalize transition-all ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testThreatIndicators.filter(item => activeCategory === 'all' || item.cat === activeCategory).map((item, i) => (
            <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl relative hover:border-amber-500/30 hover:shadow-md transition-all group">
              <span className="text-blue-600 font-mono font-bold text-xs tracking-wider block mb-1">{item.code}</span>
              <h4 className="text-xs font-bold text-slate-900 mb-2 truncate">{item.name}</h4>
              <div className="flex justify-between items-center text-[10px] border-t pt-2.5 mt-2.5 border-slate-100 font-mono">
                <span className="text-slate-400 capitalize">{item.cat}</span>
                <button
                  onClick={() => handleCopyCode(item.code, i)}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  {copiedIndex === i ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: INTAKE CHECKBOXES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left bg-white p-6 border border-slate-200 rounded-xl shadow-xs" id="cti-ingestion">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">Ingestion Decoders Applied</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            "Mitre procedure correlation baseline",
            "Host-intrusion remediation blueprints",
            "SHA validation signature sets",
            "Automated isolate port matrices"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: FEEDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="cti-feeds-status">
        <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">Active Threat Feeds</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { source: "Defendx Lab Feed", update: "12 seconds ago", count: "4,902 Hostile IPs Logged" },
            { source: "CISA US-CERT Bulletin", update: "1 hour ago", count: "12 strategic bullet advisories" },
            { source: "Joint Threat Matrix Initiative", update: "3 minutes ago", count: "302 hashes synchronized" }
          ].map((feed, idx) => (
            <div key={idx} className="p-5 bg-[#faf9f8] border border-slate-200 rounded-xl">
              <span className="font-bold text-slate-800 block text-xs mb-1">{feed.source}</span>
              <div className="text-[11px] text-slate-500">Sync status: <span className="text-emerald-650 font-bold font-mono">{feed.update}</span></div>
              <div className="font-mono text-xs text-blue-600 font-bold mt-3 border-t pt-3 border-slate-200/60">{feed.count}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: THREAT ACTOR INTELLIGENCE PROFILE */}
      <section className="bg-white border-y border-slate-200 py-12 text-left" id="cti-actor-intelligence">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">APT Group Catalogs</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">APT Hostile Target Profiling</h3>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
              Defendx correlates live shell activities with known indicators of compromise (IoC) linked to sophisticated Advanced Persistent Threat (APT) groups. Our database registers automated signatures of memory dump files, persistent SSH key modifications, and domain exfiltration socks.
            </p>
            <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-slate-500 pt-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="block font-bold text-slate-800 font-sans">Active Profiles Linked</span>
                <span className="text-xs text-[#2045B4] font-bold font-mono">140+ APT signatures</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="block font-bold text-slate-800 font-sans">Indicators Verified</span>
                <span className="text-xs text-emerald-650 font-bold font-mono">12,000+ Verified daily</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 space-y-3 font-sans bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-850 uppercase tracking-wide">Threat Hunting Severity Allocation</h4>
            <ul className="space-y-2.5 text-xs text-slate-650 leading-relaxed">
              <li className="flex items-center gap-1.5"><ShieldAlert className="w-4 h-4 text-red-600 shrink-0" /><strong>Critical (Red)</strong>: Unauthorized kernel module write. Immediate Sandbox bounds isolation.</li>
              <li className="flex items-center gap-1.5"><ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" /><strong>High (Amber)</strong>: SSH file system modification. Alert standard syslogs.</li>
              <li className="flex items-center gap-1.5"><ShieldAlert className="w-4 h-4 text-slate-600 shrink-0" /><strong>Medium (Slate)</strong>: Active socket tunnel port. Port bounds suspended.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 6: CTI TECHNICAL OPERATIONS GUIDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6 pb-8" id="cti-operations-faq">
        <h3 className="text-base font-bold text-slate-900 font-display uppercase tracking-wider">Cyber Threat Intelligence Best Practices</h3>
        <div className="grid md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-650">
          <div className="p-5 bg-[#faf9f8] border border-slate-200 rounded-lg space-y-2">
            <h4 className="font-bold text-slate-900">Immediate Controlled Sandbox Remediations</h4>
            <p className="text-xs leading-relaxed text-slate-605">
              When a malicious fork signature matches MITRE Ref T1059, the Defendx agent automatically shuts down execution pathways, isolating local memory sockets while retaining forensics data logs.
            </p>
          </div>
          <div className="p-5 bg-[#faf9f8] border border-slate-200 rounded-lg space-y-2">
            <h4 className="font-bold text-slate-900">Encrypted Local Database Security Rules</h4>
            <p className="text-xs leading-relaxed text-slate-605">
              To prevent indicators tampering, our agent stores locally harvested threat definitions inside heavily encrypted JSON or SQLite storage matrices, signed with Conzex private keys.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
