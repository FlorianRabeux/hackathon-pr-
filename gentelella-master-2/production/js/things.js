$(document).ready(function() { 

	var data = null;

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === 4) {
	  	var jsonResponse = JSON.parse(this.responseText);
	  	for (i = 0; i < jsonResponse.length; i++) {
		    console.log(jsonResponse[i]);
		    $("#things").append("<div class=\"col-md-4 col-sm-4 col-xs-12 profile_details\"> <div class=\"well profile_view\"> <div class=\"col-sm-12\"> <h4 class=\"brief\"><i>En sécurité</i></h4> <div class=\"left col-xs-7\"> <h2>"+jsonResponse[i].name+"</h2> <p><strong>Régle courante : </strong>"+jsonResponse[i].currentRule+"</p> <ul class=\"list-unstyled\"> <li><i class=\"fa fa-clock-o\"></i> De "+jsonResponse[i].timeFrom+" à "+jsonResponse[i].timeTo+"</li> </ul> <p>"+jsonResponse[i].description+"</p> </div> <div class=\"right col-xs-5 text-center\"> <img id=\"img"+i+"\" src=\"images/img.jpg\" alt=\"\" class=\"img-circle img-responsive\"> </div> </div> <div class=\"col-xs-12 bottom text-center\"> </i> </button> <button type=\"button\" class=\"btn btn-primary btn-xs\"> <i class=\"fa fa-user\"> </i> Afficher les details </button> </div> </div> </div> </div>");
		}
	    
	  }
	});

	xhr.open("GET", "http://localhost:8080/things");
	xhr.setRequestHeader("cache-control", "no-cache");
	xhr.setRequestHeader("postman-token", "69be90e5-1cbf-a061-e8c4-5d9bd0d5b993");

	xhr.send(data);

	$("input").change(function(e) {

    for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
        
        var file = e.originalEvent.srcElement.files[i];
        
        var reader = new FileReader();
        reader.onloadend = function() {
             $("#img0").attr('src',reader.result);
        }
        reader.readAsDataURL(file);
        //$("input").after($("#img0"));
    }
});
	
});