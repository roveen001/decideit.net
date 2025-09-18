export type Vote = {
  for: number;
  against: number;
};

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
}

export type Comment = {
  id: string;
  text: string;
  author: User;
  createdAt: string;
  votes: Vote;
  replies?: Comment[];
};

export interface Topic {
  id: string;
  title: string;
  description: string;
  category: string;
  scope: 'global' | 'country';
  country?: string;
  votes: Vote;
  createdAt: string; // Using string for simplicity, can be Date object
  author: User;
  comments: Comment[];
}
