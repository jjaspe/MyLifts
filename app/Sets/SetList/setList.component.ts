import { Component, OnInit, Input } from '@angular/core';
import { SetGroup, OrderSetsPipe} from "../shared/index"
import { SetComponent } from "../index"

@Component({
    selector: 'set-list',
    templateUrl: 'app/Sets/SetList/setList.component.html',
    directives: [SetComponent],
    styleUrls:["app/Sets/set.component.css"],
    pipes:[OrderSetsPipe]
})
export class SetListComponent implements OnInit {
    @Input() setGroup:SetGroup;
    constructor() { }

    ngOnInit() { }

}