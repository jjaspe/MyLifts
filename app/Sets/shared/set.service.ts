import { Injectable } from '@angular/core';
import { Workout } from "../../Workout/Index";
import { Set } from "./index";
import { SetGroup } from "./SetGroup";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable} from "rxjs/Rx";
import { SessionService } from "../../Session/index"

@Injectable()
export class SetService {    
    getSetsByWorkoutUrl:string="/Sets/";
    constructor(private http: Http, private sessionService:SessionService) { }
    
    initUrls(){
        this.getSetsByWorkoutUrl=this.sessionService.session.ApiUrl+this.getSetsByWorkoutUrl;
    }
    
    getSetsByWorkout(workout:Workout){
        let params: URLSearchParams = new URLSearchParams;
        if(workout){
            params.set("workoutId", workout.Id.toString());

            return  this.http.get(this.getSetsByWorkoutUrl,{
                                search: params}).
            map(this.extractSetsData).catch(this.handleError);
        }
    }
    
    extractSetsData(res:Response){
        let body = res.json();
        return body || { };
    }
    
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error("Error:"+errMsg);
        return Observable.throw(errMsg);
    }
    
    getSetGroups(sets:Set[]){
        let setGroups:SetGroup[]=[];
        for(var set of sets){
            let setGroup=setGroups.filter(n=>n.exercise.Name==set.exercise.Name)[0]
            if(setGroup){
                setGroup.Sets.push(set)
            }else{
                setGroups.push(
                    {exercise:set.exercise , Sets:[set] }
                )
            }
        }
        return setGroups;
    }

}