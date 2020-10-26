import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profilecard',
  templateUrl: './profilecard.component.html',
  styleUrls: ['./profilecard.component.css'],
})
export class ProfilecardComponent implements OnInit {
  loginname: any;
  constructor(private namservice: AuthService) {}

  ngOnInit(): void {
    let store;

    this.loginname = 'hello';
  }
}
