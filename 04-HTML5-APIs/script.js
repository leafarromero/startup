//Prefijos de implementacion para indexedDB

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

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


});
