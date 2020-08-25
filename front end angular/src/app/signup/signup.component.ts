import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userData:any;
  constructor(private router:Router,private service:ApiService) { }


  ngOnInit(): void {
    if(localStorage.getItem("userData")){
      this.router.navigate(['admin'])
    }
  }
signupUser(event){
  event.preventDefault()
  const target=event.target
  const uname=target.querySelector('#username').value
  const upass=target.querySelector('#password').value
  const uemail=target.querySelector('#email').value
  if(uname!=="" && upass!==""){
    let body = {
      username:uname,
      password: upass,
      email: uemail,
      
    };
    this.service.signup(body).subscribe(
      (data) => {
        this.userData=data;
        if(this.userData.success==true){
          console.log(this.userData.User.username);
          localStorage.setItem("userData",JSON.stringify(this.userData.User));
          this.router.navigate(['admin'])

        }
        else{
          alert("server not available")
        }
       
        
      },
      (err) => console.error(err),
      () => console.log('done loading')
    );
     }
     else{
       alert("cant leave a field empty!")
     }
  
}

}
