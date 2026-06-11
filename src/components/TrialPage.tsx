import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckSquare, 
  Activity, 
  Terminal, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  HardDrive,
  Info,
  ExternalLink,
  LifeBuoy
} from 'lucide-react';

export default function TrialPage() {
  const [trialName, setTrialName] = useState('');
  const [trialEmail, setTrialEmail] = useState('');
  const [trialCompany, setTrialCompany] = useState('');
  const [trialNodes, setTrialNodes] = useState(50);
  const [trialDeploy, setTrialDeploy] = useState('saas');
  const [trialStatus, setTrialStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [trialFeedback, setTrialFeedback] = useState('');

  // Interactive Command Generator state
  const [targetOS, setTargetOS] = useState<'ubuntu' | 'rhel' | 'k8s'>('ubuntu');

  const submitTrialForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialName.trim() || !trialEmail.trim()) {
      setTrialStatus('error');
      setTrialFeedback('Corporate contact name and email address are required.');
      return;
    }

    setTrialStatus('submitting');
    try {
      const response = await fetch('/api/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trialName,
          email: trialEmail,
          company: trialCompany,
          endpoints: trialNodes,
          deployment: trialDeploy
        })
      });
      const data = await response.json();
      if (response.ok) {
        setTrialStatus('success');
        setTrialFeedback(data.message || 'Trial application authorized in database successfully.');
        setTrialName('');
        setTrialEmail('');
        setTrialCompany('');
        setTrialNodes(50);
      } else {
        setTrialStatus('error');
        setTrialFeedback(data.error || 'Authorization denied by administrator rules.');
      }
    } catch {
      setTrialStatus('error');
      setTrialFeedback('Network failure communicating with database store.');
    }
  };

  const commandTemplates = {
    ubuntu: "curl -sI https://defendx.io/verify/install.sh | sudo bash -s -- --trial --key=CDX-EVAL-SANDBOX",
    rhel: "curl -sI https://defendx.io/verify/install_rhel.sh | sudo sh -s -- --trial --key=CDX-EVAL-SANDBOX",
    k8s: "helm install defendx-agent defendx/defendx-agent --set trial.key=CDX-EVAL-SANDBOX --set sqlite.enabled=true"
  };

  return (
    <div className="space-y-16 py-8 text-left font-sans animate-fade-in" id="trial-page-main">
      
      {/* SECTION 1: INTERACTIVE EVALUATION HERO */}
      <section className="bg-white border-b border-slate-200 py-12 text-left relative overflow-hidden" id="trial-hero">
        <div className="absolute inset-0 bg-[#faf9f8] opacity-75 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-105/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side instruction panel */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-250 text-blue-600 text-xs font-bold tracking-wider uppercase rounded font-mono">
                <CheckSquare className="w-3.5 h-3.5" />
                Enterprise Sandbox Evaluation
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Request a Fully Functional Trial License
              </h1>
              <p className="text-sm sm:text-base text-slate-650 leading-relaxed">
                Unlock full host capabilities under localized environments. Submitted applications automatically allocate transient testing identifiers for audit, FIM monitor, and MITRE taxonomies drills.
              </p>

              <div className="space-y-3.5 text-xs text-slate-700 font-mono">
                <div className="flex gap-2">
                  <span className="text-blue-650 font-black">✔</span>
                  <span>100% active functional evaluation copy</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-650 font-black">✔</span>
                  <span>Dedicated SQLite data backups</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-650 font-black">✔</span>
                  <span>Direct access to Singapore specialists helpdesk</span>
                </div>
              </div>
            </div>

            {/* Right side form block */}
            <div className="lg:col-span-6 bg-white border border-slate-202 p-6 sm:p-8 rounded-xl shadow-xl space-y-4 relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2045B4] rounded-t-xl"></div>
              
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black font-mono uppercase tracking-wider text-slate-900">
                  Request Secure Setup Application
                </h3>
                <p className="text-[11px] text-slate-450">Evaluations populate our secure master database rows.</p>
              </div>

              {trialStatus === 'success' && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs leading-relaxed text-emerald-800 space-y-1">
                  <p className="font-bold">Authorization approved.</p>
                  <p>{trialFeedback}</p>
                </div>
              )}

              {trialStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-xs leading-relaxed text-red-800">
                  <p className="font-bold">Error processing request.</p>
                  <p>{trialFeedback}</p>
                </div>
              )}

              <form onSubmit={submitTrialForm} className="space-y-3.5 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-550 font-mono uppercase text-[10px]">Corporate Contact Name:</label>
                  <input
                    type="text"
                    required
                    value={trialName}
                    placeholder="e.g. John Doe"
                    onChange={(e) => setTrialName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-250 text-xs font-medium text-slate-800 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-650"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-550 font-mono uppercase text-[10px]">Corporate Email Address:</label>
                  <input
                    type="email"
                    required
                    value={trialEmail}
                    placeholder="name@corporation.com"
                    onChange={(e) => setTrialEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-250 text-xs font-medium text-slate-800 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-650"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-555 font-mono uppercase text-[10px]">Company / Organization name:</label>
                  <input
                    type="text"
                    value={trialCompany}
                    placeholder="Conzex Enterprises"
                    onChange={(e) => setTrialCompany(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-250 text-xs font-medium text-slate-800 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-650"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-550 font-mono uppercase text-[10px]">Total Target Endpoints:</label>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={trialNodes}
                      onChange={(e) => setTrialNodes(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-250 text-xs font-medium text-slate-800 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-650"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-550 font-mono uppercase text-[10px]">Deployment Target:</label>
                    <select
                      value={trialDeploy}
                      onChange={(e) => setTrialDeploy(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-250 text-xs font-medium text-slate-800 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-650"
                    >
                      <option value="saas">SaaS Cloud</option>
                      <option value="onprem">On-Premises Array</option>
                      <option value="airgapped">Air-Gapped Isolation</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={trialStatus === 'submitting'}
                  className="w-full bg-[#2045B4] hover:bg-[#1a389c] disabled:bg-slate-400 text-white font-bold p-3 text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {trialStatus === 'submitting' ? 'Authorizing Database record...' : 'Submit Secure Setup Application'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: STANDARD EVALUATION MODULES INCLUDED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="trial-features">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Evaluation Modules</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-display">What's Included in the Sandbox</h2>
          <p className="text-slate-550 text-xs">Standard trial keys unlock exhaustive SIEM tools out of the box.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 font-sans">
          <div className="p-5 bg-white border border-slate-202 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">FIM Monitoring (v4.12)</h4>
            <p className="text-slate-655 text-xs leading-relaxed">
              Real-time monitoring of folder and files hashes to instantly alert configuration drifts on critical virtual machines.
            </p>
          </div>
          <div className="p-5 bg-white border border-slate-202 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">MITRE ATT&amp;CK Alignments</h4>
            <p className="text-slate-655 text-xs leading-relaxed">
              Match terminal shell processes with standard adversarial procedure sets using preconfigured regex rules.
            </p>
          </div>
          <div className="p-5 bg-white border border-slate-202 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Active Port Isolation</h4>
            <p className="text-slate-655 text-xs leading-relaxed">
              Trigger quarantine scripts to shut down bad socket tunnels inside microseconds before severe data leakage can occur.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: SYSTEM PREREQUISITES TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="trial-prereqs">
        <div className="border border-slate-202 rounded-xl overflow-hidden bg-white shadow-xs">
          <div className="bg-[#faf9f8] px-5 py-4 border-b border-slate-202">
            <h4 className="text-xs font-bold font-mono text-slate-700 uppercase tracking-wider">Target System Prerequisites Baseline</h4>
          </div>
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                <th className="px-5 py-3">Host OS</th>
                <th className="px-5 py-3">Supported Arch</th>
                <th className="px-5 py-3">Min Hardware Specs</th>
                <th className="px-5 py-3 text-right">Local Storage Ingest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-202 text-slate-600 font-mono">
              <tr className="hover:bg-slate-50/50">
                <td className="px-5 py-3.5 font-bold text-slate-900 font-sans">Ubuntu 20.04 / 22.04 LTS</td>
                <td className="px-5 py-3.5">x86_64 or arm64</td>
                <td className="px-5 py-3.5">1 vCPU, 2 GB RAM minimum</td>
                <td className="px-5 py-3.5 text-right text-emerald-600">SQLite encrypted DB active</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="px-5 py-3.5 font-bold text-slate-900 font-sans">RHEL / Rocky Linux 8/9</td>
                <td className="px-5 py-3.5">x86_64 only</td>
                <td className="px-5 py-3.5">1 vCPU, 2 GB RAM minimum</td>
                <td className="px-5 py-3.5 text-right text-emerald-600">Syslog redirect enabled</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="px-5 py-3.5 font-bold text-slate-900 font-sans">Kubernetes Clusters</td>
                <td className="px-5 py-3.5">Helm v3 template</td>
                <td className="px-5 py-3.5">DaemonSet resources limits</td>
                <td className="px-5 py-3.5 text-right text-emerald-600">Cache storage volume</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE SETUP COMMAND GENERATOR */}
      <section className="bg-white border-y border-slate-202 py-12 text-left" id="trial-command-generator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Self-Service Setup</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-905 font-display">Sandbox Startup Command Generator</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Select your respective host operating system environment parameters to inspect the standardized curl compilation script or Helm commands instantly.
            </p>
            <div className="flex gap-2 font-mono text-[10px] uppercase font-bold">
              <button 
                onClick={() => setTargetOS('ubuntu')}
                className={`px-2.5 py-1.5 rounded-md border transition-all cursor-pointer ${targetOS === 'ubuntu' ? 'bg-[#2045B4] text-white border-[#2045B4]' : 'bg-slate-100 hover:bg-slate-150 border-slate-250 text-slate-650'}`}
              >
                Ubuntu Bash
              </button>
              <button 
                onClick={() => setTargetOS('rhel')}
                className={`px-2.5 py-1.5 rounded-md border transition-all cursor-pointer ${targetOS === 'rhel' ? 'bg-[#2045B4] text-white border-[#2045B4]' : 'bg-slate-100 hover:bg-slate-150 border-slate-250 text-slate-650'}`}
              >
                Rocky/RHEL
              </button>
              <button 
                onClick={() => setTargetOS('k8s')}
                className={`px-2.5 py-1.5 rounded-md border transition-all cursor-pointer ${targetOS === 'k8s' ? 'bg-[#2045B4] text-white border-[#2045B4]' : 'bg-slate-100 hover:bg-slate-150 border-slate-250 text-slate-650'}`}
              >
                K8s Helm
              </button>
            </div>
          </div>

          <div className="md:col-span-6 bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md font-mono text-xs text-slate-350 space-y-3">
            <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-2 mb-2 font-bold text-[10px]">
              <span>COMPILE_SETUP_LINE</span>
              <span className="text-emerald-450 uppercase flex items-center gap-1"><Terminal className="w-3 h-3 text-emerald-400 inline" /> READ-ONLY</span>
            </div>
            <p className="text-blue-400 select-all p-3 bg-black rounded border border-slate-800 break-all leading-relaxed">
              {commandTemplates[targetOS]}
            </p>
            <p className="text-[10px] text-slate-450 leading-relaxed">
              Ensure you execute the target curl parameter strings strictly from isolated server sandbox rows to safely prevent root workspace leaks.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: LICENSING LEGAL COMPLIANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="trial-compliance-laws">
        <h3 className="text-base font-bold text-slate-900 font-display uppercase tracking-wider mb-6">Trial Licensing Laws</h3>
        <div className="grid md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-605">
          <div className="p-5 bg-[#faf9f8] border border-slate-202 rounded-lg space-y-1.5">
            <h4 className="font-bold text-slate-900">15-Day Automatic Expiration Safeguard</h4>
            <p className="text-xs leading-relaxed text-slate-600">
              In order to prevent prolonged licensing liabilities externally, all sandbox trial codes include hardcoded internal routines that gracefully deactivate telemetry pipelines after 15 calendar days.
            </p>
          </div>
          <div className="p-5 bg-[#faf9f8] border border-slate-202 rounded-lg space-y-1.5">
            <h4 className="font-bold text-slate-900">No Secondary Redistribution Rights</h4>
            <p className="text-xs leading-relaxed text-slate-600">
              Evaluation packages, virtual machines configurations blueprints, and log parsing regular expressions are copyrighted intellectual assets protected strictly by Conzex Global Private Limited.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: SUPPORT SLA HELPDESK & CERTIFICATION FAQ */}
      <section className="max-w-4xl mx-auto px-4 pb-8" id="trial-support-footer">
        <div className="space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <LifeBuoy className="w-4.5 h-4.5 text-[#2045B4]" /> Specialized SLA Assistance FAQs
          </h4>
          <p className="text-xs text-slate-605 leading-relaxed font-sans">
            Have questions about virtual labs integrations or registry lookups during trial evaluations? Submit queries securely on our main Contact portal or consult with Singapore administrative personnel for direct escalation options. All guidelines are verified and maintained by Conzex Global Private Limited.
          </p>
        </div>
      </section>

    </div>
  );
}
