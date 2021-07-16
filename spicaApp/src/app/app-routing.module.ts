import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresenceComponent } from './components/presence/presence.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: "",
    component: SettingsComponent
  },
  {
    path: "employees",
    component: UsersComponent
  },
  {
    path: "presence",
    component: PresenceComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
