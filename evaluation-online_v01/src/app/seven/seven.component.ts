import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-seven',
  templateUrl: './seven.component.html',
  styleUrls: ['./seven.component.css']
})
export class SevenComponent implements OnInit {

  public um : any;
  public dois : any;
  public tres : any;
  public quatro : any;
  public cinco : any;
  public seis : any;
  public sete : any;

  public user: any = undefined;

  private modalRef: any;
  public closeResult: string;  

  constructor(private router: Router, private angFireData: AngularFireDatabase,
              private modalService: NgbModal,) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.user = localStorage.getItem('user');
  }

  sendEvaluation(){
    if(!this.um){
      //return this.errorParams('1');
      this.um = 'sem resposta'
    }
    if(!this.dois){
      //return this.errorParams('2');
      this.dois = 'sem resposta'
    }
    if(!this.tres){
      //return this.errorParams('3');
      this.tres = 'sem resposta'
    }
    if(!this.quatro){
      //return this.errorParams('4');
      this.quatro = 'sem resposta'
    }
    if(!this.cinco){
      //return this.errorParams('5');
      this.cinco = 'sem resposta'
    }
    if(!this.seis){
      //return this.errorParams('6');
      this.seis = 'sem resposta'
    }
    if(!this.sete){
      //return this.errorParams('6');
      this.sete = 'sem resposta'
    }

    this.angFireData.database.ref('/Users/' + this.user +'/PageSeven').set({
      question1: this.um,
      question2: this.dois,
      question3: this.tres,
      question4: this.quatro,
      question5: this.cinco,
      question6: this.seis,
      question7: this.sete,
    }).then((res) => {
      this.router.navigate(['/end']);
    }).catch((err) => {
      console.log("Erro na pagina 6: " + err);
    })
  }

  errorParams(q){
    alert("Por favor responda a pergunta " + q);
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
