import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { RouterModule } from '@angular/router';
import { LogoutRoutingModule } from './logout-routing.module';

@NgModule({
  declarations: [LogoutComponent],
  imports: [CommonModule, RouterModule, LogoutRoutingModule],
})
export class LogoutModule {}
