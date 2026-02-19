"use client";

import { useRef, useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "not-configured" | "error">("idle");
  const [touched, setTouched] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  function isValidPhone(value: string) {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }

  function autoSize(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);

    // basic validation
    if (!name.trim() || !message.trim() || !isValidPhone(phone)) {
      setStatus("error");
      return;
    }

    // Sending is disabled for now — webhook will be added later
    setStatus("not-configured");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Name</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={`w-full px-4 py-3 rounded-lg border ${touched && !name.trim() ? 'border-red-300' : 'border-slate-200'} outline-none focus:ring-2 focus:ring-slate-200`}
          />
        </div>

        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 89206 05061"
            className={`w-full px-4 py-3 rounded-lg border ${touched && !isValidPhone(phone) ? 'border-red-300' : 'border-slate-200'} outline-none focus:ring-2 focus:ring-slate-200`}
          />
          <div className="text-xs text-slate-400 mt-1">Include country code for faster replies</div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-xs font-semibold text-slate-600 mb-1">Subject <span className="text-xs text-slate-400">(optional)</span></label>
        <input
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-slate-200"
        />
      </div>

      <div className="mt-4">
        <label className="block text-xs font-semibold text-slate-600 mb-1">Message</label>
        <textarea
          ref={textareaRef}
          name="message"
          value={message}
          onChange={(e) => { setMessage(e.target.value); autoSize(e); }}
          placeholder="Tell us about your project, quantity, deadline..."
          rows={4}
          className={`w-full px-4 py-3 rounded-lg border ${touched && !message.trim() ? 'border-red-300' : 'border-slate-200'} outline-none focus:ring-2 focus:ring-slate-200 resize-none`}
        />
        <div className="text-xs text-slate-400 mt-2">{message.length} characters</div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <button type="submit" className="rounded-full bg-slate-900 text-white px-6 py-3 font-semibold hover:bg-slate-800 transition">
            Send message
          </button>
        </div>

      </div>

      {status === "not-configured" && (
        <div className="mt-4 rounded-md bg-yellow-50 border border-yellow-100 p-3 text-sm text-yellow-800">
          Sending is not configured yet. You'll add the webhook later — this form will send to that endpoint.
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 rounded-md bg-red-50 border border-red-100 p-3 text-sm text-red-800">
          Please fill in required fields correctly.
        </div>
      )}
    </form>
  );
}
