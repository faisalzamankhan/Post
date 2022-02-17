import { HttpClient, HttpClientModule } from '@angular/common/http';
import { post } from './../../postmodel';
import { Injectable } from '@angular/core';
import {Subject} from  "rxjs";
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

postUpdated=new Subject<post[]>()
 
posts:post[]=[];

constructor(private http:HttpClient){}

getPost()
{
   this.http.get<{message:string,posts:any}>("http://localhost:3000/api/posts")
   .pipe(map(postdata=>{
     return postdata.posts.map(post=>{
       return {
         title:post.title,
         content:post.content,
         id:post._id
       }
     })
   }))
   .subscribe(transformedata=>{
     this.posts=transformedata;
     this.postUpdated.next([...this.posts])
   }) 
   
   //return [...this.posts]
}

getpostUpdateListner(){
    return (this.postUpdated.asObservable())
}

AddPost(title:string,content:string)
{
  let post={id:null,title:title,content:content}
  this.http.post<{message:string ,id :string}>("http://localhost:3000/api/posts",post).
  
  subscribe(response=>{
    console.log(response.message)
    post.id=response.id
    this.posts.push(post) 
    this.postUpdated.next([...this.posts])
  })
}

getpostby_id(id:string)
{
   return {...this.posts.find((post)=>post.id===id)}
}
UpdatePost(id :string,title:string ,content :string)
{ 
    const post:post={id:id,title:title,content:content}
    this.http.put<{message:string}>("http://localhost:3000/api/posts/" + id,post)
    .subscribe(response=>{
        console.log(response.message)
    })
}

DeletePost(id:string){
  this.http.delete<{message:string}>("http://localhost:3000/api/posts/" + id)
  .subscribe(response=>{
    const updatepost=this.posts.filter(post=>post.id!==id)
    this.posts=updatepost
    this.postUpdated.next([...this.posts])   
  })  
}

}
