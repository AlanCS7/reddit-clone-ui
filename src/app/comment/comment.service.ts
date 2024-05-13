import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommentPayload } from './comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  BASE_URL: string = 'http://localhost:8080/api/comments';

  constructor(private httpClient: HttpClient) { }

  getCommentsForPost(postId: number): Observable<Array<CommentPayload>> {
    return this.httpClient.get<Array<CommentPayload>>(this.BASE_URL, {
      params: { postId: postId.toString() }
    });
  }

  getCommentsByUser(username: string): Observable<Array<CommentPayload>> {
    return this.httpClient.get<Array<CommentPayload>>(this.BASE_URL, {
      params: { username }
    });
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>(this.BASE_URL, commentPayload);
  }
}
