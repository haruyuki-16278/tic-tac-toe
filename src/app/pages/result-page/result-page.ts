import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { T3GameState } from '../../services/t3-controller';

@Component({
  selector: 'app-result-page',
  imports: [RouterLink],
  templateUrl: './result-page.html',
  styleUrl: './result-page.scss',
})
export class ResultPage {
  protected winner: string | undefined = undefined;
  private route = inject(ActivatedRoute);

  constructor() {
    const gameState = this.route.snapshot.paramMap.get("winner") as T3GameState;
    if (gameState === "A_WIN") {
      this.winner = "WINNER: 🍖";
    } else if (gameState === "B_WIN") {
      this.winner = "WINNER: 🐟";
    } else {
      this.winner = "Oops! Somethins went wrong!\ndicide winner by another game like a Rock-Paper-Scissors 🤓"
    }
  }
}
