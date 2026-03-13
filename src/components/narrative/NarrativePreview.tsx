import React from 'react';

const phases = [
  {
    label: 'Phase 1 — Immediate',
    items: ['Composite Filling (#14)', 'Porcelain Crown (#19)'],
    visitor: 2170,
    member: 1845,
    color: '#E74C3C',
  },
  {
    label: 'Phase 2 — 3–6 Months',
    items: ['Implant + Crown (#30)', 'Porcelain Veneer (#7)'],
    visitor: 7140,
    member: 5990,
    color: '#F39C12',
  },
  {
    label: 'Phase 3 — Monitor',
    items: ['Watch & Recheck (#3)'],
    visitor: 0,
    member: 0,
    color: '#27AE60',
  },
];

const NarrativePreview = ({ scale = 1 }: { scale?: number }) => (
  <div
    className="rounded-2xl overflow-hidden max-w-md w-full mx-auto"
    style={{
      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      background: 'linear-gradient(180deg, #F5F3ED 0%, #EAE7DF 100%)',
      border: '1px solid rgba(212,175,106,0.3)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      transform: `scale(${scale}) rotate(1deg)`,
      transformOrigin: 'center center',
    }}
  >
    {/* Header */}
    <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(212,175,106,0.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 10, color: '#B8B0A3', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600 }}>
            Your Care Journey
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#3A3A3A', marginTop: 4, fontFamily: "'Georgia', serif" }}>
            Sarah M.
          </div>
        </div>
        <div
          style={{
            background: 'rgba(212,175,106,0.15)',
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 11,
            fontWeight: 600,
            color: '#D4AF6A',
          }}
        >
          Glow Member
        </div>
      </div>
    </div>

    {/* Phases */}
    <div style={{ padding: '16px 24px' }}>
      {phases.map((p, i) => (
        <div key={i} style={{ marginBottom: i < phases.length - 1 ? 16 : 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#4A6572' }}>{p.label}</span>
          </div>
          {p.items.map((item, j) => (
            <div key={j} style={{ paddingLeft: 16, fontSize: 11, color: '#666', marginBottom: 2 }}>
              {item}
            </div>
          ))}
          {p.visitor > 0 && (
            <div style={{ paddingLeft: 16, marginTop: 6, display: 'flex', gap: 12, fontSize: 11 }}>
              <span style={{ color: '#999', textDecoration: 'line-through' }}>${p.visitor.toLocaleString()}</span>
              <span style={{ color: '#4A6572', fontWeight: 700 }}>${p.member.toLocaleString()}</span>
              <span style={{ color: '#27AE60', fontWeight: 600 }}>Save ${(p.visitor - p.member).toLocaleString()}</span>
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Divider */}
    <div style={{ margin: '0 24px', height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,106,0.4), transparent)' }} />

    {/* Investment Summary */}
    <div style={{ padding: '16px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: '#B8B0A3', fontWeight: 500 }}>Your Investment</span>
        <div>
          <span style={{ fontSize: 10, color: '#999', textDecoration: 'line-through', marginRight: 8 }}>$9,310</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#4A6572' }}>$7,835</span>
        </div>
      </div>
      <div style={{ fontSize: 10, color: '#27AE60', fontWeight: 600, textAlign: 'right' }}>
        You save $1,475 as a Glow member
      </div>
    </div>

    {/* Payment Options */}
    <div style={{ padding: '12px 24px 20px' }}>
      <div style={{ fontSize: 10, color: '#B8B0A3', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: 8 }}>
        Payment Options
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Pay in Full', value: '$7,443', sub: '5% discount' },
          { label: '$0 Down', value: '$327/mo', sub: '24 months' },
          { label: '20% Down', value: '$261/mo', sub: '+ $1,567 down' },
        ].map((opt, i) => (
          <div
            key={i}
            style={{
              background: i === 0 ? 'rgba(74,101,114,0.08)' : 'rgba(0,0,0,0.02)',
              borderRadius: 8,
              padding: '8px 10px',
              textAlign: 'center',
              border: i === 0 ? '1px solid rgba(74,101,114,0.2)' : '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ fontSize: 9, color: '#999', marginBottom: 2 }}>{opt.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#3A3A3A' }}>{opt.value}</div>
            <div style={{ fontSize: 9, color: '#B8B0A3' }}>{opt.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default NarrativePreview;
