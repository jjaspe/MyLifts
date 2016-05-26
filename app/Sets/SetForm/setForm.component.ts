import { Component, OnInit, Input } from '@angular/core';
import {Set,DetailComponent} from "../index"

@Component({
    selector: 'set-form',
    templateUrl: 'app/Sets/SetForm/setForm.component.html',
    directives: [DetailComponent]
})
export class SetFormComponent implements OnInit {
    @Input()
    set:Set;
    constructor() { }

    ngOnInit() { }

}