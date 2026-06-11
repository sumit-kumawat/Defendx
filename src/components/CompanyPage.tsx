import React, { useState } from 'react';
import { 
  Landmark, 
  Check, 
  ShieldCheck, 
  Mail, 
  Globe, 
  MapPin, 
  Award, 
  ChevronRight, 
  BookOpen,
  Calendar
} from 'lucide-react';

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState<'hq' | 'compliance'>('hq');

  const complianceStandards = [
    { code: "ISO 27001", scope: "Information Security Management System", desc: "Verifies secure operational guidelines, hardware logs isolation, and private database compartments audits.", status: "Verified" },
    { code: "SOC2 Type II", scope: "Sovereign Audit Trust Criteria", desc: "Rigorous system safeguards covering availability, integrity processes, and credentials compliance verification.", status: "Audited" },
    { code: "CREST Validation", scope: "Penetration Testing Standard", desc: "Adheres to international security penetration controls, confirming daemon immunization safeguards.", status: "Certified" }
  ];

  const milestones = [
    { year: "2024", title: "Global Expansion", desc: "Conzex Global launched certified regional database synchronization hubs across three continents." },
    { year: "2025", title: "Standard 4.12 Core Daemon", desc: "The Defendx SIEM Core achieved full ISO 27001 auditing configuration clearance." },
    { year: "2026", title: "Enterprise Sovereign Release", desc: "Deployed local-first sandboxes enabling fully air-gapped security monitoring." }
  ];

  return (
    <div className="space-y-16 py-8 text-left font-sans" id="company-page-main">
      
      {/* SECTION 1: HERO / HEADER SECTION */}
      <section className="bg-white border-b border-slate-200 py-12 text-left relative overflow-hidden" id="company-hero-interactive">
        <div className="absolute inset-0 bg-[#faf9f8] opacity-75 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text */}
            <div className="lg:col-span-8 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-250 text-[#2045B4] text-xs font-bold tracking-wider uppercase rounded font-mono">
                <Landmark className="w-3.5 h-3.5 text-[#2045B4]" />
                Corporate Governance &amp; Registry
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Behind Defendx: Conzex Global Private Limited
              </h1>
              <p className="text-sm sm:text-base text-slate-650 leading-relaxed max-w-xl">
                Defendx is a proprietary enterprise software line owned and operated globally by Conzex Global Private Limited. We safeguard high-risk government networks, private cloud datacenters, and sovereign container registries.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('hq')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                    activeTab === 'hq' ? 'bg-[#2045B4] text-white border-[#2045B4]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Singapore HQ Coordinates
                </button>
                <button
                  onClick={() => setActiveTab('compliance')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                    activeTab === 'compliance' ? 'bg-[#2045B4] text-white border-[#2045B4]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Compliance Attestation Details
                </button>
              </div>
            </div>

            {/* Right side interactive state switcher */}
            <div className="lg:col-span-4 bg-slate-50 p-6 border border-slate-200 rounded-xl space-y-4 shadow-sm">
              {activeTab === 'hq' ? (
                <div className="space-y-3 animate-fade-in">
                  <h4 className="text-xs font-mono font-bold text-slate-450 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2045B4]" /> SINGAPORE HEADQUARTERS
                  </h4>
                  <div className="text-xs text-slate-700 leading-relaxed space-y-1">
                    <p className="font-bold text-slate-900">Conzex Global Private Limited</p>
                    <p>Secured Finance &amp; Defense Hubs</p>
                    <p>Downtown Core, Singapore</p>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Singapore UEN Registered Active.</div>
                </div>
              ) : (
                <div className="space-y-3 animate-fade-in">
                  <h4 className="text-xs font-mono font-bold text-slate-450 uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> SECURE AUDITING STATUS
                  </h4>
                  <p className="text-xs text-slate-705 leading-relaxed">
                    Our compliance matrix is updated in line with global statutory requirements. Defendx is fully certified under ISO 27001, SOC2, and CREST standards.
                  </p>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider block w-max">
                    100% Attested
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: MATRIX OF COMPLIANCE STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="company-compliances-details">
        <h3 className="text-base font-bold text-slate-900 font-display mb-6 uppercase tracking-wider">Compliance Audits &amp; Core Standards</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {complianceStandards.map((std, idx) => (
            <div key={idx} className="p-5 bg-white border border-slate-200 rounded-xl relative hover:border-blue-500/20 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-black text-[#2045B4] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-150 block w-max uppercase tracking-wider mb-2">{std.code}</span>
                <span className="text-xs font-bold text-slate-950 block mb-1">{std.scope}</span>
                <p className="text-slate-650 text-[11px] leading-relaxed mb-4">{std.desc}</p>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono border-t pt-2.5 mt-2.5 border-slate-100 uppercase font-black text-emerald-600">
                <span>Validation active</span>
                <span>{std.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: COMPANY CORE BRAND VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="company-values">
        <h3 className="text-base font-bold text-slate-900 font-display mb-6 uppercase tracking-wider">Our Core Ideals &amp; Brand Values</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { tag: "Sovereignty", desc: "Data must belong exclusively to the client, never stored in unauthorized third-party public clouds." },
            { tag: "Frictionless Audit", desc: "Audit configurations must trace precisely to logs, optimizing administrative review timescales." },
            { tag: "Accredited Excellence", desc: "Qualified candidates earn globally searchable, cryptographically valid certifications easily." }
          ].map((v, i) => (
            <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <h4 className="font-bold text-slate-900 text-sm font-display">{v.tag}</h4>
              <p className="text-slate-600 text-xs leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: STRATEGIC TECHNICAL OPERATIONS */}
      <section className="bg-white border-y border-slate-200 py-12 text-left" id="company-operations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Statutory Ingestion Board</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Technical Governance</h3>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
              We manage rigorous quality checks throughout our global threat-intelligence delivery frameworks. The operational integrity of Defendx software products is overseen by an executive board from Conzex Global Private Limited.
            </p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Standard Operational Frameworks</span>
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex gap-2 items-center"><ChevronRight className="w-4 h-4 text-[#2045B4]" /> Singapore high court certified corporate terms</div>
              <div className="flex gap-2 items-center"><ChevronRight className="w-4 h-4 text-[#2045B4]" /> Direct ISO-27001 regulatory auditor compliance</div>
              <div className="flex gap-2 items-center"><ChevronRight className="w-4 h-4 text-[#2045B4]" /> Fully air-gapped system isolation assurances</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: MILESTONE RECORDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="company-milestones">
        <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider font-display mb-8">System Roadmap &amp; Accomplishments</h3>
        <div className="grid md:grid-cols-3 gap-6 font-sans">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-5 bg-white border border-slate-202 rounded-xl relative hover:border-blue-500/20 transition-all">
              <span className="text-2xl font-mono font-black text-slate-350 block mb-2">{m.year}</span>
              <h4 className="font-bold text-slate-900 text-sm mb-1">{m.title}</h4>
              <p className="text-slate-600 text-xs leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: CONZEX GLOBAL STATUTORY WARNING */}
      <section className="max-w-4xl mx-auto px-4 pb-8" id="company-governance-standards">
        <div className="space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Authorized Global Registry Notice</h4>
          <p className="text-xs text-slate-605 leading-relaxed font-sans">
            Defendx core binaries, log ingestion formats, and academic course materials are governed under strict proprietary ownership guidelines. All trademarks and registered assets belong to Conzex Global Private Limited, Singapore.
          </p>
        </div>
      </section>

    </div>
  );
}
