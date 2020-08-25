import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData:any;
  constructor(private router:Router,private service:ApiService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userData")){
      this.router.navigate(['admin'])
    }

  }
loginUser(event){
  event.preventDefault()
  const target=event.target
  const uname=target.querySelector('#username').value
  const upass=target.querySelector('#password').value
  let info={
    username:uname,
    password:upass
  }
 if(info.username!=="" && info.password!==""){
  this.service.signin(info).subscribe(
    (data) => {
      
      
      this.userData=data;

      if(this.userData.success==true){
        console.log(this.userData.User.username);
        localStorage.setItem("userData",JSON.stringify(this.userData.User));
       this.router.navigate(['admin'])
      }
      
    },
    (err) => console.error(err),
    () => console.log('done vaildating')
  );
 }
}

}
