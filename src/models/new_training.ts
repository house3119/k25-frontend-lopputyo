export type NewTraining = {
  activity: string;
  duration: number | null;
  date: Date | null;
  customer: string;
}

export const emptyNewTraining:NewTraining = {
  activity: '',
  duration: 0,
  date: null,
  customer: ''
}

export interface NewTrainingProps {
  getTrainingData: () => void;
}
