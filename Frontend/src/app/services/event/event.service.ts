import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/shared/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly url = 'http://localhost:3000/api/event/';

  constructor(private http: HttpClient) {}

  getEvents(userId: string): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(
      this.url + 'getAllEventsForUserId/' + userId
    );
  }

  save(data: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(this.url + 'create', data);
  }

  remove(eventId: string): Observable<EventModel> {
    return this.http.delete<EventModel>(this.url + 'remove/' + eventId);
  }

  getEventById(eventId: string): Observable<EventModel> {
    return this.http.get<EventModel>(this.url + 'get/' + eventId);
  }
}
