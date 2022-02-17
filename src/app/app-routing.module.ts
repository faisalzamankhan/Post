import { PostCreateComponent } from './Post-Create/post-create/post-create.component';
import { PostListComponent } from './Post-list/post-list/post-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"",component:PostListComponent },
  {path:"create",component:PostCreateComponent},
  {path:"edit/:postId",component:PostCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
