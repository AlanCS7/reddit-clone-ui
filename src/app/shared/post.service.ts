import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreatePostPayload } from '../post/create-post/create-post-payload';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  BASE_URL: string = 'http://localhost:8080/api/posts';

  constructor(private httpCliente: HttpClient) { }

  getPosts(): Observable<Array<PostModel>> {
    return this.httpCliente.get<Array<PostModel>>(this.BASE_URL);
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.httpCliente.post(this.BASE_URL, postPayload);
  }

  getPost(postId: number): Observable<any> {
    return this.httpCliente.get<PostModel>(this.BASE_URL + '/' + postId);
  }

  getPostsByUser(username: string): Observable<Array<PostModel>> {
    return this.httpCliente.get<Array<PostModel>>(this.BASE_URL,
      { params: { username } });
  }
}
