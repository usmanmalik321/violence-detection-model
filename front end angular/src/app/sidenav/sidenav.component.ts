import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  opened=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem("userData")){
      this.router.navigate([''])
    }
  }
  get u(){
    return window.location.href;
  }
  logout(){
    localStorage.clear();
    this.router.navigate([''])
  }
}
