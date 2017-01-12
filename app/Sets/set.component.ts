import {Set,DetailComponent} from "./index"
import {Component,OnInit,Input} from "@angular/core"

@Component({
    selector:"set",
    templateUrl:"app/Sets/set.component.html",
    styleUrls:["app/Sets/set.component.css"],
    directives: [DetailComponent]
})

export class SetComponent{
    @Input() set:Set;
    @Input() isSelected:boolean;
}
