import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post/post.service';

@Component({
  selector: 'app-lista-posts',
  templateUrl: './lista-posts.component.html',
  styleUrls: ['./lista-posts.component.css']
})
export class ListaPostsComponent implements OnInit {

  allPosts = []

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe(
      data => {
        if(data != null){
          if (data.length > 4) {
            let cont = 0;
            while (cont < 4) {
              this.allPosts.push(data[4 - cont]);
              cont++;            
            }
          } else {
            this.allPosts = data.reverse();
          }
        }        
      }
    )
  }

}
