import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
} from '@fullcalendar/core';
import { TokenService } from 'src/app/services/token/token.service';
import {
  EventDialogModel,
  EventModel,
} from 'src/app/shared/models/event.model';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from 'src/app/services/event/event.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { CategoryEnum } from 'src/app/shared/enums/category.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  private destroy$: Subject<void> = new Subject<void>();

  currentDate!: string;

  eventsData!: EventModel[];

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin],
    selectable: true,
    events: this.eventsData,
    editable: false,
    selectOverlap: false,
    eventOverlap: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    validRange: {
      start: '',
    },
  };

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private token: TokenService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPosterForUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    let dataFromDialog!: EventDialogModel;

    const ref = this.dialog.open(DialogComponent, {
      width: '500px',
    });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (!response) {
          return;
        }
        dataFromDialog = response;
        const userId = this.token.getUserId();
        if (userId) {
          const dataToSend: EventModel = {
            ...dataFromDialog,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            userId,
          };
          this.saveEvent(dataToSend);
        }
        return;
      });

    calendarApi.unselect();
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.router.navigateByUrl('event/' + clickInfo.event.extendedProps['_id']);

    /*if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
      this.eventService
        .remove(clickInfo.event.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.getAllPosterForUser();
        });
    }*/
  }

  getAllPosterForUser(): void {
    const userId = this.token.getUserId();

    if (userId) {
      this.eventService
        .getEvents(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.eventsData = response.map((event) => {
            let backgroundColor = '';
            if (event.category === CategoryEnum.ENTERTAINMENT) {
              backgroundColor = 'red';
            } else if (event.category === CategoryEnum.MEDICAL_VISIT) {
              backgroundColor = 'green';
            } else if (event.category === CategoryEnum.MEETING) {
              backgroundColor = 'blue';
            } else {
              backgroundColor = 'gray';
            }
            return { ...event, backgroundColor };
          });

          this.calendarComponent.events = this.eventsData;
        });
    }
  }

  dateRangeChange(): void {
    this.getAllPosterForUser();
  }

  private saveEvent(data: EventModel): void {
    this.eventService
      .save(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.getAllPosterForUser();
      });
  }
}
