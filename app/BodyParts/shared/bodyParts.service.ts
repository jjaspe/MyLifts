import {BodyPart,MockBodyParts} from "../index" 
import {Injectable} from "@angular/core"

@Injectable()
export class BodyPartService{
    getBodyParts(){
        return MockBodyParts;
    }
        
    getExercisesFromBodyPart(bodypart:BodyPart){
        if(bodypart)
            return MockBodyParts.filter(n=>n.id===bodypart.id)[0].exercises;
    }
}

