function FadeIn(id){
  let element = document.getElementById(id);
  element.style.transition = "opacity 3.0s linear 1s";
  element.style.opacity = 1;      
}

function joke(){
  
  let response = ajaxCall({method:"GET", url:"http://api.icndb.com/jokes/random"});
  response.then( function(res){
    text = JSON.parse(res);
    document.getElementById("joke").innerHTML = text.value.joke
  });
}

function ajaxCall(conf){
  return new Promise(function (resolve, reject) {
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
  });
}