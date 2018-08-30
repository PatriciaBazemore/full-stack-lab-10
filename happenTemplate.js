var library = (function() {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var monthAbbrevs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	var dayAbbrevs = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

	function doubleDigit(value) {
		if (value.length === 1) {
			value = '0' + value;
		}
		return value;
	}

	function turnitTwelve(value) {
		if (value === 0) {
			value = 12
		};
	}

// function getOrdinal(value) {
	// 	var suffix;
	// 	var hundredPart = value % 100;
	// 	if (hundredPart > 9 && hundredPat < 21) {
	// 		suffix = 'th';
	// 	} else (value > 9 && value < 21) {
	// 		suffix = 'th';
	// 	} else  {
	// 		var digit = value % 10;   ///gives us last digit
	// 		if (digit === 1) {
	// 			suffix = 'st';
	// 		} else if (digit === 2) {
	// 			suffix = 'nd';
	// 		} else if (digit === 3) {
	// 			suffix = 'rd';
	// 		} else {
	// 			suffix = 'th';
	// 		}
	// 	}
	// 	return value + suffix;
	// }


  return {
	TimeStamp: (function(){
   	  return {
		UnixTimestamp: function(){
			var unixTimestampInSeconds = (new Date().getTime() / 1000);
			return Math.floor(unixTimestampInSeconds).toString();
		},
		UnixMillisecond: function(){
			return new Date().getTime().toString();
		}
	 }
	})(),
	Local: (function(){
	  return {
			Time: (function() {
		  	return {
	  	    WithSeconds: function(){   //return new Date().toLocaleTimeString();
					var timeWithSeconds = doubleDigit(new Date().getHours().toString() % 12) + ":" + doubleDigit(new Date().getMinutes().toString()) + ":" + doubleDigit(new Date().getSeconds().toString()) + " " + amPm();
					function amPm() {
						let hours = new Date().getHours();
						return (hours > 11) ? 'PM' : 'AM';
					};
					return timeWithSeconds;
					},

			// var timeString = "18:00:00";
			// var H = +timeString.substr(0, 2);
			// var h = H % 12 || 12;
			// var ampm = (H < 12 || H === 24) ? "AM" : "PM";
			// timeString = h + timeString.substr(2, 3) + ampm;
			
			
	   	    WithOutSeconds: function() {
						 //var d = new Date();
				   //var hours = d.getHours();
				   //hours %=12;  //hours = hours %12;
				   //if (hours === 0) {
					   //hours =12;
				   //}
				   var timeWithoutSeconds = doubleDigit(new Date().getHours().toString()) % 12 + ":" + doubleDigit(new Date().getMinutes().toString()) + " " + amPm();
				   function amPm() {
						let hours = new Date().getHours();
						return (hours > 11) ? 'PM' : 'AM';
				   };		
				   return timeWithoutSeconds;
					 }
		  }
		})(),
		MDY: (function(){
	  	  return {
		    Numeral: function(){
					var d = new Date();
					var month = d.getMonth() + 1;
					var day = d.getDate();
					var year = d.getFullYear();
					return month + '/' + day + '/' + year;
				},
				Name: function(){
					var d = new Date();
					var month = months[d.getMonth()];
					var day = d.getDate();
					var year = d.getFullYear();
					return month + ' ' + day + ', ' + year;
				}
		  }
		  })(),
		}
	})(),
	Second: (function(){
		return{
			Second: function(){
				return new Date().getSeconds().toString();
			},
			DblDigit: function(){
				var seconds = this.Second();
				return doubleDigit(seconds);
			}
		}
	})(),
	Minute: (function(){
		return{
			Minute: function(){
				return new Date().getMinutes().toString();
			},
			DblDigit: function(){
				return doubleDigit(this.Minute());
			}
		}
	})(),
	Hour: (function(){
		return {
			TwentyFourHour: function() {
				return new Date().getHours().toString();
			},
			TwelveHour: function() {
				let hours = new Date().getHours();
				hours = hours % 12; // hours = hours % 12;
				if (hours == 0) {
					hours = 12;
				}
				return hours.toString();
			},
			AMPM: (function() {
				return {
					UpperCase: function(){
						let hours = new Date().getHours();
						if (hours > 11) {
							return 'PM';
						}
						return 'AM';
					},
					LowerCase: function(){
						let hours = new Date().getHours();
						return (hours > 11) ? 'pm' : 'am';
					}
				}
			})()
		}
	})(),
	Week: (function(){
		return {
			DayOfWeek: function(){
				return days[new Date().getDay()];
			},
			AbrDayOfWeek: function(){
				//var day = this.DayOfWeek();
				//return day.substr(0, 3) //start index at 0 and take 3 characters 
				return dayAbbrevs[new Date().getDay()];
			},
			FirstTwoOfWeek: function(){
				var day = days[new Date().getDay()];
			  return day.substring(0, 2); //start at 0 index and take up to the end index but not the one at 2
			},
			WeekOfYear: function(){
				var newDate = new Date();
				var yearStart = new Date(newDate.getFullYear(),0,1);
    			return Math.ceil( ( ( (newDate - yearStart) / 86400000) + yearStart.getDay() + 1) / 7).toString();
			},
			// Date.prototype.getWeek = function() {
			// 	var onejan = new Date(this.getFullYear(), 0, 1);
			// 	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
			// }
		
			// var weekNumber = (new Date()).getWeek();
		

			// //var d = new Date();
				// //return (d.getWeek().toString());
				//  // Copy date so don't modify original
				//  var d = new Date(+d);
                //  d.setHours(0,0,0,0);
				//  // Set to nearest Thursday: current date + 4 - current day number
                //  // Make Sunday's day number 7
                //  d.setDate(d.getDate() + 4 - (d.getDay()||7));
				//  // Get first day of year
				//  var yearStart = new Date(d.getFullYear(),0,1);
				//     // Calculate full weeks to nearest Thursday
                //  return Math.ceil(( ( (d-yearStart) / 8.64e7) +1) /7);
				//  // Return array of year and week number
				 
// 	function getWeekNumber(d) {
//     // Copy date so don't modify original
//     d = new Date(+d);
//     d.setHours(0,0,0,0);
//     // Set to nearest Thursday: current date + 4 - current day number
//     // Make Sunday's day number 7
//     d.setDate(d.getDate() + 4 - (d.getDay()||7));
//     // Get first day of year
//     var yearStart = new Date(d.getFullYear(),0,1);
//     // Calculate full weeks to nearest Thursday
//     var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
//     // Return array of year and week number
//     return [d.getFullYear(), weekNo];
// }
		};
	})(),
	Month: (function(){
		return {
			DateOfMonth: (function(){
				return {
					Numeral: function(){
						return new Date().getDate().toString();
					},
					Ordinal: function(){
							var n = new Date().getDate();
      				var s = [ 'th', 'st', 'nd', 'rd' ];
      				var v = n % 100;
  						return n + (s[(v-20)%10] || s[v] || s[0]);
					},
					DateDblDigit: function(){
						var dates = this.Numeral();
						return doubleDigit(dates);
					},
				}
			})(),
			MonthNumber: function(){
				var d = new Date();
				// return '' + (d.getMonth() + 1);
				return (d.getMonth() + 1).toString();
			},
			MonthNumberDblDigit: function(){
				var months = this.MonthNumber();
				return doubleDigit(months);  //MonthNumber:
			},
			AbrOfCurrentMonth: function(){
				return monthAbbrevs[new Date().getMonth()];
			},
			CurrentMonth: function(){
				return months[new Date().getMonth()];
			},
		}
	})(),
	Year: (function(){
		return {
			DayOfYear: (function(){
				return {
					Numeral: function(){
						var now = new Date();
						var start = new Date(now.getFullYear(), 0, 0);
						var diff = now - start;
						var oneDay = 1000 * 60 * 60 * 24;
						var day = (Math.floor(diff / oneDay)).toString();
						return day;
					},
					Ordinal: function(){
							var now = new Date();
							var start = new Date(now.getFullYear(), 0, 0);
							var diff = now - start;
							var oneDay = 1000 * 60 * 60 * 24;
							var day = (Math.floor(diff / oneDay)).toString();
      				var s = [ 'th', 'st', 'nd', 'rd' ];
      				var v = day % 100;
  						return day + (s[(v-20)%10] || s[v] || s[0]);
						},
					}
			})(),
			YearFull: function(){
				return new Date().getFullYear().toString();
			},
			YearAbr: function(){
				var year = this.YearFull();
				return year.substr(-2);
			}
		}
	})(),
	Defaults: function(){	
		var thenewDate = new Date();
		return thenewDate.getFullYear().toString() + '-' + doubleDigit( (thenewDate.getMonth() + 1).toString() ) + '-' + doubleDigit(thenewDate.getDate().toString())+'T'+doubleDigit(thenewDate.getHours().toString()) + ":" + doubleDigit(thenewDate.getMinutes().toString()) + ":" + doubleDigit(thenewDate.getSeconds().toString()) ;
	}

	
	
  }
})();

