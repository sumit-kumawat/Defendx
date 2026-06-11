import React, { useState } from 'react';
import { 
  Sliders, 
  DollarSign, 
  Activity, 
  Settings, 
  HelpCircle, 
  HardDrive, 
  CheckCircle2, 
  BadgeCheck, 
  Info,
  ChevronRight,
  Shield,
  Briefcase
} from 'lucide-react';

export default function EstimatorPage() {
  const [nodesCount, setNodesCount] = useState<number>(150);
  const [deployType, setDeployType] = useState<'cloud' | 'onprem'>('cloud');
  const [retentionDays, setRetentionDays] = useState<number>(90);
  const [highAvailability, setHighAvailability] = useState<boolean>(false);

  // Math variables
  const ratePerNode = deployType === 'cloud' ? 3.5 : 2.0;
  const multiplierRetention = retentionDays > 90 ? 1.25 : retentionDays < 60 ? 0.9 : 1.0;
  const doubleNodeMultiplier = highAvailability ? 1.5 : 1.0;

  const finalCalculation = (nodesCount * ratePerNode * multiplierRetention * doubleNodeMultiplier).toFixed(0);

  const budgetMatrix = [
    { tier: "Small SOC", nodes: "Up to 50", retention: "60 Days", deploy: "Managed Cloud", estBudget: "$175/mo" },
    { tier: "Medium Enterprise", nodes: "Up to 250", retention: "90 Days", deploy: "Hybrid Cloud", estBudget: "$875/mo" },
    { tier: "Large Sovereign Agency", nodes: "500+", retention: "180+ Days", deploy: "On-Premises Array", estBudget: "Custom Quote" }
  ];

  return (
    <div className="space-y-16 py-8 text-left font-sans animate-fade-in" id="estimator-page-main">
      
      {/* SECTION 1: INTERACTIVE CONFIGURATOR HERO */}
      <section className="bg-white border-b border-slate-200 py-12 text-left relative overflow-hidden" id="estimator-hero">
        <div className="absolute inset-0 bg-[#faf9f8] opacity-75 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text explanation */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-250 text-blue-600 text-xs font-bold tracking-wider uppercase rounded font-mono">
                <Sliders className="w-4 h-4 text-blue-600 animate-pulse" />
                SLA Configurator
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Interactive Telemetry Quote Estimator
              </h1>
              <p className="text-sm sm:text-base text-slate-650 leading-relaxed">
                Estimate licensing budgets dynamically. All generated rates match our global sovereign pricing criteria, supporting either SaaS pipelines or standalone air-gapped arrays on private architecture.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 font-mono text-xs">
                <div className="flex justify-between text-slate-500 border-b pb-1">
                  <span>Standard Ingestion Limit:</span>
                  <span className="font-bold text-slate-800">50,000 EPS</span>
                </div>
                <div className="flex justify-between text-slate-500 border-b pb-1">
                  <span>Cryptographic Logging:</span>
                  <span className="font-bold text-[#2045B4]">AES-256 standard included</span>
                </div>
                <div className="flex justify-between text-slate-505">
                  <span>Governing Body:</span>
                  <span className="font-bold text-slate-800">Conzex Global Private Limited</span>
                </div>
              </div>
            </div>

            {/* Right side interactive calculator panel */}
            <div className="lg:col-span-6 bg-white border border-slate-202 p-6 sm:p-8 rounded-xl shadow-xl space-y-6 relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2045B4] rounded-t-xl"></div>
              
              <h3 className="text-sm font-black font-mono uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#2045B4]" />
                Estimate Pricing SLA
              </h3>

              <div className="space-y-4">
                {/* Parameter 1: Sliders */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase font-mono">
                    <span>Protected endpoint nodes:</span>
                    <span className="text-[#2045B4] font-black">{nodesCount} Nodes</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={nodesCount}
                    className="w-full accent-blue-600 cursor-pointer"
                    onChange={(e) => setNodesCount(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Min: 10 Nodes</span>
                    <span>Max: 1000 Nodes</span>
                  </div>
                </div>

                {/* Parameter 2: Dropper */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 uppercase font-mono">Deployment environment structure:</label>
                  <select
                    value={deployType}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 text-xs font-bold rounded text-slate-700"
                    onChange={(e) => setDeployType(e.target.value as 'cloud' | 'onprem')}
                  >
                    <option value="cloud">Managed Hybrid Cloud SaaS ($3.50/node/month)</option>
                    <option value="onprem">On-Premises High-Availability Array ($2.00/node/month)</option>
                  </select>
                </div>

                {/* Parameter 3: Sliders Retention */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase font-mono">
                    <span>Logs Archive Retention:</span>
                    <span className="text-slate-755 font-black">{retentionDays} Days</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="365"
                    step="30"
                    value={retentionDays}
                    className="w-full accent-blue-600 cursor-pointer"
                    onChange={(e) => setRetentionDays(Number(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>30 days (economy)</span>
                    <span>365 days (maximum audit)</span>
                  </div>
                </div>

                {/* Parameter 4: Toggle HA */}
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-202 rounded-lg">
                  <div className="space-y-0.5">
                    <span className="block text-[11px] font-bold text-slate-750 uppercase font-mono">High-Availability Clustered nodes:</span>
                    <span className="block text-[9px] text-slate-400">Duplicate ingestion engines check.</span>
                  </div>
                  <button
                    onClick={() => setHighAvailability(!highAvailability)}
                    className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${highAvailability ? 'bg-emerald-600' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-md transition-transform transform ${highAvailability ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>

                {/* Final Display */}
                <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-lg flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono font-bold uppercase tracking-wider">Estimated Budget SLA:</span>
                    <span className="text-xs text-slate-505">Subject to active contract limits.</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-mono font-black text-[#2045B4] flex items-center justify-end">
                      <DollarSign className="w-5 h-5 shrink-0 animate-bounce" />
                      {finalCalculation}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Per month (USD)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: BREAKDOWN OF COST COMPONENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="estimator-breakdown">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Pricing Anatomy</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-display">How Licensing Is Calculated</h2>
          <p className="text-slate-505 text-xs">Defendx pricing scale is linear and strictly corresponds to hardware agent deployment size.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 font-sans">
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Protected Node Ingress</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Base licensing scales strictly on target endpoints running the Defendx core daemon process. This includes on-prem virtual machines or cloud cluster nodes.
            </p>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Archive Log Storage</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Extending trace retain times in the local SQLite db or cloud storage rows requires additional caching indexing capacity. Extended periods scale budget parameters up to 25%.
            </p>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Redundancy High Availability</h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Critical workloads requiring parallel duplicate log listeners to avoid single-point-of-failure limits on networks incur an SLA multiplier coefficient.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: BUDGET OPTIONS MATRIX TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="estimator-matrix-table">
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
          <div className="bg-[#faf9f8] px-5 py-4 border-b border-slate-200 flex justify-between items-center">
            <h4 className="text-xs font-bold font-mono text-slate-700 uppercase tracking-wider">Sovereign Standard Pricing Matrix (Reference Tiers)</h4>
          </div>
          <table className="w-full text-left text-xs divide-y divide-slate-200 font-sans">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                <th className="px-5 py-3">Reference Tier</th>
                <th className="px-5 py-3">Avg Nodes Bound</th>
                <th className="px-5 py-3">Retention Archiving</th>
                <th className="px-5 py-3">Environment Structure</th>
                <th className="px-5 py-3 text-right">Est. Budget</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600 font-mono">
              {budgetMatrix.map((b, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3.5 font-bold text-slate-900 font-sans">{b.tier}</td>
                  <td className="px-5 py-3.5">{b.nodes}</td>
                  <td className="px-5 py-3.5">{b.retention}</td>
                  <td className="px-5 py-3.5 font-sans">{b.deploy}</td>
                  <td className="px-5 py-3.5 text-right font-bold text-blue-650">{b.estBudget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: VOLUME INGESTION DISCOUNTS */}
      <section className="bg-white border-y border-slate-200 py-12 text-left" id="estimator-volume-rules">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-250">Enterprise Relief</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Automated Volume Ingestion Discounts</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We apply linear cost reductions automatically as nodes scales. Enterprises running large-scale container platforms can substantially lower per-node operational outlays.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-202 rounded-xl space-y-4">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Standard Volume Scale Breaks</span>
            <div className="space-y-2 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-emerald-600" /> 100+ Active Nodes &rarr; <strong>15% Cost Reduction</strong></div>
              <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-emerald-600" /> 250+ Active Nodes &rarr; <strong>25% Cost Reduction</strong></div>
              <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-emerald-600" /> 500+ Active Nodes &rarr; <strong>35% Cost Reduction</strong></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PRIVATE DEPLOYMENT FACTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="estimator-deployment-advisory">
        <div className="grid md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg">
            <strong className="text-slate-900 block mb-1">On-Premises Offline Local Cache</strong>
            <p className="text-[11px] leading-relaxed">Runs completely disconnected from external networks, saving backup database files onto a local disk.</p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg">
            <strong className="text-slate-900 block mb-1">Hybrid SaaS Log Routing</strong>
            <p className="text-[11px] leading-relaxed">Logs pipe through secured TLS 1.3 channels to our hosted servers, with zero client hosting overhead.</p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg">
            <strong className="text-slate-900 block mb-1">Governing SLA Support Packages</strong>
            <p className="text-[11px] leading-relaxed">Dedicated SOC managers handle compliance drift alerts and custom integration mappings.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: BILLING STANDARD LEGAL DISCLAIMER */}
      <section className="max-w-4xl mx-auto px-4 pb-8" id="estimator-billing-governance">
        <div className="space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#2045B4]" /> Billing Terms &amp; Conditions
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Cost calculations generated by this dynamic estimator are indicative modeling estimates and do not constitute an official binding financial contract. All formal enterprise security licensing terms are processed manually and verified under legal frameworks governed by Conzex Global Private Limited, Singapore.
          </p>
        </div>
      </section>

    </div>
  );
}
