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

let social = {
  likes: function(friendName){
    console.log(`${friendName} likes ${this.title}`);
  },

  share: function(friendName){
    console.log(`Share ${this.title} with ${friendName}`);
  }
}
