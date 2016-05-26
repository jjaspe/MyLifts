import {Workout} from "./index"
import {User} from "../User/index"
import { Injectable } from '@angular/core';

@Injectable()
export class WorkoutService {

    constructor() { }
    
    getWorkoutByDate(user:User,date:Date){
        date= date || new Date();
        return Promise.resolve(user.workouts.filter(m=>m.date.getUTCDate()===(date).getUTCDate())[0])
    }

}