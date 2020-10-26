import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userData: any;
  constructor(
    private router: Router,
    private service: ApiService,
    private nameservice: AuthService
  ) {}

  ngOnInit(): void {
    if (this.nameservice.isLoggedIn == true) {
      this.router.navigate(['admin']);
    }
  }
  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const uname = target.querySelector('#username').value;
    const upass = target.querySelector('#password').value;
    let info = {
      username: uname,
      password: upass,
    };
    if (info.username !== '' && info.password !== '') {
      this.service.signin(info).subscribe(
        (data) => {
          this.userData = data;
          console.log(this.userData);
          if ((this.userData.message = 'Login Succeeded!')) {
            this.router.navigate(['admin']);
            localStorage.setItem('access_token', this.userData.access_token);
          }
        },
        (err) => alert('unauthorized')
      );
    } else {
      alert('Cant leave a field empty');
    }
  }
}
