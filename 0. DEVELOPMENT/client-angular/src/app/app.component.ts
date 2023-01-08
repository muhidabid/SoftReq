import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-angular';

  highlightTexts = ["text", "demo", "div"];
  txt = "This demo shows how to highlight bits of text within a textarea. Alright, that's a lie. You can't actually render markup inside a textarea. However, you can fake it by carefully positioning a div behind the textarea and adding your highlight markup there. JavaScript takes care of syncing the content and scroll position from the textarea to the div, so everything lines up nicely. Hit the toggle button to peek behind the curtain. And feel free to edit this text. All capitalized words will be highlighted.";



  private content: string;
  public query: string;

  public constructor() {
      this.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a quam ornare, bibendum ligula a, rhoncus ligula. Etiam aliquet, justo sollicitudin imperdiet luctus, nulla justo sodales mi, sit amet semper nisl velit vel massa. In hac habitasse platea dictumst.";
  }

  public highlight() {
      if(!this.query) {
          return this.content;
      }
      return this.content.replace(new RegExp(this.query, "gi"), match => {
          return '<span class="highlightText">' + match + '</span>';
      });
  }

}
