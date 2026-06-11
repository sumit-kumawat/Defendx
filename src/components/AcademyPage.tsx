import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, GraduationCap, Check, ArrowRight, ShieldCheck, HelpCircle, Star } from 'lucide-react';

interface AcademyPageProps {
  onNavigateToVerify: () => void;
}

export default function AcademyPage({ onNavigateToVerify }: AcademyPageProps) {
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [studentProgress, setStudentProgress] = useState(65);

  const coursesList = [
    {
      code: "CDXSA",
      title: "Certified Defendx SIEM Administrator",
      duration: "4 Weeks - Live Labs",
      rating: "5.0",
      stats: "Defendx Daemon v4.12",
      desc: "Comprehensive deployment training covering host daemon orchestration, log routing rulesets, decoder variables, and local SQLite data syncing.",
      highlights: [
        "Daemon compilation and target deployment",
        "MITRE ATT&CK taxonomy indexing config",
        "Writing custom log parsing regex decoders",
        "Encrypted database storage backups setup"
      ]
    },
    {
      code: "CDXSE",
      title: "Certified Defendx Security Engineer",
      duration: "6 Weeks - Hands-On Virtual Sandbox",
      rating: "4.9",
      stats: "MITRE ATT&CK Mastery",
      desc: "Advanced engineering course on threat hunting mechanics, isolating compromised hosts with API loops, and configuring compliance profiles.",
      highlights: [
        "Configuring custom alerts using XML rules",
        "Automated isolate endpoints with script daemons",
        "Multi-cloud telemetry ingestion pipeline setups",
        "Relational log parsing scale limits"
      ]
    },
    {
      code: "CDXSP",
      title: "Certified Defendx Security Professional",
      duration: "8 Weeks - Full Simulation",
      rating: "5.0",
      stats: "SLA / Incidence Command",
      desc: "Top-tier operational certificate for SOC team leaders, certifying incident command strategies, vulnerability detection, and ISO audits.",
      highlights: [
        "ISO 27001 / SOC2 Type II audit blueprints",
        "FIM signature signing policies configuration",
        "Air-gapped deployment high-availability arrays",
        "Live security drill command loops"
      ]
    }
  ];

  return (
    <div className="space-y-12 py-8 text-left font-sans" id="academy-page-content">
      
      {/* SECTION 1: DYNAMICAL HERO */}
      <section className="bg-white border-b border-slate-200 py-16 text-left relative overflow-hidden" id="academy-hero-interactive">
        <div className="absolute inset-0 bg-[#faf9f8] opacity-75 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-105/35 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-250 text-blue-600 text-xs font-bold tracking-wider uppercase rounded">
                <GraduationCap className="w-4 h-4 text-[#2045B4]" />
                Conzex Training Academy
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Defendx Professional Academy &amp; Certifications
              </h1>
              <p className="text-sm sm:text-base text-slate-650 leading-relaxed max-w-xl">
                Earn global accredited cyber security operator credentials. All syllabus modules incorporate extensive hands-on local VM labs, certifying actual configuration execution.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onNavigateToVerify}
                  className="px-5 py-3 bg-[#2045B4] hover:bg-[#1a389c] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Award className="w-4 h-4" />
                  Verify CDX Credentials
                </button>
              </div>
            </div>

            {/* Right side: Student dashboard sandbox progress */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-2xl font-mono text-xs text-slate-350 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <Star className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>XLEARNING_STUDENT_DESK</span>
                </div>
                <span className="text-[10px] bg-green-500/15 text-green-400 font-bold px-2 py-0.5 rounded">ONLINE LAB</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] mb-1 text-slate-300">
                    <span className="font-bold text-white">CDXSA Lab Virtual Machine Boot-Up</span>
                    <span className="text-blue-400">{studentProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full rounded transition-all duration-500" 
                      style={{ width: `${studentProgress}%` }}
                    ></div>
                  </div>
                  <button 
                    onClick={() => setStudentProgress(studentProgress >= 100 ? 20 : studentProgress + 20)}
                    className="text-[10px] text-blue-400 underline mt-1.5 focus:text-blue-300"
                  >
                    Simulate Lab Step Forward
                  </button>
                </div>

                <div className="p-3 bg-black rounded border border-slate-800/80 text-[10px] space-y-1 text-slate-400">
                  <p className="text-blue-400 font-bold">&gt; Initializing target sandbox shell on :3000</p>
                  <p>&gt; Mapped volume: /data/defendx_store.json</p>
                  <p>&gt; Student accreditation state: VALID</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: THE DETAILED COURSES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="academy-courses-showcase">
        <div className="max-w-3xl mb-8">
          <h3 className="text-xl font-bold text-slate-900 font-display">Accredited Academic Course Portfolio</h3>
          <p className="text-slate-500 text-xs mt-1">Explore available operational tracks. Click any certificate block to toggle extensive curriculum schedules.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {coursesList.map((course, idx) => {
            const isExpanded = activeCourse === course.code;
            return (
              <div 
                key={course.code} 
                className={`p-6 bg-white border rounded-xl hover:shadow-lg transition-all text-left flex flex-col justify-between ${
                  isExpanded ? 'border-[#2045B4] bg-[#2045B4]/5 ring-2 ring-[#2045B4]/20' : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono font-black text-[#2045B4] bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200 uppercase tracking-wider">{course.code}</span>
                    <span className="text-xs text-slate-400">{course.duration}</span>
                  </div>
                  
                  <h4 className="text-base font-bold text-slate-950 mb-2">{course.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{course.desc}</p>

                  <div className="space-y-2 border-t pt-4 mt-4 border-slate-100">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block tracking-wider">Curriculum Path</span>
                    <ul className="space-y-1.5">
                      {course.highlights.map((hlt, i) => (
                        <li key={i} className="flex gap-2 items-start text-[11px] text-slate-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#2045B4] shrink-0 mt-0.5" />
                          <span>{hlt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 border-t pt-4 border-slate-100 flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-amber-600 flex items-center gap-1">⭐ {course.rating} Course rating</span>
                  <button 
                    onClick={() => setActiveCourse(isExpanded ? null : course.code)}
                    className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {isExpanded ? 'Collapse' : 'Toggle Syllabus'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: FAQ / ACCREDITATIONS LIMITS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left bg-[#faf9f8] p-6 sm:p-8 rounded-xl border border-slate-200 space-y-6" id="academy-standards">
        <div className="flex gap-3 border-b border-slate-200 pb-4">
          <BookOpen className="w-6 h-6 text-[#2045B4]" />
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-display">Academic Accreditation Framework</h4>
            <p className="text-[11px] text-slate-550">We govern technical operators to enforce standard compliance metrics internally.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 text-xs text-slate-650 leading-relaxed">
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 font-mono text-[11px] uppercase">How are course lab VMs provisioned?</h5>
            <p>Every logged candidate gets a secured localized VM container. Lab logs serialize credentials and track scoring states automatically into regional JSON registries.</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 font-mono text-[11px] uppercase">Is my certificate code lookup active?</h5>
            <p>Yes. Certified operators map a distinct `CDXXXXXXXXX` auth code. Any peer audit supervisor can key details directly on `defendx.io/verify` instantly.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: ENTERPRISE CORPORATE TRAINING ALLIANCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left" id="academy-alliances">
        <div className="border border-slate-200 bg-white p-6 sm:p-8 rounded-xl grid md:grid-cols-2 gap-8 items-center shadow-xs">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-[#2045B4] uppercase tracking-wider">Custom Cohorts</span>
            <h4 className="text-xl font-bold text-slate-900 font-display">Enterprise Team Training Programs</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We design specialized, private SIEM bootcamp schedules for cybersecurity operations centres (SOC) and enterprise development groups. Teams learn to trace kernel drift parameters and deploy customized regex decoders in sandboxed micro-caches.
            </p>
          </div>
          <div className="p-5 bg-[#faf9f8] border border-slate-200 rounded-lg space-y-3">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Standard Enterprise Syllabus benefits</span>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 font-bold shrink-0" />Dedicated private lab VMs</li>
              <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 font-bold shrink-0" />Custom localized scenario designs</li>
              <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 font-bold shrink-0" />Direct API dashboard grading profiles</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 5: OFFICIAL LAB CERTIFICATION ROADMAP PATHS */}
      <section className="bg-white border-y border-slate-200 py-12 text-left" id="academy-roadmap">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h4 className="text-base font-bold text-slate-900 uppercase tracking-wider font-display">Engineering Qualification Pathways</h4>
          <div className="grid sm:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xl font-mono font-black text-slate-350 block mb-1">01</span>
              <strong className="text-slate-900 block mb-1">Associate Core level</strong>
              <p className="text-[11px] leading-relaxed">Qualify for CDXSA covering core config and terminal orchestration mechanics.</p>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xl font-mono font-black text-slate-350 block mb-1">02</span>
              <strong className="text-slate-900 block mb-1">Engineering level</strong>
              <p className="text-[11px] leading-relaxed">Qualify for CDXSE covering MITRE ATT&CK rules, syslog, and XDR incident loops.</p>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xl font-mono font-black text-slate-350 block mb-1">03</span>
              <strong className="text-slate-900 block mb-1">Security Professional Architect</strong>
              <p className="text-[11px] leading-relaxed">Qualify for CDXSP covering SOC enterprise compliance, auditable structures, and high availability systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: ACADEMIC ADMISSIONS & ENROLLMENT GUIDELINES */}
      <section className="max-w-4xl mx-auto px-4 pb-8" id="academy-enrollment">
        <div className="space-y-4 text-left">
          <h4 className="text-sm font-mono font-bold text-[#2045B4] uppercase tracking-wider">Admissions Standard Notice</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            All course admissions and subsequent credentials registry indexes are governed under terms administered by Conzex Global Private Limited. Qualified operators must submit an identity reference to secure their remote credentials row mapping during sandbox examination setups.
          </p>
        </div>
      </section>
    </div>
  );
}
