
import React from "react";
import { Button } from "@/components/ui/button";
import { Sms, Instagram, Mail, Copy, QrCode, Share2, TikTok } from "lucide-react";

type SocialChannel = "sms" | "instagram" | "tiktok" | "email" | "copy" | "qr";

export type ShareOption = {
  channel: SocialChannel;
  label: string;
  icon: React.ReactNode;
};

export const shareOptions: ShareOption[] = [
  { channel: "sms", label: "SMS", icon: <Sms className="w-4 h-4" /> },
  { channel: "email", label: "Email", icon: <Mail className="w-4 h-4" /> },
  { channel: "instagram", label: "Instagram", icon: <Instagram className="w-4 h-4" /> },
  { channel: "tiktok", label: "TikTok", icon: <TikTok className="w-4 h-4" /> },
  { channel: "copy", label: "Copy Link", icon: <Copy className="w-4 h-4" /> },
  { channel: "qr", label: "QR Code", icon: <QrCode className="w-4 h-4" /> },
];

type Props = {
  referralLink: string;
  onShare: (channel: SocialChannel) => void;
  showQR?: boolean;
  setShowQR?: (show: boolean) => void;
};

const smsText = (url: string) =>
  `I’m inviting you to try NextGen Practice. Use my referral link to join and get free credits: ${url}`;

const emailSubject = "You're Invited to NextGen Practice – Free Credits!";
const emailBody = (url: string) =>
  `Hi!\n\nJoin NextGen Practice through my referral link and you’ll get bonus credits: ${url}\n\nSee you inside!`;

export const SocialShareButtons: React.FC<Props> = ({
  referralLink,
  onShare,
  showQR,
  setShowQR,
}) => (
  <div className="flex flex-wrap gap-2">
    <Button
      variant="outline"
      onClick={() => {
        window.open(
          `sms:?&body=${encodeURIComponent(smsText(referralLink))}`,
          "_blank"
        );
        onShare("sms");
      }}
      className="border-white/20 text-white bg-blue-700 hover:bg-blue-900"
      aria-label="Share via SMS"
    >
      <Sms className="mr-1 w-4 h-4" />
      SMS
    </Button>
    <Button
      variant="outline"
      onClick={() => {
        window.open(
          `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody(referralLink))}`,
          "_blank"
        );
        onShare("email");
      }}
      className="border-white/20 text-white bg-blue-700 hover:bg-blue-900"
      aria-label="Share via Email"
    >
      <Mail className="mr-1 w-4 h-4" />
      Email
    </Button>
    <Button
      variant="outline"
      onClick={() => {
        window.open(
          `https://www.instagram.com/create/story/`, // can't pre-populate easily; show CTA popup in future
          "_blank"
        );
        onShare("instagram");
      }}
      className="border-white/20 text-white bg-pink-600 hover:bg-pink-700"
      aria-label="Share on Instagram"
    >
      <Instagram className="mr-1 w-4 h-4" />
      Instagram
    </Button>
    <Button
      variant="outline"
      onClick={() => {
        window.open(
          `https://www.tiktok.com/upload?refer=referral`, // can't deep link a share but future improvement
          "_blank"
        );
        onShare("tiktok");
      }}
      className="border-white/20 text-white bg-black hover:bg-gray-900"
      aria-label="Share on TikTok"
    >
      <TikTok className="mr-1 w-4 h-4" />
      TikTok
    </Button>
    <Button
      variant="outline"
      onClick={() => {
        navigator.clipboard.writeText(referralLink);
        onShare("copy");
      }}
      className="border-white/20 text-white hover:bg-white/10"
      aria-label="Copy Referral Link"
    >
      <Copy className="mr-1 w-4 h-4" />
      Copy Link
    </Button>
    {setShowQR && (
      <Button
        variant="outline"
        onClick={() => setShowQR(!showQR)}
        className="border-white/20 text-white hover:bg-white/10"
        aria-label="Share QR"
      >
        <QrCode className="mr-1 w-4 h-4" />
        QR Code
      </Button>
    )}
  </div>
);

export default SocialShareButtons;
