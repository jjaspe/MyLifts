import {Detail} from "../index";
import {Component,Input} from "@angular/core"

@Component({
    selector:"my-detail",
    templateUrl:"app/Sets/Details/detail.component.html",
    styleUrls:["app/Exercises/exercises.component.css"]
})

export class DetailComponent {
    @Input()
    details:Detail[];
}

