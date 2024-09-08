import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  loading = false;
  error = '';

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postsService
      .createPost(postData)
      .subscribe((response) => console.log(response));
    this.fetchPosts();
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
      (error) => (this.error = error.message)
    );
  }
}
