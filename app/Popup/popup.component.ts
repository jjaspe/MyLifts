import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';

@Component({
    selector: 'popup',
    templateUrl: 'app/Popup/popup.component.html'
})

export class PopupComponent implements OnInit {
    id:number;
    closed:boolean;
    @Output() onPopupChanged= new EventEmitter<boolean>();
    
    constructor() { 
        this.closed=false;
}

    ngOnInit() { }
    
    closePopup(){
        this.closed=true;
        this.onPopupChanged.emit(this.closed);
    }
    
    openPopup(){        
        this.closed=false;
        this.onPopupChanged.emit(this.closed);
    }
   
}

