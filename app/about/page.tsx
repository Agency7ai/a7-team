'use client';

import { useEffect } from 'react';
import type { Metadata } from 'next';

export default function About() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <div className="about-page corner-marks">
      <div className="bottom-marks" />
      
      <header className="about-header">
        <a href="/" className="back-link">← Back</a>
      </header>

      <article className="about-content">
        <h1>About this domain</h1>

        <div>
          <p>
            <strong>a7.team</strong> is the sales inbox domain for Agency7 Inc.
          </p>

          <p>
            If you received an email from Anders Kitson at{' '}
            <a href="mailto:anders@a7.team">anders@a7.team</a>, this is Agency7 — 
            a real Edmonton company building AI automation and web development for Alberta businesses.
          </p>

          <p>
            We use this dedicated domain for outbound sales to keep our primary business domain clean
            and maintain clear identity separation between operational email and outreach.
          </p>
        </div>

        <div>
          <h2>Who is Agency7?</h2>

          <p>
            Agency7 Inc. is an AI automation and web development agency based in Edmonton and Sherwood Park, Alberta.
            We deploy AI into businesses, train companies to be AI-native, and install the first workflows
            teams will actually use.
          </p>

          <p>
            Founded by Anders Kitson (engineer) and Salim Aden, we ship software, not consulting decks.
          </p>

          <ul>
            <li>Main agency site: <a href="https://agency7.ca" target="_blank" rel="noopener noreferrer">agency7.ca</a></li>
            <li>OpenClaw + Paperclip automation: <a href="https://agency7.ai" target="_blank" rel="noopener noreferrer">agency7.ai</a></li>
          </ul>
        </div>

        <div>
          <h2>What we do</h2>

          <p>
            We make teams AI-native. That means deploying real AI workflows, training your team on those tools,
            and ensuring the first AI implementations actually get used.
          </p>

          <p>
            We work with Edmonton and Alberta-based businesses: trades, clinics, law firms, real estate,
            home services, and local B2B companies.
          </p>
        </div>

        <div>
          <h2>Contact</h2>

          <p>
            Reach Anders Kitson at{' '}
            <a href="mailto:anders@a7.team">anders@a7.team</a>
            {' '}or visit{' '}
            <a href="https://agency7.ca" target="_blank" rel="noopener noreferrer">agency7.ca</a>
            {' '}to learn more and book a call.
          </p>
        </div>

        <footer style={{ paddingTop: '48px', paddingBottom: '24px', borderTop: '1px solid var(--color-secondary)', marginTop: '48px' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-secondary)' }}>
            Agency7 Inc. · Edmonton, Alberta, Canada
          </p>
        </footer>
      </article>
    </div>
  );
}
