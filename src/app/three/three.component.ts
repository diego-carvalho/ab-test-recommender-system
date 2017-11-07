import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css']
})
export class ThreeComponent implements OnInit {
  
  public q1 : any;
  public q2 : any;
  public q3 : any;
  public q4 : any;
  public q5 : any;
  public q6 : any;
  public comments: string = "";

  private modalRef: any;
  public closeResult: string; 

  public user: any = undefined;

  constructor(private router: Router, private angFireData: AngularFireDatabase,
              private modalService: NgbModal,) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.user = localStorage.getItem('user');
  }

  sendEvaluation(){
    if(!this.q1){
      //return this.errorParams('1');
      this.q1 = 'sem resposta'
    }
    if(!this.q2){
      //return this.errorParams('2');
      this.q2 = 'sem resposta'
    }
    if(!this.q3){
      //return this.errorParams('3');
      this.q3 = 'sem resposta'
    }
    if(!this.q4){
      //return this.errorParams('4');
      this.q4 = 'sem resposta'
    }
    if(!this.q5){
      //return this.errorParams('5');
      this.q5 = 'sem resposta'
    }
    if(!this.q6){
      //return this.errorParams('6');
      this.q6 = 'sem resposta'
    }
    console.log("Page three Ok");
    console.log(this.comments);

    this.angFireData.database.ref('/Users/' + this.user +'/PageThree').set({
      question1: this.q1,
      question2: this.q2,
      question3: this.q3,
      question4: this.q4,
      question5: this.q5,
      question6: this.q6,
      comments: this.comments,
    }).then((res) => {
      this.router.navigate(['/four']);
    }).catch((err) => {
      console.log("Erro na pagina 3: " + err);
    })

  }

  errorParams(q){
    alert("Por favor escolha uma das opções na pergunta " + q);
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
