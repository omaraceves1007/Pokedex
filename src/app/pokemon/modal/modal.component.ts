import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { element } from 'protractor';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

  ngOnInit() {console.log(this.data)
  }

  result(){
    let data = this.data;
    let dataSend = [];
    for(let element in data ){
      dataSend.push(JSON.stringify(data[element]));
    }console.log(dataSend)
    this.router.navigate(['/results'],{ queryParams:{ dataSend } })
  }

}
