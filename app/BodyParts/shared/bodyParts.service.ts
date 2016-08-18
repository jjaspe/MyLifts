import { ExerciseService} from "../../Exercises/shared/exercise.service"
import { BodyPart} from "./BodyPart";
import { Http, Response } from '@angular/http';
import { Injectable} from "@angular/core";
import { Observable }  from 'rxjs/Rx';
import { SessionService } from '../../Session/index'

@Injectable()
export class BodyPartService {
    url: string = "/Bodyparts";
    bodyParts: BodyPart[] = []
    constructor(private exerciseService: ExerciseService, private http: Http, private sessionService: SessionService) {

    }

    initUrls() {
        this.url = this.sessionService.session.ApiUrl + this.url;
        this.getBodyParts().subscribe(n => this.bodyParts);
    }

    getBodyParts(): Observable<BodyPart[]> {
        return this.http.get(this.url).map(this.extractBodyPartData.bind(this)).catch(this.handleError);
    }

    extractBodyPartData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private getExercises(exerciseIds: number[]) {
        let exercises = [];
        if (exerciseIds)
            exerciseIds.forEach(n => this.exerciseService.getExercise(n)
                .then(m => exercises.push(m)));
        return exercises;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    getMockBodyParts() {
        return [];
    }

    getExercisesFromBodyPart(bodypart: BodyPart) {
        if (bodypart)
            return this.bodyParts.filter(n => n.Id === bodypart.Id)[0].exercises;
    }
}

