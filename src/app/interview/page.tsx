"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Play,
  Pause,
  RotateCcw,
  // Send,
  Clock,
  MessageCircle,
  Brain,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { Header } from "@/components/header";
import Link from "next/link";
import { toast } from "sonner";
const mockQuestions = [
  {
    id: 1,
    category: "Technical",
    question:
      "Tell me about a challenging technical problem you've solved recently. Walk me through your approach and the technologies you used.",
    difficulty: "Medium",
  },
  {
    id: 2,
    category: "Behavioral",
    question:
      "Describe a time when you had to work with a difficult team member. How did you handle the situation?",
    difficulty: "Easy",
  },
  {
    id: 3,
    category: "Problem Solving",
    question:
      "How would you design a system to handle one million concurrent users? What are the key considerations?",
    difficulty: "Hard",
  },
  {
    id: 4,
    category: "Communication",
    question:
      "Explain a complex technical concept as if you were speaking to a non-technical stakeholder.",
    difficulty: "Medium",
  },
  {
    id: 5,
    category: "Project Management",
    question:
      "Tell me about a project you led. What challenges did you face, and how did you overcome them?",
    difficulty: "Medium",
  },
];

export default function InterviewPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startInterview = () => {
    setIsInterviewStarted(true);
    setIsRecording(true);
    toast.success("Interview started! Good luck!");
  };

  const pauseResume = () => {
    setIsRecording(!isRecording);
    toast.info(isRecording ? "Interview paused" : "Interview resumed");
  };

  const nextQuestion = () => {
    if (userAnswer.trim()) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = userAnswer;
      setAnswers(newAnswers);
      setUserAnswer("");

      if (currentQuestion < mockQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Interview complete
        setIsInterviewComplete(true);
        setIsRecording(false);
        toast.success("Interview completed! Redirecting to analysis...");
        setTimeout(() => {
          // In a real app, navigate to analysis page
          window.location.href = "/analysis";
        }, 2000);
      }
    } else {
      toast.error("Please provide an answer before proceeding");
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setUserAnswer(answers[currentQuestion - 1] || "");
    }
  };

  const resetInterview = () => {
    setCurrentQuestion(0);
    setIsRecording(false);
    setTimeElapsed(0);
    setUserAnswer("");
    setAnswers([]);
    setIsInterviewStarted(false);
    setIsInterviewComplete(false);
    toast.info("Interview reset");
  };

  if (!isInterviewStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <Header />

        <div className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">AI Mock Interview</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Practice with our AI interviewer and get detailed feedback on
                your performance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                    Interview Format
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• 5 carefully selected questions</li>
                    <li>• Mix of technical and behavioral questions</li>
                    <li>• 3-5 minutes per question recommended</li>
                    <li>• Real-time AI analysis of your responses</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-green-600" />
                    What You&apos;ll Get
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Detailed performance analysis</li>
                    <li>• Communication skills assessment</li>
                    <li>• Technical competency evaluation</li>
                    <li>• Personalized improvement suggestions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Interview Questions Preview</CardTitle>
                <CardDescription>
                  Here&apos;s what you can expect during your interview session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockQuestions.map((q, index) => (
                    <div
                      key={q.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline">{q.category}</Badge>
                          <Badge
                            variant={
                              q.difficulty === "Easy"
                                ? "default"
                                : q.difficulty === "Medium"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {q.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Question {index + 1}:{" "}
                          {q.question.length > 100
                            ? q.question.substring(0, 100) + "..."
                            : q.question}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                size="lg"
                onClick={startInterview}
                className="px-8 py-4 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Interview
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Make sure you&apos;re in a quiet environment and have about
                20-30 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isInterviewComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
        <Header />

        <div className="pt-20 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Interview Complete!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Great job! We&apos;re analyzing your responses and preparing
              detailed feedback.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
              <h3 className="text-lg font-semibold mb-4">Session Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Total Time:</span>
                  <span className="ml-2 font-semibold">
                    {formatTime(timeElapsed)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Questions Answered:</span>
                  <span className="ml-2 font-semibold">
                    {mockQuestions.length}
                  </span>
                </div>
              </div>
            </div>
            <Link href="/analysis">
              <Button size="lg" className="px-8 py-4 text-lg">
                View Analysis & Feedback
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Header />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Interview Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-semibold">
                      {formatTime(timeElapsed)}
                    </span>
                  </div>
                  <Badge variant={isRecording ? "default" : "secondary"}>
                    {isRecording ? "Recording" : "Paused"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={pauseResume}>
                    {isRecording ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    {isRecording ? "Pause" : "Resume"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetInterview}>
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Question {currentQuestion + 1} of {mockQuestions.length}
                </span>
                <Progress
                  value={((currentQuestion + 1) / mockQuestions.length) * 100}
                  className="w-1/3"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Question Panel */}
            <Card className="h-fit">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-blue-600" />
                    AI Interviewer
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Badge variant="outline">
                      {mockQuestions[currentQuestion].category}
                    </Badge>
                    <Badge
                      variant={
                        mockQuestions[currentQuestion].difficulty === "Easy"
                          ? "default"
                          : mockQuestions[currentQuestion].difficulty ===
                            "Medium"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {mockQuestions[currentQuestion].difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
                  <p className="text-lg leading-relaxed">
                    {mockQuestions[currentQuestion].question}
                  </p>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <p>
                    <span className="font-semibold">💡 Tip:</span> Take your
                    time to think before answering
                  </p>
                  <p>
                    <span className="font-semibold">⏱️ Recommended time:</span>{" "}
                    3-5 minutes
                  </p>
                  <p>
                    <span className="font-semibold">🎯 Focus on:</span>{" "}
                    Structure, examples, and clear communication
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Answer Panel */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Your Response</CardTitle>
                <CardDescription>
                  Provide a detailed answer to the question above
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type your answer here... Be specific and provide examples where possible."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="min-h-[300px] mb-4"
                />

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={previousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      onClick={nextQuestion}
                      disabled={!userAnswer.trim()}
                    >
                      {currentQuestion === mockQuestions.length - 1 ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete Interview
                        </>
                      ) : (
                        <>
                          Next Question
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {userAnswer.length} characters
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
