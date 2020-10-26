import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  opened = false;
  loginname = '';
  constructor(private router: Router) {}

  ngOnInit(): void {}
  get u() {
    return window.location.href;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
