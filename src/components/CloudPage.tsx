import { useState } from 'react';
import { motion } from 'motion/react';
import { Cloud, Check, Cpu, RefreshCw, Server, Laptop, ShieldCheck, Activity } from 'lucide-react';

export default function CloudPage() {
  const [activeSchema, setActiveSchema] = useState<'all' | 'azure' | 'aws' | 'gcp' | 'k8s'>('all');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(100);
  const [lastAuditLogs, setLastAuditLogs] = useState<string[]>([
    "All subnets matched baseline credentials.",
    "Kubernetes networking logs isolated.",
    "Air-gapped telemetry synchronized.",
  ]);

  const triggerCloudAudit = () => {
    setIsAuditing(true);
    setAuditProgress(0);
    setLastAuditLogs(["Accessing remote cluster boundaries..."]);

    const interval = setInterval(() => {
      setAuditProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAuditing(false);
          setLastAuditLogs([
            "CONNECTED: Handshake completed securely.",
            "AUDITED: 1,480 virtual host resources audited.",
            "COMPLIANCE SCORE: 100% Drift Verification Approved.",
            "STATUS: Pure sovereign integrity intact."
          ]);
          return 100;
        }
        return prev + 25;
      });
    }, 450);
  };

  const schemaData = [
    { provider: 'Azure', title: "Microsoft Azure Hub", type: 'azure', desc: "Integrates with Event Hubs and Activity telemetry streams natively." },
    { provider: 'AWS', title: "AWS CloudTrail API", type: 'aws', desc: "Monitored ingestion of AWS organizational access profiles." },
    { provider: 'GCP', title: "Google Cloud Platform", type: 'gcp', desc: "Direct Pub/Sub telemetry validation and secure logging loops." },
    { provider: 'K8s', title: "Kubernetes Engine", type: 'k8s', desc: "Pod intrusion parameters and containerized root access metrics." }
  ];

  return (
    <div className="space-y-12 py-8 text-left font-sans" id="cloud-page-content">
      {/* SECTION 1: INTERACTIVE HERO */}
      <section className="bg-white border-b border-slate-200 py-16 text-left relative overflow-hidden" id="cloud-hero-interactive">
        <div className="absolute inset-0 bg-[#faf9f8] opacity-75 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-250 text-blue-600 text-xs font-bold tracking-wider uppercase rounded">
                <Cloud className="w-3.5 h-3.5" />
                Elastic Log Streams
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Cloud Posture &amp; Container Integrity
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Saccade high-speed cloud configurations. Defendx ingest engines process serverless execution structures, cloudTrail variables, and Kubernetes networking logs without data latency.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={triggerCloudAudit}
                  disabled={isAuditing}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:bg-slate-400"
                >
                  <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
                  {isAuditing ? 'Auditing Resources...' : 'Scan Active Cloud Posture'}
                </button>
              </div>
            </div>

            {/* Right side: Interactive auditor cockpit */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-xl shadow-md font-mono text-xs text-slate-700 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#2045B4]"></div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 tracking-wider">
                  <Activity className="w-4 h-4 text-[#2045B4] animate-pulse" />
                  <span>POSTURE_DRIFT_SCANNER</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isAuditing ? 'bg-amber-50 text-amber-800 animate-pulse' : 'bg-green-50 text-emerald-800'}`}>
                  {isAuditing ? 'AUDITING' : 'SECURE'}
                </span>
              </div>

              <div className="space-y-4">
                {/* Visual Progress ring bar */}
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-250">
                  <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-4 border-slate-205">
                    <span className="text-[10px] font-bold text-blue-650 font-mono">{auditProgress}%</span>
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle 
                        cx="24" cy="24" r="20" 
                        fill="transparent" 
                        stroke="#2045B4" 
                        strokeWidth="4" 
                        strokeDasharray={125}
                        strokeDashoffset={125 - (125 * auditProgress) / 100}
                        className="transition-all duration-300"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold">Standard Score</span>
                    <span className="text-sm font-bold text-slate-800 font-sans">ISO-27001 Cloud Drift Baseline</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200 min-h-[90px] space-y-1 text-[11px] text-slate-650">
                  {lastAuditLogs.map((log, i) => (
                    <p key={i} className={i === lastAuditLogs.length - 1 ? 'text-[#2045B4] font-bold' : 'text-slate-500'}>
                      &gt; {log}
                    </p>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: CLOUD FRAMEWORKS MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="cloud-frameworks-section">
        <div className="flex justify-between items-end border-b pb-4 mb-6 border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Supported Cloud Frameworks</h3>
            <p className="text-slate-500 text-xs">Direct API connections with localized fallback storage.</p>
          </div>
          <div className="flex gap-1.5">
            {['all', 'azure', 'aws', 'gcp', 'k8s'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSchema(cat as any)}
                className={`px-3 py-1 text-xs font-mono rounded border capitalize transition-all ${
                  activeSchema === cat 
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
          {schemaData.filter(item => activeSchema === 'all' || item.type === activeSchema).map((item, i) => (
            <div key={i} className="p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-500/30 hover:shadow-md transition-all group relative">
              <div className="absolute top-0 right-0 h-10 w-10 bg-slate-50 rounded-bl-xl border-l border-b border-slate-200 flex items-center justify-center font-mono text-[9px] text-slate-400 uppercase font-black tracking-widest">{item.provider}</div>
              <span className="block text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{item.title}</span>
              <p className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: INGESTION GRAPH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="cloud-telemetry-status">
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
          <div className="bg-[#faf9f8] px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <h4 className="text-xs font-bold font-mono text-slate-700 uppercase tracking-wider">Sovereign Cloud Channels Verification Matrix</h4>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded uppercase font-mono font-bold">Online</span>
          </div>
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                <th className="px-5 py-3">Ingest Pipe Endpoint</th>
                <th className="px-5 py-3">Data Spec Format</th>
                <th className="px-5 py-3">Decoders Applied</th>
                <th className="px-5 py-3 text-right">Integrity check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600 font-mono">
              <tr>
                <td className="px-5 py-3 font-semibold text-slate-900">azure_telemetry_hub</td>
                <td className="px-5 py-3">JSON payload</td>
                <td className="px-5 py-3">Active Hash Check</td>
                <td className="px-5 py-3 text-emerald-600 text-right font-bold">● ACTIVE</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-semibold text-slate-900">eks_kernel_logs</td>
                <td className="px-5 py-3">Syslog Event</td>
                <td className="px-5 py-3">Active Syslog Decoders</td>
                <td className="px-5 py-3 text-emerald-600 text-right font-bold">● ACTIVE</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-semibold text-slate-900">gcp_audit_pubsub</td>
                <td className="px-5 py-3">Stream Object</td>
                <td className="px-5 py-3">Direct SHA Verification</td>
                <td className="px-5 py-3 text-emerald-600 text-right font-bold">● ACTIVE</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: PATHWAY DEPLOYMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="cloud-pathway">
        <h3 className="text-base font-bold text-slate-900 font-display mb-6 uppercase tracking-wider">Cloud Deployment Pathway</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: '01', title: "Provision API Tokens", desc: "Configure secure read-access JSON tokens inside your respective identity panels safely." },
            { step: '02', title: "Active Handshake Config", desc: "Utilize Kubernetes Helm templates or SaaS token strings to anchor the client pipeline." },
            { step: '03', title: "Ingest & Decrypt Logs", desc: "Observe dynamic security stream results in your centralized admin board dashboard completely." }
          ].map((item, idx) => (
            <div key={idx} className="p-5 bg-[#faf9f8] border border-slate-200 rounded-xl relative group hover:border-blue-500/20 hover:bg-white transition-all">
              <span className="text-2xl font-mono font-black text-slate-300 absolute top-4 right-4">{item.step}</span>
              <h4 className="text-xs font-mono font-black text-blue-600 uppercase mb-2">{item.title}</h4>
              <p className="text-slate-650 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: COMPLIANCE DRIFT SAFEGUARDS */}
      <section className="bg-white border-y border-slate-200 py-12 text-left" id="cloud-drift-safeguards">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Audit Drift Real-Time Monitor</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Automated Standard Configuration Drifts Detection</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Cloud assets mutate rapidly during updates, potentially introducing configuration drift. Defendx monitors resource state hashes continuously against predefined templates, validating IAM permissions, open ports, and API keys automatically to flag anomalies.
            </p>
            <div className="space-y-2 font-mono text-[11px] text-slate-600">
              <div className="flex justify-between border-b pb-2">
                <span>Auto-Remediation Drifts Actions:</span>
                <span className="text-blue-600 font-bold">Enabled</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Standard SLA Drift Warning Timeframe:</span>
                <span className="text-blue-600 font-bold">&lt; 15 Seconds</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-slate-50 p-5 border border-slate-200 rounded-xl space-y-3 font-sans">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Drift Audit Standard Compliance Score</h4>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-mono text-slate-650">
                  <span>NIST SP 800-53 Control Align</span>
                  <span className="font-bold text-slate-950">98.5% Compliant</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '98.5%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-mono text-slate-650">
                  <span>PCI-DSS Core Rules Baseline</span>
                  <span className="font-bold text-slate-950">100% Verified</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: HYBRID INGESTION ARCHITECTURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6 pb-8" id="cloud-hybrid-architecture">
        <h3 className="text-base font-bold text-slate-900 font-display uppercase tracking-wider">Multi-Cloud Ingestion Architectures</h3>
        <div className="grid md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-650">
          <div className="p-5 bg-[#faf9f8] border border-slate-200 rounded-lg space-y-2">
            <h4 className="font-bold text-slate-900">Kubernetes DaemonSet Sidecars</h4>
            <p className="text-xs leading-relaxed text-slate-605">
              Deploy our host agent as a localized DaemonSet to catch host-level cluster mutations, bypassing API rate limiters on standard cloud logging providers.
            </p>
          </div>
          <div className="p-5 bg-[#faf9f8] border border-slate-200 rounded-lg space-y-2">
            <h4 className="font-bold text-slate-900">Pub/Sub Serverless Receivers</h4>
            <p className="text-xs leading-relaxed text-slate-605">
              Securely pipe global organization metrics through pub/sub stream listeners, running decoders within a micro-cache storage for optimized index times.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
