import { Set,SetGroup } from "../index"
import {BackExercises,ChestExercises,LegExercises} from "../../Exercises/index"

export var MockSets:Set[] = [
    {workoutId:0,exercise:BackExercises[0],reps:6,number:1,weight:180,details:[]},
    {workoutId:0,exercise:BackExercises[0],reps:6,number:2,weight:180,details:[]}
]

export var MockSetGroups:SetGroup[] = [
    {exercise:BackExercises[0],Sets:MockSets}
]