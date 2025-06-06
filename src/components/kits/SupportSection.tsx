
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Phone } from 'lucide-react';

interface SupportSectionProps {
  supportContact: string | null;
}

const SupportSection: React.FC<SupportSectionProps> = ({ supportContact }) => {
  const email = supportContact || 'support@nextgenpractice.org';

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="text-3xl">📞</div>
        <div>
          <h2 className="text-3xl font-bold text-white">Support & Help</h2>
          <p className="text-white/70">Get assistance with implementing your kit resources</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Email Support */}
        <Card className="glass-card hover:bg-white/10 transition-all duration-300 group">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-white">
              <Mail className="h-5 w-5 text-nextgen-purple" />
              <span>Email Support</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70 text-sm mb-4">
              Send us an email for detailed support and questions about this kit.
            </p>
            <Button 
              className="w-full bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
              onClick={() => window.location.href = `mailto:${email}?subject=Kit Support Request`}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Support
            </Button>
          </CardContent>
        </Card>

        {/* Slack Support */}
        <Card className="glass-card hover:bg-white/10 transition-all duration-300 group">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-white">
              <MessageCircle className="h-5 w-5 text-nextgen-purple" />
              <span>Slack Community</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70 text-sm mb-4">
              Join our Slack community for real-time support and discussions.
            </p>
            <Button 
              variant="outline" 
              className="w-full border-white/20 text-white hover:bg-white/10"
              onClick={() => window.open('https://nextgenpractice.slack.com', '_blank')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Join Slack
            </Button>
          </CardContent>
        </Card>

        {/* Schedule Call */}
        <Card className="glass-card hover:bg-white/10 transition-all duration-300 group">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-white">
              <Phone className="h-5 w-5 text-nextgen-purple" />
              <span>Schedule a Call</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70 text-sm mb-4">
              Book a one-on-one consultation for personalized implementation guidance.
            </p>
            <Button 
              variant="outline" 
              className="w-full border-white/20 text-white hover:bg-white/10"
              onClick={() => window.open('https://calendly.com/nextgenpractice', '_blank')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Schedule Call
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Support Info */}
      <Card className="glass-card mt-8">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Implementation Support</h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Our team is here to help you successfully implement these resources in your practice. 
              Whether you need technical assistance, training guidance, or strategic advice, we're committed 
              to your success.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
              <span>📧 Response within 24 hours</span>
              <span>💬 Live chat support</span>
              <span>📞 Priority phone support</span>
              <span>🎓 Implementation training</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SupportSection;
