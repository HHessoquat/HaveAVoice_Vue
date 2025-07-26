import type Vote from './Vote/Vote';

export default interface Choice {
  id:number;
  name:String;
  picture:String;
  color:String;
  description:String;
  votes:Vote[];
}
