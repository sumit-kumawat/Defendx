import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Award, 
  Shield, 
  Layers, 
  Clock, 
  ChevronRight, 
  Copy, 
  CheckCircle2, 
  HardDrive, 
  Landmark, 
  Cpu, 
  Activity,
  FileCheck2,
  Lock,
  Compass,
  ArrowRight
} from 'lucide-react';

// Import our modular subpages
import PlatformPage from './components/PlatformPage';
import CloudPage from './components/CloudPage';
import CtiPage from './components/CtiPage';
import AcademyPage from './components/AcademyPage';
import ServicesPage from './components/ServicesPage';
import PartnersPage from './components/PartnersPage';
import CompanyPage from './components/CompanyPage';
import ContactPage from './components/ContactPage';
import TrialPage from './components/TrialPage';
import EstimatorPage from './components/EstimatorPage';
import VerifyPage from './components/VerifyPage';
import LegalPage from './components/LegalPage';
import AdminPage from './components/AdminPage';
import InvoicePage from './components/InvoicePage';

export default function App() {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash || '#home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [xLearningDropdownOpen, setXLearningDropdownOpen] = useState<boolean>(false);
  
  // Track parameters for verifying code
  const [extractedCode, setExtractedCode] = useState<string>('');

  // Setup routing hook
  useEffect(() => {
    const handleHashRouter = () => {
      const hash = window.location.hash || '#home';
      setCurrentHash(hash);
      
      // Support path matching defendx.io/#verify?code=CDXSA090896
      if (hash.includes('#verify')) {
        const queryIdx = hash.indexOf('?code=');
        if (queryIdx !== -1) {
          const codeVal = hash.substring(queryIdx + 6);
          if (codeVal) {
            setExtractedCode(codeVal);
          }
        } else {
          setExtractedCode('');
        }
      } else {
        setExtractedCode('');
      }
      
      // Auto-scroll to top when hash path changes
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    };

    window.addEventListener('hashchange', handleHashRouter);
    handleHashRouter(); // Run once initially
    
    return () => window.removeEventListener('hashchange', handleHashRouter);
  }, []);

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
    setMobileMenuOpen(false);
    setXLearningDropdownOpen(false);
  };

  // Render correct subpage based on routing hash
  const renderActivePage = () => {
    const hash = currentHash;
    
    if (hash.startsWith('#admin')) {
      return <AdminPage />;
    }
    if (hash.startsWith('#invoice')) {
      return <InvoicePage />;
    }
    if (hash.startsWith('#verify')) {
      return <VerifyPage initialCode={extractedCode} />;
    }
    if (hash.startsWith('#cloud')) {
      return <CloudPage />;
    }
    if (hash.startsWith('#cti')) {
      return <CtiPage />;
    }
    if (hash.startsWith('#courses')) {
      return <AcademyPage onNavigateToVerify={() => navigateTo('#verify')} />;
    }
    if (hash.startsWith('#services')) {
      return <ServicesPage />;
    }
    if (hash.startsWith('#partners')) {
      return <PartnersPage />;
    }
    if (hash.startsWith('#company')) {
      return <CompanyPage />;
    }
    if (hash.startsWith('#contact')) {
      return <ContactPage />;
    }
    if (hash.startsWith('#trial')) {
      return <TrialPage />;
    }
    if (hash.startsWith('#pricing') || hash.startsWith('#estimator')) {
      return <EstimatorPage />;
    }
    if (hash.startsWith('#privacy')) {
      return <LegalPage onBackToHome={() => navigateTo('#home')} initialSection="privacy" />;
    }
    if (hash.startsWith('#terms')) {
      return <LegalPage onBackToHome={() => navigateTo('#home')} initialSection="terms" />;
    }
    if (hash.startsWith('#refund')) {
      return <LegalPage onBackToHome={() => navigateTo('#home')} initialSection="refund" />;
    }
    
    // Default home page / Platform Page
    return (
      <PlatformPage 
        onNavigateToVerify={() => navigateTo('#verify')} 
        onNavigateToTrial={() => navigateTo('#trial')}
        onNavigateToPricing={() => navigateTo('#pricing')}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans text-slate-800 selection:bg-blue-600/10 selection:text-[#2045B4]" id="defendx-workspace">
      
      {/* NO TICKER OVER-HEADER: DIRECT CLEAN NAV HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs" id="desktop-app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left Block Logo (No text University with icon) */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateTo('#home')} 
              className="flex items-center gap-3 focus:outline-none group cursor-pointer"
              id="brand-header-trigger"
            >
              <img 
                src="https://cdn.conzex.com/files/dx/light.svg" 
                alt="Defendx Secure Logo" 
                className="h-7 object-contain" 
                referrerPolicy="no-referrer"
              />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5" id="header-desktop-navigation">
            <button
              onClick={() => navigateTo('#home')}
              className={`px-3.5 py-2 text-xs font-bold tracking-wider transition-all rounded cursor-pointer ${
                (currentHash === '#home' || currentHash === '#platform' || currentHash === '')
                  ? 'text-blue-600 bg-slate-50 border-b-2 border-blue-600'
                  : 'text-slate-650 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Platform
            </button>
            <button
              onClick={() => navigateTo('#cloud')}
              className={`px-3.5 py-2 text-xs font-bold tracking-wider transition-all rounded cursor-pointer ${
                currentHash.startsWith('#cloud')
                  ? 'text-blue-600 bg-slate-50 border-b-2 border-blue-600'
                  : 'text-slate-650 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Cloud Integrity
            </button>
            <button
              onClick={() => navigateTo('#cti')}
              className={`px-3.5 py-2 text-xs font-bold tracking-wider transition-all rounded cursor-pointer ${
                currentHash.startsWith('#cti')
                  ? 'text-blue-600 bg-slate-50 border-b-2 border-blue-600'
                  : 'text-slate-650 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Threat Intelligence
            </button>

            {/* xLearning Dropdown Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setXLearningDropdownOpen(true)}
              onMouseLeave={() => setXLearningDropdownOpen(false)}
            >
              <button
                onClick={() => setXLearningDropdownOpen(!xLearningDropdownOpen)}
                className={`px-3.5 py-2 text-xs font-bold tracking-wider transition-all rounded cursor-pointer flex items-center gap-1.5 ${
                  (currentHash.startsWith('#courses') || currentHash.startsWith('#verify'))
                    ? 'text-blue-600 bg-slate-50 font-black'
                    : 'text-slate-650 hover:text-blue-600 hover:bg-slate-50'
                }`}
                id="xlearn-dropdown-button"
              >
                xLearning
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${xLearningDropdownOpen ? 'rotate-90' : 'rotate-0'}`} />
              </button>

              <AnimatePresence>
                {xLearningDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 mt-0.5 w-52 bg-white border border-slate-200 rounded shadow-lg py-1.5 z-50 text-left font-sans"
                    id="xlearning-nav-dropdown-overlay"
                  >
                    <button
                      onClick={() => navigateTo('#courses')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-750 hover:bg-slate-50 hover:text-blue-600 font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      All Academy Courses
                    </button>
                    <button
                      onClick={() => navigateTo('#verify')}
                      className="w-full text-left px-4 py-2 text-xs text-slate-750 hover:bg-slate-50 hover:text-blue-600 font-bold flex items-center gap-2 cursor-pointer border-t border-slate-100"
                    >
                      <Award className="w-3.5 h-3.5 text-blue-600" />
                      Verify CDX Certificate
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => navigateTo('#services')}
              className={`px-3.5 py-2 text-xs font-bold tracking-wider transition-all rounded cursor-pointer ${
                currentHash.startsWith('#services')
                  ? 'text-blue-600 bg-slate-50 border-b-2 border-blue-600'
                  : 'text-slate-650 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => navigateTo('#partners')}
              className={`px-3.5 py-2 text-xs font-bold tracking-wider transition-all rounded cursor-pointer ${
                currentHash.startsWith('#partners')
                  ? 'text-blue-600 bg-slate-50 border-b-2 border-blue-600'
                  : 'text-slate-650 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Partners
            </button>
            <button
              onClick={() => navigateTo('#company')}
              className={`px-3.5 py-2 text-xs font-bold tracking-wider transition-all rounded cursor-pointer ${
                currentHash.startsWith('#company')
                  ? 'text-blue-600 bg-slate-50 border-b-2 border-blue-600'
                  : 'text-slate-650 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Company
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => navigateTo('#contact')}
              className={`px-3.5 py-2 text-xs font-bold tracking-wider hover:text-blue-600 transition-colors cursor-pointer ${currentHash === '#contact' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-650'}`}
              id="navbar-contact-action"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigateTo('#trial')}
              className="px-4 py-2 text-xs font-black uppercase text-white bg-[#2045B4] hover:bg-[#1a389c] rounded shadow-xs cursor-pointer transition-colors"
              id="navbar-trial-action"
            >
              Get a Trial
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-slate-600 hover:text-slate-900 focus:outline-none"
              id="mobile-nav-trigger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile menu drawer panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg py-3 animate-fade-in text-left px-4 space-y-2 font-sans" id="mobile-navigation-drawer">
            <button
              onClick={() => navigateTo('#home')}
              className="w-full text-left px-3 py-2 text-xs font-bold text-slate-750 hover:bg-slate-50 hover:text-blue-600 rounded flex items-center justify-between"
            >
              <span>Platform</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigateTo('#cloud')}
              className="w-full text-left px-3 py-2 text-xs font-bold text-slate-750 hover:bg-slate-50 hover:text-blue-600 rounded flex items-center justify-between"
            >
              <span>Cloud Integrity</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigateTo('#cti')}
              className="w-full text-left px-3 py-2 text-xs font-bold text-slate-750 hover:bg-slate-50 hover:text-blue-600 rounded flex items-center justify-between"
            >
              <span>Threat Intelligence</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigateTo('#courses')}
              className="w-full text-left px-3 py-2 text-xs font-bold text-slate-750 hover:bg-slate-50 hover:text-blue-600 rounded flex items-center justify-between"
            >
              <span>Academy Courses</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigateTo('#verify')}
              className="w-full text-left px-3 py-2 text-xs font-bold text-slate-750 hover:bg-slate-50 hover:text-blue-600 rounded flex items-center justify-between"
            >
              <span>Verify CDX Certificate</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigateTo('#services')}
              className="w-full text-left px-3 py-2 text-xs font-bold text-slate-750 hover:bg-slate-50 hover:text-blue-600 rounded flex items-center justify-between"
            >
              <span>Services</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigateTo('#partners')}
              className="w-full text-left px-3 py-2 text-xs font-bold text-slate-750 hover:bg-slate-50 hover:text-blue-600 rounded flex items-center justify-between"
            >
              <span>Partners</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigateTo('#company')}
              className="w-full text-left px-3 py-2 text-xs font-bold text-slate-750 hover:bg-slate-50 hover:text-blue-600 rounded flex items-center justify-between"
            >
              <span>Company</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            
            <div className="border-t pt-2 mt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => navigateTo('#contact')}
                className="w-full text-center py-2.5 bg-slate-50 border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 text-xs rounded"
              >
                Contact Us
              </button>
              <button
                onClick={() => navigateTo('#trial')}
                className="w-full text-center py-2.5 bg-[#2045B4] text-white font-bold hover:bg-[#1a389c] text-xs rounded"
              >
                Get a Trial
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN VIEWPORT WITH TRANSITION STATES */}
      <main className="min-h-[70vh] bg-[#faf9f8]" id="app-main-view">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHash}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* CORPORATE SLATE FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 font-sans" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            
            {/* Column 1 info with active updated logo */}
            <div className="md:col-span-5 space-y-4 text-left">
              <img 
                src="https://cdn.conzex.com/files/dx/dark.svg" 
                alt="Defendx Secure Logo" 
                className="h-7 object-contain" 
                referrerPolicy="no-referrer"
              />
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Sovereign corporate security log analysis and FIM monitoring platform. Owned and managed by Conzex Global Private Limited.
              </p>
            </div>

            {/* Column 2: Navigation hubs */}
            <div className="md:col-span-3 text-left space-y-3 text-xs">
              <span className="font-bold text-slate-350 uppercase tracking-widest font-mono text-[9px] block">Corporate hubs</span>
              <ul className="space-y-2 text-slate-400 font-bold">
                <li><button onClick={() => navigateTo('#home')} className="hover:text-white cursor-pointer hover:underline">Sovereign Platform</button></li>
                <li><button onClick={() => navigateTo('#cloud')} className="hover:text-white cursor-pointer hover:underline">Cloud Integrity</button></li>
                <li><button onClick={() => navigateTo('#cti')} className="hover:text-white cursor-pointer hover:underline">Threat Intelligence</button></li>
                <li><button onClick={() => navigateTo('#courses')} className="hover:text-white cursor-pointer hover:underline">xLearning Courses</button></li>
                <li><button onClick={() => navigateTo('#services')} className="hover:text-white cursor-pointer hover:underline">Professional Services</button></li>
              </ul>
            </div>

            {/* Column 3: Corporate Coordination */}
            <div className="md:col-span-4 text-left space-y-3 text-xs">
              <span className="font-bold text-slate-350 uppercase tracking-widest font-mono text-[9px] block">Corporate Office</span>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Peer query lookup is active on defendx.io/verify. To organize an auditor review, consult our coordination offices in Singapore Downtown Core.
              </p>
              <div className="text-[10px] font-mono text-[#0078d4] font-bold">
                Conzex Global Private Limited &bull; Singapore Headquarters
              </div>
            </div>

          </div>

          {/* Legal Compliance row with LINKED LABELS instead of plain text */}
          <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
            <span>&copy; {new Date().getFullYear()} Conzex Global Private Limited. All Rights Reserved.</span>
            
            {/* Clickable Linked Compliance Labels */}
            <div className="flex flex-wrap gap-4 font-bold text-slate-400">
              <button 
                onClick={() => navigateTo('#company')} 
                className="hover:text-white hover:underline cursor-pointer flex items-center gap-1"
              >
                ISO 27001 Certified
              </button>
              <button 
                onClick={() => navigateTo('#company')} 
                className="hover:text-white hover:underline cursor-pointer flex items-center gap-1"
              >
                SOC2 Type II Attested
              </button>
              <button 
                onClick={() => navigateTo('#company')} 
                className="hover:text-white hover:underline cursor-pointer flex items-center gap-1"
              >
                CREST Penetration Approved
              </button>
            </div>

            {/* Clickable Legal Policies */}
            <div className="flex gap-4 font-bold text-slate-400 border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
              <button onClick={() => navigateTo('#admin')} className="hover:text-white hover:underline cursor-pointer text-blue-400">Admin Console</button>
              <button onClick={() => navigateTo('#privacy')} className="hover:text-white hover:underline cursor-pointer">Privacy Policy</button>
              <button onClick={() => navigateTo('#terms')} className="hover:text-white hover:underline cursor-pointer">Terms of Services</button>
              <button onClick={() => navigateTo('#refund')} className="hover:text-white hover:underline cursor-pointer">Refund Policy</button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
