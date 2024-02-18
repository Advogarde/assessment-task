import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageNodesComponent } from './manage-nodes/manage-nodes.component'; // Assuming ManageNodesComponent is the component for the managenodes page
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: '', pathMatch: 'full', component: AppComponent
    },
  { path: 'managenodes', component: ManageNodesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
