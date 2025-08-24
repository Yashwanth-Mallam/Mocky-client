"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, StopCircle, Timer, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { sendAudioToServer } from "@/lib/api/audioapi";

export default function JamSessionPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const chunks = useRef<Blob[]>([]);

  // Timer countdown logic
  useEffect(() => {
    if (isRecording && seconds > 0) {
      const timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (seconds === 0 && isRecording) {
      stopRecording();
    }
  }, [seconds, isRecording]);

  // Start recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    setIsRecording(true);
    setSeconds(60);
    chunks.current = [];

    recorder.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      setAudioBlob(blob);
      setAnalysisResult("Analyzing your audio...");

      try {
        const file = new File([blob], "recording.webm", {
          type: "audio/webm",
          lastModified: Date.now(),
        });
        const response = await sendAudioToServer(file);
        setAnalysisResult(`🧠 AI Analysis: ${response.transcript}`);
      } catch (error) {
        console.error("Upload failed:", error);
        setAnalysisResult("❌ Failed to analyze your audio. Please try again.");
      }
    };

    recorder.start();
  };

  // Stop recording manually or automatically
  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder?.stop();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Header />

      <main className="max-w-4xl mx-auto p-6 pt-24">
        <section className="text-center mb-10">
          <Badge variant="secondary" className="px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            JAM Session Practice
          </Badge>
          <h2 className="text-3xl font-bold mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Speak for a Minute. Get AI Feedback.
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Click below to start speaking. Improve your articulation and remove
            filler words!
          </p>
        </section>

        <Card className="text-center shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Timer className="w-6 h-6 text-yellow-500" />
              {isRecording ? `${seconds}s left` : "Ready to Record"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isRecording ? (
              <Button
                onClick={stopRecording}
                className="bg-red-600 hover:bg-red-700 text-white mt-4"
              >
                <StopCircle className="w-5 h-5 mr-2" />
                Stop Recording
              </Button>
            ) : (
              <Button
                onClick={startRecording}
                className="bg-green-600 hover:bg-green-700 text-white mt-4"
              >
                <Mic className="w-5 h-5 mr-2" />
                Start Recording
              </Button>
            )}
          </CardContent>
        </Card>

        {audioBlob && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>🔊 Your Recording</CardTitle>
              <CardDescription>
                Play your JAM session and review AI feedback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <audio
                controls
                src={URL.createObjectURL(audioBlob)}
                className="w-full mb-4"
              />
              <div className="p-4 bg-yellow-50 border border-yellow-300 rounded text-yellow-900">
                {analysisResult || "Analyzing your audio..."}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
