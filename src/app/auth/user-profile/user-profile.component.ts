import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username: string;
  posts: PostModel[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentService) {
    this.username = this.activatedRoute.snapshot.params.username;

    this.postService.getPostsByUser(this.username).subscribe(
      (data) => {
        this.posts = data;
        this.postLength = data.length;
      });

    this.commentService.getCommentsByUser(this.username).subscribe(
      (data) => {
        this.comments = data;
        this.commentLength = data.length;
      });
  }

  ngOnInit(): void {
  }

}
