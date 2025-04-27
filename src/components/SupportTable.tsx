
import React from 'react';
import { Check, Minus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const features = [
  {
    name: "AI Implementation Blueprint",
    spark: true,
    ignite: true,
    blaze: true,
    nova: true
  },
  {
    name: "Agent Activation Call",
    spark: "1x Setup Call",
    ignite: "Bi-weekly Office Hours",
    blaze: "Dedicated Success Manager",
    nova: "24/7 Priority Support"
  },
  {
    name: "Success Dashboard Access",
    spark: "Basic KPIs",
    ignite: "Lead Tracking + Reports",
    blaze: "Full Custom Performance Dashboard",
    nova: "Enterprise Analytics Suite"
  },
  {
    name: "Support Channels",
    spark: "Email",
    ignite: "Email + Slack",
    blaze: "Slack + Text Concierge",
    nova: "White Glove Service"
  },
  {
    name: "Campaign Launch Templates",
    spark: "Starter Kit",
    ignite: "Full Funnel Flows",
    blaze: "Done-for-You Campaigns",
    nova: "Custom Strategy Design"
  },
  {
    name: "System Optimization Calls",
    spark: "Monthly Check-in",
    ignite: "Bi-weekly Growth Calls",
    blaze: "Weekly Deep Dives + ROI Audits",
    nova: "Daily Strategy Sessions"
  },
  {
    name: "On-Site Training",
    spark: false,
    ignite: "Optional Add-on",
    blaze: "Included (1x per year)",
    nova: "Unlimited Access"
  },
];

const SupportTable = () => {
  const getPackageColor = (column: number): string => {
    switch (column) {
      case 1: return 'text-red-500'; // Spark (Miles - Red)
      case 2: return 'text-green-500'; // Ignite (Giselle - Green)
      case 3: return 'text-blue-500'; // Blaze (Devon - Blue)
      case 4: return 'text-amber-500'; // Nova (Alma - Gold)
      default: return 'text-white';
    }
  };

  return (
    <div className="w-full overflow-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[250px] py-3 text-sm">Feature</TableHead>
            <TableHead className={`${getPackageColor(1)} py-3 text-sm`}>Spark</TableHead>
            <TableHead className={`${getPackageColor(2)} py-3 text-sm`}>Ignite</TableHead>
            <TableHead className={`${getPackageColor(3)} py-3 text-sm`}>Blaze</TableHead>
            <TableHead className={`${getPackageColor(4)} py-3 text-sm`}>Nova</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name} className="hover:bg-white/5">
              <TableCell className="font-medium text-sm py-3">{feature.name}</TableCell>
              <TableCell className="py-3">
                {typeof feature.spark === 'boolean' ? (
                  feature.spark ? (
                    <Check className="h-3.5 w-3.5 text-red-500" />
                  ) : (
                    <Minus className="h-3.5 w-3.5 text-white/20" />
                  )
                ) : (
                  <span className="text-red-500 text-sm">{feature.spark}</span>
                )}
              </TableCell>
              <TableCell className="py-3">
                {typeof feature.ignite === 'boolean' ? (
                  feature.ignite ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Minus className="h-3.5 w-3.5 text-white/20" />
                  )
                ) : (
                  <span className="text-green-500 text-sm">{feature.ignite}</span>
                )}
              </TableCell>
              <TableCell className="py-3">
                {typeof feature.blaze === 'boolean' ? (
                  feature.blaze ? (
                    <Check className="h-3.5 w-3.5 text-blue-500" />
                  ) : (
                    <Minus className="h-3.5 w-3.5 text-white/20" />
                  )
                ) : (
                  <span className="text-blue-500 text-sm">{feature.blaze}</span>
                )}
              </TableCell>
              <TableCell className="py-3">
                {typeof feature.nova === 'boolean' ? (
                  feature.nova ? (
                    <Check className="h-3.5 w-3.5 text-amber-500" />
                  ) : (
                    <Minus className="h-3.5 w-3.5 text-white/20" />
                  )
                ) : (
                  <span className="text-amber-500 text-sm">{feature.nova}</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SupportTable;
