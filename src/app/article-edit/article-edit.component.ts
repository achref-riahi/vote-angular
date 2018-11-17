import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  @Input() articleData:any = { title: '', content: '', image:'' };

  imageurl:string = "";

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getArticle(this.route.snapshot.params['id']).subscribe((data) => {
        this.articleData.title = data.title;
        this.articleData.content = data.content;
        this.articleData.image = data.image;
        this.imageurl = "http://127.0.0.1/images/headers/"+data.image;
    });
  }

  updateArticle() {
    //console.log(this.articleData);
    this.rest.updateArticle(this.route.snapshot.params['id'], this.articleData).subscribe((result) => {
      this.router.navigate(['/article-show/'+result.id]);
    }, (err) => {
      console.log(err);
    });
  }

  uploadFile($event) {
    console.log($event.target.files[0]); // outputs the first file
  }

  onFileSelected(event:any){
    var articleData = this.articleData;
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      articleData.image = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}
