import {Detail} from "../index"
import {Exercise} from "../../Exercises/index"

export class Set{
    exercise:Exercise;
    workoutId:number;
    number:number=1;
    weight:number=0;
    reps:number=0;
    details:Detail[]=[];
}