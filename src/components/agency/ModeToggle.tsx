"use client";

import { useSyncExternalStore } from "react";

// «Merlin mode»: тёмная тема, как KARO MODE у референса.
// Состояние живёт в data-mode на <html>, начальное значение ставит скрипт MODE_INIT_SCRIPT.
const EVENT = "merlin-mode";
const KEY = "merlin-mode";

export const MODE_INIT_SCRIPT = `try{if(localStorage.getItem("${KEY}")==="dark")document.documentElement.dataset.mode="dark"}catch(e){}`;

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

const getSnapshot = () => document.documentElement.dataset.mode === "dark";
const getServerSnapshot = () => false;

export function ModeToggle({ className = "" }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !dark;
    if (next) document.documentElement.dataset.mode = "dark";
    else delete document.documentElement.dataset.mode;
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      onClick={toggle}
      className={`group inline-flex items-center gap-2 text-[15px] font-bold uppercase tracking-[-0.05em] ${className}`}
    >
      <span className="relative inline-block h-[14px] w-[26px] rounded-full bg-[var(--a-ink)]">
        <span
          className={`absolute top-[3px] h-2 w-2 rounded-full bg-[var(--a-bg)] transition-[left] duration-300 ${
            dark ? "left-[15px]" : "left-[3px]"
          }`}
        />
      </span>
      Merlin mode
    </button>
  );
}
