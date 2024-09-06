import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {

  transform(value: any, args: Array<string>,type:string): unknown {
    if(!args) return value;
    if(type==='full'){

      var re;
      for(let ambiguity of args){
        re = new RegExp("\\b("+ambiguity+"\\b)", 'igm');
        value= value.replace(re, '<mark class="highlighted-text">$1</mark>');
      }
    }
    else{
      var re;

      for(let ambiguity of args){
        const re = new RegExp(ambiguity, 'igm');
        value= value.replace(re, '<mark class="highlighted-text">$&</mark>');
      }
    }

    console.log("highlighted stuff: ");

    console.log(value);

      return value;
  }

}
