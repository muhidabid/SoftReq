import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

enum colors {
  // WHITE = "#FFFFFF",
  // RED = "#e92c64",
  RED = "#a31f46",
  GREEN = "#009886",
  // BLUE = "#208eed",
  BLUE = "#1a72be",
  VIOLET = "#912f84",
  YELLOW = "#b36619",
  PINK = "#6e1d96"
}

@Component({
  selector: 'app-color-panel',
  templateUrl: './color-panel.component.html',
  styleUrls: ['./color-panel.component.scss']
})
export class ColorPanelComponent implements OnInit {
  @Output() emitColor: EventEmitter<string> = new EventEmitter();

  colorsData = Object.values(colors)

  constructor() { }

  ngOnInit(): void {
  }

  onColorEmit(color: string) {
    this.emitColor.emit(color);
  }
}
