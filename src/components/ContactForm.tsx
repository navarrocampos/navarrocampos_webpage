'use client';

export function ContactForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate)' }}>
            Your name <span style={{ color: 'var(--coral)' }}>*</span>
          </label>
          <input className="form-input" type="text" placeholder="Maria Garcia" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate)' }}>
            Email address <span style={{ color: 'var(--coral)' }}>*</span>
          </label>
          <input className="form-input" type="email" placeholder="maria@yourbusiness.com" />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate)' }}>
          Type of business
        </label>
        <select className="form-input form-select">
          <option value="">Select your business type</option>
          <option>Home Services (cleaning, landscaping, handyman)</option>
          <option>Beauty &amp; Wellness</option>
          <option>Food Business (baker, caterer, food truck)</option>
          <option>Tutor or Coach</option>
          <option>Tradesperson (electrician, plumber, HVAC)</option>
          <option>Other</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate)' }}>
          Tell us about your business <span style={{ color: 'var(--coral)' }}>*</span>
        </label>
        <textarea
          className="form-input form-textarea"
          rows={4}
          placeholder="I run a cleaning business in Toronto and need a simple website where customers can find me and send a message..."
        />
      </div>

      <button className="btn btn--primary btn--full">Send My Message</button>

    </div>
  );
}
