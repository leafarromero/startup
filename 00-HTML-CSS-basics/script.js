function FadeIn(id){
  let element = document.getElementById(id);
  element.style.transition = "opacity 3.0s linear 1s";
  element.style.opacity = 1;      
}

function joke(){
  
  let response = ajaxCall({method:"GET", url:"http://api.icndb.com/jokes/random"});
  response.then(function(res){
    text = JSON.parse(res);
    document.getElementById("joke").innerHTML = text.value.joke;
  })
  .catch( function(res){
    let element = document.getElementById("fade");
    element.style.color = "Red";
  });
}

function repoSearch(){
  let oldList = document.getElementById("repoList");
  if (oldList) {
    document.body.removeChild(oldList);
  }
  let response = ajaxCall({method:"GET", url:"https://api.github.com/search/repositories?q='JavaScript"});
  response.then(function(res){
    //console.log(res);
    
    let repoResponse = JSON.parse(res);

    let section = document.createElement("section");
    section.style.float = "right";
    section.id = "repoList";
    document.body.appendChild(section);
    
    let list = document.createElement("ul");
    list.style.listStylePosition = "inside";
    list.style.float = "right";
    section.appendChild(list);

    for (let i = 0; i <= repoResponse.items.length - 1; i++) {
      let fullName = repoResponse.items[i].full_name;
      let li = document.createElement("li");
      li.innerHTML = fullName
      list.appendChild(li);
    }
  });
}

function ajaxCall(conf){
  return new Promise(function (resolve, reject) {
    if(!conf.async){
    conf.async = true;
    }

    let xhttp = new XMLHttpRequest();
    xhttp.open(conf.method, conf.url, conf.async);
    switch(conf.method){
      case "POST" :
        xhttp.send(conf.params);
        break;
      
      case "GET" :
      default :
        xhttp.send();
        break;
      
    }
    
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
