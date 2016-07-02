import {Component,OnInit,Input,Output, EventEmitter} from "@angular/core"
import { BodyPartService} from "./shared/bodyParts.service"
import { BodyPart } from "./shared/BodyPart"

@Component({
    selector: "bodyparts",
    templateUrl:"app/BodyParts/bodyParts.component.html",
    styleUrls:["app/BodyParts/bodyParts.component.css"]
})

export class BodyPartsComponent implements OnInit{
    title:string="Muscle Groups";
    @Input() bodyparts:BodyPart[]=[];
    realBodyParts:BodyPart[]=[];    
    @Output() selected= new EventEmitter<BodyPart>();
    
    constructor(private bodyPartService:BodyPartService){
    }
    
    onSelected(bodypart:BodyPart){  
        this.selected.emit(bodypart);
    }
    
    ngOnInit(){
        this.bodyPartService.getBodyParts().subscribe
            (n=>this.setRealBodyParts(n),
             error=>console.log(error));
    }
    
    setRealBodyParts(bodyparts:BodyPart[]){
        bodyparts.forEach(n=>n.Exercises=[]);
        this.realBodyParts=bodyparts;
    }
}