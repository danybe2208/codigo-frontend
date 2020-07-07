import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post/post.service';

@Component({
  selector: 'app-post-popular',
  templateUrl: './post-popular.component.html',
  styleUrls: ['./post-popular.component.css']
})
export class PostPopularComponent implements OnInit {

  listaPosts = [];
  temPost = false;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getListPost();
  }

  getListPost(){
    this.postService.getPosts(localStorage.getItem("email")).subscribe(
      data => {
        this.listaPosts = data.sort(function (a, b) {	
          return (a.curtidas < b.curtidas) ? 1 : ((b.curtidas < a.curtidas) ? -1 : 0);
        }).slice(0,10);
        if (this.listaPosts.length > 0) {
          this.temPost = true;
        } else {
          this.temPost = false;
        }
      }
    );
  }

}
