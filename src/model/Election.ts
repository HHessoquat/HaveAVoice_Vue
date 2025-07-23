
import type Choice from './Choice';
import type User from "./User.ts";

export default interface Election {
  id:number;
  name:string;
  dateCreated: Date;
  dateStart: Date;
  dateEnd: Date;
  organizer: User;
  choices: Choice[];
}
