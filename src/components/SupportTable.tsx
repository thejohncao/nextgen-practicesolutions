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
  },
  {
    name: "Agent Activation Call",
    spark: "1x Setup Call",
    ignite: "Bi-weekly Office Hours",
    blaze: "Dedicated Success Manager",
  },
  {
    name: "Success Dashboard Access",
    spark: "Basic KPIs",
    ignite: "Lead Tracking + Reports",
    blaze: "Full Custom Performance Dashboard",
  },
  {
    name: "Support Channels",
    spark: "Email",
    ignite: "Email + Slack",
    blaze: "Slack + Text Concierge",
  },
  {
    name: "Campaign Launch Templates",
    spark: "Starter Kit",
    ignite: "Full Funnel Flows",
    blaze: "Done-for-You Campaigns",
  },
  {
    name: "System Optimization Calls",
    spark: "Monthly Check-in",
    ignite: "Bi-weekly Growth Calls",
    blaze: "Weekly Deep Dives + ROI Audits",
  },
  {
    name: "On-Site Training",
    spark: false,
    ignite: "Optional Add-on",
    blaze: "Included (1x per year)",
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
            <TableHead className="w-[300px]">Feature</TableHead>
            <TableHead className={getPackageColor(1)}>Spark</TableHead>
            <TableHead className={getPackageColor(2)}>Ignite</TableHead>
            <TableHead className={getPackageColor(3)}>Blaze</TableHead>
            <TableHead className={getPackageColor(4)}>Nova</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name} className="hover:bg-white/5">
              <TableCell className="font-medium">{feature.name}</TableCell>
              <TableCell>
                {typeof feature.spark === 'boolean' ? (
                  feature.spark ? (
                    <Check className="h-4 w-4 text-red-500" />
                  ) : (
                    <Minus className="h-4 w-4 text-white/20" />
                  )
                ) : (
                  <span className="text-red-500">{feature.spark}</span>
                )}
              </TableCell>
              <TableCell>
                {typeof feature.ignite === 'boolean' ? (
                  feature.ignite ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Minus className="h-4 w-4 text-white/20" />
                  )
                ) : (
                  <span className="text-green-500">{feature.ignite}</span>
                )}
              </TableCell>
              <TableCell>
                {typeof feature.blaze === 'boolean' ? (
                  feature.blaze ? (
                    <Check className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Minus className="h-4 w-4 text-white/20" />
                  )
                ) : (
                  <span className="text-blue-500">{feature.blaze}</span>
                )}
              </TableCell>
              <TableCell>
                {typeof feature.nova === 'boolean' ? (
                  feature.nova ? (
                    <Check className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Minus className="h-4 w-4 text-white/20" />
                  )
                ) : (
                  <span className="text-amber-500">{feature.nova}</span>
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
