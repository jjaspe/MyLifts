import { Exercise} from './Exercise'
import { BodyPart } from '../../BodyParts/index'

export class ExerciseWithBodyParts{
    Id:number;
    Name:string;
    bodyparts:BodyPart[]=[];
}