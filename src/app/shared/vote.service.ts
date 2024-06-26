import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { VotePayload } from './vote-button/vote-payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  BASE_URL = 'http://localhost:8080/api/votes';

  constructor(private httpClient: HttpClient) { }


  vote(votePayload: VotePayload): Observable<any> {
    return this.httpClient.post(this.BASE_URL, votePayload);
  }
}
