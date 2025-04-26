
import { Button } from "@/components/ui/button";

const ChatCTA = () => {
  return (
    <div className="mt-4 text-center">
      <Button 
        className="bg-gradient-to-r from-nextgen-purple to-nextgen-blue hover:opacity-90 transition-all duration-300"
        onClick={() => window.open('https://nextgenpractice.com/book', '_blank')}
      >
        Book Your Free Strategy Call
      </Button>
    </div>
  );
};

export default ChatCTA;
