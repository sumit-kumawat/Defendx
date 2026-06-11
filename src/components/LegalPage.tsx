import { useState } from 'react';
import { ShieldCheck, FileCheck, Landmark, ArrowLeft, HeartHandshake, ListCollapse } from 'lucide-react';

interface LegalPageProps {
  onBackToHome: () => void;
  initialSection?: 'privacy' | 'terms' | 'refund';
}

export default function LegalPage({ onBackToHome, initialSection = 'privacy' }: LegalPageProps) {
  const [activeLegalTab, setActiveLegalTab] = useState<'privacy' | 'terms' | 'refund'>(initialSection);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-left font-sans" id="legal-viewport">
      {/* Back Button */}
      <button 
        onClick={onBackToHome}
        className="mb-8 flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors bg-white px-4 py-2 border border-slate-200 rounded-lg shadow-sm hover:border-blue-300"
        id="legal-back-to-home-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Sovereign Platform
      </button>

      {/* Styled Corporate Header */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 sm:p-10 space-y-6 relative overflow-hidden mb-8">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Administrative &amp; General Compliance Gateway
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-mono">
              Governed under Singapore laws by Conzex Global Private Limited
            </p>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-wider">
              Audit Verified
            </span>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-slate-200 w-full pt-4 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveLegalTab('privacy')}
            className={`px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition-all ${
              activeLegalTab === 'privacy'
                ? 'border-blue-600 text-blue-600 bg-blue-50/30'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveLegalTab('terms')}
            className={`px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition-all ${
              activeLegalTab === 'terms'
                ? 'border-blue-600 text-blue-600 bg-blue-50/30'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Terms of Services
          </button>
          <button
            onClick={() => setActiveLegalTab('refund')}
            className={`px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition-all ${
              activeLegalTab === 'refund'
                ? 'border-blue-600 text-blue-600 bg-blue-50/30'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Refund Policy
          </button>
        </div>

        {/* Privacy Policy Content */}
        {activeLegalTab === 'privacy' && (
          <div className="space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm animate-fade-in" id="legal-privacy-block">
            <div className="flex items-center gap-2 border-b pb-3 text-slate-900">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold uppercase tracking-wider font-mono">1. PDPA &amp; Global Data Compartment Protection</h3>
            </div>
            <p>
              Conzex Global Private Limited operates under absolute confidentiality paradigms. This Privacy Policy details how we govern telemetry, server log indices, and local data storage states gathered through host execution scopes on defendx.io.
            </p>
            
            <div className="bg-[#faf9f8] p-4 rounded-lg border border-slate-200 font-mono text-[11px] space-y-2">
              <p className="font-bold text-slate-800 uppercase text-xs">A. Scope of Telemetry Parsing</p>
              <p>We compile configuration variables, local node identifiers, drift coefficients, and credential codes. Our local SQLite system runs inside isolated cloud spaces or on-premises containers, meaning your log files <span className="underline">never</span> leave your legal compartment unless synchronization with multi-cloud accounts is explicitly authorized by administrators.</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900">B. Information Preservation and Key Safeguards</h4>
              <p>
                All data stored within `/data/defendx_store.json` utilizes AES-GCM-256 standard encryption, backed by automated SQLite schema transaction controls. We do not maintain unencrypted public mirrors or telemetry trackers.
              </p>
            </div>

            <div className="p-3.5 bg-blue-50/50 border border-blue-150 rounded text-blue-800 text-xs">
              <strong>Compliance Notice</strong>: Our platforms comply rigorously with the Singapore Personal Data Protection Act (PDPA) and European General Data Protection Regulation (GDPR) frameworks. For localized compliance statements, contact Singapore Headquarters.
            </div>
          </div>
        )}

        {/* Terms of Services */}
        {activeLegalTab === 'terms' && (
          <div className="space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm animate-fade-in" id="legal-terms-block">
            <div className="flex items-center gap-2 border-b pb-3 text-slate-900">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold uppercase tracking-wider font-mono">2. Proprietary Licensing &amp; Singapore Statutes</h3>
            </div>
            <p>
              The following legal conditions regulate access to the Defendx SIEM &amp; XDR Platform, command line utilities (`defendx-agent`), and certified credential registry index assets.
            </p>
            
            <div className="bg-[#faf9f8] p-4 rounded-lg border border-slate-200 font-mono text-[11px] space-y-2">
              <p className="font-bold text-slate-800 uppercase text-xs">A. Exclusive Enterprise Ownership</p>
              <p>
                Defendx is a privately licensed, highly secure software environment. All binaries, certified student databases, website resource files, and API frameworks are protected trademarks owned exclusively by Conzex Global Private Limited. Redocumenting source code or duplicating simulation layout designs without written approval is strictly prohibited.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900">B. Enterprise License Bounds</h4>
              <p>
                Registered evaluations or trial licenses allow verification logs up to 50 endpoint devices. Exceeding your target allocation limit triggers standard warning alerts on your cloud dashboard and requires an adjustment statement.
              </p>
            </div>

            <p className="font-mono text-[11px] text-slate-500">
              Failure to run authorized agent updates or bypass system integrity validation variables will terminate customer access boundaries immediately under Singapore High Court jurisdiction limits.
            </p>
          </div>
        )}

        {/* Refund Policy */}
        {activeLegalTab === 'refund' && (
          <div className="space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm animate-fade-in" id="legal-refund-block">
            <div className="flex items-center gap-2 border-b pb-3 text-slate-900">
              <Landmark className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold uppercase tracking-wider font-mono">3. Licensing Dissolution &amp; Refund SLA</h3>
            </div>
            <p>
              Because Defendx guarantees on-premises private cloud deployment modules, licensing refunds follow precise corporate procurement windows.
            </p>
            
            <div className="bg-[#faf9f8] p-4 rounded-lg border border-slate-200 font-mono text-[11px] space-y-2">
              <p className="font-bold text-slate-800 uppercase text-xs">A. Evaluation &amp; SaaS Cancellation Windows</p>
              <p>
                Subscriptions within our Managed Hybrid Cloud SaaS environment may be cancelled at any point, with full operational coverage continuing until the conclusion of the active monthly billing statement period. No partial-month pro-rated returns are issued.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900">B. Private On-Premises Installation SLA</h4>
              <p>
                License fees for deep standalone air-gapped arrays are non-refundable once software keys are generated and transmitted to client security operations centers. Conzex Global Private Limited warrants physical support pipelines to rectify operational issues if needed.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono font-bold mt-4">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              <span>新加坡 (Singapore) Commercial Ingestion Guidelines verified active.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
