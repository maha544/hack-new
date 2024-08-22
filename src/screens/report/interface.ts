export interface Report {
    id: string;
    type: 'occupancy' | 'revenue'; 
    title: string;
    content: string; 
    generatedAt: string;
  }
  