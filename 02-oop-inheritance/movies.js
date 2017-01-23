class EventEmitter {

  constructor(){
    this.listeners = {};
  }

  on(type, listener){
    if(!(type in this.listeners)){
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
  }

  emit(type){
    if(!(type in this.listeners)){
      return;
    }
    let list = this.listeners[type];
    for (var i = 0; i < list.length; i++) {
      list[i].call(this, type);
    }
  }

  off(type, listener){
    if(!(type in this.listeners)) {
    return;
  }

    let list = this.listeners[type];
    for(var i = 0, l = list.length; i < l; i++) {
      if(list[i] === listener){
        list.splice(i, 1);
        return this.off(type, listener);
      }
    }
  }

}

class movie extends EventEmitter {

  constructor(title, year, duration){
    super();
    this.title = title;
    this.year = year;
    this.duration = duration;
    
  }
  
  play(){
    this.emit("play");
  }
  pause(){
    this.emit("pause");
  }
  resume(){
    this.emit("resume");
  }

}

class logger {

  constructor(){}

  log(info){
    console.log("The '" +info+"' event has been emitted");
  }

}


function test(){

  let movie1 = new movie("The godfather", 1980, 120);
  let movie2 = new movie("Terminator", 1984, 90);
  let movie3 = new movie("Casablanca", 1960, 120);

  let logger1 = new logger();
  let logger2 = new logger();

  movie1.on("play", logger1.log);
  movie2.on("resume", logger2.log);
  movie3.on("pause", logger1.log);

  movie1.play();
  movie2.resume();
  movie3.play();

  movie2.off("resume", logger2.log);


  movie1.play();
  movie2.resume();
  movie3.pause();


}