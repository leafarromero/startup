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
    this.cast = [];
    
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

  addCast(otherCast){
    if(typeof(otherCast) === actor){
      this.cast.push(otherCast);
    }else{
      this.cast = this.cast.concat(otherCast);
    }
  }

}

class logger {

  constructor(){}

  log(info){
    console.log("The '" +info+"' event has been emitted");
  }

}

class actor {
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
}

let social = {
  likes: function(friendName){
    console.log(`${friendName} likes ${this.title}`);
  },

  share: function(friendName){
    console.log(`Share ${this.title} with ${friendName}`);
  }
}


function test(){

  let movie1 = new movie("The godfather", 1972, 178);
  let movie2 = new movie("Terminator", 1984, 108);
  let movie3 = new movie("Casablanca", 1942, 102);

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


  movie1 = Object.assign(movie1, social);
  movie1.likes("Agustin");
  movie1.share("Martin");

  let pacino = new actor("Al Pacino", 76);
  let otherCast = [
    new actor("Marlon Brando", 80),
    new actor("Robert Duvall", 86),
    new actor("James Caan", 76),
  ]

  movie1.addCast(pacino);
  movie1.addCast(otherCast);

}