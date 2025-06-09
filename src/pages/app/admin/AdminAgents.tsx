
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminAgents } from '@/hooks/useAdminAgents';
import { Bot, MessageSquare, Phone, Calendar, Users } from 'lucide-react';
import AdminChart from '@/components/admin/AdminChart';

const AdminAgents = () => {
  const { agentMetrics, loading } = useAdminAgents();

  const agentColors = {
    miles: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
    giselle: 'bg-green-500/20 text-green-400 border-green-500/20',
    devon: 'bg-purple-500/20 text-purple-400 border-purple-500/20',
    alma: 'bg-amber-500/20 text-amber-400 border-amber-500/20'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading agent data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Agent Activity</h1>
          <p className="text-white/60">Monitor AI agent performance and engagement</p>
        </div>
        <Badge className="bg-nextgen-purple text-white">
          <Bot className="h-4 w-4 mr-2" />
          4 Agents Active
        </Badge>
      </div>

      {/* Agent Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Miles - Practice Manager</p>
                <p className="text-2xl font-bold text-white">{agentMetrics?.miles?.interactions || 0}</p>
                <p className="text-xs text-blue-400">Appointments & Insurance</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Giselle - Growth Agent</p>
                <p className="text-2xl font-bold text-white">{agentMetrics?.giselle?.interactions || 0}</p>
                <p className="text-xs text-green-400">Reactivation & Leads</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Devon - Development</p>
                <p className="text-2xl font-bold text-white">{agentMetrics?.devon?.interactions || 0}</p>
                <p className="text-xs text-purple-400">Case Acceptance</p>
              </div>
              <Phone className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Alma - Training Agent</p>
                <p className="text-2xl font-bold text-white">{agentMetrics?.alma?.interactions || 0}</p>
                <p className="text-xs text-amber-400">SOPs & Training</p>
              </div>
              <Users className="h-8 w-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/5 border-white/10">
          <TabsTrigger value="overview" className="data-[state=active]:bg-nextgen-purple">
            Overview
          </TabsTrigger>
          <TabsTrigger value="miles" className="data-[state=active]:bg-blue-500">
            Miles
          </TabsTrigger>
          <TabsTrigger value="giselle" className="data-[state=active]:bg-green-500">
            Giselle
          </TabsTrigger>
          <TabsTrigger value="devon" className="data-[state=active]:bg-purple-500">
            Devon
          </TabsTrigger>
          <TabsTrigger value="alma" className="data-[state=active]:bg-amber-500">
            Alma
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Agent Engagement Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <AdminChart
                  type="bar"
                  data={agentMetrics?.leaderboardData || []}
                  title="Interactions by Agent"
                />
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Response Time Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(agentMetrics?.responseTime || {}).map(([agent, time]) => (
                    <div key={agent} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={agentColors[agent as keyof typeof agentColors]}>
                          {agent}
                        </Badge>
                      </div>
                      <span className="text-white font-mono">{time}ms</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="miles" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Miles - Practice Management Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">{agentMetrics?.miles?.appointments || 0}</p>
                  <p className="text-white/60">Appointments Scheduled</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">{agentMetrics?.miles?.insurance || 0}</p>
                  <p className="text-white/60">Insurance Follow-ups</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">{agentMetrics?.miles?.checkins || 0}</p>
                  <p className="text-white/60">Check-ins Processed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="giselle" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Giselle - Growth & Reactivation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">{agentMetrics?.giselle?.reactivations || 0}</p>
                  <p className="text-white/60">Patient Reactivations</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">{agentMetrics?.giselle?.leads || 0}</p>
                  <p className="text-white/60">New Leads Generated</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">{agentMetrics?.giselle?.conversions || 0}</p>
                  <p className="text-white/60">Lead Conversions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devon" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Devon - Practice Development</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">{agentMetrics?.devon?.consultations || 0}</p>
                  <p className="text-white/60">Consultations Automated</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">{agentMetrics?.devon?.caseAcceptance || 0}%</p>
                  <p className="text-white/60">Case Acceptance Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">{agentMetrics?.devon?.financing || 0}</p>
                  <p className="text-white/60">Financing Offers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alma" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Alma - Training & SOPs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-400">{agentMetrics?.alma?.trainings || 0}</p>
                  <p className="text-white/60">Trainings Delivered</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-400">{agentMetrics?.alma?.sops || 0}</p>
                  <p className="text-white/60">SOPs Triggered</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-400">{agentMetrics?.alma?.certifications || 0}</p>
                  <p className="text-white/60">Certifications Issued</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAgents;
