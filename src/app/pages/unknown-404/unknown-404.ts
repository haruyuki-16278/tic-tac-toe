import { Component, OnInit, signal } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-unknown-404',
  imports: [],
  templateUrl: './unknown-404.html',
  styleUrl: './unknown-404.scss',
})
export class Unknown404 implements OnInit{
  protected remaining = signal(5);
  ngOnInit(): void {
    interval(1000).subscribe(() => {
      if (this.remaining() === 1) {
        location.href = "/"
      }
      this.remaining.set(this.remaining() - 1);
    })
  }
}
