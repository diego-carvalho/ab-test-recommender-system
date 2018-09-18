import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  term: boolean = false;
  private modalRef: any;
  public closeResult: string; 

  constructor(private router: Router, private angFireData: AngularFireDatabase,
              private modalService: NgbModal,
              ) { }

  ngOnInit() {
    
  }

  goNext(content){
    if (this.term){
      this.router.navigate(['/one']);
    }else{
      this.open(content);
    }
  }

  changeCheckbox(e){
    if(e.target.checked){
      this.term = e.target.checked
    }else{
      this.term = e.target.checked
    }
  }
  
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
