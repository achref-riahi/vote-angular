import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']
})
export class ArticleAddComponent implements OnInit {

  @Input() articleData = { 'title':'', 'content': '','imagebase64':'' };

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  addArticle() {
    this.rest.addArticle(this.articleData).subscribe((result) => {
      this.router.navigate(['/article-show/'+result.id]);
      console.log(this.articleData);
    }, (err) => {
      console.log(err);
    });
  }

  onFileSelected(event:any){
    var articleData = this.articleData;
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      articleData.imagebase64 = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}
