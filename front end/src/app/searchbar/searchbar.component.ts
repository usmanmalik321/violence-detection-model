import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  uname: string;
  constructor(private service: AuthService) {}

  ngOnInit(): void {}
  searchdata(event) {
    event.preventDefault();
    const target = event.target;
    if (this.uname != '') {
      this.service.searchname = this.uname;
    } else {
      this.service.searchname = '';
    }
  }
}
