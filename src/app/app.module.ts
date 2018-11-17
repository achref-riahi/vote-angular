import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RestService }  from './rest.service';
import { AuthService }  from './auth.service';

import { AuthGuard }  from './auth.guard';
import { OwnArticleGuard }  from './own-article.guard';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { ArticleShowComponent } from './article-show/article-show.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleAddComponent } from './article-add/article-add.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { NotauthorizedComponent } from './notauthorized/notauthorized.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenComponent } from './token/token.component';


const appRoutes: Routes = [
  {
    path: 'articles',
    component: ArticleComponent,
    data: { title: 'Liste d\'article' }
  },
  {
    path: 'article-show/:id',
    component: ArticleShowComponent,
    data: { title: 'Details d\'article' }
  },
  {
    path: 'article-add',
    component: ArticleAddComponent,
    canActivate : [AuthGuard],
    data: { title: 'Ajout d\'article' }
  },
  {
    path: 'article-edit/:id',
    component: ArticleEditComponent,
    canActivate : [AuthGuard,OwnArticleGuard],
    data: { title: 'Edition d\'article' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'À propos de moi' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contactez moi' }
  },
  {
    path: 'notauthorized',
    component: NotauthorizedComponent,
    data: { title: 'Alert !' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Connectez vous' }
  },
  { path: '',
    component: ArticleComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleShowComponent,
    ArticleEditComponent,
    ArticleAddComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    NotauthorizedComponent,
    TokenComponent,
  ],
  imports: [
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgbModule
  ],
  providers: [RestService,AuthService,AuthGuard,OwnArticleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
