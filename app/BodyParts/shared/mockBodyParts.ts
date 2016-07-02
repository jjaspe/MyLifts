import {BodyPart} from "./BodyPart"
import {ChestExercises,BackExercises,LegExercises,BicepsExercises} from "../../Exercises/index"
export var MockBodyParts: BodyPart[]=[
    {"Id": 1, Name:'Chest', Exercises : ChestExercises},
    {"Id": 2, Name: 'Back' , Exercises : BackExercises},
    {"Id": 3, Name: 'Biceps', Exercises : BicepsExercises},
    {"Id": 4, Name: 'Triceps', Exercises : []},
    {"Id": 5, Name: 'Abs', Exercises : []},
    {"Id": 6, Name: 'Legs', Exercises : LegExercises}
]