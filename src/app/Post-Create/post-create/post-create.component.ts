import { post } from './../../postmodel';
import { PostServiceService } from './../../Services/Post-Service/post-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, ParamMap} from "@angular/router"

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  private mode = "create";
  private postId;
  public post:post;
  
  constructor(private postservice:PostServiceService ,public route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
       if(paramMap.has("postId"))
       {
            this.mode="edit"   
            this.postId=paramMap.get("postId")
            this.post=this.postservice.getpostby_id(this.postId)
       }
       else
       {
         this.mode="create"
         this.postId="null"
       }
    })
  }

    AddPost(post:NgForm){
    if(post.invalid)
    {
      return
    } if(this.mode==="create")
  {
    this.postservice.AddPost(post.value.title,post.value.content)
     post.resetForm()
 }
    else{
      this.postservice.UpdatePost(this.postId,post.value.title,post.value.content)
    }
    
  }

}
