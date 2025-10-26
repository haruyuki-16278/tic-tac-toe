import { Routes } from '@angular/router';
import { TitlePage } from './pages/title-page/title-page';
import { Unknown404 } from './pages/unknown-404/unknown-404';
import { GamePage } from './pages/game-page/game-page';

export const routes: Routes = [{
  path: "",
  redirectTo: "title",
  pathMatch: "full"
}, {
  path: "title",
  component: TitlePage
}, {
  path: "game",
  component: GamePage
}, {
  path: "**",
  component: Unknown404
}];
