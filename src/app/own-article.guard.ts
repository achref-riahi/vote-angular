import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RestService } from './rest.service';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OwnArticleGuard implements CanActivate {

  article:any;

  constructor(public rest:RestService, private router: Router){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      this.article = await this.rest.ArticleAuthorId(state.url.substr(state.url.lastIndexOf('/')+1));

      if(parseInt(this.article.author.id) == parseInt(localStorage.getItem('id'))){
        return true;
      }
      else{
        console.log(this.article.author.id);
        console.log(localStorage.getItem('id'));
        this.router.navigate(['notauthorized']);
        return false;
      }
  }
}
