import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { TokenGuard } from './guards/token/token.guard';

const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'scheduler',
    component: SchedulerComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'event/:eventId',
    component: EventDetailsComponent,
    canActivate: [TokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
