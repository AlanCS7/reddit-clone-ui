import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
