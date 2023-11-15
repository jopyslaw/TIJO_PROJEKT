import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';


const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'scheduler',
    component: SchedulerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
