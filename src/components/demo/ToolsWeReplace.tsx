
import React from 'react';

const ToolsWeReplace = () => {
  const tools = [
    "Mailchimp",
    "Weave", 
    "Calendly",
    "Salesforce",
    "Monday.com",
    "Solutionreach",
    "RevenueWell",
    "Lighthouse 360"
  ];

  return (
    <section className="py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            All-in-One. Not One-More-Thing.
          </h2>
          <p className="text-xl text-white/70">
            No more juggling 7 tools. One login. One platform. All connected.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {tools.map((tool, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
                  <div className="h-12 w-12 bg-white/10 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white/60 font-medium text-sm">
                      {tool.charAt(0)}
                    </span>
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    {tool}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsWeReplace;
