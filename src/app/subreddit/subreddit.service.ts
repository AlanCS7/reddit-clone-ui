import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SubredditModel } from './subreddit-response';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  BASE_URL: string = 'http://localhost:8080/api/subreddit';

  constructor(private httpClient: HttpClient) { }

  getSubreddits(): Observable<Array<SubredditModel>> {
    return this.httpClient.get<Array<SubredditModel>>(this.BASE_URL);
  }

  createSubreddit(subredditModel: SubredditModel) {
    return this.httpClient.post<SubredditModel>(this.BASE_URL, subredditModel);
  }
}
