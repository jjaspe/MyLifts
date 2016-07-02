import {Workout} from "../../Workout/index"

export class User{
    Id:number;
    Name:string;
    UserName:string;
    Workouts:Workout[]=[];
}