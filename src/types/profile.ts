export interface Notifications {
  email: boolean;
  push: boolean;
  reminders: boolean;
}

export interface Privacy {
  profileVisible: boolean;
  shareProgress: boolean;
}

export interface Profile {
  _id?: string;
  name: string;
  email: string;
  company?: string;
  position?: string;
  location?: string;
  bio?: string;
  skills: string[];
  experience?: string;
  interviewFocus: string[];
  notifications: Notifications;
  privacy: Privacy;
}

export interface CreateProfileData extends Profile {
  password: string; // only needed for create
}
