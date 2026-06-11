import React, { useState } from 'react';
import { 
  Shield, 
  Check, 
  Star, 
  Activity, 
  Clock, 
  Sliders, 
  MessageCircle, 
  CheckCircle, 
  PhoneCall, 
  FileText, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function ServicesPage() {
  const [selectedIncidentTier, setSelectedIncidentTier] = useState<'low' | 'mid' | 'critical'>('mid');
  const [activeChatLogs, setActiveChatLogs] = useState<string[]>([
    "Sovereign containment cell listening on cluster interfaces.",
    "No open anomalies reported.",
  ]);

  const handleSimulateMitigation = (tier: 'low' | 'mid' | 'critical') => {
    setSelectedIncidentTier(tier);
    if (tier === 'low') {
      setActiveChatLogs([
        "QUERY: Privilege drift flagged on user role sandbox.",
        "ISOLATED: Removed suspicious sub-role safely.",
        "STATUS: SLA resolved in 2 minutes."
      ]);
    } else if (tier === 'mid') {
      setActiveChatLogs([
        "ALERT: Unauthorized binary signed in /tmp folder.",
        "MITIGATED: Terminated parenting terminal instance securely.",
        "REVERTED: FIM daemon restored original folder hash.",
        "STATUS: SLA completed in 6 minutes."
      ]);
    } else {
      setActiveChatLogs([
        "CRITICAL: Active ransomware decryption loop identified.",
        "CONTAINMENT ENGAGED: Blocked cluster firewall ports immediately.",
        "ISOLATED: Quarantined node subnet cleanly.",
        "RECONSTRUCTED: Secure local SQLite backups validated intact.",
        "STATUS: Host secure. SLA completed in 14 minutes."
      ]);
    }
  };

  const services = [
    { title: "24/7 Security Monitoring Center", desc: "Constant surveillance, alerts analysis, and threat hunting directly on Defendx log ingestion lines." },
    { title: "Sovereign Audit Advisory", desc: "Assistance organizing enterprise setups to comfortably satisfy local or federal SOC audits successfully." },
    { title: "Custom Remediation Scripts", desc: "Consulting to integrate containment APIs, blocking unauthorized shell terminals without network latency." }
  ];

  const SLAs = [
    { tier: "Tier-1", focus: "Basic Privilege Audit Drift", responseTime: "< 15 Minutes", targetSLA: "99.5% Success Rate" },
    { tier: "Tier-2", focus: "Signed Binary Hash Anomalies", responseTime: "< 10 Minutes", targetSLA: "99.9% Success Rate" },
    { tier: "Tier-3", focus: "Ransomware & Port Breaches", responseTime: "< 5 Minutes", targetSLA: "100% Guaranteed Success" }
  ];

  return (
    <div className="space-y-16 py-8 text-left font-sans" id="services-page-main">
      
      {/* SECTION 1: DYNAMIC HERO */}
      <section className="bg-white border-b border-slate-200 py-12 text-left relative overflow-hidden" id="services-hero-interactive">
        <div className="absolute inset-0 bg-[#faf9f8] opacity-75 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wider uppercase rounded font-mono">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                Response Operations
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                24/7 Managed Containment &amp; Guard Services
              </h1>
              <p className="text-sm sm:text-base text-slate-650 leading-relaxed max-w-xl">
                Deploy elite cyber operations specialists. Defendx Services anchors incident investigation, active network isolation, and post-mortems for severe corporate server breaches globally.
              </p>
              
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div className="bg-white p-4 border border-slate-200 rounded-lg">
                  <span className="block text-2xl font-black text-blue-650 tracking-tight font-mono">&lt; 15m</span>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block font-bold">Critical Incident SLA</span>
                </div>
                <div className="bg-white p-4 border border-slate-200 rounded-lg">
                  <span className="block text-2xl font-black text-blue-600 tracking-tight font-mono">100%</span>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block font-bold">Containment Verified</span>
                </div>
              </div>
            </div>

            {/* Right side: Interactive Containment dashboard */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-2xl font-mono text-xs text-slate-350 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500"></div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>INCIDENT_RESPONSE_CONSOLE</span>
                </div>
                <span className="text-[10px] bg-emerald-500/15 text-emerald-400 font-bold px-2 py-0.5 rounded">SIMULATOR</span>
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] text-slate-450 uppercase font-bold tracking-wider">Select Threat Severity Scenario:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleSimulateMitigation('low')}
                    className={`px-2 py-1.5 border rounded font-mono text-[10px] font-bold transition-all cursor-pointer ${
                      selectedIncidentTier === 'low' ? 'bg-[#2045B4] border-[#2045B4] text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    Tier-1 Drill
                  </button>
                  <button
                    onClick={() => handleSimulateMitigation('mid')}
                    className={`px-2 py-1.5 border rounded font-mono text-[10px] font-bold transition-all cursor-pointer ${
                      selectedIncidentTier === 'mid' ? 'bg-amber-600 border-amber-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    Tier-2 Drift
                  </button>
                  <button
                    onClick={() => handleSimulateMitigation('critical')}
                    className={`px-2 py-1.5 border rounded font-mono text-[10px] font-bold transition-all cursor-pointer ${
                      selectedIncidentTier === 'critical' ? 'bg-red-650 border-red-500 text-white animate-pulse' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    Tier-3 Breach!
                  </button>
                </div>

                <div className="p-3 bg-black rounded border border-slate-800/80 min-h-[95px] space-y-1 text-[11px]">
                  {activeChatLogs.map((log, i) => (
                    <p key={i} className={log.startsWith('STATUS:') ? 'text-emerald-400 font-bold' : log.startsWith('CRITICAL:') || log.startsWith('ALERT:') ? 'text-red-400 font-bold' : 'text-slate-400'}>
                      &gt; {log}
                    </p>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: PROFESSIONAL SERVICES SCOPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="services-offerings">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Services Matrix</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-display">Specialist Assistance Deliverables</h2>
          <p className="text-slate-500 text-xs">Direct strategic support delivered by our Singapore operations core.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((item, i) => (
            <div key={i} className="p-6 bg-white border border-slate-200 rounded-xl relative hover:border-blue-500/20 hover:shadow-md transition-all">
              <h4 className="text-sm font-bold text-slate-900 mb-2 font-display">{item.title}</h4>
              <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: INCIDENT RESPONSE SLAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="services-slas">
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
          <div className="bg-[#faf9f8] px-5 py-4 border-b border-slate-200">
            <h4 className="text-xs font-bold font-mono text-slate-700 uppercase tracking-wider">Enterprise Service Level Agreement (SLA) Matrix</h4>
          </div>
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                <th className="px-5 py-3">Incident Level</th>
                <th className="px-5 py-3">Investigation Focus</th>
                <th className="px-5 py-3">Sovereign Response SLA</th>
                <th className="px-5 py-3 text-right">Target Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-605 font-mono">
              {SLAs.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3.5 font-bold text-slate-900">{s.tier}</td>
                  <td className="px-5 py-3.5 font-sans">{s.focus}</td>
                  <td className="px-5 py-3.5 text-blue-650 font-bold">{s.responseTime}</td>
                  <td className="px-5 py-3.5 text-right text-emerald-600 font-bold">{s.targetSLA}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: COMPLIANCE CONSULTING FRAMEWORK */}
      <section className="bg-white border-y border-slate-200 py-12 text-left" id="services-compliance">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">Advisory</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-905 font-display">Sovereign Compliance Consulting</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We assist security teams in organizing deployment architectures to easily fulfill complex federal or multinational audits. Our services bridge deep technical log validations with clean audit tracking rows.
            </p>
            <div className="flex items-center gap-3 bg-[#faf9f8] p-3.5 border border-slate-200 rounded-lg">
              <FileText className="w-6 h-6 text-slate-500" />
              <div className="text-xs font-mono">
                <strong className="block text-slate-800">ISO-27001 Auditable Templates</strong>
                <span className="text-slate-450 text-[10px]">Preconfigured mapping matrices.</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#faf9f8] border border-slate-200 rounded-xl space-y-4 font-sans">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Sovereign Assessment Modules</h4>
            <div className="space-y-3 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                <span>NIST SP 800-53 security parameter alignment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                <span>SOC2 CC7.2 access control integrity checks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                <span>Singapore jurisdiction regional data compliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: COORDINATED CONTAINMENT WORKFLOWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="services-containment-workflow">
        <h3 className="text-base font-bold text-slate-900 font-display uppercase tracking-wider mb-6">Emergency Quarantine Sequence</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: 'A1', title: "Anomaly Flagged", desc: "Syslog or auditd daemon registers out-of-bounds SSH modifications or binary signatures drift." },
            { step: 'A2', title: "Script Containment", desc: "Secure scripts invoke network isolation, suspending unauthorized processes inside microseconds." },
            { step: 'A3', title: "Forensics Rebuild", desc: "Engineers fetch encrypted local logs rows to analyze threat hashes and re-establish standard state." }
          ].map((item, idx) => (
            <div key={idx} className="p-5 bg-[#faf9f8] border border-slate-200 rounded-xl relative hover:border-emerald-500/20 hover:bg-white transition-all">
              <span className="text-2xl font-mono font-black text-slate-300 absolute top-4 right-4">{item.step}</span>
              <h4 className="text-xs font-mono font-black text-emerald-700 uppercase mb-2">{item.title}</h4>
              <p className="text-slate-650 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: STATUTORY STANDARDS & ACCREDITATION */}
      <section className="max-w-4xl mx-auto px-4 pb-8" id="services-statutory-standards">
        <div className="space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Statutory Security Mandate</h4>
          <p className="text-xs text-slate-600 leading-relaxed leading-relaxed font-sans">
            Defendx Managed Containment services are governed strictly under Singapore high court guidelines and international enterprise security frameworks. All coordination operations are property assets managed by Conzex Global Private Limited.
          </p>
        </div>
      </section>

    </div>
  );
}
