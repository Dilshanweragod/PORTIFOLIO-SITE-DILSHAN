import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User } from 'firebase/auth';
import { Send, Mail, MapPin, Clock, Copy, Check, Sparkles, ArrowRight, ExternalLink, Inbox, LogOut } from 'lucide-react';
import { validateContactForm, buildMailtoHref, ContactFormData } from '../utils/portfolioLogic';
import { socialChannelGroups } from '../data/socials';
import { SocialIcon } from './SocialIcon';
import { initGmailAuth, googleSignIn, logoutGmail, clearAccessToken } from '../services/gmailAuth';
import { sendGmailMessage } from '../services/gmailApi';
import { GoogleSignInButton } from './GoogleSignInButton';
import { GmailWorkspacePanel } from './GmailWorkspacePanel';
import { GmailConfirmModal, GmailPendingAction } from './GmailConfirmModal';

interface ContactProps {
  preselectedService?: {
    service: string;
    nonce: number;
  } | null;
}

export const Contact: React.FC<ContactProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    service: 'Digital Marketing Strategy',
    budget: '$1,000 - $3,000',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sentViaGmail, setSentViaGmail] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [colomboTime, setColomboTime] = useState<string>('');
  const [serviceHighlighted, setServiceHighlighted] = useState(false);

  const [activeTab, setActiveTab] = useState<'brief' | 'gmail'>('brief');
  const [gmailUser, setGmailUser] = useState<User | null>(null);
  const [gmailToken, setGmailToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [pendingBriefSend, setPendingBriefSend] = useState<GmailPendingAction | null>(null);

  // Subscribe to Firebase auth state and clear memory-only token on sign-out
  useEffect(() => {
    const unsubscribe = initGmailAuth(
      (user, token) => {
        setGmailUser(user);
        setGmailToken(token);
        setNeedsAuth(false);
      },
      () => {
        setGmailUser(null);
        setGmailToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      setGmailUser(result.user);
      setGmailToken(result.accessToken);
      setNeedsAuth(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google Sign-In failed. Please try again.';
      setAuthError(message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleSignOut = async () => {
    await logoutGmail();
    setGmailUser(null);
    setGmailToken(null);
    setNeedsAuth(true);
    setAuthError(null);
  };

  const handleAuthExpired = () => {
    clearAccessToken();
    setGmailToken(null);
    setNeedsAuth(true);
  };

  // Sync service dropdown when user clicks Request Service / Inquire Similar
  useEffect(() => {
    if (!preselectedService) return;
    setFormData((prev) => ({ ...prev, service: preselectedService.service }));
    setIsSubmitted(false);
    setSentViaGmail(false);
    setActiveTab('brief');
    setServiceHighlighted(true);
    const timer = setTimeout(() => setServiceHighlighted(false), 1600);
    return () => clearTimeout(timer);
  }, [preselectedService]);

  // Clock for Colombo, Sri Lanka (UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setColomboTime(new Intl.DateTimeFormat([], options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dpasindu487@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFieldChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const buildBriefEmailPayload = () => ({
    to: 'dpasindu487@gmail.com',
    subject: `Portfolio Inquiry: ${formData.service} (${formData.fullName})`,
    replyTo: formData.email,
    body: [
      `Name: ${formData.fullName}`,
      `Email: ${formData.email}`,
      `Service: ${formData.service}`,
      `Estimated Budget: ${formData.budget}`,
      '',
      'Project Details:',
      formData.message
    ].join('\n')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setAuthError(null);

    // When connected to Gmail, require explicit user confirmation before sending via API
    if (gmailToken && !needsAuth) {
      const payload = buildBriefEmailPayload();
      setPendingBriefSend({
        type: 'send',
        ...payload
      });
      return;
    }

    setIsSubmitting(true);
    setSentViaGmail(false);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 550);
  };

  const handleConfirmBriefSend = async () => {
    if (!pendingBriefSend || pendingBriefSend.type !== 'send' || !gmailToken) return;
    setIsSubmitting(true);
    setAuthError(null);

    try {
      await sendGmailMessage(gmailToken, {
        to: pendingBriefSend.to,
        subject: pendingBriefSend.subject,
        body: pendingBriefSend.body,
        replyTo: pendingBriefSend.replyTo
      });
      setPendingBriefSend(null);
      setSentViaGmail(true);
      setIsSubmitted(true);
    } catch (err) {
      setPendingBriefSend(null);
      const status = (err as { status?: number })?.status;
      if (status === 401 || status === 403) {
        handleAuthExpired();
        setAuthError('Your Google session expired. Please sign in again to send via Gmail.');
      } else {
        setAuthError(err instanceof Error ? err.message : 'Unable to send brief via Gmail.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      service: 'Digital Marketing Strategy',
      budget: '$1,000 - $3,000',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
    setSentViaGmail(false);
    setAuthError(null);
  };

  return (
    <section id="contact" className="scroll-mt-20 relative w-full bg-black py-24 lg:py-32 overflow-hidden border-t border-neutral-900/60">
      {/* Background glow */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#FF6A00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#FF6A00] font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Initiate Collaboration</span>
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-poppins tracking-tight leading-[1.1]">
              Let&apos;s create something <span className="text-[#FF6A00]">amazing</span> together.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 font-lato leading-relaxed">
              Have an upcoming project, brand vision, or creative brief? Get in touch and let&apos;s engineer memorable visual experiences.
            </p>
          </motion.div>
        </div>

        {/* 2-Column Layout: Contact Form + Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Form & Gmail Workspace Container */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-[28px] bg-[#0A0A0A] border border-neutral-800/80 shadow-2xl space-y-6">
              {/* Top Mode Switcher & Gmail Auth Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-800/80">
                <div className="inline-flex p-1 rounded-full bg-[#121212] border border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setActiveTab('brief')}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === 'brief'
                        ? 'bg-[#FF6A00] text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Project Brief</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('gmail')}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === 'gmail'
                        ? 'bg-[#FF6A00] text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Inbox className="w-3.5 h-3.5" />
                    <span>Gmail Workspace</span>
                  </button>
                </div>

                {activeTab === 'brief' && (
                  <div className="flex items-center gap-2">
                    {needsAuth || !gmailToken ? (
                      <GoogleSignInButton
                        onClick={handleGoogleSignIn}
                        disabled={isLoggingIn}
                        label={isLoggingIn ? 'Connecting...' : 'Sign in with Google'}
                      />
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        <span className="text-emerald-300 font-mono text-[11px] truncate max-w-[165px]">
                          {gmailUser?.email || 'Gmail Connected'}
                        </span>
                        <button
                          type="button"
                          onClick={handleGoogleSignOut}
                          aria-label="Sign out of Gmail"
                          title="Sign out"
                          className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {authError && (
                <p role="alert" className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-3.5 py-2.5">
                  {authError}
                </p>
              )}

              {activeTab === 'gmail' ? (
                <GmailWorkspacePanel
                  user={gmailUser}
                  accessToken={gmailToken}
                  isLoggingIn={isLoggingIn}
                  onSignIn={handleGoogleSignIn}
                  onSignOut={handleGoogleSignOut}
                  onAuthExpired={handleAuthExpired}
                />
              ) : isSubmitted ? (
                <div className="py-10 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#FF6A00]/20 border border-[#FF6A00] text-[#FF6A00] mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-poppins">
                    {sentViaGmail ? 'Email Sent via Gmail!' : 'Message Dispatched Successfully!'}
                  </h3>
                  <p className="text-sm text-neutral-400 max-w-md mx-auto font-lato leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. Your brief for{' '}
                    <span className="text-[#FF6A00] font-semibold">{formData.service}</span> ({formData.budget}) {sentViaGmail ? 'has been delivered straight to Gmail.' : 'is ready. I typically respond within 24 hours.'}
                  </p>
                  <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                    {!sentViaGmail && (
                      <a
                        href={buildMailtoHref('dpasindu487@gmail.com', formData)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF6A00] hover:bg-[#ff7a1a] text-black text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Email App</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold uppercase tracking-wider border border-neutral-700 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="text-xs font-semibold text-neutral-300 font-poppins">
                        Full Name <span className="text-[#FF6A00]">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleFieldChange('fullName', e.target.value)}
                        placeholder="Pasindu Dilshan"
                        aria-invalid={Boolean(errors.fullName)}
                        className={`w-full px-4 py-3 rounded-xl bg-[#121212] border text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                          errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-[#FF6A00]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-400 mt-1" role="alert">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-neutral-300 font-poppins">
                        Email Address <span className="text-[#FF6A00]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        placeholder="client@company.com"
                        aria-invalid={Boolean(errors.email)}
                        className={`w-full px-4 py-3 rounded-xl bg-[#121212] border text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-[#FF6A00]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-400 mt-1" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service & Budget Pickers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="service" className="text-xs font-semibold text-neutral-300 font-poppins">
                        Service Required <span className="text-[#FF6A00]">*</span>
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => handleFieldChange('service', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl bg-[#121212] border text-sm text-white focus:outline-none transition-colors ${
                          serviceHighlighted
                            ? 'border-[#FF6A00] ring-2 ring-[#FF6A00]/30'
                            : 'border-neutral-800 focus:border-[#FF6A00]'
                        }`}
                      >
                        <option value="Digital Marketing Strategy">Digital Marketing Strategy</option>
                        <option value="Social Media Management">Social Media Management</option>
                        <option value="Search Engine Optimization">Search Engine Optimization</option>
                        <option value="Google Ads & Search Advertising">Google Ads &amp; Search Advertising</option>
                        <option value="Meta Advertising">Meta Advertising</option>
                        <option value="Graphic Design">Graphic Design &amp; Brand Identity</option>
                        <option value="Product Packaging">Product &amp; Packaging Design</option>
                        <option value="Photography">Photography &amp; Visual Content</option>
                        <option value="Videography">Video Editing &amp; Content Creation</option>
                        <option value="Website & UI UX Design">Website &amp; UI UX Design</option>
                        <option value="Full Creative Retainer">Full Creative Retainer</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="budget" className="text-xs font-semibold text-neutral-300 font-poppins">
                        Estimated Budget
                      </label>
                      <select
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => handleFieldChange('budget', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#121212] border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FF6A00] transition-colors"
                      >
                        <option value="Under $1,000">Under $1,000</option>
                        <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                        <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                        <option value="$5,000+">$5,000+</option>
                        <option value="Flexible / Retainer">Flexible / Retainer</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="message" className="text-xs font-semibold text-neutral-300 font-poppins">
                        Project Details &amp; Objectives <span className="text-[#FF6A00]">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-neutral-400 tabular-nums">
                        {formData.message.trim().length} chars
                      </span>
                    </div>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      placeholder="Briefly describe what you're looking to create, timeline, and goals..."
                      aria-invalid={Boolean(errors.message)}
                      className={`w-full px-4 py-3 rounded-xl bg-[#121212] border text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors resize-none ${
                        errors.message ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-[#FF6A00]'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-400 mt-1" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-[#FF6A00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FF6A00]/25 transition-all duration-300 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Brief...</span>
                    ) : (
                      <>
                        <span>
                          {gmailToken && !needsAuth ? 'Review & Send via Gmail' : 'Send Message'}
                        </span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Contact Information & Location Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-6 sm:p-8 rounded-[28px] bg-[#0A0A0A] border border-neutral-800/80 space-y-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white font-poppins">
                Direct Contact &amp; Details
              </h3>

              {/* Email Address with Copy Button */}
              <div className="p-4 rounded-2xl bg-[#111111] border border-neutral-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-black border border-neutral-800 flex items-center justify-center text-[#FF6A00] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">Direct Email</span>
                    <a
                      href="mailto:dpasindu487@gmail.com"
                      className="text-xs sm:text-sm font-semibold text-white hover:text-[#FF6A00] transition-colors truncate block"
                    >
                      dpasindu487@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors border border-neutral-800 shrink-0 cursor-pointer text-[11px] font-mono"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#FF6A00]" />
                      <span className="text-[#FF6A00]">Copied</span>
                    </>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Location & Local Clock */}
              <div className="p-4 rounded-2xl bg-[#111111] border border-neutral-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black border border-neutral-800 flex items-center justify-center text-[#FF6A00]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">Location</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      Colombo, Sri Lanka
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#FF6A00]" />
                    <span>Local Time (UTC+5:30):</span>
                  </span>
                  <span className="font-mono text-white font-bold tabular-nums">{colomboTime || '04:45 AM'}</span>
                </div>
              </div>

              {/* Work Availability Note */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#121212] to-[#181818] border border-neutral-800">
                <h4 className="text-xs font-bold text-white font-poppins">
                  Currently Open for New Projects
                </h4>
                <p className="text-[11px] text-neutral-400 mt-1 font-lato leading-relaxed">
                  Available for digital marketing retainers, paid search &amp; Meta campaigns, brand identities, video production, and commercial shoots worldwide.
                </p>
              </div>

              {/* Categorized Social & Creative Channels */}
              <div className="pt-4 border-t border-neutral-800/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white font-poppins">
                  Social &amp; Creative Channels
                </h4>
                <div className="space-y-3.5">
                  {socialChannelGroups.map((group) => (
                    <div key={group.id} className="space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6A00] block">
                        {group.title}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <a
                            key={item.id}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.ariaLabel}
                            className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 rounded-xl bg-[#111111] border border-neutral-800 hover:border-[#FF6A00] text-neutral-300 hover:text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
                          >
                            <SocialIcon platform={item.platform} className="w-3.5 h-3.5 text-[#FF6A00]" />
                            <span>{item.label}</span>
                            <ExternalLink className="w-3 h-3 text-neutral-500" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Email & WhatsApp Action Card */}
            <div className="p-6 rounded-[24px] bg-[#0A0A0A] border border-neutral-800 text-xs text-neutral-400 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold font-poppins">Direct Connect</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">Reach out via Email or WhatsApp to start a project conversation.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <a
                  href="https://api.whatsapp.com/send?phone=94719575360&text=Hi%20Pasindu%20Dilshan%2C%20I%20would%20like%20to%20discuss%20a%20digital%20marketing%20%2F%20creative%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message WhatsApp at 071 957 5360"
                  className="px-4 py-2.5 rounded-full bg-[#111111] hover:bg-[#19281D] border border-emerald-500/40 text-emerald-300 hover:text-white font-semibold text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>WhatsApp · 071 957 5360</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
                <a
                  href="mailto:dpasindu487@gmail.com?subject=Project%20Inquiry%20from%20Portfolio"
                  className="px-4 py-2.5 rounded-full bg-[#FF6A00] hover:bg-[#ff7a1a] text-black font-bold text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>Email Now</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GmailConfirmModal
        action={pendingBriefSend}
        isExecuting={isSubmitting}
        onCancel={() => setPendingBriefSend(null)}
        onConfirm={handleConfirmBriefSend}
      />
    </section>
  );
};
