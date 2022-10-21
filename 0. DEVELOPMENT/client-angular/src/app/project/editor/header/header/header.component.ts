import { Component, OnInit, Inject } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  projName: string;

  constructor(
    public boardService: BoardService,
    private _projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projName = this._projectService.projectName;
  }

  // title: string, projectRef: string, position: number
  addColumn(event: string, projectRef: string, position: number) {
    if (event) {
      this.boardService.addList(event, projectRef, position)
    }
  }

}
