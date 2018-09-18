import { Injectable } from '@angular/core';

@Injectable()
export class ObjPageFiveService {

  listOfObjects = []
  listOfAllIds = []
  
    constructor() { }
  
  
    setObj(objs){
      this.listOfObjects = objs
    }
    
    getObjs(){
      return this.listOfObjects
    }

    setAllIds(ids){
      this.listOfAllIds = ids
    }
    
    getAllIds(){
      return this.listOfAllIds
    }

}
