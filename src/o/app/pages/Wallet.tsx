
import React from "react";
import "../../app/styles/apple-design.css";

const Wallet = () => (
  <section className="fade-in apple-card p-8">
    <h2 className="text-2xl font-bold text-apple-header mb-4">Credits Wallet</h2>
    <div className="text-lg text-apple-detail mb-2">
      <strong>Credit Balance:</strong> $50
    </div>
    <div className="text-apple-subtle">You receive 2 credits/month with membership.</div>
    <div className="mt-4">
      <h3 className="font-semibold text-apple-header">Transaction History</h3>
      <ul className="list-disc ml-6 text-apple-detail">
        <li>May: +2 credits</li>
        <li>April: +2 credits</li>
        <li>March: +2 credits</li>
      </ul>
    </div>
  </section>
);

export default Wallet;
