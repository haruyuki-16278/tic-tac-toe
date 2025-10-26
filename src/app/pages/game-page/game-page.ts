import { Component, inject, OnInit } from '@angular/core';
import { T3Controller } from '../../services/t3-controller';
import { T3Cell } from "../../components/t3-cell/t3-cell";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.html',
  styleUrl: './game-page.scss',
  imports: [T3Cell],
  providers: [T3Controller],
})
export class GamePage implements OnInit {
  private ctrl = inject(T3Controller);
  private count = 0;

  protected get cells() {
    return this.ctrl.cells();
  }

  ngOnInit(): void {
    this.ctrl.reset();
  }

  t3CellOnClick({col, row}:{col:number, row:number}) {
    this.ctrl.setCellState(this.count % 2 === 0 ? "A" : "B", {col, row});
    this.count++;
  }
}
