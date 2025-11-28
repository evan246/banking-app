export interface MicroHabit {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  points: number;
  type: 'save' | 'avoid' | 'track' | 'learn';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
}

export interface CoachStats {
  totalPoints: number;
  streak: number;
  level: number;
  badges: Badge[];
}
