import {Workout} from "../../Workout/index"

export class User{
    Id:number;
    FirstName:string;
    LastName:string;
    Name:string;
    UserName:string;
    Workouts:Workout[]=[];
}