import { whatIDo } from "../data";
import { FiCode, FiServer, FiDatabase, FiShield, FiLock } from "react-icons/fi";

const iconMap = {
  code: FiCode,
  server: FiServer,
  database: FiDatabase,
  shield: FiShield,
  lock: FiLock,
};

export default function WhatIDo() {
  return (
    <div id="about" className="bg-white rounded-3xl shadow-card ring-1 ring-black/5 p-6 sm:p-7 h-full scroll-mt-24">
      <h2 className="text-base font-extrabold text-navy mb-5">What I Do</h2>
      <div className="flex flex-col gap-3">
        {whatIDo.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <div key={item.title} className="flex items-start gap-3">
              <span className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${item.color}`}>
                <Icon size={16} />
              </span>
              <div>
                <p className="font-bold text-navy text-sm leading-tight mb-0.5">{item.title}</p>
                <p className="text-xs text-navy/55 leading-relaxed">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
