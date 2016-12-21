/* clock.js */
setInterval(function () {
	var currentDate = new Date();
   // document.getElementById('clock').value = currentDate;
    document.getElementById('clock').innerHTML = currentDate;
	console.log("clock="+ currentDate);
	//clock.value = currentDate;

}, 1000);