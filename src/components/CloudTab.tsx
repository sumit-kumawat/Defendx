import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cloud, 
  Cpu, 
  Database, 
  ShieldAlert, 
  RefreshCw, 
  Lock, 
  Check, 
  ArrowRight,
  Server,
  Layers,
  Network
} from 'lucide-react';

export default function CloudTab() {
  const [selectedCloudProvider, setSelectedCloudProvider] = useState<'aws' | 'azure' | 'gcp'>('aws');
  const [simulationActive, setSimulationActive] = useState<boolean>(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([
    "Cloud integration pipeline standby.",
    "Click 'Initiate Stream Synchronization' to capture remote JSON payloads."
  ]);

  const runCloudSimulation = () => {
    setSimulationActive(true);
    setSimulationLogs([
      `Initiating ${selectedCloudProvider.toUpperCase()} secure log extraction...`,
      "Verifying encrypted TLS handshake with remote API gateway...",
      "Established pipeline connection to regional log buckets.",
      "Parsing telemetry stream: 1,420 events ingested flawlessly.",
      "Threat matrix: Security state clear."
    ]);
    setTimeout(() => {
      setSimulationActive(false);
    }, 2500);
  };

  return (
    <div className="space-y-16 py-8" id="cloud-page-content">
      
      {/* SECTION 1: CLOUD MONITORING HERO */}
      <section className="bg-white border-b border-slate-200 py-16 text-left relative overflow-hidden" id="cloud-section-hero">
        <div className="absolute inset-0 bg-[#faf9f8] opacity-70 pointer-events-none">
          <div className="absolute top-10 right-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-250 text-[#2045B4] text-xs font-bold tracking-wider uppercase rounded-sm">
                <Cloud className="w-3.5 h-3.5" />
                Multi-Cloud Telemetry
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Unified Cloud Security &amp; Log Ingestion
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Observe, monitor, and lock down heterogeneous cloud clusters effortlessly. Defendx secures complex AWS CloudTrail, Google Cloud Logging, and Azure Monitor pipes, compiling serverless telemetry into a durable database owned entirely by your enterprise.
              </p>

              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    const el = document.getElementById('cloud-simulator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="px-5 py-3 bg-[#2045B4] hover:bg-[#1a389c] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer"
                >
                  Configure Cloud Stream
                </button>
                <a 
                  href="#verify" 
                  className="px-5 py-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold rounded-sm transition-colors text-center"
                >
                  CDX Certified Operators
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#faf9f8] p-6 rounded-sm border border-slate-200 text-left space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">Supported Cloud Sources</h3>
              <div className="space-y-2.5">
                <div className="p-3 bg-white rounded-sm border border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Amazon Web Services (AWS)</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-sm">Active Ingestion</span>
                </div>
                <div className="p-3 bg-white rounded-sm border border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Microsoft Azure Monitor</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-sm">Active Ingestion</span>
                </div>
                <div className="p-3 bg-white rounded-sm border border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Google Cloud Platform (GCP)</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-sm">Active Ingestion</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: STREAM SYNCHRONIZER METRIC ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6" id="cloud-simulator">
        <div className="border-b pb-4 border-slate-200">
          <span className="text-xs font-mono font-bold text-[#2045B4] uppercase">Ingestion Sandbox</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Multi-cloud Pipeline Stream Simulator</h2>
          <p className="text-xs text-slate-500 max-w-xl">
            Choose a major host service provider and trigger a simulation to capture telemetry streams and verify local pipeline validation.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-4 space-y-4 text-left">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Step 1: Select Vendor</span>
            <div className="grid grid-cols-3 gap-2">
              {(['aws', 'azure', 'gcp'] as const).map((prov) => (
                <button
                  key={prov}
                  onClick={() => setSelectedCloudProvider(prov)}
                  className={`py-2 text-xs font-bold uppercase rounded-sm border transition-colors cursor-pointer ${
                    selectedCloudProvider === prov 
                      ? 'bg-[#2045B4] text-white border-[#2045B4]' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {prov}
                </button>
              ))}
            </div>

            <button
              onClick={runCloudSimulation}
              disabled={simulationActive}
              className="w-full py-3 bg-blue-50 hover:bg-blue-105 text-[#2045B4] font-bold text-xs font-mono rounded-sm transition-colors border border-blue-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              {simulationActive ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Network className="w-4 h-4" />}
              Initiate Stream Synchronization
            </button>
          </div>

          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-5 rounded-sm font-mono text-[11px] text-slate-350 relative shadow-sm text-left">
            <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-[10px] text-slate-500 ml-1">remote-cloud-connector // status</span>
            </div>
            <div className="space-y-1.5 min-h-[120px]">
              {simulationLogs.map((log, i) => (
                <p 
                  key={i} 
                  className={
                    log.includes('established') || log.includes('flawlessly')
                      ? 'text-emerald-400 font-semibold'
                      : log.startsWith('Initiating')
                      ? 'text-blue-300 font-semibold'
                      : 'text-slate-300'
                  }
                >
                  {log}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: IAM & PRIVILEGE CREEP RADAR */}
      <section className="bg-white border-y border-slate-200 py-16 text-left" id="cloud-section-iam">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-5">
              <span className="text-xs font-mono font-bold text-[#2045B4] uppercase bg-blue-50 px-2.5 py-1 border border-blue-200 rounded-sm">
                Identity Auditing
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                IAM &amp; Service Account Privilege Creep Diagnostics
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Over-privileged credentials pose immediate security liabilities. Defendx parses live IAM configuration states in Google Cloud IAM, AWS IAM policies, and Azure active role mappings, registering any anomaly before exploitation.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Interactive credential scope minimization filters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Real-time warning trigger on global admin bindings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Automated configuration rollback scripts on infraction</span>
                </div>
              </div>
            </div>

            <div className="bg-[#faf9f8] p-6 rounded-sm border border-slate-200 space-y-4">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase">Live Vulnerability Index</h4>
              <div className="space-y-3 font-mono text-xs text-slate-700">
                <div className="p-3 bg-white rounded border border-slate-200 flex justify-between items-center">
                  <span>Wildcard IAM Action: (s3:*)</span>
                  <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded text-[9px] font-bold">CRITICAL</span>
                </div>
                <div className="p-3 bg-white rounded border border-slate-200 flex justify-between items-center">
                  <span>MFA Disabled for Root</span>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[9px] font-bold">HIGH RISK</span>
                </div>
                <div className="p-3 bg-white rounded border border-slate-200 flex justify-between items-center">
                  <span>Stale Service Accounts &gt; 90 days</span>
                  <span className="px-2 py-0.5 bg-blue-50 text-[#2045B4] border border-blue-200 rounded text-[9px] font-bold">OPTIMIZE</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: SERVERLESS & COLD START METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8" id="cloud-section-serverless">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-[#faf9f8] p-5 rounded-sm border border-slate-200 space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase">Microsecond Inflow Stream</h4>
            <div className="p-4 bg-white rounded-sm border border-slate-150 space-y-2">
              <div className="flex justify-between items-center text-xs pb-1 border-b">
                <span className="text-slate-500 font-mono">Lambda Stream Status</span>
                <span className="text-[#2045B4] font-bold font-mono">100% Ingress</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-1 border-b">
                <span className="text-slate-500 font-mono">Cold-Start Delay Overhead</span>
                <span className="font-mono text-slate-800 font-bold">&lt; 0.04ms</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-mono">Local Standby Integrity</span>
                <span className="text-emerald-600 font-bold font-mono">Approved</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Telemetry Overhead</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Zero-Impact Serverless Inspection</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Analyze serverless actions without performance bottlenecks. Traditional agent solutions lag on cold startups. Defendx logs and validates API events outside execution blocks, guaranteeing negligible latencies.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: TLS HARDENING CODE STRUCTURE */}
      <section className="bg-[#faf9f8] border-y border-slate-200 py-16 text-left" id="cloud-section-hardening">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">Encrypted Transport Specifications</h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              All multi-cloud logs communicate via certified JSON handshakes encrypted with military-grade standards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-slate-150">
              <span className="text-xs font-mono text-slate-500 font-bold">TRANSPORT PROTOCOL</span>
              <span className="text-xs font-mono font-bold text-slate-800">TLS 1.3 // ECDHE-RSA-AES256-GCM-SHA384</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3 border-slate-150">
              <span className="text-xs font-mono text-slate-500 font-bold">SQLite DB STANDBY ENCRYPTION</span>
              <span className="text-xs font-mono font-bold text-slate-800">AES-XTS-256 (FIPS 140-2 Validated)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500 font-bold">SOVEREIGN OWNER REGISTRY</span>
              <span className="text-xs font-mono font-bold text-[#2045B4]">Conzex Global Private Limited</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: STANDARDIZED CLOUD COMPLIANCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8" id="cloud-section-compliance">
        <div className="max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-sm border border-blue-200">
            Audit Coverage
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Standardized Multi-cloud Integrity Rules</h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
            Ensure alignment with security governance constraints automatically upon activating cloud streams.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-[#faf9f8] rounded-sm border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-2">CIS Benchmarks Level 1</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Verify compliance mapping on remote Virtual Machines, database storage blocks, and container network configurations automatically on every sweep.
            </p>
          </div>
          <div className="p-6 bg-[#faf9f8] rounded-sm border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-2">SOC2 Type II Audit Support</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Log changes to database credentials and key systems inside an immutable relational audit log generated specifically for external financial examiners.
            </p>
          </div>
          <div className="p-6 bg-[#faf9f8] rounded-sm border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-2">NIST SP 800-53 Metrics</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track cryptographic boundaries, authentication integrity, and remote execution histories against rigorous sovereign requirements.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
