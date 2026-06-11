import React, { useState } from 'react';
import { 
  Network, 
  Check, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  FileText, 
  Globe, 
  ArrowRight,
  Handshake,
  Users
} from 'lucide-react';

export default function PartnersPage() {
  const [selectedPartnerTech, setSelectedPartnerTech] = useState<'all' | 'msp' | 'telemetry'>('all');

  const partnerGrid = [
    { title: "Managed Security Providers", desc: "Allows regional MSP players to deploy multi-tenant Defendx consoles, indexing sovereign user domains seamlessly.", cat: "msp", activeCount: 42 },
    { title: "Network Hardware Alliances", desc: "Allows direct ingestion of customized firewall state lines and router alert logs.", cat: "telemetry", activeCount: 19 },
    { title: "Sovereign Audit Consultants", desc: "Authorized training channels preparing operators for SOC/ISO credential verification gates.", cat: "msp", activeCount: 28 },
    { title: "Hardware Containment API", desc: "Integrates with physical terminal switches to air-gap server rows instantly.", cat: "telemetry", activeCount: 11 }
  ];

  const tiers = [
    { name: "Silver Partner", requirement: "10+ Certified Operators", support: "Standard Business Hours", benefits: "Access to standard SQLite developer APIs" },
    { name: "Gold Partner", requirement: "25+ Certified Operators", support: "24/7 Priority Support Desk", benefits: "Multi-tenant master consoles, custom decoders" },
    { name: "Platinum Partner", requirement: "50+ Certified Operators", support: "Dedicated On-Site Architect", benefits: "Direct private database cluster syncing, exclusive co-branding" }
  ];

  return (
    <div className="space-y-16 py-8 text-left font-sans" id="partners-page-main">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="bg-white border-b border-slate-200 py-12 text-left relative overflow-hidden" id="partners-hero">
        <div className="absolute inset-0 bg-[#faf9f8] opacity-75 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-105/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text */}
            <div className="lg:col-span-8 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-250 text-blue-600 text-xs font-bold tracking-wider uppercase rounded font-mono">
                <Network className="w-4 h-4 text-blue-600 animate-pulse" />
                Global Partnerships
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Technology Alliance Partner Program
              </h1>
              <p className="text-sm sm:text-base text-slate-650 leading-relaxed max-w-xl">
                Collaborate with global industry leaders. We equip Managed Security Providers (MSPs), systems integrators, and independent software vendors to bundle Defendx ingestion features cleanly.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedPartnerTech('all')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                    selectedPartnerTech === 'all' ? 'bg-[#2045B4] text-white border-[#2045B4]' : 'bg-white text-slate-600 border-slate-250 hover:bg-slate-50'
                  }`}
                >
                  Show All Partnerships
                </button>
                <button 
                  onClick={() => setSelectedPartnerTech('msp')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                    selectedPartnerTech === 'msp' ? 'bg-[#2045B4] text-white border-[#2045B4]' : 'bg-white text-slate-650 border-slate-250 hover:bg-slate-50'
                  }`}
                >
                  Managed Security Providers (MSPs)
                </button>
                <button 
                  onClick={() => setSelectedPartnerTech('telemetry')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                    selectedPartnerTech === 'telemetry' ? 'bg-[#2045B4] text-white border-[#2045B4]' : 'bg-white text-slate-650 border-slate-250 hover:bg-slate-50'
                  }`}
                >
                  Hardware &amp; Telemetry
                </button>
              </div>
            </div>

            {/* Right side metric spotlight */}
            <div className="lg:col-span-4 bg-slate-50 p-6 border border-slate-200 rounded-xl space-y-4 shadow-sm">
              <h3 className="text-xs font-mono font-bold text-slate-450 uppercase tracking-wider">Alliance Governance</h3>
              <div className="space-y-3.5 text-xs font-mono text-slate-600">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span>Certified Partners:</span>
                  <span className="font-bold text-slate-800">140+ Operators</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span>API Integration Modules:</span>
                  <span className="font-bold text-[#2045B4]">TLS 1.3 Secure</span>
                </div>
                <div className="flex justify-between pb-0.5">
                  <span>Managing Authority:</span>
                  <span className="font-bold text-slate-800">Conzex Global</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: ALLIANCE PARTNER MODULES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="partners-grid-section">
        <h3 className="text-base font-bold text-slate-900 font-display mb-6 uppercase tracking-wider">Alliance Modules Scope</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {partnerGrid.filter(itm => selectedPartnerTech === 'all' || itm.cat === selectedPartnerTech).map((item, idx) => (
            <div key={idx} className="p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-500/20 hover:shadow-md transition-all">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block mb-1">Category &bull; {item.cat}</span>
              <h4 className="text-xs font-bold text-slate-900 mb-2 font-display">{item.title}</h4>
              <p className="text-slate-600 text-[11px] leading-relaxed mb-4">{item.desc}</p>
              <div className="text-[10px] text-blue-600 font-mono font-bold border-t pt-2 mt-2">{item.activeCount} Authorized Nodes</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: ACCREDITED PARTNER TIERS */}
      <section className="bg-white border-y border-slate-205 py-12 text-left" id="partners-tiers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Levels Matrix</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-909">Technology Alliance Tiers</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
              Maximize your strategic operations. Silver, Gold, and Platinum tiers authorize technical specialists to access deep sandbox APIs and register multi-tenant systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((t, idx) => (
              <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <h4 className="font-bold text-slate-900 border-b pb-2 text-sm">{t.name}</h4>
                <div className="space-y-2 text-xs font-mono text-slate-650">
                  <p><strong>Requirement:</strong> {t.requirement}</p>
                  <p><strong>SLA Support:</strong> {t.support}</p>
                  <p className="text-slate-600 font-sans text-xs pt-1 border-t mt-1"><strong>Benefits:</strong> {t.benefits}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: API INTEGRATION & SDK PATHS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="partners-sdk">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Secure APIs</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Ingestion SDK &amp; Caching Keys</h3>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
              Partner software integrations utilize standardized JSON schemas validated securely through local storage. Our API keys restrict and sign requests to ensure third-party applications never compromise core telemetry data.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>TLS 1.3 server-to-server handshake validation</span>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-400 p-5 rounded-xl border border-slate-800 font-mono text-[11px] space-y-3 shadow-md">
            <div className="flex justify-between items-center text-slate-300 border-b border-slate-800 pb-2 mb-2">
              <span className="text-[9px] uppercase font-bold text-slate-450">Integration Handshake Code</span>
              <span className="text-emerald-400 font-bold text-[9px]">● SECURE</span>
            </div>
            <p className="text-blue-400">$ defendx-agent --register-partner --role=msp --auth-key=CONZEX-SEC-XXXX</p>
            <p>&gt; Validating handshake parameter credentials...</p>
            <p className="text-emerald-400">&gt; SUCCESS: Authorized 42 multi-tenant nodes streams.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: PARTNER ONBOARDING WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="partners-onboarding">
        <h4 className="text-base font-bold text-slate-900 uppercase tracking-wider font-display mb-6">Partner Onboarding Timeline</h4>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Corporate Screening", desc: "Submit corporate credentials and candidate training schedules to Conzex Global." },
            { step: "02", title: "API Sandbox Setup", desc: "Configure secure read-access TLS tokens matching regional SQLite databases." },
            { step: "03", title: "Production Signing", desc: "Certify your platform streams as fully compliant to execute live threat hunting." }
          ].map((item, idx) => (
            <div key={idx} className="p-5 bg-slate-50 border border-slate-202 rounded-xl relative hover:bg-white hover:border-blue-500/20 transition-all">
              <span className="text-xl font-mono font-black text-slate-300 absolute top-4 right-4">{item.step}</span>
              <h5 className="text-xs font-bold text-[#2045B4] uppercase mb-2 font-mono">{item.title}</h5>
              <p className="text-slate-650 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: STANDARDS & ACCREDITATION GLOBAL DIRECTIVE */}
      <section className="max-w-4xl mx-auto px-4 pb-8" id="partners-directive">
        <div className="space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Accredited Enterprise Standards</h4>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Defendx partner alliance criteria map directly onto strict ISO-27001 access control guidelines. All alliance modules and statutory certifications are managed by Conzex Global Private Limited from Singapore.
          </p>
        </div>
      </section>

    </div>
  );
}
