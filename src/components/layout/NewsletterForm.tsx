"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "../ui/icons";

/** Newsletter capture — local demo state, ready to wire to an ESP later */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("done");
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-sm text-gold-300"
          >
            <Check width={16} height={16} /> You are on the list — first letter arrives with the new season.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -8 }}
            onSubmit={submit}
            noValidate
            className="flex items-end gap-3"
          >
            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                }}
                placeholder="Your email address"
                className="w-full border-b border-cream-50/25 bg-transparent py-3 text-sm text-cream-50 placeholder:text-cream-100/40 focus:border-gold-400 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              aria-label="Subscribe to the newsletter"
              className="group flex h-11 w-11 shrink-0 items-center justify-center border border-cream-50/25 text-cream-50 transition-colors duration-300 hover:border-gold-400 hover:text-gold-300"
            >
              <ArrowRight width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {status === "error" && (
        <p role="alert" className="mt-2 text-xs text-clay-300">
          Please enter a valid email address.
        </p>
      )}
      <p className="mt-3 text-[0.6875rem] leading-relaxed text-cream-100/35">
        Seasonal letters, first news of events. Demo form — nothing is sent or stored.
      </p>
    </div>
  );
}
