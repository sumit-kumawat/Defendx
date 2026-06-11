import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Key, Network, Activity, Server, Sliders, Cpu, Check, ArrowRight, Video, Flame, Landmark, Copy, CheckCircle2 } from 'lucide-react';
import HomeHeroVideo from './HomeHeroVideo';

interface PlatformPageProps {
  onNavigateToVerify: () => void;
  onNavigateToTrial: () => void;
  onNavigateToPricing: () => void;
}

export default function PlatformPage({ onNavigateToVerify, onNavigateToTrial, onNavigateToPricing }: PlatformPageProps) {
  // Terminal commands simulator states
  const [activeCMD, setActiveCMD] = useState<'status' | 'mitre-scan' | 'compliance-check'>('status');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Defendx SIEM Core Daemon v4.12.0-Production",
    "Initializing Secure Telemetry Handshake on port :3000...",
    "Local system ISO-27001 auditing context loaded successfully.",
    "Active rules matched: 1,402. System is clean."
  ]);
  const [copiedLine, setCopiedLine] = useState(false);

  // Ingestion metrics rate states
  const [nodeRange, setNodeRange] = useState(120);

  const executeCMD = (cmd: 'status' | 'mitre-scan' | 'compliance-check') => {
    setActiveCMD(cmd);
    if (cmd === 'status') {
      setTerminalLogs([
        "$ defendx-agent --status",
        "DEFENDX-MANAGER: Active (Running)",
        "CONNECTED AGENTS: 1,482 Active Over Security Fabric",
        "DATABASE ENGINES: High-Availability SQLite Cluster Active",
        "INTEGRITY STATUS: SECURE (SOC2-Audit Compliance Passed)",
        "OWNERSHIP ID: Conzex Global Private Limited"
      ]);
    } else if (cmd === 'mitre-scan') {
      setTerminalLogs([
        "$ defendx-agent --mitre-scan",
        "ALERT: Initiating controlled threat vector analysis...",
        "MALICIOUS TELEMETRY DETECTED: Unauthorized shell fork active",
        "MITRE ATT&CK REF: T1059.004 Unix Execution Attempted",
        "AUTOMATED REMEDIATION ACTION: Port bounds isolated, thread suspended",
        "SECURE RECTIFICATION: Threat successfully contained within sandbox"
      ]);
    } else if (cmd === 'compliance-check') {
      setTerminalLogs([
        "$ defendx-agent --compliance-check",
        "COMPLIANCE REPORT MODULE:",
        "------------------------------",
        "ISO/IEC 27001 Log Control Audit:   VERIFIED APPROVED",
        "SOC2 CC7.2 Access Monitoring:      VERIFIED APPROVED",
        "NIST SP 800-53 Metrics Coverage:   VERIFIED APPROVED",
        "Enterprise network matches baseline criteria."
      ]);
    }
  };

  const copyStandardLine = () => {
    navigator.clipboard.writeText("Sovereign corporate security log analysis and FIM monitoring platform. Owned and managed by Conzex Global Private Limited. Managed proprietary platform.");
    setCopiedLine(true);
    setTimeout(() => setCopiedLine(false), 2000);
  };

  return (
    <div className="space-y-16 py-8 text-left font-sans" id="platform-page">
      
      {/* SECTION 1: ELEGANT LIGHT HERO */}
      <section className="bg-white border-b border-slate-250 py-16 text-left relative overflow-hidden" id="homepage-hero">
        <div className="absolute inset-0 bg-[#faf9f8] opacity-80 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/35 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-100/40 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Information */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-250 text-blue-600 text-xs font-bold tracking-wider uppercase rounded">
                <Shield className="w-3.5 h-3.5" />
                Enterprise Security Core
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight font-display">
                Defendx Consolidated SIEM &amp; XDR Platform
              </h1>

              {/* HIGHLY INTERACTIVE SOVEREIGN LINE BOX */}
              <div 
                onClick={copyStandardLine}
                className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl relative group shadow-sm transition-all duration-300 cursor-pointer text-xs md:text-sm text-slate-700 leading-relaxed max-w-xl pr-12"
                id="interactive-sovereign-banner"
                title="Click to copy official attestation code"
              >
                <div className="absolute top-3.5 right-3.5 text-slate-400 group-hover:text-blue-600 transition-colors">
                  {copiedLine ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </div>
                <p className="font-semibold flex items-center gap-2 mb-1.5 text-[#2045B4]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  Sovereign Corporate Security Attestation
                </p>
                <p className="font-mono text-[11px] md:text-xs">
                  Sovereign corporate security log analysis and FIM monitoring platform. Owned and managed by Conzex Global Private Limited. Fully protected enterprise system.
                </p>
                {copiedLine && <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-1">Copied Statement!</span>}
              </div>

              {/* Primary Key metrics */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-lg font-mono">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="block text-[#2045B4] text-xl font-bold">25.4 Gbps</span>
                  <span className="text-[9px] tracking-wider uppercase text-slate-400">Ingestion Flow</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="block text-[#2045B4] text-xl font-bold">&lt; 1.5s</span>
                  <span className="text-[9px] tracking-wider uppercase text-slate-400">Threat Query SLA</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="block text-[#2045B4] text-xl font-bold">1,482+</span>
                  <span className="text-[9px] tracking-wider uppercase text-slate-400">Sovereign Nodes</span>
                </div>
              </div>

              {/* Action buttons removed per user request */}
            </div>

            {/* Right Column Video Player Embed */}
            <div className="lg:col-span-5" id="hero-interactive-dashboard-card">
              <HomeHeroVideo />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE TERMINAL EVENT STREAM SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6" id="homepage-terminal">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 border-slate-250">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#2045B4] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 border border-blue-200 rounded">
              Sovereign Logging CLI
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1 font-display">Lightweight Host Agent Telemetry Ingest</h2>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3 md:mt-0 font-mono">
            {['status', 'mitre-scan', 'compliance-check'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCMD(cmd as any)}
                className={`px-3 py-1.5 text-[11px] font-bold rounded border transition-all cursor-pointer ${
                  activeCMD === cmd 
                    ? 'bg-[#2045B4] text-white border-[#2045B4]' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                defendx-agent --{cmd}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch font-mono">
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 font-sans text-xs sm:text-sm">
            <p className="text-slate-605 leading-relaxed">
              Our high-velocity daemon integrates cleanly at kernel levels without host system degradation. Simulated console endpoints communicate with encrypted local SQLite databases seamlessly.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-[#faf9f8] p-4 rounded-xl border border-slate-200">
                <span className="text-[9px] text-slate-400 block uppercase font-bold">In-Transit Encryption</span>
                <span className="text-xs font-bold text-slate-800">AES-GCM-256 TLS 1.3</span>
              </div>
              <div className="bg-[#faf9f8] p-4 rounded-xl border border-slate-200">
                <span className="text-[9px] text-slate-400 block uppercase font-bold">Ownership Authority</span>
                <span className="text-xs font-bold text-slate-800">Conzex Global Pvt Ltd</span>
              </div>
            </div>
          </div>

          {/* CLI Display block */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-xl text-[11px] text-slate-300 relative shadow-md select-text">
            <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
              <span className="text-[9px] text-slate-500 ml-1">defendx-cli@terminal-core</span>
            </div>
            <div className="space-y-1.5 min-h-[145px] font-mono">
              {terminalLogs.map((log, index) => (
                <p 
                  key={index} 
                  className={
                    log.startsWith('ALERT:') || log.includes('MUTATION')
                      ? 'text-yellow-400 font-bold'
                      : log.startsWith('CRITICAL:')
                      ? 'text-red-400 font-bold'
                      : log.startsWith('COMPLIANCE') || log.includes('VERIFIED APPROVED') || log.includes('clean')
                      ? 'text-emerald-400 font-bold'
                      : log.startsWith('$')
                      ? 'text-blue-300 font-bold'
                      : 'text-slate-350'
                  }
                >
                  {log}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE PILLARS */}
      <section className="bg-white border-y border-slate-210 py-16 text-left" id="homepage-pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Operational Pillars</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-display">Consolidated In-Depth Security Architecture</h2>
            <p className="text-slate-550 text-xs sm:text-sm mt-2 leading-relaxed">
              Defendx correlates indicators at every structural node, validating file integrity against reliable baselines on secure local registries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <motion.div 
              whileHover={{ scale: 1.015 }}
              className="p-6 bg-[#faf9f8] hover:bg-white rounded-xl border border-slate-200 hover:border-[#2045B4]/30 shadow-xs transition-all flex flex-col justify-between"
              id="pillar-aggregator"
            >
              <div>
                <div className="w-10 h-10 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center text-[#2045B4] mb-4">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 font-display">Audit Log Aggregator</h3>
                <p className="text-xs text-slate-550 leading-relaxed mb-4">
                  Consolidate server events, Docker container traces, and application telemetry lines into a coherent private database query pipeline.
                </p>
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-450 uppercase tracking-widest block border-t pt-3 mt-4">CC6.3 Compliance Ready</span>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              whileHover={{ scale: 1.015 }}
              className="p-6 bg-[#faf9f8] hover:bg-white rounded-xl border border-slate-200 hover:border-[#2045B4]/30 shadow-xs transition-all flex flex-col justify-between"
              id="pillar-hunting"
            >
              <div>
                <div className="w-10 h-10 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center text-amber-800 mb-4">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 font-display">Threat Hunting &amp; XDR</h3>
                <p className="text-xs text-slate-550 leading-relaxed mb-4">
                  Track hostile privilege extensions, block rogue shell commands, and isolate malicious nodes in microseconds under corporate governance rules.
                </p>
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-450 uppercase tracking-widest block border-t pt-3 mt-4">Incident response SLA</span>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              whileHover={{ scale: 1.015 }}
              className="p-6 bg-[#faf9f8] hover:bg-white rounded-xl border border-slate-200 hover:border-[#2045B4]/30 shadow-xs transition-all flex flex-col justify-between"
              id="pillar-integrity"
            >
              <div>
                <div className="w-10 h-10 bg-emerald-50 border border-emerald-250 rounded-lg flex items-center justify-center text-emerald-800 mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 font-display">File Integrity Baseline</h3>
                <p className="text-xs text-slate-550 leading-relaxed mb-4">
                  Automatically sign critical system folders with clean SHA2 hashes, verifying file system health and configurations drift automatically.
                </p>
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-450 uppercase tracking-widest block border-t pt-3 mt-4 font-black">PCI-DSS APPROVED</span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 4: REAL-TIME INGEST GRAPH SIMULATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8" id="homepage-statistics">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Operational Ingestion cockpit</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">Sovereign Performance Handshakes</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Observe unified ingestion speeds. Slide nodes count below to simulate total events per second (EPS) throughput mapped on our local SQLite telemetry engine:
            </p>

            <div className="space-y-4 pt-1 bg-[#faf9f8] p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Adjust Protected Nodes count:</span>
                <span className="font-bold text-[#2045B4] text-xs">{nodeRange} Core Nodes</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={nodeRange}
                onChange={(e) => setNodeRange(Number(e.target.value))}
                className="w-full h-1 accent-blue-600 cursor-pointer"
              />
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 inline-flex border-t border-slate-200 w-full font-mono">
                <div>
                  <span className="block text-[8px] text-slate-400 uppercase">Simulated Throughput</span>
                  <span className="font-bold text-slate-900">{(nodeRange * 120).toLocaleString()} EPS</span>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-400">Database Engine Buffer</span>
                  <span className="font-bold text-[#2045B4]">0.02 Milliseconds</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b pb-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Live telemetry ingestion matrix
            </h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono text-slate-650">
                  <span>Standard Syslog Feed Channel</span>
                  <span className="font-bold text-slate-950">96.2%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: '96.2%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono text-slate-650">
                  <span>Auditd Event Ingest Pipe</span>
                  <span className="font-bold text-slate-950">88.9%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full transition-all duration-300" style={{ width: '88.9%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono text-slate-650">
                  <span>Relational SQLite Caches Synced</span>
                  <span className="font-bold text-slate-950">100%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: AIR-GAPPED ISOLATION compliance guarantee */}
      <section className="bg-[#faf9f8] border-y border-slate-200 py-16 text-left" id="homepage-privacy-standards">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded uppercase block w-max tracking-wider">
                Sovereign Private Deployments
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-display">Physically Isolated Air-Gapped Controls</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Critical corporate environments warrant bulletproof isolation. Defendx ships with Kubernetes Helm orchestration templates deployable within strict localized arrays or private sovereign datacenters.
              </p>
              <div className="space-y-2.5 text-xs text-slate-705 font-mono">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                  <span>Isolated standalone binaries</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                  <span>Localized secure JSON and SQLite caches</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                  <span>Encrypted credential parameters</span>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Product Baseline Guarantee</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight font-display">
                Attested Compliances for Sovereign Infrastructure
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Our architecture aligns with the highest international protocols. As a proprietary platform owned by Conzex Global Private Limited, Defendx is engineered to pass rigorous external validation audits with minimum human intervention.
              </p>
              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[8px] font-mono font-bold text-slate-400 uppercase block">Compliance audit status</span>
                  <span className="text-xs font-bold text-slate-700">ISO/IEC 27001 Auditor Control Configuration Approved</span>
                </div>
                <Shield className="w-7 h-7 text-[#2045B4] shrink-0" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: ENTERPRISE INTEGRATIONS & COMPLIANCE KEYNOTES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8" id="homepage-integrations-faq">
        <div className="border-t pt-10 border-slate-200">
          <div className="max-w-3xl space-y-2 mb-8">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Reference Architecture</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">Ingestion Channels &amp; Framework FAQs</h3>
            <p className="text-slate-550 text-xs sm:text-sm">Technical answers regarding enterprise ingestion latency, SQLite cluster caching databases, and security compliance.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-650">
            <div className="space-y-2.5 p-5 bg-white border border-slate-200 rounded-xl">
              <h4 className="font-bold text-slate-900 font-display">How does Defendx maintain high availability without full relational databases overhead?</h4>
              <p className="text-xs leading-relaxed">
                By utilizing a highly engineered, thread-safe JSON and local cache layer that proxies logs before writing cryptographically validated records. This reduces filesystem lock latency down to fractions of a millisecond.
              </p>
            </div>
            
            <div className="space-y-2.5 p-5 bg-white border border-slate-200 rounded-xl">
              <h4 className="font-bold text-slate-900 font-display">Can we ingest logs from unlisted local syslog networks?</h4>
              <p className="text-xs leading-relaxed">
                Yes. Our lightweight host daemon contains standard decoders matching default Linux auditd pipelines and RFC-5424 syslog criteria, forwarding securely via TLS 1.3 streams.
              </p>
            </div>

            <div className="space-y-2.5 p-5 bg-white border border-slate-200 rounded-xl">
              <h4 className="font-bold text-slate-900 font-display">What are the compliance assurances offered by the Defendx core?</h4>
              <p className="text-xs leading-relaxed">
                We are fully optimized for SOC2 CC7.2 access monitoring protocols and PCI-DSS file integrity baselines. All certification operations are governed under Singapore statutes.
              </p>
            </div>

            <div className="space-y-2.5 p-5 bg-white border border-slate-200 rounded-xl">
              <h4 className="font-bold text-slate-900 font-display">How do candidates obtain printable copies of verified credentials?</h4>
              <p className="text-xs leading-relaxed">
                Once queried on the Sovereign Certification Verification portal, qualified records render print-ready layouts with compliance owner seals from Conzex Global Private Limited.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
