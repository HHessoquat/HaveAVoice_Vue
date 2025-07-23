import type User from '../User';
import type Choice from '../Choice';

export default interface Vote {
  id:number;
  date:Date;
  voter: User;
  choice: Choice;
}
