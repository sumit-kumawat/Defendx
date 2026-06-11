import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Terminal, 
  Cpu, 
  Layers, 
  ExternalLink, 
  Check, 
  Server, 
  Sliders, 
  Activity, 
  Lock,
  ArrowRight
} from 'lucide-react';

interface PlatformTabProps {
  onNavigateToVerify: () => void;
  onRequestTrialScroll: () => void;
}

export default function PlatformTab({ onNavigateToVerify, onRequestTrialScroll }: PlatformTabProps) {
  // Terminal simulation hooks
  const [activeCMD, setActiveCMD] = useState<'status' | 'threat' | 'audit'>('status');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Defendx SIEM Host Agent v4.12.0 core initialized.",
    "Bypassing outbound proxy: Local SQL fallback active.",
    "Secure Telemetry Port 3000 mapped successfully.",
    "Status: OPERATIONAL | System load: 0.12%"
  ]);

  // Pricing calculator hooks
  const [nodesCount, setNodesCount] = useState<number>(150);
  const [deployType, setDeployType] = useState<'cloud' | 'onprem'>('cloud');

  const executeCMD = (cmd: 'status' | 'threat' | 'audit') => {
    setActiveCMD(cmd);
    if (cmd === 'status') {
      setTerminalLogs([
        "defendx-agent --status",
        "STATUS: ACTIVE (1,482 Active nodes detected)",
        "INTEGRITY METRICS: Clear",
        "DATABASE ENGINES: SQLite Local DB synchronized",
        "OWNED BY: Conzex Global Private Limited"
      ]);
    } else if (cmd === 'threat') {
      setTerminalLogs([
        "defendx-agent --mitre-scan",
        "ALERT: Intercepted privilege mutation in temporary folder",
        "RESOLVED: Isolated shell spawn successfully",
        "MITRE T1059 Execution thwarted",
        "STATUS: Secure"
      ]);
    } else if (cmd === 'audit') {
      setTerminalLogs([
        "defendx-agent --audit",
        "COMPLIANCE STATEMENT: Approved",
        "STANDARDS: ISO-27001, SOC2, HIPAA compliant",
        "AUDIT WINDOW: 100% active coverage"
      ]);
    }
  };

  return (
    <div className="space-y-16 py-8" id="platform-page-content">
      
      {/* SECTION 1: HERO / PRODUCT HIGHLIGHT */}
      <section className="bg-white border-b border-slate-200 py-16 text-left relative overflow-hidden" id="platform-section-hero">
        <div className="absolute inset-0 bg-[#faf9f8] opacity-70 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-100/50 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-250 text-[#2045B4] text-xs font-bold tracking-wider uppercase rounded-sm">
                <Shield className="w-3.5 h-3.5" />
                Enterprise Security Core
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Defendx Consolidated SIEM &amp; XDR Platform
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                A unified cyber threat monitoring and security automation workspace owned and powered by Conzex Global Private Limited. Defendx monitors privilege integrity, correlates host events, and centralizes critical corporate audit intelligence inside localized private infrastructures.
              </p>

              <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
                <div className="bg-white p-4 rounded-sm border border-slate-200">
                  <span className="block text-[#2045B4] text-xl font-bold">25.4 Gbps</span>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Ingestion Flow</span>
                </div>
                <div className="bg-white p-4 rounded-sm border border-slate-200">
                  <span className="block text-[#2045B4] text-xl font-bold">&lt; 1.5s</span>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Threat Query SLA</span>
                </div>
                <div className="bg-white p-4 rounded-sm border border-slate-200">
                  <span className="block text-[#2045B4] text-xl font-bold">1,482+</span>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Sovereign Nodes</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onNavigateToVerify}
                  className="px-6 py-3 bg-[#2045B4] hover:bg-[#1a389c] text-white text-xs font-bold rounded-sm shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                  id="hero-verify-redirect-btn"
                >
                  Certification Lookup
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onRequestTrialScroll}
                  className="px-6 py-3 bg-[#f3f2f1] border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold rounded-sm transition-colors cursor-pointer"
                  id="hero-evaluation-btn"
                >
                  Request Product Evaluation
                </button>
              </div>
            </div>

            {/* Right Card: Replaced Old Registry with Premium Microsoft Style Contact Box */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 p-6 rounded-sm shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2045B4]"></div>
                
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#2045B4]" />
                  Secure Evaluation Sandbox
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Experience Defendx with localized relational storage support. Request trial credentials below or use the verification gateway to query certified operator statuses instantly.
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-[#faf9f8] rounded-sm border border-slate-150">
                    <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Verification Registry Path</span>
                    <span className="text-xs font-mono font-bold text-slate-700">defendx.io/verify</span>
                  </div>
                  
                  <div className="p-3 bg-[#faf9f8] rounded-sm border border-slate-150">
                    <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Verification Pattern</span>
                    <span className="text-xs font-mono font-bold text-[#2045B4]">CDXXXXXXXXX</span>
                  </div>

                  <button 
                    onClick={onNavigateToVerify}
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-[#2045B4] text-xs font-bold font-mono transition-colors rounded-sm cursor-pointer border border-blue-200 flex items-center justify-center gap-1.5"
                    id="hero-check-credentials-btn"
                  >
                    Launch Certification Gateway
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE TERMINAL EVENT STREAM SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6" id="platform-section-terminal">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 border-slate-200">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#2045B4] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 border border-blue-200 rounded-sm">
              Sovereign Logging CLI
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Lightweight Host Agent Telemetry Ingest</h2>
          </div>
          <div className="flex gap-2 mt-3 md:mt-0">
            <button
              onClick={() => executeCMD('status')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm border transition-colors ${activeCMD === 'status' ? 'bg-[#2045B4] text-white border-[#2045B4]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              defendx-agent --status
            </button>
            <button
              onClick={() => executeCMD('threat')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm border transition-colors ${activeCMD === 'threat' ? 'bg-[#2045B4] text-white border-[#2045B4]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              defendx-agent --mitre-scan
            </button>
            <button
              onClick={() => executeCMD('audit')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm border transition-colors ${activeCMD === 'audit' ? 'bg-[#2045B4] text-white border-[#2045B4]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              defendx-agent --audit
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our high-velocity daemon integrates cleanly at kernel levels without performance degradation. Simulated console endpoints communicate with encrypted local SQLite datasets seamlessly.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#faf9f8] p-4 rounded-sm border border-slate-200">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Encryption Standard</span>
                <span className="text-xs font-bold text-slate-800">AES-GCM-256 TLS 1.3</span>
              </div>
              <div className="bg-[#faf9f8] p-4 rounded-sm border border-slate-200">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Ownership Authority</span>
                <span className="text-xs font-bold text-slate-800">Conzex Global Pvt Ltd</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-sm font-mono text-[11px] text-slate-300 relative shadow-md">
            <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-[10px] text-slate-500 ml-1">defendx-cli@terminal-core</span>
            </div>
            <div className="space-y-1.5 min-h-[140px]">
              {terminalLogs.map((log, index) => (
                <p 
                  key={index} 
                  className={
                    log.startsWith('ALERT:') || log.startsWith('RESOLVED:')
                      ? 'text-yellow-400 font-bold'
                      : log.startsWith('COMPLIANCE') || log.includes('Approved') || log.includes('Synchronized')
                      ? 'text-emerald-400 font-bold'
                      : log.startsWith('defendx-agent')
                      ? 'text-blue-300 font-bold'
                      : 'text-slate-350'
                  }
                >
                  {log.startsWith('defendx-agent') ? `$ ${log}` : log}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 3D-EFFECT PERSPECTIVE CORE PILLARS */}
      <section className="bg-white border-y border-slate-200 py-16 text-left" id="platform-section-pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Operational Pillars</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Consolidated In-Depth Security Architecture</h2>
            <p className="text-slate-550 text-xs sm:text-sm mt-2">
              Defendx correlates indicators at every structural node, validating file integrity against reliable baselines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Card 1: 3D perspective transition on hover */}
            <motion.div 
              whileHover={{ scale: 1.02, rotateY: 1.5, rotateX: 1.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 bg-[#faf9f8] rounded-sm border border-slate-200 shadow-xs flex flex-col justify-between"
              id="pillar-aggregator-card"
            >
              <div>
                <div className="w-10 h-10 bg-blue-105 rounded-sm flex items-center justify-center text-[#2045B4] mb-4">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Audit Log Aggregator</h3>
                <p className="text-xs text-slate-550 leading-relaxed mb-4">
                  Consolidate server events, Docker container traces, and application telemetry lines into a coherent query pipeline.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block border-t pt-3 mt-4">CC6.3 Compliance Ready</span>
            </motion.div>

            {/* Card 2: 3D perspective transition on hover */}
            <motion.div 
              whileHover={{ scale: 1.02, rotateY: -1.5, rotateX: 1.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 bg-[#faf9f8] rounded-sm border border-slate-200 shadow-xs flex flex-col justify-between"
              id="pillar-hunting-card"
            >
              <div>
                <div className="w-10 h-10 bg-amber-100 rounded-sm flex items-center justify-center text-amber-800 mb-4">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Threat Hunting &amp; XDR</h3>
                <p className="text-xs text-slate-550 leading-relaxed mb-4">
                  Track hostile privilege extensions, block rogue shell commands, and isolate malicious nodes in microseconds.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block border-t pt-3 mt-4">Incident response SLA</span>
            </motion.div>

            {/* Card 3: 3D perspective transition on hover */}
            <motion.div 
              whileHover={{ scale: 1.02, rotateY: 1.5, rotateX: -1.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 bg-[#faf9f8] rounded-sm border border-slate-200 shadow-xs flex flex-col justify-between"
              id="pillar-integrity-card"
            >
              <div>
                <div className="w-10 h-10 bg-emerald-100 rounded-sm flex items-center justify-center text-emerald-800 mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">File Integrity Baseline</h3>
                <p className="text-xs text-slate-550 leading-relaxed mb-4">
                  Automatically sign critical system folders with clean SHA2 hashes, verifying file system health automatically.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block border-t pt-3 mt-4">PCI-DSS compliance approved</span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 4: OPERATIONAL COCKPIT / INTAKE VISUAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8" id="platform-section-analytics">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Cockpit Telemetry</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Real-Time Event Processing Performance</h2>
            <p className="text-xs sm:text-sm text-slate-605 leading-relaxed">
              Observe unified ingestion speeds across multi-region databases. All events are passed through our custom validation routines, maintaining strict sovereign control standards.
            </p>
            <div className="space-y-2 border-r pr-5">
              <div className="flex justify-between items-center text-xs pb-1 border-b">
                <span className="text-slate-500">Query Parsing Limit:</span>
                <span className="font-mono font-semibold text-slate-800">100,000 EPS</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-1 border-b">
                <span className="text-slate-500">Local Cache Delay:</span>
                <span className="font-mono font-semibold text-slate-800">0.02 Milliseconds</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-1">
                <span className="text-slate-500">Relational SQLite Integrity:</span>
                <span className="font-mono font-semibold text-[#2045B4]">Encrypted Standby</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-sm border border-slate-205 shadow-xs space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase">Live Log Ingestion Matrix</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span>Standard Syslog Stream</span>
                  <span className="font-bold">96%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span>Auditd Event Ingest</span>
                  <span className="font-bold">88%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span>Relational SQLite Handshakes</span>
                  <span className="font-bold">100%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PRIVATE CLOUD & PRIVATE PARAMETERS */}
      <section className="bg-[#faf9f8] border-y border-slate-200 py-16 text-left" id="platform-section-privacy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-xs space-y-4">
              <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-sm uppercase">
                Sovereign Private Deployments
              </span>
              <h3 className="text-xl font-bold text-slate-900">Physically Isolated Air-Gapped Controls</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Critical corporate environments warrant bulletproof isolation. Defendx ships with Kubernetes Helm orchestration templates deployable within strict localized arrays or private sovereign datacenters.
              </p>
              <div className="space-y-2.5 text-xs text-slate-700 font-mono">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Isolated standalone binaries</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Localized secure SQLite fallback</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Encrypted credential parameters</span>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Product Baseline Guarantee</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Attested Compliances for Sovereign Infrastructure
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Our architecture aligns with the highest international protocols. As a proprietary platform owned by Conzex Global Private Limited, Defendx is engineered to pass rigorous external validation audits with minimum human intervention.
              </p>
              <div className="p-4 bg-white rounded-sm border border-slate-200 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[8px] font-mono font-bold text-slate-400 uppercase block">Compliance audit status</span>
                  <span className="text-xs font-bold text-slate-700">ISO/IEC 27001 Auditor Control Configuration Approved</span>
                </div>
                <Shield className="w-7 h-7 text-[#2045B4]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: EVALUATION PRICING ESTIMATOR */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6" id="platform-section-pricing">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-sm">
            Calculator
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Interactive Telemetry Quote Estimator</h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto">
            Calculate your license expenditure depending on your required server and endpoint nodes count.
          </p>
        </div>

        <div className="bg-[#faf9f8] p-6 sm:p-8 rounded-sm border border-slate-200 text-left space-y-4">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 font-mono uppercase mb-2">Endpoint nodes count:</label>
              <input 
                type="range" 
                min="10" 
                max="1000" 
                step="10"
                value={nodesCount}
                onChange={(e) => setNodesCount(Number(e.target.value))}
                className="w-full accent-[#2045B4] cursor-pointer"
              />
              <span className="block text-right text-xs font-mono text-[#2045B4] mt-1 font-bold">
                {nodesCount} Protected Node Agents
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 font-mono uppercase mb-2">Deployment environment type:</label>
              <select
                value={deployType}
                onChange={(e) => setDeployType(e.target.value as 'cloud' | 'onprem')}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-sm text-xs font-bold text-slate-700"
              >
                <option value="cloud">Managed Hybrid Cloud SaaS</option>
                <option value="onprem">On-Premises High-Availability Array</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-white rounded-sm border border-slate-200 flex justify-between items-center">
            <span className="text-slate-600 text-xs sm:text-sm font-semibold">Estimated Licensing Cost:</span>
            <span className="text-lg font-mono font-bold text-[#2045B4]">
              ${(nodesCount * (deployType === 'cloud' ? 3.5 : 2.0)).toFixed(0)} <span className="text-xs font-normal text-slate-400">/ mo</span>
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
