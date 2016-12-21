 /*
 * Dynasign Proprietary and Confidential
 * 
 * Dynasign © 2016 Dynasign Corporation 
 * All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Dynasign Corporation.
 * The intellectual and technical concepts contained
 * herein are proprietary to Dynasign Corporation
 * and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden without the prior written consent of Dynasign Corporation.
 */
var ajaxCallHandler;
    var timerHandler;

    var ajaxCallCount = 0;
    var timeOut = 15; //minutes
    var timeOutInSeconds = timeOut * 60000; //120000
    var timeWarnig = (timeOutInSeconds / 30000) - 2; //1 min before timeout

    function sessionReset() {
        //alert("sessionReset ajaxCallCount="+ajaxCallCount + " timeWarnig="+timeWarnig);
        ajaxCallCount = ajaxCallCount + 1;
		//console.log("ajaxCallCount="+ajaxCallCount+" timeWarnig="+timeWarnig);
        if (ajaxCallCount == (timeWarnig + 2)) {//time expires
            window.location.href = 'logout_do.php'; //redirect to session out
        }
        else if (ajaxCallCount == timeWarnig) {
            //$("#sessiontimeout-warnig").dialog('open');
            showTimeoutModal("<strong>Session Timeout Warning</strong>","<div class=\"alert alert-danger\"><p class=\"lead\">Your session is about to expire in <span id=\"the_time\" style=\"font-size: 28px;color:#000000;\"></span> seconds. <br /> Do you want to continue to work in the current session?</p></div>","<button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" onclick=\"resetHandlers();\">Yes</button>");
            timerClock();
        }

        $.ajax({ url: "check_server_session.php", type: "GET", cache: false, async: true });

        ajaxCallHandler = setTimeout(sessionReset, 30000);
    }

    ajaxCallHandler = setTimeout(sessionReset, 30000);
    $(document).bind('keypress.session', function (ed, e) { sessionKeyPressed(ed, e); });
    $(document).bind('mousedown.session', function (ed, e) { sessionMouseDown(ed, e); });

    var timer = 60;
    function timerClock() {
        timer = timer - 1;
        if (timer < 0) timer = 0;
        $('#the_time').html(timer);
        timerHandler = setTimeout(timerClock, 1000);
    }

    function resetHandlers() {
        $('#timeoutModal').modal('hide');
        ajaxCallCount = 0;
        timer = 60;
        clearTimeout(ajaxCallHandler);
        clearTimeout(timerHandler);
        ajaxCallHandler = setTimeout(sessionReset, 30000);
    }

    function sessionKeyPressed(ed, e) {
	
          resetHandlers();
    }

     function sessionMouseDown(ed, e) {
          resetHandlers();
    }




