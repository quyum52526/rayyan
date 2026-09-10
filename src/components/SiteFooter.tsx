"use client";

import { ArrowRight, ChevronRight, Clock, LockKeyhole, Mail, MapPin, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type BrandIconProps = { size?: number };

function FacebookMark({ size = 16 }: BrandIconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.29-.04-1.28-.12-2.43-.12-2.4 0-4.05 1.47-4.05 4.16V9.9H7.5V13h2.72v8h3.28Z" /></svg>;
}

function InstagramMark({ size = 16 }: BrandIconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" /></svg>;
}

function YoutubeMark({ size = 16 }: BrandIconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.75-1.77C18.3 5 12 5 12 5s-6.3 0-7.85.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.75 1.77C5.7 19 12 19 12 19s6.3 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10.2 14.9V9.1L15.1 12l-4.9 2.9Z" /></svg>;
}

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookMark },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramMark },
  { label: "YouTube", href: "https://youtube.com", Icon: YoutubeMark },
  { label: "WhatsApp", href: "https://wa.me/8809610000000", Icon: MessageCircle },
];

export default function SiteFooter() {
  const { t } = useLanguage();
  const f = t.footer;
  const [email, setEmail] = useState("");
  const [subscribeState, setSubscribeState] = useState<"idle" | "done" | "invalid">("idle");

  const subscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) { setSubscribeState("invalid"); return; }
    setSubscribeState("done");
    setEmail("");
  };

  return (
    <footer className="site-footer">
      <div className="footer-newsletter">
        <div className="container footer-newsletter-inner">
          <div>
            <p className="footer-heading-kicker"><Sparkles size={12} /> {f.newsletterKicker}</p>
            <h2>{f.newsletterHeading} <span>{f.newsletterHighlight}</span></h2>
            <p className="footer-newsletter-note">{f.newsletterNote} <b>{f.newsletterCode}</b></p>
          </div>
          <form className="footer-subscribe" onSubmit={subscribe} noValidate>
            <input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setSubscribeState("idle"); }} placeholder={f.newsletterPlaceholder} aria-label={f.newsletterPlaceholder} />
            <button type="submit">{f.newsletterButton} <ArrowRight size={15} /></button>
            {subscribeState !== "idle" && <p className={subscribeState === "done" ? "footer-subscribe-note" : "footer-subscribe-note invalid"} role="status">{subscribeState === "done" ? f.newsletterSuccess : f.newsletterInvalid}</p>}
          </form>
        </div>
      </div>

      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">RAYYAN<span>{f.tagline}</span></div>
          <p>{f.about}</p>
          <div className="footer-families"><strong>{f.familiesCount}</strong><span>{f.familiesNote}</span></div>
          <div className="footer-social">
            {socialLinks.map(({ label, href, Icon }) => <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"><Icon size={16} /></a>)}
          </div>
        </div>

        <div className="footer-column">
          <h3>{f.categoriesTitle}</h3>
          <nav>
            {f.categoryLinks.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}
            <Link className="footer-view-all" href="/#products">{f.viewAll} <ChevronRight size={14} /></Link>
          </nav>
        </div>

        <div className="footer-column">
          <h3>{f.helpTitle}</h3>
          <nav>{f.helpLinks.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}</nav>
        </div>

        <div className="footer-column footer-contact">
          <h3>{f.contactTitle}</h3>
          <div>
            <div className="footer-contact-block">
              <span className="footer-contact-label">{f.contactLabel}</span>
              <a className="footer-phone" href={`tel:+880${f.phone.replace(/\D/g, "").replace(/^0/, "")}`}>{f.phone}</a>
            </div>
            <div className="footer-contact-row"><Mail size={15} /><a className="footer-email" href={`mailto:${f.email}`}>{f.email}</a></div>
            <div className="footer-contact-row"><MapPin size={15} /><span>{f.address.map((line, index) => <span key={line}>{line}{index < f.address.length - 1 && <br />}</span>)}</span></div>
            <div className="footer-contact-row"><Clock size={15} /><span>{f.hours}</span></div>
          </div>
        </div>
      </div>

      <div className="footer-payment">
        <div className="container footer-payment-inner">
          <span className="footer-payment-label">{f.paymentLabel}</span>
          <div className="footer-payment-list">
            {f.paymentMethods.map((method, index) => <span className={index === 0 ? "footer-chip primary" : "footer-chip"} key={method}>{method}</span>)}
          </div>
          <span className="footer-secure"><LockKeyhole size={15} /> {f.secureNote}</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span className="footer-copyright">{f.copyright}</span>
          <nav>{f.legalLinks.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}</nav>
          <span className="footer-packed">{f.packedIn}</span>
        </div>
      </div>
    </footer>
  );
}
