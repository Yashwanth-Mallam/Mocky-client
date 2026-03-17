"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Brain,
  BarChart3,
  Target,
  Users,
  Star,
  PlayCircle,
  CheckCircle,
} from "lucide-react";
import { Footer } from "@/components/footer";
// import { use } from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <header className="w-full px-6 py-4 flex justify-between items-center shadow-sm fixed top-0 left-0 bg-white dark:bg-gray-900 z-50">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text ml-20 text-transparent"
        >
          <Image
            src="/mockinterviewlogo.png"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
        </Link>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <Link href="/auth/signin">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-gray-800"
            >
              Login
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
              Start your free journey with mockyy
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Trusted by 10,000+ professionals
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Master Your Next Interview with AI.
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Practice with our AI-powered interview coach. Get real-time
            feedback, detailed analysis, and personalized recommendations to ace
            any interview.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/signup">
              <Button size="lg" className="px-8 py-4 text-lg">
                <PlayCircle className="w-5 h-5 mr-2" />
                Start Free Interview
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                View Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Hero Image Placeholder */}
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 mx-auto max-w-4xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <Badge>Live Interview</Badge>
              </div>
              <div className="text-left space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>AI Interviewer:</strong> Tell me about a challenging
                    project you&apos;ve worked on recently.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>You:</strong> I led the development of a real-time
                    analytics dashboard...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive interview preparation powered by advanced AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>AI-Powered Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Dynamic questions tailored to your role, experience level, and
                  industry
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive feedback on technical skills, communication, and
                  problem-solving
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Personalized Coaching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Custom improvement suggestions and practice recommendations
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor your improvement over time with detailed dashboards
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of professionals who&apos;ve improved their
              interview skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                <CardDescription>Software Engineer at Google</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The AI feedback was incredibly detailed and helped me identify
                  areas I never knew I needed to improve. Landed my dream job!
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardTitle className="text-lg">Michael Chen</CardTitle>
                <CardDescription>Product Manager at Microsoft</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The progress tracking feature showed me exactly how I was
                  improving. The personalized coaching made all the difference.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardTitle className="text-lg">Emily Rodriguez</CardTitle>
                <CardDescription>Data Scientist at Netflix</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  &quot;The variety of questions and real-time analysis helped
                  me practice scenarios I wouldn&apos;t have thought of. Highly
                  recommend!&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r bg-gray-800  dark:text-gray-300 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who&apos;ve improved their interview
            skills with our AI coach
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-4 text-lg"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Start Free Interview
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-4 text-lg"
              >
                Create Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm opacity-75">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Free to start
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Instant feedback
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
