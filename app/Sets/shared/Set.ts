import {Detail} from "../index"
import {Exercise} from "../../Exercises/index"

export class Set{
    exercise:Exercise;
    WorkoutId:number;
    Number:number=1;
    Weight:number=0;
    Reps:number=0;
    Details:Detail[]=[];
}