import { Pipe, PipeTransform } from '@angular/core';
import { Set } from '../index'

@Pipe({name:'orderSets'})
export class OrderSetsPipe implements PipeTransform {
    transform(sets:Set[]){        
            return sets?sets.sort((a,b)=>a.number-b.number):sets;
    }
}
