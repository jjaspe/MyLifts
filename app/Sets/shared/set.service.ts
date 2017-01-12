import { Injectable } from '@angular/core';
import { Workout } from "../../Workout/Index";
import { Set } from "./index";
import { SetGroup } from "./SetGroup";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable} from "rxjs/Rx";
import { SessionService } from "../../Session/index"
import { HttpService} from "../../Utilities/http.service"

@Injectable()
export class SetService {
    setsUrl: string = "/Sets/";
    constructor(private http: Http, private httpService:HttpService,
        private sessionService: SessionService) { }

    initUrls() {
        this.setsUrl = this.sessionService.session.ApiUrl + this.setsUrl;
    }

    getSetsByWorkout(workout: Workout) {
        let params: URLSearchParams = new URLSearchParams;
        if (workout) {
            params.set("workoutId", workout.Id.toString());

            return this.http.get(
                this.setsUrl, { search: params }).map(this.extractSetsData).catch(this.handleError);
        }
    }

    extractSetsData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error("Error:" + errMsg);
        return Observable.throw(errMsg);
    }

    getSetGroups(sets: Set[]) {
        let setGroups: SetGroup[] = [];
        if (sets) {
            for (var set of sets) {
                let setGroup = setGroups.find(n => n.exercise.Name == set.exercise.Name)
                if (setGroup) {
                    console.log({ExistingSetGroup:setGroup.exercise});
                    setGroup.sets.push(set)
                } else {
                    console.log({NewSetGroup:set.exercise});
                    setGroups.push(
                        { exercise: set.exercise, sets: [set] }
                    )
                }
            }
        }

        return setGroups;
    }

    deleteSet(set: Set) {
        let fullUrl=this.setsUrl+set.Id;
        return this.httpService.delete(fullUrl);
    }

}