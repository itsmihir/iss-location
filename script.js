var mymap = L.map('map').setView([0,0], 4);

var pointList = [];

var circle = L.circle([0, 0], {
	color: 'red',
	// fillColor: '#f03',
	fillOpacity: 0.153,
	radius: 800000 ,
}).addTo(mymap);

var myIcon = L.icon({
    iconUrl: 'image/iss.png',
    iconSize: [50,38],
    iconAnchor: [25, 25],
});
L.circleMarker([0,0],100);
var marker = L.marker([0,0],{icon: myIcon}).addTo(mymap);

async function getdata()
{
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    const data = await response.json();
    
    const {velocity,altitude,longitude,latitude,visibility,timestamp} = data;

    //time

    console.log(timestamp);
    
    var date=new Date(timestamp);
    var hours = date.getHours(); // minutes part from the timestamp
    var minutes = date.getMinutes(); // seconds part from the timestamp
    var seconds = date.getSeconds(); // will display time in 10:30:23 format
    var milli = date.getMilliseconds();
     var formattedTime = hours + ':' + minutes + ':' + seconds +':' + milli;



    document.querySelector('.time').innerHTML=`Time: ${formattedTime}`;
    document.querySelector('.long').innerHTML=`Longitude: ${longitude}`;
    document.querySelector('.lat').innerHTML=`Latitude: ${latitude}`;
    document.querySelector('.vis').innerHTML=`Visibility: ${visibility}`;
    document.querySelector('.alt').innerHTML=`Altitude: ${altitude} miles`;
    document.querySelector('.velocity').innerHTML=`Velocity: ${velocity} mph`;
    
    mymap.setView([latitude,longitude]);
   marker.setLatLng([latitude,longitude])
    
   circle.setLatLng([latitude,longitude])
  


   // path of the iss
    pointList.push([latitude,longitude]);
    var firstpolyline = new L.Polyline(pointList, {
        color: 'yellow',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    });
    firstpolyline.addTo(mymap);

//console.log(data);

}




function create_map()
{

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(mymap);

}


create_map();

// getdata();

setInterval(getdata,1000);

