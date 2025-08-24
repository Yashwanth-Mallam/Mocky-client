"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  TrendingUp,
  Calendar as CalendarIcon,
  Play,
  BarChart3,
  Target,
  Trophy,
  Clock,
  Filter,
  Eye,
} from "lucide-react";
import { Header } from "@/components/header";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format } from "date-fns";

const performanceTrend = [
  {
    date: "2024-01-15",
    overall: 75,
    technical: 72,
    communication: 78,
    behavioral: 76,
  },
  {
    date: "2024-01-22",
    overall: 78,
    technical: 76,
    communication: 80,
    behavioral: 78,
  },
  {
    date: "2024-01-29",
    overall: 82,
    technical: 80,
    communication: 85,
    behavioral: 81,
  },
  {
    date: "2024-02-05",
    overall: 85,
    technical: 83,
    communication: 88,
    behavioral: 84,
  },
  {
    date: "2024-02-12",
    overall: 83,
    technical: 85,
    communication: 92,
    behavioral: 88,
  },
];

const interviewHistory = [
  {
    id: 1,
    date: "2024-02-12",
    type: "Full Stack Developer",
    duration: "28 min",
    score: 83,
    status: "completed",
    categories: {
      technical: 85,
      communication: 92,
      behavioral: 88,
      problemSolving: 78,
    },
  },
  {
    id: 2,
    date: "2024-02-05",
    type: "Senior Engineer",
    duration: "32 min",
    score: 85,
    status: "completed",
    categories: {
      technical: 83,
      communication: 88,
      behavioral: 84,
      problemSolving: 85,
    },
  },
  {
    id: 3,
    date: "2024-01-29",
    type: "Tech Lead",
    duration: "35 min",
    score: 82,
    status: "completed",
    categories: {
      technical: 80,
      communication: 85,
      behavioral: 81,
      problemSolving: 82,
    },
  },
  {
    id: 4,
    date: "2024-01-22",
    type: "Software Engineer",
    duration: "25 min",
    score: 78,
    status: "completed",
    categories: {
      technical: 76,
      communication: 80,
      behavioral: 78,
      problemSolving: 77,
    },
  },
];

const skillDistribution = [
  { name: "Technical", value: 85, color: "#3B82F6" },
  { name: "Communication", value: 92, color: "#10B981" },
  { name: "Behavioral", value: 88, color: "#8B5CF6" },
  { name: "Problem Solving", value: 78, color: "#F59E0B" },
];

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [timeFilter, setTimeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { variant: "default" as const, text: "Excellent" };
    if (score >= 80) return { variant: "default" as const, text: "Good" };
    if (score >= 70) return { variant: "secondary" as const, text: "Fair" };
    return { variant: "destructive" as const, text: "Needs Work" };
  };

  const currentScore = interviewHistory[0]?.score || 0;
  const averageScore = Math.round(
    interviewHistory.reduce((acc, interview) => acc + interview.score, 0) /
      interviewHistory.length
  );
  const totalInterviews = interviewHistory.length;
  const totalTime = interviewHistory.reduce((acc, interview) => {
    const minutes = parseInt(interview.duration.split(" ")[0]);
    return acc + minutes;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Header />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Track your interview progress and performance
              </p>
            </div>
            <Link href="/interview">
              <Button size="lg">
                <Play className="w-5 h-5 mr-2" />
                New Interview
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Latest Score
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentScore}/100</div>
                <p className="text-xs text-muted-foreground">
                  +5 from previous interview
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Score
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageScore}/100</div>
                <p className="text-xs text-muted-foreground">
                  Across {totalInterviews} interviews
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Interviews
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalInterviews}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Practice Time
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.floor(totalTime / 60)}h {totalTime % 60}m
                </div>
                <p className="text-xs text-muted-foreground">
                  Total practice time
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">Interview History</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Performance Trend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                      Performance Trend
                    </CardTitle>
                    <CardDescription>
                      Your interview scores over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) =>
                            format(new Date(value), "MMM dd")
                          }
                        />
                        <YAxis domain={[60, 100]} />
                        <Tooltip
                          labelFormatter={(value) =>
                            format(new Date(value), "MMM dd, yyyy")
                          }
                        />
                        <Line
                          type="monotone"
                          dataKey="overall"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="technical"
                          stroke="#10B981"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                        <Line
                          type="monotone"
                          dataKey="communication"
                          stroke="#8B5CF6"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Skills Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Distribution</CardTitle>
                    <CardDescription>
                      Current performance across different areas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={skillDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {skillDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {skillDistribution.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center space-x-2"
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: skill.color }}
                          />
                          <span className="text-sm">
                            {skill.name}: {skill.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Interviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Interviews</CardTitle>
                  <CardDescription>
                    Your latest interview sessions and scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {interviewHistory.slice(0, 3).map((interview) => (
                      <div
                        key={interview.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold">{interview.type}</h4>
                            <Badge {...getScoreBadge(interview.score)}>
                              {getScoreBadge(interview.score).text}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>
                              {format(new Date(interview.date), "MMM dd, yyyy")}
                            </span>
                            <span>{interview.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`text-2xl font-bold ${getScoreColor(
                              interview.score
                            )}`}
                          >
                            {interview.score}
                          </span>
                          <Link href="/analysis">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4" />
                      <span className="text-sm font-medium">Filters:</span>
                    </div>

                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All time</SelectItem>
                        <SelectItem value="week">This week</SelectItem>
                        <SelectItem value="month">This month</SelectItem>
                        <SelectItem value="quarter">This quarter</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="behavioral">Behavioral</SelectItem>
                        <SelectItem value="system-design">
                          System Design
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {selectedDate
                            ? format(selectedDate, "MMM dd, yyyy")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardContent>
              </Card>

              {/* Interview History List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Interviews</CardTitle>
                  <CardDescription>
                    Complete history of your interview sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {interviewHistory.map((interview) => (
                      <div
                        key={interview.id}
                        className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">
                              {interview.type}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                              <span>
                                {format(
                                  new Date(interview.date),
                                  "MMM dd, yyyy"
                                )}
                              </span>
                              <span>{interview.duration}</span>
                              <Badge {...getScoreBadge(interview.score)}>
                                {getScoreBadge(interview.score).text}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-3xl font-bold ${getScoreColor(
                                interview.score
                              )} mb-2`}
                            >
                              {interview.score}/100
                            </div>
                            <Link href="/analysis">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                View Analysis
                              </Button>
                            </Link>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(interview.categories).map(
                            ([category, score]) => (
                              <div key={category} className="text-center">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 capitalize">
                                  {category.replace(/([A-Z])/g, " $1").trim()}
                                </div>
                                <div
                                  className={`text-lg font-semibold ${getScoreColor(
                                    score
                                  )}`}
                                >
                                  {score}/100
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Performance Area Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Performance Analytics</CardTitle>
                  <CardDescription>
                    Deep dive into your performance metrics over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={performanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) =>
                          format(new Date(value), "MMM dd")
                        }
                      />
                      <YAxis domain={[60, 100]} />
                      <Tooltip
                        labelFormatter={(value) =>
                          format(new Date(value), "MMM dd, yyyy")
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="communication"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="technical"
                        stackId="1"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="behavioral"
                        stackId="1"
                        stroke="#8B5CF6"
                        fill="#8B5CF6"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Analytics Summary */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Improvement Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      +12%
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Average score improvement over the last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Strongest Skill</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      Communication
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      92% average score in communication skills
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Focus Area</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      Problem Solving
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Biggest opportunity for improvement
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
