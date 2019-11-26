import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ArchiveComponent } from './archive/archive.component';
import { SentComponent } from './sent/sent.component';
import { InboxComponent } from './inbox/inbox.component';
import { CreateComponent } from './create/create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'inbox', component: InboxComponent },
  { path:'sent', component: SentComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'create', component: CreateComponent },
  { path:'', redirectTo:'/inbox', pathMatch: 'full'},
  { path:'**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
