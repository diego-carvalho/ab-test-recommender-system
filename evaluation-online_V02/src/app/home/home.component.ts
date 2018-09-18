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

  public term: boolean = false;
  private modalRef: any;
  public closeResult: string; 

  public intr:any = undefined; 

  constructor(private router: Router, private angFireData: AngularFireDatabase,
              private modalService: NgbModal,
              ) { }


  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  ngOnInit() {

    window.scrollTo(0, 0);
    this.angFireData.database.ref('AB/').once('value')
      .then((res) => {
        this.intr = res.val().interator;
      })
      .catch((err) => {
        console.log("Error em pegar o interator do AB test");
      }
    );
    this.intr = 1;
  }

  goNext(content){
    console.log(this.intr)
    if (this.term){
      if(this.intr != undefined){

        /*this.angFireData.database.ref('AB').set({
          interator: this.intr + 1
        }).then((res) => {
          localStorage.setItem('interator', this.intr);
          this.router.navigate(['/two']);
        }).catch((err) => {
          console.log("Erro ao atualizar valor de intr: " + err);
        })*/
        console.log("AQUI")
        localStorage.setItem('interator', this.intr);
        this.router.navigate(['/two']);
      }else{
        this.router.navigate(['/home']);
      }
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
