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
