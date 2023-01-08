import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from "@angular/forms";

@Component({
  selector: "app-textarea-highlight",
  templateUrl: "./textarea-highlight.component.html",
  styleUrls: ["./textarea-highlight.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaHighlightComponent),
      multi: true
    }
  ]
})
export class TextareaHighlightComponent
  implements  ControlValueAccessor {
  constructor() {}
  @Input() highlightTexts: string[] = [];
  @ViewChild("backdrop") $backdrop: ElementRef<HTMLDivElement>;
  @ViewChild("textarea") $textarea: ElementRef<HTMLTextAreaElement>;
  textValue: string = "";
  get highlightedText () {
    return this.applyHighlights(this.textValue)
  }

  applyHighlights(text) {
    text = text ? text
      .replace(/\n$/g, "\n\n") : '';
    this.highlightTexts.forEach(x => {
      text = text
      .replace(new RegExp(x, 'g'), "<mark>$&</mark>");
    })
    return text;

  }
  handleScroll() {
    var scrollTop = this.$textarea.nativeElement.scrollTop;
    this.$backdrop.nativeElement.scrollTop = scrollTop;

    var scrollLeft = this.$textarea.nativeElement.scrollLeft;
    this.$backdrop.nativeElement.scrollLeft = scrollLeft;
  }

  onChanges: ($value: any) => void;
  onTouched: () => void;

  writeValue(value: any): void {
    if (value !== undefined) {
      this.textValue = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChanges = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
