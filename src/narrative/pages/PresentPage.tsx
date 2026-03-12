import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useNarrativePlan } from '../context/NarrativePlanContext';
import { useSlideNavigation } from '../hooks/useSlideNavigation';
import ConditionSlide from '../components/present/ConditionSlide';
import WhyItMattersSlide from '../components/present/WhyItMattersSlide';
import TreatmentSlide from '../components/present/TreatmentSlide';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function PresentPage() {
  const { items, phaseGroups, totalFeeCents } = useNarrativePlan();
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();

  const slides = [
    <ConditionSlide key="condition" items={items} />,
    <WhyItMattersSlide key="why" items={items} />,
    <TreatmentSlide key="treatment" phaseGroups={phaseGroups} totalFeeCents={totalFeeCents} />,
  ];

  const { currentSlide, direction, goToNext, goToPrev, goToSlide, isLast } =
    useSlideNavigation({ totalSlides: slides.length });

  return (
    <div className="relative min-h-screen bg-narrative-present-bg overflow-hidden">
      {/* Tap zones for navigation */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-0 bottom-0 w-1/4 z-10 cursor-w-resize"
        aria-label="Previous slide"
      />
      <button
        onClick={goToNext}
        className="absolute right-0 top-0 bottom-0 w-1/4 z-10 cursor-e-resize"
        aria-label="Next slide"
      />

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {slides[currentSlide]}
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? 'bg-narrative-gold scale-125'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Continue to Checkout (on last slide) */}
      {isLast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20"
        >
          <button
            onClick={() => navigate(`/narrative/${planId}/checkout`)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-narrative-gold text-white text-sm font-medium hover:bg-narrative-gold-light transition-colors"
          >
            Continue to Checkout
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
