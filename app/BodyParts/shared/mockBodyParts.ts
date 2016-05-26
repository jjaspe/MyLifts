import {BodyPart} from "../index"
import {ChestExercises,BackExercises,LegExercises,BicepsExercises} from "../../Exercises/index"
export var MockBodyParts: BodyPart[]=[
    {"id": 1, name:'Chest', exercises : ChestExercises},
    {"id": 2, name: 'Back' , exercises : BackExercises},
    {"id": 3, name: 'Biceps', exercises : BicepsExercises},
    {"id": 4, name: 'Triceps', exercises : []},
    {"id": 5, name: 'Abs', exercises : []},
    {"id": 6, name: 'Legs', exercises : LegExercises}
]