import { Injectable, signal, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { distinctUntilChanged, filter, ReplaySubject, scan, Subject } from 'rxjs';

export const T3_SIZE = 3;

export type T3CellState = "A" | "A_BE_LOST" | "B" | "B_BE_LOST" | "UNOWNED";
export type T3GameState = "INGAME" | "A_WIN" | "B_WIN";

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
  private choices = new Subject<{col: number, row: number, state: T3CellState, turns: number}[]>();

  constructor() {
    this.choices.pipe(scan((prev, curr) => 
      prev.length === 4
      ? [{
          ...prev[0],
          state: prev[0].state === "A"
            ? "A_BE_LOST" as T3CellState
            : "B_BE_LOST"  as T3CellState
          }, ...prev.slice(1), ...curr]
      : prev.length === 5
        ? [{
          ...prev[1],
          state: prev[1].state === "A"
            ? "A_BE_LOST" as T3CellState
            : "B_BE_LOST"  as T3CellState
          }, ...prev.slice(2), ...curr]
        : [...prev, ...curr]
    )).subscribe((v) => {
      const next = this.createCells();
      for (const choice of v) {
        next[choice.row][choice.col] = choice.state;
      }
      this.cells.set(next);
    })
  }

  public reset(): void {
    const cells = this.createCells();
    this.cells.set(cells);
  }

  public setCellState(state: T3CellState, {col, row}: {col: number, row: number}, turns: number): void {
    const next = this.cells();
    next[row][col] = state;
    const gameState = this.check(next);
    if (gameState !== "INGAME") {
      this.router.navigate([`/result/${gameState}`]);
    }
    this.choices.next([{col, row, state, turns}]);
  }

  public getCellState({col, row}: {col: number, row: number}): T3CellState {
    return this.cells()[row][col];
  }

  public check(cells: T3CellState[][]): T3GameState {
    const current = cells;
    console.log(current);
    const tCurrent = current[0].map((_, i) => current.map(row => row[i]));
    console.log(tCurrent);
    const diagonal = [
      current[0].map((_, i) => current[i][i]),
      current[0].map((_, i, a) => current[i][a.length - i - 1])
    ];
    console.log(current, tCurrent, diagonal)
    const lineStatuses = [...current, ...tCurrent, ...diagonal].map(line => this.checkline(line));
    console.log(lineStatuses);
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
