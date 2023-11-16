import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EventService } from 'src/app/services/event/event.service';
import { TokenService } from 'src/app/services/token/token.service';
import {
  EventDialogModel,
  EventModel,
} from 'src/app/shared/models/event.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../scheduler/dialog/dialog.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  eventData?: EventModel;
  eventId!: string;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['eventId'];
    this.getPosterData(this.eventId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPosterData(id: string): void {
    this.eventService
      .getEventById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.eventData = response;
      });
  }

  remove(): void {
    this.eventService
      .remove(this.eventId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.router.navigateByUrl('scheduler');
      });
  }

  edit(): void {
    const ref = this.dialog.open(DialogComponent, {
      width: '500px',
      data: this.eventData,
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        let data: EventDialogModel = response;
        const prepData: EventModel = {
          ...data,
          start: this.eventData?.start,
          end: this.eventData?.end,
          userId: this.eventData?.userId,
          id: this.eventData?._id,
        };

        this.eventService
          .save(prepData)
          .pipe(takeUntil(this.destroy$))
          .subscribe((response) => {
            this.getPosterData(this.eventId);
          });
      });
  }
}
