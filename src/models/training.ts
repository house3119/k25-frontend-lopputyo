export type Training = {
  activity: string;
  duration: number;
  date: Date;
  customerFirstName: string;
  customerLastName: string;
  links: {
    self: string;
    customer: string;
  }
}