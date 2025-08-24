"use client";

import Link from "next/link";
import { useState } from "react";
import { Mic, Bot, Users, User, Rocket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import clsx from "clsx";

export default function HomePage() {
  const [favorites, setFavorites] = useState({
    mock: false,
    group: false,
    mentor: false,
  });

  const handleFavorite = (key: keyof typeof favorites) => {
    setFavorites((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const cardClass = (glow: boolean) =>
    clsx(
      "relative group transition-all cursor-default hover:shadow-xl hover:scale-[1.02]",
      {
        "ring-2 ring-yellow-400 ring-offset-2 animate-glow animate-card-shine":
          glow,
      }
    );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Header />

      <main className="flex-1 p-8 pt-20 max-w-7xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Rocket className="w-4 h-4 mr-2" /> Welcome to Mockyy
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Your Interview Preparation Platform
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Practice JAM sessions, take mock interviews with AI, and join
            upcoming group discussions and mentoring programs — all in one
            place.
          </p>
        </section>

        {/* Feature Cards */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* JAM Sessions */}
          <Link href="/jam-session">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Mic className="w-10 h-10 text-blue-600 mb-3" />
                <CardTitle>JAM Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Jump into Just-A-Minute sessions and improve your
                  articulation.
                </CardDescription>
                <Button className="w-full">Practice</Button>
              </CardContent>
            </Card>
          </Link>

          {/* Mock Interviews */}
          <Card>
            <CardHeader>
              <Bot className="w-10 h-10 text-purple-600 mb-3 " />
              <CardTitle>Mock Interviews with AI</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Coming soon: Simulate real interviews with AI-generated
                questions and feedback.
              </CardDescription>
              <Button
                variant="ghost"
                disabled
                className="w-full text-yellow-600 border border-yellow-400 bg-yellow-100 hover:bg-yellow-200 relative animate-shine"
              >
                <Star
                  onClick={() => handleFavorite("mock")}
                  className={clsx(
                    "w-4 h-4 mr-2 transition-transform duration-500 cursor-pointer",
                    {
                      "text-yellow-500 rotate-180 animate-favorite":
                        favorites.mock,
                    }
                  )}
                />
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {/* Group Discussions */}
          <Card className={cardClass(favorites.group)}>
            <CardHeader>
              <Users className="w-10 h-10 text-green-600 mb-3" />
              <CardTitle>Group Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Coming soon: Join real-time discussions with peers and learn
                collaboration skills.
              </CardDescription>
              <Button
                variant="ghost"
                disabled
                className="w-full text-yellow-600 border border-yellow-400 bg-yellow-100 hover:bg-yellow-200 relative animate-shine"
              >
                <Star
                  onClick={() => handleFavorite("group")}
                  className={clsx(
                    "w-4 h-4 mr-2 transition-transform duration-500 cursor-pointer",
                    {
                      "text-yellow-500 rotate-180 animate-favorite":
                        favorites.group,
                    }
                  )}
                />
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {/* Personal Mentoring */}
          <Card className={cardClass(favorites.mentor)}>
            <CardHeader>
              <User className="w-10 h-10 text-orange-600 mb-3" />
              <CardTitle>Personal Mentoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Coming soon: Get 1-on-1 guidance from industry experts.
              </CardDescription>
              <Button
                variant="ghost"
                disabled
                className="w-full text-yellow-600 border border-yellow-400 bg-yellow-100 hover:bg-yellow-200 relative animate-shine"
              >
                <Star
                  onClick={() => handleFavorite("mentor")}
                  className={clsx(
                    "w-4 h-4 mr-2 transition-transform duration-500 cursor-pointer",
                    {
                      "text-yellow-500 rotate-180 animate-favorite":
                        favorites.mentor,
                    }
                  )}
                />
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
