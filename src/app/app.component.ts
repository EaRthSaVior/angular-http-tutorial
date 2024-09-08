import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  loading = false;
  error = '';
  private errorSub: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
    this.errorSub = this.postsService.error.subscribe(
      (error) => (this.error = error + ' this is create post error')
    );
  }
  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postsService.createPost(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postsService.clearPosts().subscribe(() => (this.loadedPosts = []));
  }

  private fetchPosts() {
    this.loading = true;
    this.postsService.fetchPosts().subscribe(
      (response) => {
        this.loading = false;
        this.loadedPosts = response;
      },
      (error) => {
        this.loading = false;
        this.error = error.message;
      }
    );
  }
  onClearError() {
    this.error = '';
  }
}
