import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Set,SetGroup, OrderSetsPipe, SetService} from "../shared/index"
import { SetComponent } from "../index"
import { LogService } from "../../Utilities/log.service"

@Component({
    selector: 'set-list',
    templateUrl: 'app/Sets/SetList/setList.component.html',
    directives: [SetComponent],
    styleUrls:["app/Sets/set.component.css"],
    pipes:[OrderSetsPipe]
})
export class SetListComponent implements OnInit,OnChanges {
    @Input() setGroup:SetGroup;
    @Input() selectedSet:Set;
    @Output() setSelectedEvent= new EventEmitter<Set>();
    constructor(private SetService:SetService, private logService:LogService) { }

    ngOnInit() { }
    
    ngOnChanges() {
        this.logService.logObject("setGroupAfterChanges",this.setGroup);
    }
    setSelected(set:Set){
        this.setSelectedEvent.emit(set);
    }
    
    deleteSelectedSet(){
        
    }

}