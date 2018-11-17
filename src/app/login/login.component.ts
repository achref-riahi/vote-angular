import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() UserData = { 'username':'', 'password': '' };

  returnUrl: string;
  Error: boolean;
  constructor(public auth:AuthService, public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    localStorage.clear();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.Error = false;
  }

  login() {
    this.auth.getToken(this.UserData.username, this.UserData.password).subscribe((result) => {
      console.log(result.token);
      if(result.token){
        let tokenInfo = this.getDecodedAccessToken(result.token); // decode token
        localStorage.setItem("token", result.token);
        localStorage.setItem("id", tokenInfo.sub);
        localStorage.setItem("username", tokenInfo.username);
        localStorage.setItem("exp",tokenInfo.exp)
        this.router.navigateByUrl('/');
      }
    }, (err) => {
      console.log(err);
      this.Error = true;
    });
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }


}
