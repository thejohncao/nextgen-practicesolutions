
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export function useCreditRedemption() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const redeemCredits = async (
    patientId: string, 
    treatmentId: string, 
    creditsToRedeem: number,
    notes?: string
  ) => {
    setLoading(true);
    try {
      // Start a transaction
      const { data: treatment, error: treatmentError } = await supabase
        .from('treatments')
        .select('name, credit_cost')
        .eq('id', treatmentId)
        .single();

      if (treatmentError) throw treatmentError;

      // Verify patient has enough credits
      const { data: creditsData, error: creditsError } = await supabase
        .from('credits')
        .select('*')
        .eq('user_id', patientId)
        .is('used_at', null)
        .order('created_at', { ascending: true });

      if (creditsError) throw creditsError;

      const availableCredits = creditsData.reduce((sum, credit) => sum + credit.amount, 0);
      
      if (availableCredits < creditsToRedeem) {
        throw new Error('Insufficient credits');
      }

      // Mark credits as used (FIFO)
      let remainingToRedeem = creditsToRedeem;
      const creditsToUpdate = [];

      for (const credit of creditsData) {
        if (remainingToRedeem <= 0) break;
        
        if (credit.amount <= remainingToRedeem) {
          creditsToUpdate.push(credit.id);
          remainingToRedeem -= credit.amount;
        } else {
          // Split credit if needed
          const { error: splitError } = await supabase
            .from('credits')
            .update({ amount: credit.amount - remainingToRedeem })
            .eq('id', credit.id);

          if (splitError) throw splitError;

          // Create new credit record for used portion
          const { error: newCreditError } = await supabase
            .from('credits')
            .insert({
              user_id: patientId,
              tenant_id: credit.tenant_id,
              amount: remainingToRedeem,
              source: credit.source,
              used_at: new Date().toISOString()
            });

          if (newCreditError) throw newCreditError;
          remainingToRedeem = 0;
        }
      }

      // Update credits that are fully used
      if (creditsToUpdate.length > 0) {
        const { error: updateError } = await supabase
          .from('credits')
          .update({ used_at: new Date().toISOString() })
          .in('id', creditsToUpdate);

        if (updateError) throw updateError;
      }

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: patientId,
          type: 'redemption',
          amount: -creditsToRedeem,
          description: `Redeemed for ${treatment.name}`,
          metadata: { treatment_id: treatmentId, notes }
        });

      if (transactionError) throw transactionError;

      toast({
        title: "Credits Redeemed",
        description: `Successfully redeemed ${creditsToRedeem} credits for ${treatment.name}`,
      });

      return { success: true };
    } catch (error) {
      console.error('Error redeeming credits:', error);
      toast({
        title: "Redemption Failed",
        description: error instanceof Error ? error.message : "Failed to redeem credits",
        variant: "destructive"
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return {
    redeemCredits,
    loading
  };
}
