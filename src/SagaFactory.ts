
import 'reflect-metadata';

export class SagaFactory {

    getSagas() {
      const me = Object.getPrototypeOf(this);
      const funcs = Object.getOwnPropertyNames(me);
      const sagas = {};
  
      funcs.forEach(func => {
        const isSaga = Reflect.getMetadata(SAGA_METADATA, this, func);
        if(isSaga===true)  {
          sagas[func] = this[func];
        }
      })
      return sagas;
    }

    static fromFactory(){
      
    }
  }