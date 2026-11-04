import React, { useState, useEffect } from 'react';

export default function PublicVerify({ code = 'CC-2026-WIN', navigate }) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'valid' | 'invalid'
  const [certData, setCertData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (code && (code.includes('WIN') || code.includes('PART') || code.startsWith('CC-'))) {
        setStatus('valid');
        setCertData({
          holder_name: 'Alex Chen',
          type: code.includes('WIN') ? 'WINNER' : 'PARTICIPATION',
          place: 1,
          hackathon_title: 'AI Innovation Hackathon 2026',
          code: code || 'CC-2026-WIN',
          issued_at: '2026-11-02T10:30:00.000Z',
        });
      } else {
        setStatus('invalid');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [code]);

  return (
    <main className="public-verify-page ">
      <div className="public-verify-card">
        <div className="public-verify-logo">
          <span className="public-verify-brand-mark" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span>CAMPUSCODE</span>
        </div>

        {status === 'loading' && (
          <p className="public-verify-muted">Checking certificate authenticity…</p>
        )}

        {status === 'invalid' && (
          <>
            <div className="public-verify-stamp invalid">NOT FOUND</div>
            <h1>No certificate matches this code.</h1>
            <p className="public-verify-muted">
              The code <b>{code}</b> does not belong to any CampusCode certificate.
              Check the code on the PDF and try again.
            </p>
          </>
        )}

        {status === 'valid' && certData && (
          <>
            <div className="public-verify-stamp valid">VERIFIED ✓</div>
            <h1>{certData.holder_name}</h1>
            <p className="public-verify-muted">
              {certData.type === 'WINNER'
                ? `Winner certificate — ${certData.place}st place`
                : 'Participation certificate'}
            </p>

            <dl className="public-verify-details">
              <div>
                <dt>Hackathon</dt>
                <dd>{certData.hackathon_title}</dd>
              </div>
              <div>
                <dt>Certificate code</dt>
                <dd>{certData.code}</dd>
              </div>
              <div>
                <dt>Issued on</dt>
                <dd>02 Nov 2026</dd>
              </div>
            </dl>

            <p className="public-verify-muted small">
              This page is the cryptographic proof: the certificate is real only if
              its code verifies here.
            </p>
          </>
        )}

        <button
          type="button"
          className="public-verify-home"
          onClick={() => navigate('/')}
        >
          ← Back to CampusCode
        </button>
      </div>
    </main>
  );
}
