import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Set, SetComponent} from "../index"
import {} from ""

@Component({
    selector: 'set-list',
    templateUrl: 'app/Sets/SetList/setList.component.html',
    directives: [SetComponent],
    styleUrls:["app/Sets/set.component.css"]
})
export class SetListComponent implements OnInit {
    @Input()
    sets:Set[]=[]
    constructor() { }

    ngOnInit() { }

}