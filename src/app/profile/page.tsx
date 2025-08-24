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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  // Mail,
  // Building,
  MapPin,
  Upload,
  Settings,
  Bell,
  // Shield,
  // Download,
  // Eye,
  // Trash2,
} from "lucide-react";
import { Header } from "@/components/header";
import { toast } from "sonner";
import { updateProfileApi } from "@/lib/api/pofileapi"; // Adjust the import path as needed

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    company: string;
    position: string;
    location: string;
    bio: string;
    skills: string[];
    experience: string;
    interviewFocus: string[];
    notifications: {
      email: boolean;
      push: boolean;
      reminders: boolean;
    };
    privacy: {
      profileVisible: boolean;
      shareProgress: boolean;
    };
  }>({
    name: "",
    email: "",
    company: "",
    position: "",
    location: "",
    bio: "",
    skills: [],
    experience: "",
    interviewFocus: [],
    notifications: {
      email: true,
      push: false,
      reminders: true,
    },
    privacy: {
      profileVisible: true,
      shareProgress: false,
    },
  });

  const handleSave = async () => {
    try {
      await updateProfileApi(profile); // or createProfile(profile) for new profiles
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleSkillAdd = async () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      const updatedSkills = [...profile.skills, newSkill];
      setProfile((prev) => ({ ...prev, skills: updatedSkills }));

      try {
        await updateProfileApi({ ...profile, skills: updatedSkills });
        toast.success(`Added skill: ${newSkill}`);
        setNewSkill(""); // clear input
      } catch (error) {
        console.error("Error adding skill:", error);
        toast.error("Failed to update skills.");
      }
    }
  };

  const handleSkillRemove = async (skillToRemove: string) => {
    const updatedSkills = profile.skills.filter(
      (skill) => skill !== skillToRemove
    );
    setProfile((prev) => ({ ...prev, skills: updatedSkills }));

    try {
      await updateProfileApi({ ...profile, skills: updatedSkills });
      toast.success(`Removed skill: ${skillToRemove}`);
    } catch (error) {
      console.error("Error removing skill:", error);
      toast.error("Failed to update skills.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Header />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Profile</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage
                      src="/api/placeholder/150/150"
                      alt={profile.name}
                    />
                    <AvatarFallback className="text-xl">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {isEditing && (
                    <Button variant="outline" size="sm" className="mb-4">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                  )}

                  <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {profile.position}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                    {profile.company}
                  </p>

                  <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profile.location}
                  </div>

                  <Separator className="my-4" />

                  <div className="text-left">
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {profile.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                          {isEditing && (
                            <button
                              onClick={() => handleSkillRemove(skill)}
                              className="ml-1 hover:text-red-600"
                            >
                              ×
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>

                    {isEditing && (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add a skill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleSkillAdd();
                            }
                          }}
                          className="border rounded px-2 py-1 text-sm w-full"
                        />
                        <Button onClick={handleSkillAdd}>Add</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total Interviews
                      </span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Average Score
                      </span>
                      <span className="font-semibold">83/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Best Category
                      </span>
                      <span className="font-semibold">Communication</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Member Since
                      </span>
                      <span className="font-semibold">Jan 2024</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4 m">
                    <div>
                      <Label htmlFor="name">Full Name :</Label>
                      <Input
                        id="name"
                        className="mt-2"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email :</Label>
                      <Input
                        id="email"
                        className="mt-2"
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company :</Label>
                      <Input
                        id="company"
                        className="mt-2"
                        value={profile.company}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position :</Label>
                      <Input
                        id="position"
                        className="mt-2"
                        value={profile.position}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            position: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location :</Label>
                    <Input
                      id="location"
                      className="mt-2"
                      value={profile.location}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio :</Label>
                    <Textarea
                      id="bio"
                      className="mt-2"
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, bio: e.target.value }))
                      }
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Interview Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Interview Preferences</CardTitle>
                  <CardDescription>
                    Customize your interview experience and focus areas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="experience" className="mb-2">
                      Experience Level
                    </Label>
                    <Select
                      value={profile.experience}
                      onValueChange={(value) =>
                        setProfile((prev) => ({ ...prev, experience: value }))
                      }
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2 years">0-2 years</SelectItem>
                        <SelectItem value="3-5 years">3-5 years</SelectItem>
                        <SelectItem value="5-7 years">5-7 years</SelectItem>
                        <SelectItem value="7+ years">7+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Interview Focus Areas</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[
                        "Technical",
                        "System Design",
                        "Behavioral",
                        "Leadership",
                        "Communication",
                        "Problem Solving",
                      ].map((area) => (
                        <Badge
                          key={area}
                          variant={
                            profile.interviewFocus.includes(area)
                              ? "default"
                              : "outline"
                          }
                          className={`cursor-pointer ${
                            isEditing
                              ? "hover:bg-blue-100 dark:hover:bg-blue-900"
                              : ""
                          }`}
                          onClick={() => {
                            if (isEditing) {
                              const newFocus = profile.interviewFocus.includes(
                                area
                              )
                                ? profile.interviewFocus.filter(
                                    (f) => f !== area
                                  )
                                : [...profile.interviewFocus, area];
                              setProfile((prev) => ({
                                ...prev,
                                interviewFocus: newFocus,
                              }));
                            }
                          }}
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications
                  </CardTitle>
                  <CardDescription>
                    Manage how you receive updates and reminders
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive interview reminders and progress updates
                      </p>
                    </div>
                    <Switch
                      checked={profile.notifications.email}
                      onCheckedChange={(checked) =>
                        setProfile((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            email: checked,
                          },
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Get notified about new features and updates
                      </p>
                    </div>
                    <Switch
                      checked={profile.notifications.push}
                      onCheckedChange={(checked) =>
                        setProfile((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            push: checked,
                          },
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Interview Reminders</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Reminders to practice and maintain consistency
                      </p>
                    </div>
                    <Switch
                      checked={profile.notifications.reminders}
                      onCheckedChange={(checked) =>
                        setProfile((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            reminders: checked,
                          },
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy & Security */}
              {/* <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription>
                    Control your privacy settings and account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Public Profile</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Make your profile visible to other users
                      </p>
                    </div>
                    <Switch
                      checked={profile.privacy.profileVisible}
                      onCheckedChange={(checked) =>
                        setProfile((prev) => ({
                          ...prev,
                          privacy: { ...prev.privacy, profileVisible: checked },
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Share Progress</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Allow others to see your interview progress
                      </p>
                    </div>
                    <Switch
                      checked={profile.privacy.shareProgress}
                      onCheckedChange={(checked) =>
                        setProfile((prev) => ({
                          ...prev,
                          privacy: { ...prev.privacy, shareProgress: checked },
                        }))
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download Your Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Eye className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
