import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, MessageSquare, User } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);

    // 🔑 REPLACE THIS WITH YOUR ACCESS KEY FROM WEB3FORMS
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.',
        });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please check your internet connection.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-transparent font-sans overflow-hidden">
      
      {/* Background Glow Accents */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3 backdrop-blur-md">
            <Mail className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Communication Endpoint // Terminal
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Initiate Direct <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
              Transmission.
            </span>
          </h2>
          <p className="text-cyan-300/70 text-sm max-w-xl font-mono leading-relaxed">
            Have a project in mind or an open opportunity? Send a message directly to my inbox.
          </p>
        </div>

        {/* Form Container */}
        <div className="p-8 md:p-10 rounded-3xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-mono text-slate-300 uppercase tracking-wider">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/80 transition-all font-sans"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-mono text-slate-300 uppercase tracking-wider">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/80 transition-all font-sans"
                />
              </div>

            </div>

            {/* Subject Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-mono text-slate-300 uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                placeholder="Internship opportunity / Project inquiry"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/80 transition-all font-sans"
              />
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-mono text-slate-300 uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/80 transition-all font-sans resize-none"
              />
            </div>

            {/* Status Feedback Banners */}
            {status.type === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{status.message}</span>
              </div>
            )}

            {status.type === 'error' && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-3">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{status.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-sm font-mono tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>TRANSMITTING MESSAGE...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>SEND TRANSMISSION</span>
                </>
              )}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}