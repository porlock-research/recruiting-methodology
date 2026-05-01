import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// A small note for anyone who opens devtools.
console.log(
  '%cRecruiting methodology',
  'font-family: "Bricolage Grotesque", system-ui; font-size: 18px; font-weight: 700; color: oklch(45% 0.15 30);'
);
console.log(
  '%cBy Manu Kapoor — built as a follow-up to a conversation with Alain at Jane.',
  'font-family: "Atkinson Hyperlegible", system-ui; font-size: 12px; color: oklch(35% 0.01 60);'
);
console.log(
  '%cSource: https://github.com/porlock-research/recruiting-methodology',
  'font-family: "JetBrains Mono", monospace; font-size: 11px; color: oklch(50% 0.01 60);'
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
