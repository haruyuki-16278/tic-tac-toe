import { Component, input, output } from '@angular/core';
import { T3CellState } from '../../services/t3-controller';

@Component({
  selector: 'app-t3-cell',
  templateUrl: './t3-cell.html',
  styleUrl: './t3-cell.scss',
})
export class T3Cell {
  public cellState = input<T3CellState>();
  public t3OnClick = output<void>();

  protected get state() {
    return this.cellState()?.startsWith("A") ? "🍖" : this.cellState()?.startsWith("B") ? "🐟" : "➖"
  }

  protected get cellClassName() {
    return this.cellState()?.includes("BE_LOST") ? "t3-cell__be-lost" : "";
  }

  onClick = () => this.t3OnClick.emit();
}
