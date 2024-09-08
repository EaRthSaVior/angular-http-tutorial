import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  createPost(postData: { title: string; content: string }) {
    return this.http.post<{ name: string }>(
      'https://angular-http-tutorial-2a7b4-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      postData
    );
  }
  fetchPosts() {
    return this.http
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
      );
  }
}
