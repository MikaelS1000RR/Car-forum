import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit {

  threadId!: string;
  firstPost!: string;
  threadObject!: any;
  createdPost!: string;
  posts!: any;
  threadTitle!: string;
  threadStarterUsername!: string;

  constructor(
    private route: ActivatedRoute,
    private _store: StoreService,
    public _authService: AuthService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!;
    this.threadId = id;
    this._store.getThreadById(this.threadId).subscribe(
      res => {
        console.log(res, " res")
        this.threadObject = res;
        this.firstPost = this.threadObject.firstPost;
        // this.posts = this.threadObject.posts;
        this.threadTitle = this.threadObject.title;
        this.threadStarterUsername = this.threadObject.threadStarterUsername;
        console.log("this.threadObject", this.threadObject);
        console.log("this.threadObject.firstPost", this.threadObject.firstPost);
      }

    );
    // this.threadObject = this.threadObject.firstPost;
    // console.log(this.threadObject.firstPost, "this.threadObject.firstPost");
    this.getPosts();
  }

  createPost() {
    console.log("createPost click");
    if (!this.createdPost) {
      return;
    }

    let post = {
      threadId: this.threadId,
      username: localStorage.getItem('username'),
      creator: localStorage.getItem('id'),
      postText: this.createdPost
    }

    this._store.createPostInThread(post).subscribe(
      res => console.log(res)
    );

    this.getPosts();
    this.createdPost = "";
  }

  getPosts() {
    this._store.getPostsByThreadId(this.threadId).subscribe(
      res => {
        console.log(res, "posts")
        this.posts = res;
      }
    )
  }

}
