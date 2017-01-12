import {Set,SetGroup} from "../../Sets/index"

export class Workout {
    Id:number;
    userId:number;
    //sets:Set[]=[];
    setGroups:SetGroup[]=[];
    workoutDate:Date;
    duration:number=0;
}