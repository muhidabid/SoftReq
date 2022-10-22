import { Component, OnInit, Inject } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { ProjectService } from 'src/app/services/project.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  projName: string;
  // subscription: Subscription;

  constructor(
    public boardService: BoardService,
    private _projectService: ProjectService,
    private localStore: LocalStorageService,
  ) { }

  ngOnInit(): void {
    console.log("ngOnInit called in header");
    this.projName = this.localStore.getData("currProjName");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called in header");
    this.localStore.removeData("currProjName");
  }

  addColumn(event: string, projectRef: string, position: number) {
    if (event) {
      this.boardService.addList(event, projectRef, position)
    }
  }

}
