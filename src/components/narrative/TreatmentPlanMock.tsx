import React from 'react';

const rows = [
  { tooth: '14', code: 'D2391', desc: 'Resin composite — one surface, posterior', fee: 340, ins: 180, patient: 160 },
  { tooth: '19', code: 'D2740', desc: 'Crown — porcelain/ceramic substrate', fee: 1450, ins: 725, patient: 725 },
  { tooth: '19', code: 'D2950', desc: 'Core buildup, including any pins', fee: 380, ins: 190, patient: 190 },
  { tooth: '30', code: 'D6010', desc: 'Surgical placement of implant body, endosteal', fee: 2800, ins: 0, patient: 2800 },
  { tooth: '30', code: 'D6058', desc: 'Abutment supported porcelain/ceramic crown', fee: 1650, ins: 0, patient: 1650 },
  { tooth: '30', code: 'D6104', desc: 'Bone graft — first site in quadrant', fee: 890, ins: 0, patient: 890 },
  { tooth: '7', code: 'D2962', desc: 'Labial veneer — porcelain laminate', fee: 1800, ins: 0, patient: 1800 },
];

const total = rows.reduce((s, r) => ({ fee: s.fee + r.fee, ins: s.ins + r.ins, patient: s.patient + r.patient }), { fee: 0, ins: 0, patient: 0 });

const TreatmentPlanMock = () => (
  <div
    className="rounded-sm shadow-lg max-w-md w-full mx-auto"
    style={{
      fontFamily: "'Courier New', Courier, monospace",
      fontSize: '11px',
      background: '#FAFAFA',
      color: '#333',
      transform: 'rotate(-1deg)',
      border: '1px solid #ddd',
    }}
  >
    {/* Header */}
    <div style={{ borderBottom: '2px solid #999', padding: '12px 16px 8px' }}>
      <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Generic Dental Office
      </div>
      <div style={{ fontSize: '10px', color: '#777', marginTop: 2 }}>
        123 Main St, Suite 200 &bull; Anytown, USA 90000 &bull; (555) 123-4567
      </div>
    </div>

    {/* Patient Info */}
    <div style={{ padding: '8px 16px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#555' }}>
      <span>Patient: MARTINEZ, SARAH</span>
      <span>DOB: 04/15/1988</span>
    </div>
    <div style={{ padding: '4px 16px 8px', borderBottom: '1px solid #ddd', fontSize: '10px', color: '#555' }}>
      Plan Date: 03/13/2026 &nbsp;&nbsp; Provider: Dr. Smith &nbsp;&nbsp; Ins: Delta Dental PPO
    </div>

    {/* Column Headers */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '32px 52px 1fr 60px 52px 64px',
        padding: '6px 16px',
        borderBottom: '1px solid #bbb',
        fontSize: '9px',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: '#666',
        background: '#F0F0F0',
      }}
    >
      <span>Th#</span>
      <span>Code</span>
      <span>Description</span>
      <span style={{ textAlign: 'right' }}>Fee</span>
      <span style={{ textAlign: 'right' }}>Ins</span>
      <span style={{ textAlign: 'right' }}>Patient</span>
    </div>

    {/* Rows */}
    {rows.map((r, i) => (
      <div
        key={i}
        style={{
          display: 'grid',
          gridTemplateColumns: '32px 52px 1fr 60px 52px 64px',
          padding: '4px 16px',
          borderBottom: '1px solid #eee',
          fontSize: '10px',
          color: '#444',
          background: i % 2 === 0 ? '#fff' : '#FAFAFA',
        }}
      >
        <span>{r.tooth}</span>
        <span>{r.code}</span>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.desc}</span>
        <span style={{ textAlign: 'right' }}>${r.fee.toLocaleString()}</span>
        <span style={{ textAlign: 'right' }}>${r.ins.toLocaleString()}</span>
        <span style={{ textAlign: 'right' }}>${r.patient.toLocaleString()}</span>
      </div>
    ))}

    {/* Totals */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '32px 52px 1fr 60px 52px 64px',
        padding: '8px 16px',
        borderTop: '2px solid #999',
        fontSize: '11px',
        fontWeight: 700,
        color: '#111',
        background: '#F0F0F0',
      }}
    >
      <span />
      <span />
      <span style={{ textTransform: 'uppercase' }}>Total</span>
      <span style={{ textAlign: 'right' }}>${total.fee.toLocaleString()}</span>
      <span style={{ textAlign: 'right' }}>${total.ins.toLocaleString()}</span>
      <span style={{ textAlign: 'right', fontSize: '12px' }}>${total.patient.toLocaleString()}</span>
    </div>

    {/* Footer */}
    <div style={{ padding: '8px 16px 12px', fontSize: '9px', color: '#999', lineHeight: 1.4 }}>
      Treatment plan is an estimate only. Actual costs may vary based on findings during treatment.
      Insurance estimates based on current benefit information on file. Patient responsible for any balance.
    </div>
  </div>
);

export default TreatmentPlanMock;
