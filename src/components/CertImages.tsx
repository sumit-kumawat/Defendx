import React from 'react';

export function LogoImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 120" width="500" height="120" {...props}>
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2045B4" />
          <stop offset="100%" stopColor="#0f7aa5" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <g transform="translate(10, 10)">
        <path d="M 50 0 L 90 20 L 90 60 C 90 90, 50 105, 50 105 C 50 105, 10 90, 10 60 L 10 20 Z" fill="url(#shieldGrad)" />
        <path d="M 50 8 L 82 24 L 82 56 C 82 80, 50 93, 50 93 C 50 93, 18 80, 18 56 L 18 24 Z" fill="none" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.3" />
        <path d="M 42 42 L 42 58 L 58 58 L 58 42 Z" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 46 42 L 46 38 C 46 34, 54 34, 54 38 L 54 42" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="50" r="2" fill="#ffffff" />
        <circle cx="28" cy="30" r="3" fill="url(#accentGrad)" />
        <circle cx="72" cy="30" r="3" fill="url(#accentGrad)" />
        <circle cx="50" cy="80" r="4" fill="url(#accentGrad)" />
      </g>
      <text x="125" y="65" fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif" fontSize="44" fontWeight="900" fill="#1e293b" letterSpacing="1">
        DEFEND<tspan fill="#2045B4">X</tspan>
      </text>
      <text x="127" y="88" fontFamily="'Segoe UI', system-ui, sans-serif" fontSize="10.5" fontWeight="800" fill="#64748b" letterSpacing="4">
        SECURE TELEMETRY ARRAYS
      </text>
    </svg>
  );
}

export function HologramLeftImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" width="150" height="150" {...props}>
      <defs>
        <radialGradient id="holoRad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#93c5fd" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="75%" stopColor="#2563eb" />
          <stop offset="90%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
        <linearGradient id="goldHolo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <circle cx="75" cy="75" r="72" fill="url(#holoRad)" stroke="url(#goldHolo)" strokeWidth="4.5" />
      <circle cx="75" cy="75" r="64" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 2" strokeOpacity="0.8" />
      
      <g transform="translate(75,75)">
        <path d="M 0,-56 L 3,-48 L 11,-48 L 5,-42 L 8,-34 L 0,-39 L -8,-34 L -5,-42 L -11,-48 L -3,-48 Z" fill="url(#goldHolo)" transform="rotate(0)" />
        <path d="M 0,-56 L 3,-48 L 11,-48 L 5,-42 L 8,-34 L 0,-39 L -8,-34 L -5,-42 L -11,-48 L -3,-48 Z" fill="url(#goldHolo)" transform="rotate(45)" />
        <path d="M 0,-56 L 3,-48 L 11,-48 L 5,-42 L 8,-34 L 0,-39 L -8,-34 L -5,-42 L -11,-48 L -3,-48 Z" fill="url(#goldHolo)" transform="rotate(90)" />
        <path d="M 0,-56 L 3,-48 L 11,-48 L 5,-42 L 8,-34 L 0,-39 L -8,-34 L -5,-42 L -11,-48 L -3,-48 Z" fill="url(#goldHolo)" transform="rotate(135)" />
        <path d="M 0,-56 L 3,-48 L 11,-48 L 5,-42 L 8,-34 L 0,-39 L -8,-34 L -5,-42 L -11,-48 L -3,-48 Z" fill="url(#goldHolo)" transform="rotate(180)" />
        <path d="M 0,-56 L 3,-48 L 11,-48 L 5,-42 L 8,-34 L 0,-39 L -8,-34 L -5,-42 L -11,-48 L -3,-48 Z" fill="url(#goldHolo)" transform="rotate(225)" />
        <path d="M 0,-56 L 3,-48 L 11,-48 L 5,-42 L 8,-34 L 0,-39 L -8,-34 L -5,-42 L -11,-48 L -3,-48 Z" fill="url(#goldHolo)" transform="rotate(270)" />
        <path d="M 0,-56 L 3,-48 L 11,-48 L 5,-42 L 8,-34 L 0,-39 L -8,-34 L -5,-42 L -11,-48 L -3,-48 Z" fill="url(#goldHolo)" transform="rotate(315)" />
      </g>

      <circle cx="75" cy="75" r="48" fill="none" stroke="url(#goldHolo)" strokeWidth="2.5" />
      <circle cx="75" cy="75" r="42" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />

      <path d="M 75 48 L 93 54 L 93 72 C 93 90, 75 99, 75 99 C 75 99, 57 90, 57 72 L 57 54 Z" fill="url(#goldHolo)" />
      <path d="M 66 74 L 72 80 L 84 66" fill="none" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      <path d="M 50 115 L 35 145 L 55 140 L 70 121 Z" fill="#b91c1c" fillOpacity="0.85" />
      <path d="M 100 115 L 115 145 L 95 140 L 80 121 Z" fill="#b91c1c" fillOpacity="0.85" />
    </svg>
  );
}

export function HologramRightImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" {...props}>
      <defs>
        <linearGradient id="rightHoloGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f7aa5" />
          <stop offset="50%" stopColor="#2045B4" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#rightHoloGrad)" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 4" />
      
      <g stroke="#ffffff" strokeWidth="1.5" fill="none" strokeOpacity="0.9">
        <line x1="25" y1="25" x2="75" y2="75" />
        <line x1="75" y1="25" x2="25" y2="75" />
        <line x1="15" y1="50" x2="85" y2="50" />
        <line x1="50" y1="15" x2="50" y2="85" />
      </g>
      
      <circle cx="50" cy="50" r="24" fill="#1e1b4b" stroke="#fef08a" strokeWidth="2.5" />
      
      <text x="50" y="44" fontFamily="'Segoe UI', system-ui, sans-serif" fontSize="7" fontWeight="900" fill="#fef08a" textAnchor="middle" letterSpacing="1">DEFENDX</text>
      <text x="50" y="53" fontFamily="'Segoe UI', system-ui, sans-serif" fontSize="5" fontWeight="800" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">SECURE</text>
      <text x="50" y="61" fontFamily="'Segoe UI', system-ui, sans-serif" fontSize="5.5" fontWeight="950" fill="#4ade80" textAnchor="middle" letterSpacing="0.5">VERIFIED</text>
      
      <circle cx="50" cy="14" r="2.5" fill="#4ade80" />
      <circle cx="50" cy="86" r="2.5" fill="#4ade80" />
      <circle cx="14" cy="50" r="2.5" fill="#4ade80" />
      <circle cx="86" cy="50" r="2.5" fill="#4ade80" />
    </svg>
  );
}

export function SignatureImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 80" width="250" height="80" {...props}>
      <defs>
        <linearGradient id="signatureInk" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="40%" stopColor="#2563eb" />
          <stop offset="75%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
      </defs>
      
      {/* Cursive Name "Julian Vance" / Realistic loops and strokes */}
      {/* Main Capital J Loop */}
      <path 
        d="M 28 48 C 22 35, 18 20, 32 12 C 40 8, 48 15, 45 28 C 41 42, 32 62, 28 72 C 24 81, 16 80, 20 68 C 24 55, 34 38, 44 26 C 49 20, 56 16, 61 24 C 65 32, 58 48, 54 56 C 52 60, 50 63, 56 58 C 62 52, 68 44, 73 38" 
        fill="none" 
        stroke="url(#signatureInk)" 
        strokeWidth="2.4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Cursive middle connection (l-i-a-n) */}
      <path 
        d="M 73 38 C 76 34, 79 38, 81 44 C 83 49, 86 52, 90 44 C 93 36, 96 38, 98 44 C 101 49, 103 52, 108 42 C 111 34, 114 36, 117 44 C 119 49, 122 52, 127 42 C 130 35, 134 38, 136 46" 
        fill="none" 
        stroke="url(#signatureInk)" 
        strokeWidth="2.1" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Capital V (Vance) */}
      <path 
        d="M 148 18 C 142 22, 136 42, 142 56 C 145 62, 150 65, 154 52 C 158 38, 164 25, 168 22 C 172 18, 175 24, 177 34 C 179 44, 182 52, 186 42 C 190 32, 194 34, 197 42 C 199 47, 202 52, 208 42 C 213 32, 218 30, 224 45" 
        fill="none" 
        stroke="url(#signatureInk)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Flowing underline flourish with slight ink thickness variance */}
      <path 
        d="M 22 58 C 55 58, 98 62, 145 58 C 192 54, 230 48, 238 43 C 242 41, 235 38, 222 38 C 195 38, 150 44, 112 50 C 95 53, 85 55, 102 52" 
        fill="none" 
        stroke="url(#signatureInk)" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Two trailing dynamic dots representing executive sign-off */}
      <circle cx="218" cy="54" r="1.8" fill="#1e40af" />
      <circle cx="230" cy="52" r="1.5" fill="#1e3a8a" />
    </svg>
  );
}
