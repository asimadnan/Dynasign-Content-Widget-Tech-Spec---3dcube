function DateTimeUtil() {

	var self = this;
	
	// return current time in YYYYMMDDHHMMSS
	this.getCurrentTime = function() { 
		var d = new Date();
		var vYear = d.getFullYear();
		var vMon = d.getMonth() + 1;
		var vDay = d.getDate();
		var h = d.getHours(); 
		var m = d.getMinutes(); 
		var se = d.getSeconds(); 
		s=vYear+(vMon<10 ? "0" + vMon : vMon)+(vDay<10 ? "0"+ vDay : vDay)+(h<10 ? "0"+ h : h)+(m<10 ? "0" + m : m)+(se<10 ? "0" +se : se);
		return s;
	}

	this.getMonthString = function(date){
		var month = date.getMonth()+1;
		var monthString = "";
		if(month<=12&&month>0)
			{
				switch(month)
				{
					case 1:
						monthString = "Janary";
						break;
					case 2:
						monthString = "February";
						break;
					case 3:
						monthString = "March";
						break;
					case 4:
						monthString = "April";
						break;
					case 5:
						monthString = "May";
						break;
					case 6:
						monthString = "June";
						break;
					case 7:
						monthString = "July";
						break;
					case 8:
						monthString = "August";
						break;
					case 9:
						monthString = "September";
						break;
					case 10:
						monthString = "October";
						break;
					case 11:
						monthString = "November";
						break;
					case 12:
						monthString = "December";
						break;
					default:
						monthString = "Janary";
						break;
				}
			}
			return monthString;
	}

	this.getWeekString = function(date){
		var week = date.getDay();
		var weekString = "";
		if(week<=6&&week>=0)
			{
				switch(week)
				{
					case 0:
						weekString = "Sunday";
						break;
					case 1:
						weekString = "Monday";
						break;
					case 2:
						weekString = "Tuesday";
						break;
					case 3:
						weekString = "Wednesday";
						break;
					case 4:
						weekString = "Thursday";
						break;
					case 5:
						weekString = "Friday";
						break;
					case 6:
						weekString = "Saturday";
						break;
					default:
						weekString = "Sunday";
						break;
				}
			}
			return weekString;
	}

	this.getMonthStringShort = function(date){
		var month = date.getMonth()+1;
		var monthString = "";
		if(month<=12&&month>0)
			{
				switch(month)
				{
					case 1:
						monthString = "Jan";
						break;
					case 2:
						monthString = "Feb";
						break;
					case 3:
						monthString = "Mar";
						break;
					case 4:
						monthString = "Apr";
						break;
					case 5:
						monthString = "May";
						break;
					case 6:
						monthString = "Jun";
						break;
					case 7:
						monthString = "Jul";
						break;
					case 8:
						monthString = "Aug";
						break;
					case 9:
						monthString = "Sept";
						break;
					case 10:
						monthString = "Oct";
						break;
					case 11:
						monthString = "Nov";
						break;
					case 12:
						monthString = "Dec";
						break;
					default:
						monthString = "Jan";
						break;
				}
			}
			return monthString;
	}

	this.getWeekStringShort = function(date){
		var week = date.getDay();
		var weekString = "";
		if(week<=6&&week>=0)
			{
				switch(week)
				{
					case 0:
						weekString = "Sun";
						break;
					case 1:
						weekString = "Mon";
						break;
					case 2:
						weekString = "Tues";
						break;
					case 3:
						weekString = "Wed";
						break;
					case 4:
						weekString = "Thur";
						break;
					case 5:
						weekString = "Fri";
						break;
					case 6:
						weekString = "Sat";
						break;
					default:
						weekString = "Sun";
						break;
				}
			}
			return weekString;
	}

	this.getTimeHourMin = function(date,timeFormat){
		var h = date.getHours(); 
		var m = date.getMinutes();
		if(timeFormat == "HH12MM")
			{
				if(h == 0)
				{
					h = 12;
				}
			}
		s=h+":"+(m<10 ? "0" + m : m);
		return s;
	}

	this.getTimeHourMinSec = function(date,timeFormat){
		var h = date.getHours(); 
		var m = date.getMinutes();
		var se = date.getSeconds(); 
		if(timeFormat == "HH12MMSS")
			{
				if(h == 0)
				{
					h = 12;
				}
			}
		s=h+":"+(m<10 ? "0" + m : m)+":"+(se<10 ? "0" +se : se);
		return s;
	}

	this.checkDateIsValid = function(targetYear, targetMonth, targetDay){
		var isValidDate = true;
		if(targetMonth == 2 && targetDay > 29)
			{
				isValidDate = false;
			}

			if(targetMonth == 2 && targetDay == 29)
			{
				if(!isNaN(targetYear))
				{
					if((targetYear%4==0 && targetYear%100!=0)||(targetYear%100==0 && targetYear%400==0))
					{
						
					}
					else
					{
						isValidDate = false;
					}
				}
				else
				{
					isValidDate = false;
				}
			}

			if(targetDay == 31)
			{
				if(targetMonth == 1 || targetMonth == 3 || targetMonth == 5 || targetMonth == 7 || targetMonth == 8 || targetMonth == 10 || targetMonth == 12)
				{
					
				}
				else
				{
					isValidDate = false;
				}
			}
			return isValidDate;
	}

	this.duration = function (d1, d2)
		{
            return Math.floor((d2.getTime() - d1.getTime())/1000);
        }
}

