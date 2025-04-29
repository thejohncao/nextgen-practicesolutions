
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmailCollectionForm from './EmailCollectionForm';

interface EmailCollectionDialogProps {
  triggerText: string;
  buttonClassName?: string;
  buttonSize?: "default" | "sm" | "lg" | "icon";
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  style?: React.CSSProperties;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EmailCollectionDialog = ({ 
  triggerText,
  buttonClassName,
  buttonSize = "default",
  buttonVariant = "default",
  style,
  open,
  onOpenChange
}: EmailCollectionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button 
          size={buttonSize}
          variant={buttonVariant}
          className={buttonClassName}
          style={style}
        >
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-gradient mb-4">
            Let's Transform Your Practice
          </DialogTitle>
        </DialogHeader>
        <p className="text-white/70 mb-6">
          Join the practices already revolutionizing patient care with AI.
        </p>
        <EmailCollectionForm 
          buttonText="Get Started"
          placeholder="Enter your work email"
        />
      </DialogContent>
    </Dialog>
  );
};

export default EmailCollectionDialog;
