import {Component,OnInit,Input,Output, EventEmitter} from "@angular/core"
import {BodyPartService,BodyPart} from "./index"

@Component({
    selector: "my-bodyparts",
    templateUrl:"app/BodyParts/bodyParts.component.html",
    styleUrls:["app/BodyParts/bodyParts.component.css"]
})

export class BodyPartsComponent implements OnInit{
    title:"Body Parts";
    @Input()
    bodyparts:BodyPart[]=[];
    @Output() selected= new EventEmitter<BodyPart>();
    constructor(){
    }
    
    onSelected(bodypart:BodyPart){        
        this.selected.emit(bodypart);
    }
    
    ngOnInit(){
        
    }
}