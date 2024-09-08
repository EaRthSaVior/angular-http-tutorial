import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();
  constructor(private http: HttpClient) {}

  createPost(postData: { title: string; content: string }) {
    return this.http
      .post<{ name: string }>(
        'https://angular-http-tutorial-2a7b4-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        postData,
        {
          headers: new HttpHeaders({ 'custom-header': 'hello' }),
        }
      )
      .subscribe(
        (response) => console.log(response),
        (error) => this.error.next(error.message)
      );
  }
  fetchPosts() {
    let params = new HttpParams();
    params = params.append('abc', '222');
    params = params.append('test', '123');
    return this.http
      .get<{ [key: string]: Post }>(
        'https://angular-http-tutorial-2a7b4-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        { params: params }
      )
      .pipe(
        map(
          (response) => {
            const arr = [];
            for (let key in response) {
              if (response.hasOwnProperty(key)) {
                arr.push({ ...response[key], id: key });
              }
            }
            return arr;
          },
          catchError((error) => {
            // can send the error to server for analytic
            return throwError(error);
          })
        )
      );
  }
  clearPosts() {
    return this.http
      .delete(
        'https://angular-http-tutorial-2a7b4-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        {
          observe: 'events',
        }
      )
      .pipe(
        tap({
          next: (x) => console.log(x),
          error: (e) => console.log(e),
          complete: () => {
            console.log('done!');
          },
        })
      ); //perform non critical side effect
  }
}
