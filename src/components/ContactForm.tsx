'use client';

import { useRef, useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';

type Status = 'idle' | 'sending' | 'success' | 'error';
type FieldErrors = Partial<Record<'from_name' | 'reply_to' | 'business_type' | 'message', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: HTMLFormElement): FieldErrors {
  const data = new FormData(form);
  const name = ((data.get('from_name') as string) || '').trim();
  const email = ((data.get('reply_to') as string) || '').trim();
  const business = ((data.get('business_type') as string) || '').trim();
  const message = ((data.get('message') as string) || '').trim();

  const errors: FieldErrors = {};
  if (!name) errors.from_name = 'Must be entered';
  if (!email) errors.reply_to = 'Must be entered';
  else if (!EMAIL_RE.test(email)) errors.reply_to = 'Invalid email';
  if (!business) errors.business_type = 'Must be selected';
  if (!message) errors.message = 'Must be entered';
  return errors;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});

  const clearError = (field: keyof FieldErrors) => {
    setErrors(prev => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setStatus('idle');
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // eslint-disable-next-line no-console
      console.error(
        'EmailJS is not configured: set NEXT_PUBLIC_EMAILJS_SERVICE_ID, ' +
        'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local'
      );
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.sendForm(serviceId, templateId, form, publicKey);
      setStatus('success');
      form.reset();
      setErrors({});
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('EmailJS send failed:', err);
      setStatus('error');
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
    >

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate)' }}>
            Your name <span style={{ color: 'var(--coral)' }}>*</span>
          </label>
          <input
            className={`form-input${errors.from_name ? ' is-error' : ''}`}
            type="text"
            name="from_name"
            placeholder="Maria Garcia"
            onChange={() => clearError('from_name')}
            aria-invalid={!!errors.from_name}
            aria-describedby={errors.from_name ? 'from_name-error' : undefined}
          />
          {errors.from_name && (
            <span id="from_name-error" className="form-error-text">{errors.from_name}</span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate)' }}>
            Email address <span style={{ color: 'var(--coral)' }}>*</span>
          </label>
          <input
            className={`form-input${errors.reply_to ? ' is-error' : ''}`}
            type="email"
            name="reply_to"
            placeholder="maria@yourbusiness.com"
            onChange={() => clearError('reply_to')}
            aria-invalid={!!errors.reply_to}
            aria-describedby={errors.reply_to ? 'reply_to-error' : undefined}
          />
          {errors.reply_to && (
            <span id="reply_to-error" className="form-error-text">{errors.reply_to}</span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate)' }}>
          Type of business <span style={{ color: 'var(--coral)' }}>*</span>
        </label>
        <select
          className={`form-input form-select${errors.business_type ? ' is-error' : ''}`}
          name="business_type"
          defaultValue=""
          onChange={() => clearError('business_type')}
          aria-invalid={!!errors.business_type}
          aria-describedby={errors.business_type ? 'business_type-error' : undefined}
        >
          <option value="">Select your business type</option>
          <option>Home Services (cleaning, landscaping, handyman)</option>
          <option>Beauty &amp; Wellness</option>
          <option>Food Business (baker, caterer, food truck)</option>
          <option>Tutor or Coach</option>
          <option>Tradesperson (electrician, plumber, HVAC)</option>
          <option>Other</option>
        </select>
        {errors.business_type && (
          <span id="business_type-error" className="form-error-text">{errors.business_type}</span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate)' }}>
          Tell us about your business <span style={{ color: 'var(--coral)' }}>*</span>
        </label>
        <textarea
          className={`form-input form-textarea${errors.message ? ' is-error' : ''}`}
          name="message"
          rows={4}
          placeholder="I run a cleaning business in Toronto and need a simple website where customers can find me and send a message..."
          onChange={() => clearError('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span id="message-error" className="form-error-text">{errors.message}</span>
        )}
      </div>

      <button type="submit" className="btn btn--primary btn--full" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send My Message'}
      </button>

      {status === 'success' && (
        <p role="status" style={{ fontSize: '0.85rem', color: 'var(--mint)', fontWeight: 600 }}>
          Thanks! Your message has been sent — we&apos;ll get back to you within 24 hours.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" style={{ fontSize: '0.85rem', color: 'var(--coral)', fontWeight: 600 }}>
          Something went wrong sending your message. Please try WhatsApp or call us directly.
        </p>
      )}

    </form>
  );
}
