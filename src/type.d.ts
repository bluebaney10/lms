export interface User {
  id: string;
  name?: string;
  email: string;
}

export interface Course {
  _id?: string;
  title: string;
  description: string;
  content: string;
  user: string;
}
