import {Set,SetGroup} from "../Sets/index"

export class Workout {
    Id:number;
    UserId:number;
    sets:Set[]=[];
    setGroups:SetGroup[]=[];
    WorkoutDate:Date;
    duration:number=0;
}