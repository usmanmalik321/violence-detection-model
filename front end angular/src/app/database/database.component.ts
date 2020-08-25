import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { SheetComponent } from '../sheet/sheet.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
  record:any =[];
  img;
  // displayedColumns: string[] = ['position', 'No of culprits', 'Images', 'Video'];
  // dataSource = ELEMENT_DATA;

  constructor(private apiService: ApiService,private _bottomSheet: MatBottomSheet,private router:Router) {
   

  }

  ngOnInit(): void {
    if(!localStorage.getItem("userData")){
      this.router.navigate([''])
     
    }
    else{
    this.readRecord();
    }
  }
  readRecord(){
    this.apiService.getRecord().subscribe((data) => {
     this.record = data;
     console.log(data);
    //  this.img="http://localhost:3000/users/record/"+this.record._id;
    })
  }
opensheet(parray){
  this._bottomSheet.open(SheetComponent,{
    data:{
      text:parray
    }
  });

}

}
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   images: string;
//   symbol: string;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', images: "1.0079", symbol: 'H'},
//   {position: 2, name: 'Helium', images: "4.0026", symbol: 'He'},
//   {position: 3, name: 'Lithium', images: "6.941", symbol: 'Li'},

// ];

// export interface R {
//   culprits : string;
//   position: number;
//   images: string;
//   symbol: string;
// }
