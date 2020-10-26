import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit {
  loaded = false;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
  
  }
  live() {}
  load() {
    // this.apiService.stop().subscribe((data) => {
    //   console.log(data);
    // });
  }
  ruk() {
    console.log('pressed');
    var elements = document.getElementsByClassName('d1');
    let i = 0;
    while (elements.length > 0) {
      elements[i].remove();
      i++;
    }
  }
  showMessageSuccess() {
    this.apiService.tasweer().subscribe((data) => {});
  }
}
