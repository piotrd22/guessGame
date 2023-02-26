export interface User {
  ID: number;
  Name: string;
  Tries: number;
  NumToGuess: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  IsGuessed: boolean;
}
