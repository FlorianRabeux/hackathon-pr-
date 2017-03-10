$(document).ready(function() { 

	rulesReceive = null;
	selectedRuleId = null;
	circle = null;

	$(".buttonView").click(function() {
		alert("ADD");

		thing.setMap(null);
		cityCircle.setMap(null);
   /*thing = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(51.508742,-0.120850),
                zindex: 100
            });*/
        });

	updateRules();
	setInterval(updateRules, 10000);

	center = true;

	map.addListener('mouseover', function() {
		center = false;
	});

	map.addListener('mouseout', function() {
		center = true;
	});

	

	$("#myModal").on("shown.bs.modal", function () {



		google.maps.event.trigger(map2, "resize");

		var drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode: google.maps.drawing.OverlayType.MARKER,
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.TOP_CENTER,
				drawingModes: [
				google.maps.drawing.OverlayType.CIRCLE]
			},
			circleOptions: {
				fillColor: '#ffff00',
				fillOpacity: 1,
				strokeWeight: 5,
				clickable: false,
				editable: true,
				zIndex: 10000000000
			}
		});    

		drawingManager.setMap(map2);
		google.maps.event.addListener(drawingManager, 'circlecomplete', onCircleComplete);


	});

	

});

function onCircleComplete(shape) {
	if (shape == null || (!(shape instanceof google.maps.Circle))) return;

	if (circle != null) {
		circle.setMap(null);
		circle = null;
	}

	circle = shape;
	console.log('radius', circle.getRadius());
	console.log('lat', circle.getCenter().lat());
	console.log('lng', circle.getCenter().lng());
}  

function mapCenter(mustCenter)
{
	alert(mustCenter);
	if(mustCenter === true)
	{
		center = true;
	}
	else
	{
		center = false;
	}
}

function addMarkerThing(Lat,Lng, titleName) {

	var infowindow = new google.maps.InfoWindow({
		content: "User"
	});


	thing = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(Lat,Lng),
		zindex: 100,
		label:titleName
	});

	thing.addListener('click', function() {
		infowindow.open(map, thing);
	});
}

function addMarkerZone(Lat,Lng, titleName) {

	var infowindow = new google.maps.InfoWindow({
		content: "Authorized area"
	});


	zone = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(Lat,Lng),
		zindex: 100,
		label:titleName
	});

	zone.addListener('click', function() {
		infowindow.open(map, zone);
	});
}

function addCircle(Lat, Lng, color, radiusMeter) {
	var sunCircle = {
		strokeColor: "#c3fc49",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#c3fc49",
		fillOpacity: 0.35,
		map: map,
		center: new google.maps.LatLng(Lat,Lng),
		radius: radiusMeter
	};
	cityCircle = new google.maps.Circle(sunCircle) 
}

function deleteMarker() {
	thing.setMap(null);
	zone.setMap(null);
}

function deleteCircle() {
	cityCircle.setMap(null);
}

function updateRules() {
	console.log("update");

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			var jsonResponse = JSON.parse(this.responseText);

			rulesReceive = jsonResponse;

			$("#rules").empty();
			for (i = 0; i < jsonResponse.length; i++) {
				addRule(jsonResponse[i]);
				var toggleId = "#toggle"  +jsonResponse[i].id;
				var notificationEnable = jsonResponse[i].notificationEnable ? "on" : "off";

				$(toggleId+"").bootstrapToggle(notificationEnable);

				if(selectedRuleId == null || selectedRuleId === jsonResponse[i].id)
				{
		    	// remove Marker
		    	deleteMarker();
		    	// remove circle
		    	//deleteCircle();

		    	// centerMap
		    	// add circle
		    	addCircle(jsonResponse[i].zone.lat, jsonResponse[i].zone.lng,null, 30);
		    	addMarkerZone(jsonResponse[i].zone.lat, jsonResponse[i].zone.lng, "Z");
		    	addMarkerThing(jsonResponse[i].userPosition.lat, jsonResponse[i].userPosition.lng, "U");
		    	// add marker
		    	//addMarker()
		    	selectedRuleId = jsonResponse[i].id;

		    	var bounds = new google.maps.LatLngBounds();
				//addMarker(jsonResponse.Lat,jsonResponse.Lng, 'U');



				
				bounds.extend(new google.maps.LatLng(cityCircle.getCenter().lat(),cityCircle.getCenter().lng()));
				bounds.extend(thing.getPosition());

				//var extendPoint = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.002, bounds.getNorthEast().lng() + 0.001);
   				//bounds.extend(extendPoint);
   				if(center !== false)
   				{
   					map.fitBounds(bounds);
   				}

   			}

   			$(".viewPosition").click(function() {

   				var idClick = this.id.replace("view", "");
   				selectedRuleId = idClick;

   				updateRules();
   			});
   		}



	    //$('#toggleId1').bootstrapToggle();
	    //$('.toggleNotification').bootstrapToggle();
	    
	}
});

	xhr.open("GET", "http://localhost:8080/rules");
	xhr.setRequestHeader("cache-control", "no-cache");
	xhr.setRequestHeader("postman-token", "69be90e5-1cbf-a061-e8c4-5d9bd0d5b993");

	var send = null;
	xhr.send(send);
}

function addRule(rule) {

	

	var data = "<tr><td>#</td><td><a class=\"titleRule\">"+rule.name+"</a></td><td><p class=\"textRule\">De "+rule.dateFrom+" à "+rule.dateTo +"</p><div class=\"btn-group\" role=\"group\" aria-label=\"First group\">";

	if(rule.days[0].enable === true)
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-success\">L</button>"
	}
	else
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-default\">L</button>"
	}

	if(rule.days[1].enable === true)
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-success\">M</button>"
	}
	else
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-default\">M</button>"
	}

	if(rule.days[2].enable === true)
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-success\">M</button>"
	}
	else
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-default\">M</button>"
	}

	if(rule.days[3].enable === true)
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-success\">J</button>"
	}
	else
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-default\">J</button>"
	}

	if(rule.days[4].enable === true)
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-success\">V</button>"
	}
	else
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-default\">V</button>"
	}

	if(rule.days[5].enable === true)
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-success\">S</button>"
	}
	else
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-default\">S</button>"
	}

	if(rule.days[6].enable === true)
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-success\">D</button>"
	}
	else
	{
		data += "<button type=\"button\" class=\"btn btn-default btn-sm btn-default\">D</button>"
	}

	data += "</div></td><td><p class=\"textRule\">";

	if(rule.email === true)
	{    
		data +="<i class=\"glyphicon glyphicon-envelope\">Email</i>"
	}
	if(rule.phone === true)
	{
		if(rule.email)
		{
			data +=",";
		}
		data += "<i class=\"glyphicon glyphicon-phone\">Phone</i>"
	}

	if(rule.notificationEnable === false)
	{
		data += "</p><input id=\"toggle"+rule.id+"\" class=\"toggleNotification\" data-onstyle=\"success\" data-size=\"small\" type=\"checkbox\" data-toggle=\"toggle\" data-on=\"Activées\" data-off=\"Désactivées\" ></td>"
	}
	else
	{
		data += "</p><input checked=true id=\"toggle"+rule.id+"\" class=\"toggleNotification\" data-onstyle=\"success\" data-size=\"small\" type=\"checkbox\" data-toggle=\"toggle\" data-on=\"Activées\" data-off=\"Désactivées\" ></td>"
	}
	

	data += "<td><p class=\"textRule\">"+ rule.description +"</p></td><td>";

	if(rule.state === "secure")
	{
		data += "<button type=\"button\" class=\"btn btn-success btn-xs\">Secure</button>"
	}
	if(rule.state === "unsecure")
	{
		data += "<button type=\"button\" class=\"btn btn-danger btn-xs\">Unsecure</button>"
	}
	if(rule.state === "inactive")
	{
		data += "<button type=\"button\" class=\"btn btn-defult btn-xs\">Incactive</button>"
	}

	data += "</td><td><p href=\"#\" id=\"view"+rule.id+"\" class=\"viewPosition btn btn-primary btn-xs buttonView\"><i class=\"fa fa-folder\"></i> Afficher </p><a href=\"#\" class=\"btn btn-danger btn-xs\"><i class=\"fa fa-trash-o\"></i> Supprimer </a></td></tr>"

	$("#rules").append(data);

	//$("'."+ toggleId + "'").bootstrapToggle();
}
