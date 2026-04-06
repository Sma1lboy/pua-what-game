'use client';

import { ReactNode } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <div className="relative mx-auto" style={{ width: 390, height: 844 }}>
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[50px] bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl shadow-black/50 border border-gray-700/50">
        {/* Screen area */}
        <div className="absolute inset-[4px] rounded-[46px] overflow-hidden bg-black">
          {/* Dynamic Island */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[126px] h-[36px] bg-black rounded-full z-50" />

          {/* Status bar */}
          <div className="relative z-40 flex items-center justify-between px-8 pt-[14px] h-[54px] text-white text-xs font-medium">
            <span className="w-14 text-left">9:41</span>
            <div className="flex-1" />
            <div className="flex items-center gap-1.5 w-14 justify-end">
              {/* Signal bars */}
              <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                <rect x="0" y="8" width="3" height="4" rx="0.5" />
                <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" />
                <rect x="9" y="3" width="3" height="9" rx="0.5" />
                <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
              </svg>
              {/* WiFi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
                <path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM3.46 7.54a6.36 6.36 0 019.08 0l-1.06 1.06a4.86 4.86 0 00-6.96 0L3.46 7.54zM.64 4.71a10.07 10.07 0 0114.72 0L14.3 5.77a8.57 8.57 0 00-12.6 0L.64 4.71z" />
              </svg>
              {/* Battery */}
              <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
                <rect x="0.5" y="0.5" width="23" height="11" rx="2.5" stroke="white" strokeOpacity="0.35" />
                <rect x="2" y="2" width="20" height="8" rx="1.5" fill="white" />
                <path d="M25 4v4a2 2 0 000-4z" fill="white" fillOpacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Content area */}
          <div className="absolute inset-0 top-[54px] bottom-[34px] overflow-hidden">
            {children}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}
