import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  
  loading=0;
  constructor(private apiService: ApiService,private router:Router) {
   
   }

  ngOnInit(): void {
    if(!localStorage.getItem("userData")){
      this.router.navigate([''])
    }
    else{
    this.load();
    this.showMessageSuccess();
    }
  }
live(){

}
load(){
  this.apiService.stop().subscribe((data) => {
    console.log(data);

   })

}
showMessageSuccess(){
  this.apiService.tasweer().subscribe((data) => {
    

   })
  setTimeout(()=>{    
    this.loading = 1;
}, 7000);

}
get lo(){
  return this.loading;
}
}
