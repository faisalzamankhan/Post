import { post } from './../../postmodel';
import { PostServiceService } from './../../Services/Post-Service/post-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from "rxjs"
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements  OnDestroy {
  
  postsub=new Subscription()
  post:post[]=[]

 constructor(private postservice:PostServiceService){
  this.postservice.getPost()
  this.postsub= this.postservice.getpostUpdateListner().subscribe((posts)=>{
                this.post=posts 
   });
  }
ngOnDestroy(){
    this.postsub.unsubscribe()
}

Delete(id:string){
  this.postservice.DeletePost(id)
}

}
