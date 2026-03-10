import React, { useState } from 'react';
import Layout from '../components/Layout';
import PracticeHealthHero from '../components/practice-health/PracticeHealthHero';
import StratigraphyStack from '../components/practice-health/StratigraphyStack';
import LayerNav from '../components/practice-health/LayerNav';
import PracticeMetaInfo from '../components/practice-health/PracticeMetaInfo';

const PracticeHealth = () => {
  const [activeLayer, setActiveLayer] = useState(2);

  return (
    <Layout>
      <section className="bg-health-bg min-h-screen flex items-center justify-center overflow-hidden font-mono-dm">
        <div className="ph-viewport">
          <div className="ph-left-rule" />
          <PracticeHealthHero />
          <LayerNav activeLayer={activeLayer} onLayerChange={setActiveLayer} />

          {/* CTA Zone */}
          <div className="absolute bottom-[44px] left-[48px] z-[100] flex items-center gap-6 ph-fadeUp ph-fadeUp-3">
            <button className="ph-cta-btn">Execute Optimization</button>
            <span className="font-mono-dm text-[10px] text-health-text-dim tracking-[0.12em] uppercase cursor-pointer transition-colors duration-200 hover:text-health-text-main">
              View Full Report →
            </span>
          </div>

          <StratigraphyStack />
          <PracticeMetaInfo />
        </div>
      </section>
    </Layout>
  );
};

export default PracticeHealth;
