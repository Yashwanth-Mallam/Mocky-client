"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  MessageCircle,
  Code,
  Target,
  TrendingUp,
  Award,
  ChevronRight,
  Download,
  Share,
} from "lucide-react";
import { Header } from "@/components/header";
import Link from "next/link";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const performanceData = [
  { category: "Technical Skills", score: 85, maxScore: 100 },
  { category: "Problem Solving", score: 78, maxScore: 100 },
  { category: "Communication", score: 92, maxScore: 100 },
  { category: "Project Discussion", score: 80, maxScore: 100 },
  { category: "Behavioral Response", score: 88, maxScore: 100 },
];

const radarData = [
  { skill: "Technical", A: 85, fullMark: 100 },
  { skill: "Problem Solving", A: 78, fullMark: 100 },
  { skill: "Communication", A: 92, fullMark: 100 },
  { skill: "Leadership", A: 80, fullMark: 100 },
  { skill: "Behavioral", A: 88, fullMark: 100 },
  { skill: "Creativity", A: 75, fullMark: 100 },
];

const questionAnalysis = [
  {
    question:
      "Tell me about a challenging technical problem you've solved recently.",
    category: "Technical",
    score: 85,
    strengths: [
      "Clear problem definition",
      "Structured approach",
      "Good technical depth",
    ],
    improvements: [
      "Could provide more specific metrics",
      "Consider discussing alternative solutions",
    ],
    feedback:
      "Strong technical response with good structure. Your explanation of the problem-solving process was clear and methodical.",
  },
  {
    question:
      "Describe a time when you had to work with a difficult team member.",
    category: "Behavioral",
    score: 88,
    strengths: [
      "Excellent conflict resolution",
      "Professional approach",
      "Clear outcome",
    ],
    improvements: [
      "Could elaborate on prevention strategies",
      "Discuss long-term relationship impact",
    ],
    feedback:
      "Exceptional behavioral response showing maturity and leadership. Your approach to conflict resolution was professional and effective.",
  },
  {
    question:
      "How would you design a system to handle 1 million concurrent users?",
    category: "System Design",
    score: 78,
    strengths: [
      "Good scalability considerations",
      "Mentioned key technologies",
      "Thought about bottlenecks",
    ],
    improvements: [
      "More specific architecture details",
      "Discuss monitoring and observability",
      "Consider cost implications",
    ],
    feedback:
      "Solid system design thinking with good high-level approach. Consider diving deeper into specific architectural components.",
  },
];

export default function AnalysisPage() {
  const overallScore = Math.round(
    performanceData.reduce((acc, item) => acc + item.score, 0) /
      performanceData.length
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Header />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Interview Analysis</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Detailed feedback and insights from your AI interview session
            </p>
          </div>

          {/* Overall Score Card */}
          <Card className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Overall Score: {overallScore}/100
                  </h2>
                  <p className="text-blue-100 text-lg">
                    {getScoreBadge(overallScore)} Performance
                  </p>
                  <div className="flex items-center mt-4 space-x-4">
                    <Button variant="secondary" className="text-blue-600">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-600"
                    >
                      <Share className="w-4 h-4 mr-2" />
                      Share Results
                    </Button>
                  </div>
                </div>
                <div className="text-6xl font-bold opacity-20">
                  {overallScore}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Breakdown */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Performance Radar</CardTitle>
                <CardDescription>
                  Visual representation of your skills across different areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Score"
                      dataKey="A"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Breakdown</CardTitle>
                <CardDescription>
                  Detailed scores for each evaluation category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="category"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <Tabs defaultValue="performance" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="questions">Question Analysis</TabsTrigger>
              <TabsTrigger value="strengths">Strengths</TabsTrigger>
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {performanceData.map((item) => (
                  <Card key={item.category}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{item.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-2xl font-bold ${getScoreColor(
                            item.score
                          )}`}
                        >
                          {item.score}/100
                        </span>
                        <Badge
                          variant={item.score >= 80 ? "default" : "secondary"}
                        >
                          {getScoreBadge(item.score)}
                        </Badge>
                      </div>
                      <Progress value={item.score} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4">
              {questionAnalysis.map((analysis, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          Question {index + 1}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {analysis.question}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{analysis.category}</Badge>
                        <span
                          className={`text-xl font-bold ${getScoreColor(
                            analysis.score
                          )}`}
                        >
                          {analysis.score}/100
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rx-rounded-lg">
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                          AI Feedback
                        </p>
                        <p className="text-blue-700 dark:text-blue-300">
                          {analysis.feedback}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                            ✅ Strengths
                          </h4>
                          <ul className="space-y-1 text-sm">
                            {analysis.strengths.map((strength, i) => (
                              <li
                                key={i}
                                className="text-green-600 dark:text-green-400"
                              >
                                • {strength}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
                            💡 Areas for Improvement
                          </h4>
                          <ul className="space-y-1 text-sm">
                            {analysis.improvements.map((improvement, i) => (
                              <li
                                key={i}
                                className="text-orange-600 dark:text-orange-400"
                              >
                                • {improvement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="strengths" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="text-green-700 dark:text-green-400 flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Communication Excellence
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Your communication skills stood out throughout the
                      interview.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Clear and structured responses
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Excellent use of examples
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Professional tone and language
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      Technical Competency
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Strong technical foundation with practical experience.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Solid understanding of core concepts
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Practical problem-solving approach
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Good grasp of system architecture
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="improvements" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-orange-200 dark:border-orange-800">
                  <CardHeader>
                    <CardTitle className="text-orange-700 dark:text-orange-400 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Priority Improvements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">
                          1. Add More Quantifiable Results
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Include specific metrics and measurable outcomes in
                          your examples to demonstrate impact.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">
                          2. Discuss Alternative Solutions
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Show broader thinking by considering multiple
                          approaches to problems.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="text-purple-700 dark:text-purple-400 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Growth Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">
                          System Design Depth
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Dive deeper into architectural components and
                          trade-offs in system design questions.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">
                          Leadership Examples
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Share more examples of leadership and mentoring
                          experiences.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Items */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Recommended Next Steps
              </CardTitle>
              <CardDescription>
                Personalized recommendations to improve your interview
                performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Practice System Design
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                    Focus on architectural deep-dives and scalability
                    discussions
                  </p>
                  <Link href="/interview">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600 border-blue-600"
                    >
                      Start Practice
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Quantify Your Impact
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                    Prepare examples with specific metrics and measurable
                    results
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-600"
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    Leadership Stories
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">
                    Develop compelling narratives about leadership experiences
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-purple-600 border-purple-600"
                  >
                    Get Tips
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready for Another Round?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Keep practicing to improve your scores and build confidence
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/interview">
                <Button size="lg">
                  <Brain className="w-5 h-5 mr-2" />
                  Take Another Interview
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline">
                  View Dashboard
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
