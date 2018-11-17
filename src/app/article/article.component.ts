import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { AuthService } from '../auth.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

    articles:any = [];
    article:any;
    user_id:any;

    constructor(public auth:AuthService, public rest:RestService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
      this.getArticles();
      this.user_id = localStorage.getItem('id');
    }

    getArticles() {
      this.articles = [];
      this.rest.getArticles().subscribe((data: {}) => {
        console.log(data);
        if(data.length == 0){
          this.articles == [];
        }
        else{
          this.articles = data;
        }
      });
    }

    async delete(id) {

      this.article = await this.rest.ArticleAuthorId(id);

      if(parseInt(this.article.author.id) == parseInt(localStorage.getItem('id'))){
        this.articles
        this.rest.deleteArticle(id).subscribe(res => {
          console.log(res);
          this.getArticles();
        }, (err) => {
          console.log(err);
        });
        this.router.navigate(['/']);
      }else{
        console.log("you can't delete this article");
      }
    }


    canAddArticle() {
     return this.auth.isLoggedIn();
    }

}
