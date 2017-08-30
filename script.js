$(document).ready(function () {
    var alert = $("#alert")[0];
    $("input").keypress(function (charCode) {
        var char = String.fromCharCode(charCode.which);
        if ("0123456789".indexOf(char) < 0) {
            return false;
        }
    });

    $("#stopButton, #parserSession, #parserBreak, #work, #break, #breakOver, #advice ").hide();


    $("#startButton").click(function () {
        if ($("input").val() === "") {
            $("#advice").show();
            $("#advice").html("Type in a Number");
        } else {
            $("#startButton, #advice, #breakOver").hide();
            $("#sessionTimeDisplay").show();
            var sessionTimeToParse = $("#parserSession").html($("#sessionTime").val());
            var breakTimeToParse = $("#parserBreak").html($("#breakTime").val());
            var sessionTime = parseInt($("#parserSession").html());
            var breakTime = parseInt($("#parserBreak").html());

            var sessionInterval = setInterval(sessionCountdown, 1000)

            sessionTime *= 60;
        }

        function sessionCountdown() {
            $("#stopButton, #work").show();
            $("#work").html("Get to Work!");
            $("#stopButton").click(function () {
                clearInterval(sessionInterval);
                $("#sessionTimeDisplay").html("Starting Now");
                $("#stopButton, #sessionTimeDisplay, #work").hide();
                $("#startButton").show();
            });
            if (sessionTime % 60 >= 10) {
                $("#sessionTimeDisplay").html("Session Time: " + Math.floor(sessionTime / 60) + ":" + sessionTime % 60);
            } else {
                $("#sessionTimeDisplay").html("Session Time: " + Math.floor(sessionTime / 60) + ":0" + sessionTime % 60);
            }
            sessionTime--;
            if ($("#sessionTimeDisplay").html() === "Session Time: 0:00") {
                alert.play();
                clearInterval(sessionInterval);
                $("#sessionTimeDisplay, #work, #stopButton").hide();
                $("#sessionTimeDisplay").html("Starting");
                var breakInterval = setInterval(breakCountdown, 1000);
                breakTime *= 60;
            }


            function breakCountdown() {
                $("#breakTimeDisplay, #break, #stopButton").show();
                $("#break").html("Take a Break!");
                $("#stopButton").click(function () {
                    clearInterval(breakInterval);
                    $("#stopButton, #breakTimeDisplay, #break").hide();
                    $("#startButton").show();
                });
                if (breakTime % 60 >= 10) {
                    $("#breakTimeDisplay").html("Break Time: " + Math.floor(breakTime / 60) + ":" + breakTime % 60);
                } else {
                    $("#breakTimeDisplay").html("Break Time: " + Math.floor(breakTime / 60) + ":0" + breakTime % 60);
                }
                breakTime--;
                if ($("#breakTimeDisplay").html() === "Break Time: 0:00") {
                    alert.play();
                    clearInterval(breakInterval);
                    $("#breakTimeDisplay, #stopButton, #break").hide();
                    $("#startButton, #breakOver").show();
                    $("#breakOver").html("Break Time is Over! Go again?");

                }
            }
        }
    });
});
