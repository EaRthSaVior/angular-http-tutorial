import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    console.log(postData);
    this.http
      .post<{ name: string }>(
        'https://angular-http-tutorial-2a7b4-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        postData
      )
      .subscribe((response) => console.log(response));
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
      .get<{ [key: string]: Post }>(
        'https://angular-http-tutorial-2a7b4-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
      )
      .pipe(
        map((response) => {
          const arr = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              arr.push({ ...response[key], id: key });
            }
          }
          return arr;
        })
      )
      .subscribe((response) => (this.loadedPosts = response));
  }
}
