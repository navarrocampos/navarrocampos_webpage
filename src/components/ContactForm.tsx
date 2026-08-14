'use client';

import { useState, useRef } from 'react';

interface FormState {
  name: string;
  email: string;
  business: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const BUSINESS_OPTIONS = [
  { value: 'home-services', label: 'Home Services (cleaning, landscaping, handyman)' },
  { value: 'beauty',        label: 'Beauty & Wellness' },
  { value: 'food',          label: 'Food Business (baker, caterer, food truck)' },
  { value: 'tutor',         label: 'Tutor or Coach' },
  { value: 'trades',        label: 'Tradesperson (electrician, plumber, HVAC)' },
  { value: 'other',         label: 'Other' },
];

function validate(fields: FormState): FormErrors {
  const errors: FormErrors = {};
  if (fields.name.trim().length < 2)
    errors.name = 'Please enter your name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    errors.email = 'Please enter a valid email address.';
  if (fields.message.trim().length < 10)
    errors.message = 'Please tell us a little more (at least 10 characters).';
  return errors;
}

export function ContactForm() {
  const [fields, setFields]   = useState<FormState>({ name: '', email: '', business: '', message: '' });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]    = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const newFields = { ...fields, [key]: e.target.value };
    setFields(newFields);
    if (touched[key]) {
      // Live re-validate once a field has been touched
      setErrors(validate(newFields));
    }
  };

  const blur = (key: keyof FormState) => () => {
    setTouched(t => ({ ...t, [key]: true }));
    setErrors(validate(fields));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      // Focus first errored field
      const firstKey = Object.keys(errs)[0] as keyof FormErrors;
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }

    setSubmitting(true);

    /*
     * ─── Replace this block with your real form submission ───────────────────
     * Option A — Formspree (free tier available):
     *   const res = await fetch('https://formspree.io/f/YOUR_ID', {
     *     method: 'POST',
     *     headers: { Accept: 'application/json' },
     *     body: JSON.stringify(fields),
     *   });
     *   if (!res.ok) { setSubmitting(false); return; }
     *
     * Option B — Cloudflare Workers (already in your stack):
     *   POST to /api/contact → your Worker sends email via Resend/SendGrid.
     * ─────────────────────────────────────────────────────────────────────────
     */
    await new Promise(r => setTimeout(r, 1200)); // ← remove once real endpoint is wired

    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => successRef.current?.focus(), 50);
  };

  if (success) {
    return (
      <div
        ref={successRef}
        className="form-success"
        role="alert"
        tabIndex={-1}
      >
        ✅ Message received — we&apos;ll be in touch within 24 hours.
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="field-name">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id="field-name"
            className={`form-input${errors.name && touched.name ? ' is-error' : ''}`}
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Maria Garcia"
            aria-required="true"
            aria-describedby="error-name"
            aria-invalid={!!(errors.name && touched.name)}
            value={fields.name}
            onChange={update('name')}
            onBlur={blur('name')}
          />
          <span className="form-error" id="error-name" aria-live="polite">
            {touched.name ? errors.name : ''}
          </span>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="field-email">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="field-email"
            className={`form-input${errors.email && touched.email ? ' is-error' : ''}`}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="maria@yourbusiness.com"
            aria-required="true"
            aria-describedby="error-email"
            aria-invalid={!!(errors.email && touched.email)}
            value={fields.email}
            onChange={update('email')}
            onBlur={blur('email')}
          />
          <span className="form-error" id="error-email" aria-live="polite">
            {touched.email ? errors.email : ''}
          </span>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="field-business">Type of business</label>
        <select
          id="field-business"
          className="form-input form-select"
          name="business"
          value={fields.business}
          onChange={update('business')}
        >
          <option value="" disabled>Select your business type</option>
          {BUSINESS_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="field-message">
          Tell us about your business <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="field-message"
          className={`form-input form-textarea${errors.message && touched.message ? ' is-error' : ''}`}
          name="message"
          rows={4}
          required
          aria-required="true"
          aria-describedby="error-message"
          aria-invalid={!!(errors.message && touched.message)}
          placeholder="I run a cleaning business in Toronto and need a simple website where customers can find me and send a message..."
          value={fields.message}
          onChange={update('message')}
          onBlur={blur('message')}
        />
        <span className="form-error" id="error-message" aria-live="polite">
          {touched.message ? errors.message : ''}
        </span>
      </div>

      <button
        type="submit"
        className="btn btn--primary btn--full"
        disabled={submitting}
      >
        {submitting ? 'Sending…' : 'Send My Message'}
      </button>

    </form>
  );
}
