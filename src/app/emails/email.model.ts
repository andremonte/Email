// responsible to ditact how the object email is.
export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  archive: boolean;
  enviada: boolean;
}
