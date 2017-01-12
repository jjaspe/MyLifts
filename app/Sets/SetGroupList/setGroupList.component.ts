import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Set,SetGroup,SetListComponent } from "../index"

@Component({
    selector: 'set-group-list',
    templateUrl: 'app/Sets/SetGroupList/setGroupList.component.html', 
    directives:[SetListComponent]
})

export class SetGroupListComponent implements OnInit {
    @Input() setGroups:SetGroup[];
    @Output() setSelectedEvent = new EventEmitter<Set>();
    selectedSet:Set;
    constructor() { }

    ngOnInit() { }
    
    setSelected(set:Set){
        this.selectedSet=set;
        this.setSelectedEvent.emit(set);
    }
}