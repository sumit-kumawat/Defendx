import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Printer, 
  FileText, 
  CheckCircle, 
  RefreshCw, 
  ChevronRight, 
  DollarSign, 
  Calendar, 
  Edit3, 
  ArrowLeft,
  User,
  Hash,
  Tag,
  Percent,
  Coins,
  Lock,
  Globe,
  Settings,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { LogoImage, SignatureImage } from './CertImages';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Custom red/blue Paid and Verified stamp
function InvoiceStamp() {
  return (
    <svg viewBox="0 0 120 120" width="105" height="105" className="rotate-[-10deg] opacity-85 select-none shrink-0">
      <circle cx="60" cy="60" r="50" fill="none" stroke="#2045B4" strokeWidth="2.5" strokeDasharray="3 1.5" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#2045B4" strokeWidth="1.2" />
      <text x="60" y="32" fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif" fontSize="6.2" fontWeight="900" fill="#2045B4" textAnchor="middle" letterSpacing="0.6">CONZEX SECURE</text>
      <text x="60" y="42" fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif" fontSize="5.5" fontWeight="850" fill="#2045B4" textAnchor="middle" letterSpacing="0.4">TELEMETRY ARRAYS</text>
      <rect x="18" y="50" width="84" height="20" fill="#2045B4" fillOpacity="0.08" stroke="#2045B4" strokeWidth="1.2" />
      <text x="60" y="62" fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif" fontSize="8.5" fontWeight="950" fill="#2045B4" textAnchor="middle" letterSpacing="0.8">PAID &amp; SECURED</text>
      <text x="60" y="84" fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif" fontSize="5.2" fontWeight="850" fill="#2045B4" textAnchor="middle" letterSpacing="0.4">TRUSTED &amp; OFFICIAL</text>
      <text x="60" y="94" fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif" fontSize="5" fontWeight="700" fill="#2045B4" textAnchor="middle" letterSpacing="0.5">SINGAPORE / GLOBAL</text>
    </svg>
  );
}

export default function InvoicePage() {
  // Configurable states initialized with client parameters
  const [invoiceNumber, setInvoiceNumber] = useState('DX-2026-45345');
  const [orderDate, setOrderDate] = useState('2 June, 2026');
  const [invoiceStatus, setInvoiceStatus] = useState('PAID');
  const [candidateId, setCandidateId] = useState('CDXXXXXXXXX');
  const [candidateName, setCandidateName] = useState('Sumit RoshanLal Kumawat');
  const [billingCountry, setBillingCountry] = useState('India');
  
  const [itemId, setItemId] = useState('CDXXXXXXXXX');
  const [itemName, setItemName] = useState('Certified DefendX SIEM Administrator');
  const [itemType, setItemType] = useState('Professional Cybersecurity Certification Program');
  const [fees, setFees] = useState('849.00'); // Default matches the user's exact specification
  const [trainingFees, setTrainingFees] = useState('426.42'); // Calculated back from 18% VAT to reach exactly $1505.00 total
  const [vatRate, setVatRate] = useState('18.00'); // Default standard VAT rate

  // Interactive UI tweaks
  const [activeTab, setActiveTab] = useState<'details' | 'billing' | 'candidate'>('details');
  const [zoomScale, setZoomScale] = useState<number>(0.75); // Fits 1100px draft layout on standard views
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic cost calculations
  const baseFees = parseFloat(fees) || 0;
  const parsedTrainingFees = parseFloat(trainingFees) || 0;
  const parsedVatRate = parseFloat(vatRate) || 0;
  
  // Dynamic VAT calculation separated out from both base items and precisely rounded
  let vatAmount = (baseFees + parsedTrainingFees) * (parsedVatRate / 100);
  if (Math.abs(baseFees - 849.00) < 0.05 && Math.abs(parsedTrainingFees - 426.42) < 0.05 && Math.abs(parsedVatRate - 18.00) < 0.05) {
    vatAmount = 229.58; // Ensures a mathematically perfect, eye-clean $1505.00 total
  }
  const totalAmount = baseFees + parsedTrainingFees + vatAmount;

  const baseFeesFormatted = baseFees.toFixed(2);
  const trainingFeesFormatted = parsedTrainingFees.toFixed(2);
  const subtotalAmountFormatted = (baseFees + parsedTrainingFees).toFixed(2);
  const vatAmountFormatted = vatAmount.toFixed(2);
  const totalAmountFormatted = totalAmount.toFixed(2);

  // Parse candidate parameters from the hash
  useEffect(() => {
    const handleUrlLoading = async () => {
      const hash = window.location.hash || '';
      const queryIdx = hash.indexOf('?code=');
      if (queryIdx !== -1) {
        const urlCode = hash.substring(queryIdx + 6).toUpperCase().trim();
        if (urlCode) {
          try {
            const response = await fetch(`/api/verify?code=${encodeURIComponent(urlCode)}`);
            const data = await response.json();
            if (response.ok && data.validated && data.data) {
              const cert = data.data;
              setCandidateId(cert.code);
              setCandidateName(cert.candidate_name);
              setItemId(cert.code);
              setItemName(cert.certified_title);
              setOrderDate(cert.issue_date || '02 July 2026');
              // Generate clean billing code reference
              const digitsOnly = cert.code.replace(/\D/g, '') || '750751';
              setInvoiceNumber(`DX-2026-${digitsOnly}`);
            }
          } catch (e) {
            console.error("Failed to parse candidate invoice inputs from public API:", e);
          }
        }
      }
    };
    handleUrlLoading();
    
    // Support automatic reload on hash change within page
    window.addEventListener('hashchange', handleUrlLoading);
    return () => window.removeEventListener('hashchange', handleUrlLoading);
  }, []);

  // Autofit calculation based on panel dimensions
  useEffect(() => {
    const handleAutofit = () => {
      if (previewContainerRef.current) {
        const parentWidth = previewContainerRef.current.clientWidth;
        // Standard padded target width is 1100px. Aim for a 24px container buffer.
        const targetScale = Math.min(1.0, (parentWidth - 48) / 1100);
        setZoomScale(Math.max(0.4, Number(targetScale.toFixed(2))));
      }
    };
    
    handleAutofit();
    window.addEventListener('resize', handleAutofit);
    return () => window.removeEventListener('resize', handleAutofit);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const element = document.getElementById('defendx-highres-invoice-node');
      if (!element) {
        throw new Error("High-res invoice compilation node not found");
      }

      // Render canvas at 2x scale for print sharp quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styles.forEach(el => el.remove());
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // MM dimensions for A4 Portrait are 210 x 297
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`Invoice-${invoiceNumber}.pdf`);
    } catch (err) {
      console.error("PDF engine crash during billing render:", err);
      alert("Credential drafting failed. Please check network static assets and retry.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const resetToDefault = () => {
    setInvoiceNumber('DX-2026-45345');
    setOrderDate('2 June, 2026');
    setInvoiceStatus('PAID');
    setCandidateId('CDXXXXXXXXX');
    setCandidateName('Sumit RoshanLal Kumawat');
    setBillingCountry('India');
    setItemId('CDXXXXXXXXX');
    setItemName('Certified DefendX SIEM Administrator');
    setItemType('Professional Cybersecurity Certification Program');
    setFees('849.00');
    setTrainingFees('426.42');
    setVatRate('18.00');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-slate-800 font-sans" id="invoice-page-container">
      {/* Pattern Overlay background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Breadcrumb & Executive Redesigned Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b pb-6 border-slate-200">
          <div className="space-y-2">
            <div 
              className="group flex items-center gap-2 text-[#2045B4] cursor-pointer w-fit" 
              onClick={() => window.location.hash = '#admin'}
            >
              <div className="p-1 px-1.5 bg-blue-50 group-hover:bg-[#2045B4] group-hover:text-white rounded transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-black font-mono tracking-wider uppercase">Back to Security Admin Hub</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-[#2045B4]">
                <FileText className="w-5.5 h-5.5" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight font-display">
                  Invoice &amp; Receipt Workspace
                </h1>
                <p className="text-xs text-slate-500 font-mono">
                  Sovereign authority control room for training, examination, and international VAT receipt generation.
                </p>
              </div>
            </div>
          </div>
          
          {/* Main Workspace Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={resetToDefault}
              className="px-4 py-2 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-350 font-bold text-xs uppercase rounded flex items-center gap-2 cursor-pointer transition-all duration-200 active:scale-98 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
              <span>Reset Template</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-350 font-bold text-xs uppercase rounded flex items-center gap-2 cursor-pointer transition-all duration-200 active:scale-98 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 text-[#2045B4]" />
              <span>System Print</span>
            </button>
            
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="px-5 py-2.5 bg-[#2045B4] hover:bg-[#1a389c] text-white font-black text-xs uppercase rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-600/10 active:scale-98 transition-all flex items-center gap-2 cursor-pointer disabled:bg-slate-400 disabled:shadow-none"
            >
              <Download className="w-4 h-4 animate-bounce" style={{ animationDuration: '2s' }} />
              <span>{isGeneratingPDF ? 'Compiling PDF...' : 'Download Official PDF'}</span>
            </button>
          </div>
        </div>

        {/* Dual Column Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (Left Col) - Redesigned as a Premium Specialist Deck */}
          <div className="lg:col-span-4 bg-white border border-slate-250/80 rounded-xl overflow-hidden shadow-sm">
            
            {/* Tab header selectors */}
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-[11px] font-bold font-mono text-slate-500 uppercase tracking-wider">
              <button 
                onClick={() => setActiveTab('details')}
                className={`py-3 text-center border-r border-slate-200 transition-colors uppercase ${activeTab === 'details' ? 'bg-white text-blue-650 border-b-2 border-b-blue-600 font-extrabold' : 'hover:bg-slate-100 hover:text-slate-700'}`}
              >
                Invoicing
              </button>
              <button 
                onClick={() => setActiveTab('candidate')}
                className={`py-3 text-center border-r border-slate-200 transition-colors uppercase ${activeTab === 'candidate' ? 'bg-white text-blue-650 border-b-2 border-b-blue-600 font-extrabold' : 'hover:bg-slate-100 hover:text-slate-700'}`}
              >
                Payer
              </button>
              <button 
                onClick={() => setActiveTab('billing')}
                className={`py-3 text-center transition-colors uppercase ${activeTab === 'billing' ? 'bg-white text-blue-650 border-b-2 border-b-blue-600 font-extrabold' : 'hover:bg-slate-100 hover:text-slate-700'}`}
              >
                Pricing
              </button>
            </div>

            <div className="p-6 space-y-6">
              
              <AnimatePresence mode="wait">
                {activeTab === 'details' && (
                  <motion.div
                    key="details-tab"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-100">
                      <Settings className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-black uppercase tracking-wider text-slate-750">Ledger Identification</span>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Invoice Reference Number</label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                        <input 
                          type="text" 
                          value={invoiceNumber} 
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Transaction / Order Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                        <input 
                          type="text" 
                          value={orderDate} 
                          onChange={(e) => setOrderDate(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left pt-2">
                      <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Receipt Status Indicator</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['PAID', 'PENDING', 'PROCESSING', 'REFUSED'].map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setInvoiceStatus(status)}
                            className={`py-1.5 px-2.5 rounded text-[10px] font-extrabold tracking-wider uppercase border text-center transition-all cursor-pointer ${
                              invoiceStatus.toUpperCase() === status 
                                ? 'bg-[#2045B4] text-white border-[#2045B4] shadow-xs' 
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'candidate' && (
                  <motion.div
                    key="candidate-tab"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-100">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-black uppercase tracking-wider text-slate-750">Payer Details</span>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Candidate / Customer Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                        <input 
                          type="text" 
                          value={candidateName} 
                          onChange={(e) => setCandidateName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs font-medium focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
                        />
                      </div>
                      <p className="text-[9px] text-slate-400">Provide the recipient name of record on verification checks.</p>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Candidate Master Code / ID</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                        <input 
                          type="text" 
                          value={candidateId} 
                          onChange={(e) => setCandidateId(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Billing Country Location</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                        <input 
                          type="text" 
                          value={billingCountry} 
                          onChange={(e) => setBillingCountry(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'billing' && (
                  <motion.div
                    key="billing-tab"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-100">
                      <Coins className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-black uppercase tracking-wider text-slate-750">Pricing &amp; Tax Strategy</span>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Certification Title Description</label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                        <input 
                          type="text" 
                          value={itemName} 
                          onChange={(e) => setItemName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Certificate ID</label>
                        <input 
                          type="text" 
                          value={itemId} 
                          onChange={(e) => setItemId(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">VAT Rate (%)</label>
                        <div className="relative">
                          <Percent className="absolute right-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                          <input 
                            type="text" 
                            value={vatRate} 
                            onChange={(e) => setVatRate(e.target.value)}
                            className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Cert Fee ($ USD)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                          <input 
                            type="text" 
                            value={fees} 
                            onChange={(e) => setFees(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Training Fee ($ USD)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                          <input 
                            type="text" 
                            value={trainingFees} 
                            onChange={(e) => setTrainingFees(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Description Subtitle</label>
                      <input 
                        type="text" 
                        value={itemType} 
                        onChange={(e) => setItemType(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Quick Live Stats Summary section on the panel footer */}
            <div className="bg-slate-50 p-5 border-t border-slate-150 space-y-3.5 text-xs text-left">
              <span className="font-extrabold text-[10px] font-mono uppercase text-slate-400 tracking-wider">Dynamic Math Audit</span>
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Certification:</span>
                  <span>${baseFeesFormatted} USD</span>
                </div>
                {parsedTrainingFees > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Training Component:</span>
                    <span>${trainingFeesFormatted} USD</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500 border-t border-slate-200 pt-1.5">
                  <span>Tax Subtotal:</span>
                  <span>${subtotalAmountFormatted} USD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>VAT ({parsedVatRate}%):</span>
                  <span>${vatAmountFormatted} USD</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-sm border-t border-dashed border-slate-300 pt-2">
                  <span>Invoice Total:</span>
                  <span>${totalAmountFormatted} USD</span>
                </div>
              </div>
            </div>

          </div>

          {/* Redesigned Document Workspace and Zoom-Enabled Multi-Scale View Box (Right Col) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Ambient visual control rail supporting zoom metrics and fit operations */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 bg-slate-900 border border-slate-800 rounded-t-xl text-slate-300 font-mono gap-4">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-400">Interactive Preview Console</span>
                <span className="hidden sm:inline text-slate-600">|</span>
                <span className="text-blue-400 text-[11px] font-semibold">1:1 High Fidelity Mapping</span>
              </div>
              
              {/* Scale Adjuster slider controls and responsive viewport metrics */}
              <div className="flex items-center gap-3 justify-between sm:justify-start">
                <div className="flex items-center gap-1.5 bg-slate-800 p-1 px-2.5 rounded-lg border border-slate-700">
                  <button 
                    onClick={() => setZoomScale(prev => Math.max(0.4, Number((prev - 0.05).toFixed(2))))}
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-bold min-w-10 text-center text-slate-200">
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <button 
                    onClick={() => setZoomScale(prev => Math.min(1.2, Number((prev + 0.05).toFixed(2))))}
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setZoomScale(0.75)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded border border-slate-700 text-[10px] font-bold cursor-pointer transition-all"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      if (previewContainerRef.current) {
                        const parentWidth = previewContainerRef.current.clientWidth;
                        const factor = (parentWidth - 48) / 1100;
                        setZoomScale(Math.max(0.4, Number(factor.toFixed(2))));
                      }
                    }}
                    className="p-1.5 bg-slate-850 hover:bg-slate-750 text-slate-300 hover:text-white rounded border border-slate-700 text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1"
                    title="Fit Width"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Fit</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Document display frame with a realistic textured drafting bench background */}
            <div 
              ref={previewContainerRef}
              className="bg-slate-850 border-x border-b border-slate-800 p-4 md:p-8 flex items-start justify-center overflow-x-hidden min-h-[750px] rounded-b-xl relative bg-[linear-gradient(45deg,#131824_25%,transparent_25%),linear-gradient(-45deg,#131824_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#131824_75%),linear-gradient(-45deg,transparent_75%,#131824_75%)] bg-[size:20px_20px] bg-[#1a2133]"
            >
              {/* Ruler graphics on the side of the container */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-slate-900/50 border-b border-slate-800 text-[9px] font-mono text-slate-600 flex items-center px-4 justify-between pointer-events-none select-none">
                <span>0mm</span>
                <span>50mm</span>
                <span>100mm</span>
                <span>150mm</span>
                <span>200mm</span>
                <span>210mm (A4 Target Limit)</span>
              </div>

              {/* Dynamic Scaling Wrapper to guarantee layout viewport alignment without overflow */}
              <div 
                className="transition-transform duration-200 origin-top shrink-0 mt-6 select-text"
                style={{ 
                  transform: `scale(${zoomScale})`, 
                  width: '1100px', 
                  marginBottom: `calc((1100px * ${zoomScale}) - 1100px)` // Offset negative layout margin so footer content fits correctly
                }}
              >
                
                {/* 1100px exact print spec sheet */}
                <div 
                  className="bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] shrink-0 text-left relative" 
                  id="defendx-client-visible-invoice"
                  style={{ 
                    width: '1100px', 
                    background: '#fff', 
                    padding: '50px 60px', 
                    boxSizing: 'border-box',
                    color: '#000',
                    fontFamily: 'Arial, Helvetica, sans-serif'
                  }}
                >
                  
                  {/* Floating official certified validation watermark on visible sheet */}
                  <div className="absolute top-[350px] right-[80px]" style={{ zIndex: 10 }}>
                    <InvoiceStamp />
                  </div>

                  {/* Header Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '45px' }}>
                    
                    <div style={{ lineHeight: '1.6', textAlign: 'left' }}>
                      <h2 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: 'bold', color: '#000', fontFamily: 'Arial, sans-serif', letterSpacing: '-0.3px' }}>
                        DefendX Training Authority
                      </h2>
                      <div style={{ fontSize: '14px', color: '#444', lineHeight: '1.5' }}>
                        DefendX Global Certification Division<br />
                        Cyber Defense Training Authority<br />
                        United States
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <h1 style={{ margin: '0 0 16px', fontSize: '38px', fontWeight: 'bold', color: '#000', letterSpacing: '-0.5px' }}>
                        INVOICE
                      </h1>
                      
                      <table style={{ border: 'none', borderCollapse: 'collapse', width: 'auto', marginLeft: 'auto' }}>
                        <tbody>
                          <tr>
                            <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'right', color: '#000' }}><strong>Invoice Number:</strong></td>
                            <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'left', color: '#000' }}>{invoiceNumber}</td>
                          </tr>
                          <tr>
                            <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'right', color: '#000' }}><strong>Transaction Date:</strong></td>
                            <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'left', color: '#000' }}>{orderDate}</td>
                          </tr>
                          <tr>
                            <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'right', color: '#000' }}><strong>Payment Method:</strong></td>
                            <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'left', color: '#000' }}>Card</td>
                          </tr>
                          <tr>
                            <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'right', color: '#000' }}><strong>Status:</strong></td>
                            <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'left', color: '#000' }}>
                              <span style={{ 
                                fontWeight: 'bold', 
                                textTransform: 'uppercase', 
                                color: invoiceStatus.toUpperCase() === 'PAID' ? '#0F766E' : invoiceStatus.toUpperCase() === 'REFUSED' ? '#BE123C' : '#D97706',
                                backgroundColor: invoiceStatus.toUpperCase() === 'PAID' ? '#F0FDFA' : invoiceStatus.toUpperCase() === 'REFUSED' ? '#FFF1F2' : '#FEF3C7',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                border: `1.5px solid ${invoiceStatus.toUpperCase() === 'PAID' ? '#0F766E' : invoiceStatus.toUpperCase() === 'REFUSED' ? '#BE123C' : '#D97706'}`
                              }}>
                                {invoiceStatus}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>

                  {/* Subheading Notice Box */}
                  <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 'bold', margin: '40px 0', borderTop: '2px solid #000', borderBottom: '2px solid #000', padding: '16px 0', color: '#000' }}>
                    This is an invoice for your certification purchase and should be kept as your receipt.
                  </div>

                  {/* Billing Address Row */}
                  <div style={{ marginBottom: '45px', lineHeight: '1.7', fontSize: '15.5px', color: '#000', textAlign: 'left' }}>
                    <span style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.5px', color: '#444' }}>Bill To:</span><br />
                    <strong style={{ fontSize: '18px', color: '#000' }}>{candidateName}</strong><br />
                    {billingCountry}
                  </div>

                  {/* Main Purchase Table */}
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: '#F8F9FA', border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', fontSize: '14px', color: '#000', width: '60px' }}>Qty</th>
                        <th style={{ backgroundColor: '#F8F9FA', border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', fontSize: '14px', color: '#000', width: '160px' }}>Item ID</th>
                        <th style={{ backgroundColor: '#F8F9FA', border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', fontSize: '14px', color: '#000' }}>Description</th>
                        <th style={{ backgroundColor: '#F8F9FA', border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', fontSize: '14px', color: '#000', width: '170px' }}>Unit Price</th>
                        <th style={{ backgroundColor: '#F8F9FA', border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', fontSize: '14px', color: '#000', width: '170px' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontSize: '14px', color: '#000', textAlign: 'left' }}>1</td>
                        <td style={{ border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontSize: '14px', color: '#000', textAlign: 'left' }}>{itemId}</td>
                        <td style={{ border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontSize: '14px', color: '#000', textAlign: 'left', lineHeight: '1.6' }}>
                          <strong style={{ fontWeight: 'bold', color: '#000', fontSize: '15.5px' }}>{itemName}</strong>
                          <br /><br />
                          {itemType}
                          <br /><br />
                          Includes:
                          <ul style={{ margin: '10px 0', paddingLeft: '22px', listStyleType: 'disc' }}>
                            <li>Certification Examination</li>
                            <li>Digital Certificate</li>
                            <li>Credential Verification</li>
                            <li>Official Certification Status</li>
                          </ul>
                          {parsedTrainingFees > 0 && (
                            <div style={{ marginTop: '20px', borderTop: '1px dashed #bbb', paddingTop: '18px' }}>
                              <strong style={{ fontWeight: 'bold', color: '#000', fontSize: '14.5px' }}>Professional Cybersecurity Training &amp; Preparation</strong>
                              <br /><br />
                              Dual-stage analytical intensive bootcamp, sovereign sandbox cloud compute labs, training exercises, and compliance dashboard setup.
                            </div>
                          )}
                        </td>
                        <td style={{ border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontSize: '14px', color: '#000', textAlign: 'left' }}>
                          ${subtotalAmountFormatted} USD
                        </td>
                        <td style={{ border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontSize: '14px', color: '#000', textAlign: 'left' }}>
                          ${subtotalAmountFormatted} USD
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Summary Section */}
                  <table style={{ width: '420px', marginLeft: 'auto', marginTop: '30px', borderCollapse: 'collapse', border: '1px solid #333' }}>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #333', padding: '12px 14px', fontSize: '14px', color: '#000', textAlign: 'left' }}>Subtotal</td>
                        <td style={{ border: '1px solid #333', padding: '12px 14px', fontSize: '14px', color: '#000', textAlign: 'right' }}>${subtotalAmountFormatted} USD</td>
                      </tr>
                      {vatAmount > 0 && (
                        <tr>
                          <td style={{ border: '1px solid #333', padding: '12px 14px', fontSize: '14px', color: '#000', textAlign: 'left' }}>VAT</td>
                          <td style={{ border: '1px solid #333', padding: '12px 14px', fontSize: '14px', color: '#000', textAlign: 'right' }}>${vatAmountFormatted} USD</td>
                        </tr>
                      )}
                      <tr style={{ backgroundColor: '#F8F9FA' }}>
                        <td style={{ border: '1px solid #333', padding: '12px 14px', fontSize: '15px', color: '#000', textAlign: 'left' }}><strong>Total</strong></td>
                        <td style={{ border: '1px solid #333', padding: '12px 14px', fontSize: '16px', color: '#000', textAlign: 'right' }}><strong>${totalAmountFormatted} USD</strong></td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Footer and Signatures */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '60px' }}>
                    <div style={{ lineHeight: '1.9', fontSize: '13.5px', color: '#000', textAlign: 'left', maxWidth: '550px' }}>
                      <strong style={{ fontSize: '15px', color: '#000' }}>DefendX Training Authority</strong>
                      <div style={{ marginTop: '5px' }}>
                        Taxpayer Name: DefendX Global Training Authority<br />
                        Accreditation: DefendX Training Authority Accreditation<br />
                        Payment Method: Card<br />
                        Transaction Date: {orderDate}
                      </div>

                      <div style={{ color: '#555', fontSize: '12.5px', marginTop: '20px', fontStyle: 'italic', lineHeight: '1.5' }}>
                        This document serves as an official payment confirmation and certification purchase receipt.
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '35px', alignItems: 'center' }}>
                      <div style={{ textAlign: 'center', width: '160px' }}>
                        <SignatureImage style={{ width: '120px', height: '40px', margin: '0 auto -6px', display: 'block' }} />
                        <div style={{ borderTop: '1px solid #333', paddingTop: '6px', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#333', fontWeight: 'bold' }}>
                          REGISTRAR GENERAL
                        </div>
                        <div style={{ fontSize: '8.5px', color: '#555', marginTop: '2px', letterSpacing: '0.2px' }}>Conzex Secure Arrays</div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Quick UX Tip/Warning Info footer */}
            <div className="p-4 bg-blue-50 border border-blue-200/60 rounded-xl flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-[#2045B4] uppercase tracking-wider font-mono">Dynamic Verification Sync</h4>
                <p className="text-xs text-slate-650 leading-relaxed">
                  These records correspond directly with certificate code query paths configured on `defendx.io/#verify`. Updating parameters updates both the active workspace and downloadable PDF vectors in real-time.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* HIDDEN INVOICE PRINT SOURCE NODE (PIXEL-PERFECT original template exported as exact vector layout by html2canvas) */}
      <div className="absolute top-0 left-0 overflow-hidden pointer-events-none select-none" style={{ width: '0px', height: '0px', opacity: 0 }}>
        <div 
          id="defendx-highres-invoice-node"
          className="bg-white"
          style={{ 
            width: '1100px', 
            minHeight: '1554px', 
            padding: '50px 60px', 
            boxSizing: 'border-box',
            position: 'relative',
            color: '#000',
            fontFamily: 'Arial, Helvetica, sans-serif'
          }}
        >
          {/* Floating stamp */}
          <div className="absolute top-[350px] right-[80px]" style={{ zIndex: 10 }}>
            <InvoiceStamp />
          </div>

          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '45px' }}>
            
            <div style={{ lineHeight: '1.6', textAlign: 'left' }}>
              <h2 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: 'bold', color: '#000', letterSpacing: '-0.3px' }}>DefendX Training Authority</h2>
              <div style={{ fontSize: '14px', color: '#444', lineHeight: '1.5' }}>
                DefendX Global Certification Division<br />
                Cyber Defense Training Authority<br />
                United States
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <h1 style={{ margin: '0 0 16px', fontSize: '38px', fontWeight: 'bold', color: '#000', letterSpacing: '-0.5px' }}>INVOICE</h1>
              
              <table style={{ border: 'none', borderCollapse: 'collapse', width: 'auto', marginLeft: 'auto' }}>
                <tbody>
                  <tr>
                    <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'right', color: '#000' }}><strong>Invoice Number:</strong></td>
                    <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'left', color: '#000' }}>{invoiceNumber}</td>
                  </tr>
                  <tr>
                    <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'right', color: '#000' }}><strong>Transaction Date:</strong></td>
                    <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'left', color: '#000' }}>{orderDate}</td>
                  </tr>
                  <tr>
                    <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'right', color: '#000' }}><strong>Payment Method:</strong></td>
                    <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'left', color: '#000' }}>Card</td>
                  </tr>
                  <tr>
                    <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'right', color: '#000' }}><strong>Status:</strong></td>
                    <td style={{ border: 'none', padding: '5px 10px', verticalAlign: 'top', fontSize: '13.5px', textAlign: 'left', color: '#000' }}>
                      <span style={{ 
                        fontWeight: 'bold', 
                        textTransform: 'uppercase', 
                        color: invoiceStatus.toUpperCase() === 'PAID' ? '#0F766E' : invoiceStatus.toUpperCase() === 'REFUSED' ? '#BE123C' : '#D97706',
                        backgroundColor: invoiceStatus.toUpperCase() === 'PAID' ? '#F0FDFA' : invoiceStatus.toUpperCase() === 'REFUSED' ? '#FFF1F2' : '#FEF3C7',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        border: `1.5px solid ${invoiceStatus.toUpperCase() === 'PAID' ? '#0F766E' : invoiceStatus.toUpperCase() === 'REFUSED' ? '#BE123C' : '#D97706'}`
                      }}>
                        {invoiceStatus}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          {/* Subheading Notice Box */}
          <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 'bold', margin: '40px 0', borderTop: '2px solid #000', borderBottom: '2px solid #000', padding: '16px 0', color: '#000' }}>
            This is an invoice for your certification purchase and should be kept as your receipt.
          </div>

          {/* Billing Address Row */}
          <div style={{ marginBottom: '45px', lineHeight: '1.7', fontSize: '15.5px', color: '#000', textAlign: 'left' }}>
            <span style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.5px', color: '#444' }}>Bill To:</span><br />
            <strong style={{ fontSize: '18px', color: '#000' }}>{candidateName}</strong><br />
            {billingCountry}
          </div>

          {/* Main Purchase Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#F8F9FA', border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', fontSize: '14px', color: '#000', width: '60px' }}>Qty</th>
                <th style={{ backgroundColor: '#F8F9FA', border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', fontSize: '14px', color: '#000', width: '160px' }}>Item ID</th>
                <th style={{ backgroundColor: '#F8F9FA', border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', fontSize: '14px', color: '#000' }}>Description</th>
                <th style={{ backgroundColor: '#F8F9FA', border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', fontSize: '14px', color: '#000', width: '170px' }}>Unit Price</th>
                <th style={{ backgroundColor: '#F8F9FA', border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontWeight: 'bold', textAlign: 'left', fontSize: '14px', color: '#000', width: '170px' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontSize: '14px', color: '#000', textAlign: 'left' }}>1</td>
                <td style={{ border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontSize: '14px', color: '#000', textAlign: 'left' }}>{itemId}</td>
                <td style={{ border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontSize: '14px', color: '#000', textAlign: 'left', lineHeight: '1.6' }}>
                  <strong style={{ fontWeight: 'bold', color: '#000', fontSize: '15.5px' }}>{itemName}</strong>
                  <br /><br />
                  {itemType}
                  <br /><br />
                  Includes:
                  <ul style={{ margin: '10px 0', paddingLeft: '22px', listStyleType: 'disc' }}>
                    <li>Certification Examination</li>
                    <li>Digital Certificate</li>
                    <li>Credential Verification</li>
                    <li>Official Certification Status</li>
                  </ul>
                  {parsedTrainingFees > 0 && (
                    <div style={{ marginTop: '20px', borderTop: '1px dashed #bbb', paddingTop: '18px' }}>
                      <strong style={{ fontWeight: 'bold', color: '#000', fontSize: '14.5px' }}>Professional Cybersecurity Training &amp; Preparation</strong>
                      <br /><br />
                      Dual-stage analytical intensive bootcamp, sovereign sandbox cloud compute labs, training exercises, and compliance dashboard setup.
                    </div>
                  )}
                </td>
                <td style={{ border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontSize: '14px', color: '#000', textAlign: 'left' }}>
                  ${subtotalAmountFormatted} USD
                </td>
                <td style={{ border: '1px solid #333', padding: '14px 12px', verticalAlign: 'top', fontSize: '14px', color: '#000', textAlign: 'left' }}>
                  ${subtotalAmountFormatted} USD
                </td>
              </tr>
            </tbody>
          </table>

          {/* Summary Section */}
          <table style={{ width: '420px', marginLeft: 'auto', marginTop: '30px', borderCollapse: 'collapse', border: '1px solid #333' }}>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #333', padding: '12px 14px', fontSize: '14px', color: '#000', textAlign: 'left' }}>Subtotal</td>
                <td style={{ border: '1px solid #333', padding: '12px 14px', fontSize: '14px', color: '#000', textAlign: 'right' }}>${subtotalAmountFormatted} USD</td>
              </tr>
              {vatAmount > 0 && (
                <tr>
                  <td style={{ border: '1px solid #333', padding: '12px 14px', fontSize: '14px', color: '#000', textAlign: 'left' }}>VAT</td>
                  <td style={{ border: '1px solid #333', padding: '12px 14px', fontSize: '14px', color: '#000', textAlign: 'right' }}>${vatAmountFormatted} USD</td>
                </tr>
              )}
              <tr style={{ backgroundColor: '#F8F9FA' }}>
                <td style={{ border: '1px solid #333', padding: '12px 14px', fontSize: '15px', color: '#000', textAlign: 'left' }}><strong>Total</strong></td>
                <td style={{ border: '1px solid #333', padding: '12px 14px', fontSize: '16px', color: '#000', textAlign: 'right' }}><strong>${totalAmountFormatted} USD</strong></td>
              </tr>
            </tbody>
          </table>

          {/* Footer and Signatures */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '60px' }}>
            <div style={{ lineHeight: '1.9', fontSize: '13.5px', color: '#000', textAlign: 'left', maxWidth: '550px' }}>
              <strong style={{ fontSize: '15px', color: '#000' }}>DefendX Training Authority</strong>
              <div style={{ marginTop: '5px' }}>
                Taxpayer Name: DefendX Global Training Authority<br />
                Accreditation: DefendX Training Authority Accreditation<br />
                Payment Method: Card<br />
                Transaction Date: {orderDate}
              </div>

              <div style={{ color: '#555', fontSize: '12.5px', marginTop: '20px', fontStyle: 'italic', lineHeight: '1.5' }}>
                This document serves as an official payment confirmation and certification purchase receipt.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '35px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', width: '160px' }}>
                <SignatureImage style={{ width: '120px', height: '40px', margin: '0 auto -6px', display: 'block' }} />
                <div style={{ borderTop: '1px solid #333', paddingTop: '6px', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#333', fontWeight: 'bold' }}>
                  REGISTRAR GENERAL
                </div>
                <div style={{ fontSize: '8.5px', color: '#555', marginTop: '2px', letterSpacing: '0.2px' }}>Conzex Secure Arrays</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
