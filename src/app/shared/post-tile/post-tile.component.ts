import { Component, Input, OnInit } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import { PostModel } from '../post-model';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  @Input() data: Array<PostModel>;
  faComments = faComments;

  constructor() { }

  ngOnInit(): void {
  }

  goToPost(id: number) {
  }
}
