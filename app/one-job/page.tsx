'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OneJob() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    town: '',
    weeklyJob: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent('One Job Agent Request');
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Company: ${formData.company}\n` +
      `Town: ${formData.town}\n` +
      `The weekly job: ${formData.weeklyJob}\n` +
      `Email: ${formData.email}\n\n` +
      `Please reach out to discuss putting an agent on this job.`
    );
    
    window.location.href = `mailto:anders@a7.team?subject=${subject}&body=${body}`;
  };

  return (
    <div className="one-job-page corner-marks">
      <div className="bottom-marks" />
      
      <header className="one-job-header">
        <Link href="/" className="back-link">← Back</Link>
      </header>

      <main className="one-job-content">
        <div className="one-job-hero">
          <h1 className="one-job-title">
            We put an agent on<br />
            one job you already do<br />
            this week.
          </h1>
          <p className="one-job-subtitle">
            For owner-led Alberta shops. You already have ChatGPT.<br />
            Nobody is running it.
          </p>
        </div>

        <div className="one-job-sections">
          <section className="one-job-section">
            <h2 className="section-heading">How it works</h2>
            <ol className="numbered-list">
              <li>Pick one weekly job you already hate</li>
              <li>Record yourself doing it once</li>
              <li>Agent drafts the next one</li>
              <li>You send it</li>
              <li>Same job next week we check the real output and time</li>
            </ol>
          </section>

          <section className="one-job-section">
            <h2 className="section-heading">Who this is for</h2>
            <ul className="bullet-list">
              <li>You own the company</li>
              <li>10–40 people</li>
              <li>Alberta-based</li>
              <li>You already have ChatGPT</li>
            </ul>
          </section>

          <section className="one-job-section">
            <h2 className="section-heading">Who this is not for</h2>
            <ul className="bullet-list">
              <li>Staff replacement</li>
              <li>Firm-wide workshop</li>
              <li>Legal or tax advice</li>
              <li>A chatbot on your site</li>
            </ul>
          </section>
        </div>

        <div className="one-job-form-section">
          <h2 className="section-heading">Tell us the job</h2>
          <form onSubmit={handleSubmit} className="one-job-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company" className="form-label">Company</label>
              <input
                type="text"
                id="company"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="town" className="form-label">Town</label>
              <input
                type="text"
                id="town"
                required
                value={formData.town}
                onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="weeklyJob" className="form-label">The weekly job</label>
              <textarea
                id="weeklyJob"
                required
                rows={3}
                value={formData.weeklyJob}
                onChange={(e) => setFormData({ ...formData, weeklyJob: e.target.value })}
                className="form-input"
                placeholder="intake reply, quote, status note, invoice chase"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
              />
            </div>

            <button type="submit" className="cta-button cta-button-secondary">
              Send
            </button>
          </form>
          <p className="quiet-link">
            <a href="mailto:anders@a7.team">anders@a7.team</a>
          </p>
        </div>

        <footer className="one-job-footer">
          <p className="footer-text">
            Agency7 Inc. · Edmonton, Alberta, Canada
          </p>
        </footer>
      </main>
    </div>
  );
}
