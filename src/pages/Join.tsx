
import React from 'react';
import Layout from '../components/Layout';
import JoinHero from '../components/join/JoinHero';
import AudienceSection from '../components/join/AudienceSection';
import CurriculumPillars from '../components/join/CurriculumPillars';
import CertificationTracks from '../components/join/CertificationTracks';
import ImplementationTimeline from '../components/join/ImplementationTimeline';
import LearningOutcomes from '../components/join/LearningOutcomes';
import JobBoard from '../components/join/JobBoard';
import StudentJourney from '../components/join/StudentJourney';
import FounderSection from '../components/join/FounderSection';
import EnrollmentCTA from '../components/join/EnrollmentCTA';
import ScrollRevealWrapper from '../components/animation/ScrollRevealWrapper';

const Join = () => {
  return (
    <Layout>
      {/* Hero Section with Certification Badge */}
      <JoinHero />
      
      {/* Who We Help - Audience Fit */}
      <ScrollRevealWrapper animation="fade-up">
        <AudienceSection />
      </ScrollRevealWrapper>
      
      {/* What You'll Learn - Curriculum Overview */}
      <ScrollRevealWrapper animation="fade-up">
        <CurriculumPillars />
      </ScrollRevealWrapper>
      
      {/* Certification Tracks - Skill Progression */}
      <ScrollRevealWrapper animation="fade-up">
        <CertificationTracks />
      </ScrollRevealWrapper>
      
      {/* How It Works - Implementation Timeline */}
      <ScrollRevealWrapper animation="fade-up">
        <ImplementationTimeline />
      </ScrollRevealWrapper>
      
      {/* Learning Outcomes - Practical Skills */}
      <ScrollRevealWrapper animation="fade-up">
        <LearningOutcomes />
      </ScrollRevealWrapper>
      
      {/* Job Board - Live Opportunities */}
      <ScrollRevealWrapper animation="fade-up">
        <JobBoard />
      </ScrollRevealWrapper>
      
      {/* Student Journey - Onboarding Flow */}
      <ScrollRevealWrapper animation="fade-up">
        <StudentJourney />
      </ScrollRevealWrapper>
      
      {/* Founder Section - Human Touch */}
      <ScrollRevealWrapper animation="fade-up">
        <FounderSection />
      </ScrollRevealWrapper>
      
      {/* Final Enrollment CTA */}
      <ScrollRevealWrapper animation="fade-up">
        <EnrollmentCTA />
      </ScrollRevealWrapper>
    </Layout>
  );
};

export default Join;
