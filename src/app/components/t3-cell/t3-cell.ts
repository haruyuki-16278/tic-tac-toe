import { Component, input, output } from '@angular/core';
import { T3CellState } from '../../services/t3-controller';

@Component({
  selector: 'app-t3-cell',
  imports: [],
  templateUrl: './t3-cell.html',
  styleUrl: './t3-cell.scss',
})
export class T3Cell {
  public cellState = input<T3CellState>();
  public t3OnClick = output<void>();

  protected get state() {
    return this.cellState() === "A" ? "🍖" : this.cellState() === "B" ? "🐟" : "➖"
  }

  onClick = () => this.t3OnClick.emit();
}
