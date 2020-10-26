import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  sub: any;
  page: any;
  constructor(private router: Router, private activateRouter: ActivatedRoute) {}

  ngOnInit(): void {}
}
