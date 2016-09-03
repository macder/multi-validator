const Validator = require('./forms/MainValidator.es6');

class Init {
  constructor() {
    
  }

  start() {
    new Validator();
    //console.log(validate);  
  }
}

const App = new Init();
App.start();
