import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ObjPageFiveService } from '../obj-page-five.service';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-six',
  templateUrl: './six.component.html',
  styleUrls: ['./six.component.css']
})
export class SixComponent implements OnInit {

  listOfObjects = [];
  listOfAllIds = [];
  listOfIds = [];
  listOfItems = [];
  public time: any;

  public user: any = undefined;
  public movie : any;

  private modalRef: any;
  public closeResult: string;  

  constructor(private router: Router, private angFireData: AngularFireDatabase,
              private modalService: NgbModal, private objService: ObjPageFiveService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.user = localStorage.getItem('user');
    this.listOfObjects = this.objService.getObjs();
    this.listOfAllIds = this.objService.getAllIds();

    this.time = new Date().getTime();
    console.log(this.time)
  }

  changeCheckbox(e, obj){
    if(e.target.checked){
      this.checkEquivality(obj, true);
    }else{
      this.checkEquivality(obj, false);
    }
  }

  checkEquivality(obj, opc){
    if(opc){
      this.listOfItems.push(obj.id);
    }else{
      let index = -1;
      index = this.listOfItems.indexOf(obj.id);
      if(index != -1){
        this.listOfItems.splice(index, 1);
      }
    }
    console.log("Items: ", this.listOfItems);
  }

  sendEvaluation(){

    this.time = new Date().getTime() - this.time;
    console.log(new Date().getTime())

    this.addIdsForSelectItems();

    this.angFireData.database.ref('/Users/' + this.user +'/PageSix').set({
      time: this.time,
      items: this.listOfIds,
      itemsInteration: this.listOfItems
    }).then((res) => {
      this.router.navigate(['/seven']);
    }).catch((err) => {
      console.log("erro na pagina 6: " + err);
    });
    
  }

  addIdsForSelectItems() {

    for(let i of this.listOfItems){
      for(let j of this.listOfAllIds){
        for(let val of j){
          if(i == val){
            this.listOfIds.push(j);
          }
        }
      }
    }
    
  }

  leaveSystem(content){
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      if(result == "CONFIRM"){

        this.router.navigate(['/end']);

      }else{
        console.log(`Closed with: ${result}`);
      }
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  open(content, obj) {
    this.movie = obj;

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
