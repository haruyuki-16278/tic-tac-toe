import { Component, inject, OnInit, signal } from '@angular/core';
import { interval } from 'rxjs';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-unknown-404',
  imports: [RouterLink],
  templateUrl: './unknown-404.html',
  styleUrl: './unknown-404.scss',
})
export class Unknown404 implements OnInit{
  private router = inject(Router);
  protected remaining = signal(5);
  ngOnInit(): void {
    interval(1000).subscribe(() => {
      if (this.remaining() === 1) {
        this.router.navigate(["/"])
      }
      this.remaining.set(this.remaining() - 1);
    })
  }
}
