import { Set,SetGroup } from "../index"
import {BackExercises,ChestExercises,LegExercises} from "../../Exercises/index"

export var MockSets:Set[] = [
    {WorkoutId:0,exercise:BackExercises[0],Reps:6,Number:1,Weight:180,Details:[]},
    {WorkoutId:0,exercise:BackExercises[0],Reps:6,Number:2,Weight:180,Details:[]}
]

export var MockSetGroups:SetGroup[] = [
    {exercise:BackExercises[0],Sets:MockSets}
]