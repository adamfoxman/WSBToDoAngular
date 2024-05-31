import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html',
  imports: [CommonModule],
  styleUrls: ['./alert.component.scss'],
  standalone: true,
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  message: any;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe((message) => {
      this.message = message;
      setTimeout(() => {
        this.message = undefined;
      }, 3000);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
