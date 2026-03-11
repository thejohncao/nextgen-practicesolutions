import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowLeft, X, Play } from 'lucide-react';

interface TourStep {
  id: string;
  path: string;
  target: string; // data-tour attribute value
  title: string;
  description: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'nav',
    path: '/portal',
    target: 'nav-sidebar',
    title: 'Portal Navigation',
    description: 'Your command center. Each agent manages a pillar of your practice — growth, management, development, and training.',
  },
  {
    id: 'kpis',
    path: '/portal',
    target: 'kpi-cards',
    title: 'Practice KPIs',
    description: 'At-a-glance metrics showing your practice health — new patients, revenue, and growth trends updated in real time.',
  },
  {
    id: 'pillars',
    path: '/portal',
    target: 'pillar-tabs',
    title: 'Your AI Agents',
    description: 'Four AI agents — Giselle, Miles, Devon, and Alma — each managing a pillar of your practice with live performance data.',
  },
  {
    id: 'giselle',
    path: '/portal/giselle',
    target: 'giselle-hero',
    title: 'Giselle — Practice Growth',
    description: 'Giselle handles patient acquisition, marketing performance, website conversion, and your online presence.',
  },
  {
    id: 'miles',
    path: '/portal/miles',
    target: 'miles-hero',
    title: 'Miles — Practice Management',
    description: 'Miles manages speed-to-lead, scheduling, recall automation, revenue cycle, and team systems.',
  },
  {
    id: 'devon',
    path: '/portal/devon',
    target: 'devon-hero',
    title: 'Devon — Practice Development',
    description: 'Devon drives case acceptance, treatment coordination, front desk conversion, and coaching programs.',
  },
  {
    id: 'alma',
    path: '/portal/alma',
    target: 'alma-hero',
    title: 'Alma — Practice Academy',
    description: 'Alma powers team training, certifications, SOPs, and role-based learning paths for every position.',
  },
  {
    id: 'timeline',
    path: '/portal/timeline',
    target: 'timeline-container',
    title: 'Unified Timeline',
    description: 'Every milestone across all pillars in one place — track progress from onboarding through optimization.',
  },
  {
    id: 'requests',
    path: '/portal/requests',
    target: 'requests-table',
    title: 'Request Center',
    description: 'Submit and track requests — feature asks, support tickets, strategy calls — all managed in one hub.',
  },
  {
    id: 'finish',
    path: '/portal',
    target: 'dashboard-full',
    title: 'Ready to Start',
    description: 'This is your practice operating system. Real data, real agents, real results. Let\'s build something great together.',
  },
];

interface SpotlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function GuidedTour({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [spotlight, setSpotlight] = useState<SpotlightRect | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const measureTimeoutRef = useRef<number>(0);

  const step = TOUR_STEPS[currentStep];

  const measureTarget = useCallback(() => {
    const el = document.querySelector(`[data-tour="${step.target}"]`);
    if (!el) {
      // Full-page fallback — center the tooltip
      setSpotlight(null);
      setTooltipStyle({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      });
      return;
    }

    const rect = el.getBoundingClientRect();
    const padding = 8;
    const spot = {
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    };
    setSpotlight(spot);

    // Position tooltip card
    const tooltipW = 360;
    const tooltipH = 200;
    const gap = 16;
    let top: number;
    let left: number;

    // Try below
    if (spot.top + spot.height + gap + tooltipH < window.innerHeight) {
      top = spot.top + spot.height + gap;
      left = spot.left + spot.width / 2 - tooltipW / 2;
    }
    // Try above
    else if (spot.top - gap - tooltipH > 0) {
      top = spot.top - gap - tooltipH;
      left = spot.left + spot.width / 2 - tooltipW / 2;
    }
    // Try right
    else if (spot.left + spot.width + gap + tooltipW < window.innerWidth) {
      top = spot.top + spot.height / 2 - tooltipH / 2;
      left = spot.left + spot.width + gap;
    }
    // Fallback: center
    else {
      top = window.innerHeight / 2 - tooltipH / 2;
      left = window.innerWidth / 2 - tooltipW / 2;
    }

    // Clamp within viewport
    left = Math.max(16, Math.min(left, window.innerWidth - tooltipW - 16));
    top = Math.max(16, Math.min(top, window.innerHeight - tooltipH - 16));

    setTooltipStyle({
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      width: `${tooltipW}px`,
    });
  }, [step.target]);

  const goToStep = useCallback(
    (index: number) => {
      const nextStep = TOUR_STEPS[index];
      setAnimating(true);

      const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
      const currentPath = location.pathname.replace(basename, '') || '/';

      if (currentPath !== nextStep.path) {
        navigate(nextStep.path);
        // Wait for page to render
        measureTimeoutRef.current = window.setTimeout(() => {
          setCurrentStep(index);
          setAnimating(false);
        }, 400);
      } else {
        setCurrentStep(index);
        window.setTimeout(() => setAnimating(false), 50);
      }
    },
    [navigate, location.pathname]
  );

  // Measure target on step change + window resize
  useEffect(() => {
    // Small delay to ensure DOM is painted after navigation
    const t = window.setTimeout(measureTarget, 100);
    window.addEventListener('resize', measureTarget);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measureTarget);
    };
  }, [currentStep, measureTarget]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (measureTimeoutRef.current) clearTimeout(measureTimeoutRef.current);
    };
  }, []);

  // Navigate to /portal on mount
  useEffect(() => {
    const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
    const currentPath = location.pathname.replace(basename, '') || '/';
    if (currentPath !== '/portal') {
      navigate('/portal');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      goToStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[100]" style={{ pointerEvents: 'none' }}>
        {/* Dark backdrop with cutout via box-shadow */}
        {spotlight ? (
          <div
            style={{
              position: 'fixed',
              top: spotlight.top,
              left: spotlight.left,
              width: spotlight.width,
              height: spotlight.height,
              borderRadius: 12,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.65)',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: 'none',
              zIndex: 100,
            }}
          />
        ) : (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.65)',
              pointerEvents: 'none',
              zIndex: 100,
            }}
          />
        )}

        {/* Spotlight border ring */}
        {spotlight && (
          <div
            style={{
              position: 'fixed',
              top: spotlight.top - 2,
              left: spotlight.left - 2,
              width: spotlight.width + 4,
              height: spotlight.height + 4,
              borderRadius: 14,
              border: '2px solid rgba(245, 166, 35, 0.4)',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: 'none',
              zIndex: 101,
            }}
          />
        )}
      </div>

      {/* Click-blocker overlay (lets clicks on Close/Next/Back through) */}
      <div
        className="fixed inset-0 z-[102]"
        onClick={(e) => {
          // Only block clicks outside the tooltip
          if ((e.target as HTMLElement).closest('[data-tour-tooltip]')) return;
          e.stopPropagation();
        }}
      />

      {/* Tooltip Card */}
      <div
        data-tour-tooltip
        className={`z-[103] transition-all duration-300 ${animating ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}
        style={tooltipStyle}
      >
        <div className="bg-[#1A1B23] border border-white/[0.10] rounded-xl shadow-2xl p-5 backdrop-blur-md">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#F5A623] flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#0B0C10]">{currentStep + 1}</span>
              </div>
              <span className="text-[11px] text-[#6B7280] font-medium">
                Step {currentStep + 1} of {TOUR_STEPS.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-white/[0.06] transition text-[#6B7280] hover:text-[#F9FAFB]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <h3 className="text-sm font-semibold text-[#F9FAFB] mb-1.5">{step.title}</h3>
          <p className="text-[13px] text-[#9CA3AF] leading-relaxed mb-4">{step.description}</p>

          {/* Progress dots */}
          <div className="flex items-center gap-1 mb-4">
            {TOUR_STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? 'w-4 bg-[#F5A623]'
                    : i < currentStep
                      ? 'w-1.5 bg-[#F5A623]/40'
                      : 'w-1.5 bg-white/[0.10]'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-xs text-[#6B7280] hover:text-[#9CA3AF] transition font-medium"
            >
              Skip tour
            </button>
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-[#9CA3AF] hover:bg-white/[0.06] transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-semibold text-[#0B0C10] bg-[#F5A623] hover:bg-[#E09800] transition shadow-sm"
              >
                {isLastStep ? (
                  <>
                    Get Started
                    <Play className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
