//Abrir la base de datos
let db;
let request = window.indexedDB.open("DatabaseTest");
request.onerror = function(event) {
  console.log("error: ");
};
 
request.onsuccess = function(event) {
  db = request.result;
  console.log("success: "+ db);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    let objectStore = db.createObjectStore("text", {keyPath: "id"});
};


//websocket

let ws = new WebSocket("ws://echo.websocket.org/");

ws.onopen = function (e){
  console.log("CONNECTED");
};

ws.onclose = function (e){
  console.log("DISCONNECTED");
};

ws.onmessage = function (e){
  console.log("echo: " + e.data);
};

//Dibujar en el canvas

function randomColor() { // http://www.paulirish.com/2009/random-hex-color-code-snippets/
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}


// Function to fill background color
function fillBackgroundColor(canvas, context) {
  // Get the selected background color and set it on canvas
  context.fillStyle = randomColor();
  context.fillRect(0, 0, canvas.width, canvas.height);
}


// Function to draw Square on canvas
function drawSquare(canvas, context, fill) {
  // Here we created a random width and height for a square
  let w = Math.floor(Math.random() * 40);
  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height);

  // Draw the actual square
  context.beginPath();
  context.rect(x, y, w, w);
  if(fill) {context.fill();} else {context.stroke();}
}

// Function to draw Circle on canvas
function drawCircle(canvas, context, fill) {
  // Here we created a random raidus for circle
  let radius = Math.floor(Math.random() * 40);
  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height);
  
  context.beginPath();
  context.arc(x, y, radius, 0, 360 * Math.PI / 180, true);

  if(fill) {context.fill();} else {context.stroke();}
}


//Modulo de angular

let review = angular.module('APIreview', ["ngStorage"]);
review.controller('reviewCtrl', function($scope, $localStorage){

  //Funciones para guardar y borrar el texto
  //TODO: meter los handlers de success y error que faltan.

  $scope.$storage = $localStorage;

  $scope.saveContents = function(){
    $scope.$storage.contents = $scope.text;
    let transaction = db.transaction(["text"], "readwrite");
    let os = transaction.objectStore("text");
    let getRequest = os.get(0);

    getRequest.onsuccess = function(event){
      let data;
      if(getRequest.result){
        data = getRequest.result;
        data.content = $scope.text;
      } else {
        data = {id: 0 , content : $scope.text};

      };
      let updateRequest = os.put(data);
    };    
  };

  $scope.clearContents = function(){
    delete $scope.$storage.contents;

    let transaction = db.transaction(["text"], "readwrite");
    let os = transaction.objectStore("text");
    let getRequest = os.get(0);

    getRequest.onsuccess = function(event){
      if(getRequest.result){
        deleteRequest = os.delete(0);
      };
    };
  }

  //Drag and drop de archivos

  let holder = document.getElementById("holder");

  holder.ondragover = function() {
      this.className = 'hover';
      return false;
  };
  holder.ondragend = function() {
      this.className = '';
      return false;
  };
  holder.ondrop = function(e) {
      this.className = '';
      e.stopPropagation();
      e.preventDefault();

      let file = e.dataTransfer.files[0],
          reader = new FileReader();
      reader.onload = function(event) {
          console.log(event.target);
          holder.innerText = event.target.result;
      };
      console.log(file);


      reader.readAsText(file);

      return false;
  };

  $scope.wsEcho = function(){
      if ($scope.text) {ws.send($scope.text);}
      else {ws.send("default message")};
    };

  $scope.drawShapes = function() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    /*  We're adding the call to fillBackgroundColor before we draw square or cirle
    So it covers up the previous drawing and gives us a clean background for our new drawing
    */
    fillBackgroundColor(canvas, context);

    // Check if the selected shape is square or circle
    for (let i = 0; i < 20; i++) {

      let shape = Math.random() < 0.5 ? "square" : "circle";
      let fill = Math.random() < 0.5 ? true : false;
      context.fillStyle = context.strokeStyle = randomColor();

      if (shape == "square") {drawSquare(canvas, context, fill);}

      if (shape == "circle") {drawCircle(canvas, context, fill);}
    }
  };

});