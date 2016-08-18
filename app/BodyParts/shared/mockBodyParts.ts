import {BodyPart} from "./BodyPart"
import {ChestExercises,BackExercises,LegExercises,BicepsExercises} from "../../Exercises/index"
export var MockBodyParts: BodyPart[]=[
    {"Id": 1, Name:'Chest', exercises : ChestExercises},
    {"Id": 2, Name: 'Back' , exercises : BackExercises},
    {"Id": 3, Name: 'Biceps', exercises : BicepsExercises},
    {"Id": 4, Name: 'Triceps', exercises : []},
    {"Id": 5, Name: 'Abs', exercises : []},
    {"Id": 6, Name: 'Legs', exercises : LegExercises}
]