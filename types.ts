
export interface Photo {
  url: string; // base64 string
  comment: string;
}

export interface Activity {
  id: number;
  name: string;
  dueDate: string;
  completed: boolean;
  photos: Photo[];
}

export interface Phase {
  id: number;
  name: string;
  activities: Activity[];
  percentageWeight: number;
}

export interface ProjectDetails {
    address: string;
    client: string;
}
