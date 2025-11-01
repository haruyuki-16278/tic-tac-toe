import { Injectable, signal, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

export const T3_SIZE = 3;

export type T3CellState = "A" | "B" | "UNOWNED";
export type T3GameState = "INGAME" | "A_WIN" | "B_WIN"

@Injectable({
  providedIn: 'root'
})
export class T3Controller {
  private router = inject(Router);

  private createCells = () => {
    const initial: T3CellState[][] = [];
    for (let i = 0; i < T3_SIZE; i++) {
      const row: T3CellState[] = []
      for (let j = 0; j < T3_SIZE; j++) {
        row.push("UNOWNED");
      }
      initial.push(row);
    }
    return initial;
  }
  public cells = signal(this.createCells(), {
    equal: (a, b) => false
  });

  constructor() {
    effect(() => ((cells) => {
      const state = this.check(cells);
      if (state !== "INGAME") {
        this.router.navigate([`/result/${state}`]);
      }
      console.log(state);
    })(this.cells()));
  }

  public reset(): void {
    const cells = this.createCells();
    this.cells.set(cells);
    console.log(this.cells())
  }

  public setCellState(state: T3CellState, {col, row}: {col: number, row: number}): void {
    const next = this.cells();
    next[row][col] = state;
    this.cells.set(next);
  }

  public getCellState({col, row}: {col: number, row: number}): T3CellState {
    return this.cells()[row][col];
  }

  public check(cells: T3CellState[][]): T3GameState {
    const current = cells;
    const tCurrent = current[0].map((_, i) => current.map(row => row[i]));
    const diagonal = [
      current[0].map((_, i) => current[i][i]),
      tCurrent[0].map((_, i) => tCurrent[i][i])
    ];
    const lineStatuses = [...current, ...tCurrent, ...diagonal].map(line => this.checkline(line));
    if (lineStatuses.every(v => v !== "INGAME")) {
      return "INGAME";
    } else {
      const result = lineStatuses.filter(v => v !== "INGAME").at(0);
      if (!result) {
        console.error("Unexpected result");
        return "INGAME";
      } else {
        return result;
      }
    }
  }

  private checkline(line: T3CellState[]): T3GameState {
    const isFinished = line.every((v) =>
      v === line[0] && v !== "UNOWNED"
    )
    if (isFinished && line[0] === "A") {
      return "A_WIN";
    } else if (isFinished && line[0] === "B") {
      return "B_WIN";
    } else {
      return "INGAME";
    }
  }
}
