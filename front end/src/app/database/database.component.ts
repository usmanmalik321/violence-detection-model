import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { SheetComponent } from '../sheet/sheet.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
// import { setTimeout } from 'timers';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css'],
})
export class DatabaseComponent implements OnInit {
  record: any = [];
  length: any = [];
  img;
  uname;
  // displayedColumns: string[] = ['position', 'No of culprits', 'Images', 'Video'];
  // dataSource = ELEMENT_DATA;

  constructor(
    private apiService: ApiService,
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private nameservice: AuthService
  ) {}

  ngOnInit(): void {
    this.readRecord();
  }
  readRecord() {
    this.apiService.getRecord().subscribe((data) => {
      this.record = data;
      console.log(data);
      //  this.img="http://localhost:3000/users/record/"+this.record._id;
    });
  }
  opensheet(parray) {
    this._bottomSheet.open(SheetComponent, {
      data: {
        text: parray,
      },
    });
  }
  value() {
    let tovalue = this.uname;
    let dummy1: any = [];
    let condition = 0;
    console.log(tovalue);
    if (tovalue) {
      console.log('not empty');
      this.record.forEach((element) => {
        if (tovalue == element.date) {
          condition = 1;
          dummy1.push(element);
        }
      });
      if (condition == 1) this.record = dummy1;
      else alert('no matching record found');
      dummy1 = [];
    } else if (tovalue == '') {
      console.log('empty');
      this.readRecord();
    }
  }
  deletecard(pid) {
    console.log(pid);
    this.apiService.deletec(pid).subscribe((data) => {
      console.log(data);
    });
    setTimeout(() => {
      this.readRecord();
    }, 2000);
  }
}
