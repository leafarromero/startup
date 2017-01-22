function FadeIn(id){
  let element = document.getElementById(id);
  element.style.transition = "opacity 3.0s linear 1s";
  element.style.opacity = 1;      
}

function joke(){
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://api.icndb.com/jokes/random", true);
  xhttp.onload = function() {
    const text = JSON.parse(xhttp.responseText);
    document.getElementById("joke").innerHTML = text.value.joke;
  };
  xhttp.send();

}

function ajaxCall(conf:Object){
  return new Promise(resolve, reject){
    if(!conf.async){
    conf.async = true;
    }

    let xhttp = new XMLHttpRequest();
    xhttp.open(conf.method, conf.url, conf.async);
    xhttp.send();
    xhttp.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhttp.response);
      }else{
        reject(this.status);
      }
    };
    xhttp.onerror = function() {
      reject(this.status);
    };
  }
}