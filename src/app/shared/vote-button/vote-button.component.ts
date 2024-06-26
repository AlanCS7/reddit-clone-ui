import { VotePayload } from './vote-payload';
import { AuthService } from './../../auth/shared/auth.service';
import { VoteService } from './../vote.service';
import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';
import { VoteType } from './vote-type';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;

  constructor(
    private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService,
    private toastr: ToastrService) {

    this.votePayload = {
      voteType: undefined,
      postId: undefined
    };
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.upvoteColor = 'green';
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
    this.downvoteColor = 'red';
  }

  vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(
      () => {
        this.updateVoteDetails();
      },
      error => {
        this.toastr.error(error.error.userMessage);
        throwError(error);
      }
    );
  }

  updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(
      (post) => {
        this.post = post;
      });
  }
}
