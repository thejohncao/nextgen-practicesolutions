
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormValues = z.infer<typeof formSchema>;

interface EmailCollectionFormProps {
  buttonText?: string;
  placeholder?: string;
  className?: string;
  onSubmit?: () => void;
}

const EmailCollectionForm = ({
  buttonText = "Get Started",
  placeholder = "Enter your email",
  className = "",
  onSubmit
}: EmailCollectionFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you!",
        description: "We'll be in touch with you soon.",
      });
      form.reset();
      setIsSubmitting(false);
      
      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit();
      }
    }, 1000);
  };

  return (
    <div className={`glass-card p-3 backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] rounded-lg animate-fade-in ${className}`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2 items-center">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1 mb-0">
                <FormControl>
                  <Input 
                    placeholder={placeholder} 
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-nextgen-purple" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="absolute mt-1 text-xs" />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="bg-nextgen-purple/90 hover:bg-nextgen-purple transition-all duration-300 hover:scale-105 shadow-[0_8px_16px_-4px_rgba(155,135,245,0.3)]"
          >
            {buttonText} {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EmailCollectionForm;
