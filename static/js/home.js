$(document).ready(function () {
    var isAuth = false ;
    var errorBox = $("div.alert-danger") ;
    var successBox = $("div.alert-success") ;
    successBox.slideUp(1);
    errorBox.slideUp(1);
    console.log(successBox);
    $("#login").click(function () {
        console.log({ username : $("#username").val() ,password :  $("#password").val() }) ;
        $.post("/login" , { username : $("#username").val() ,password :  $("#password").val() } , function (data) {
            if (data['status']) {
                successBox.slideUp(1);
                errorBox.slideUp(1);
                successBox.html(data['msg']).slideDown(500) ;
                getInfo() ;
            }
            else {
                successBox.slideUp(1);
                errorBox.slideUp(1);
                errorBox.html(data['msg']).slideDown(500) ;
                getInfo() ;
            }
        })
    }) ;

    $("#signUp").click(function () {
        $.post("/signup" ,{ username : $("#signUpUser").val() , password :  $("#signUpPass").val() } , function (data) {
            if (data['status']) {
                successBox.slideUp(1);
                errorBox.slideUp(1);
                successBox.html(data['msg']).slideDown(500) ;
            }
            else {
                successBox.slideUp(1);
                errorBox.slideUp(1);
                errorBox.html(data['msg']).slideDown(500) ;
            }
        })
    }) ;

    $("#submitComment").click(function () {
        if (isAuth) {
            $.post("/submitComment", { msg: $("#msg").val() }, function (data) {
                console.log(data);
                if (data['status']) {
                    successBox.slideUp(1);
                    errorBox.slideUp(1);
                    successBox.html(data['msg']).slideDown(500) ;
                    getInfo() ;
                }
                else {
                    successBox.slideUp(1);
                    errorBox.slideUp(1);
                    errorBox.html(data['msg']).slideDown(500) ;
                    getInfo() ;
                }
                getComment();
            });
        }
        else {
            console.log(":| ") ;
        }
    }) ;

    $("#logout").click(function () {
        console.log("!!") ;
        $.post("/logout" , function (data) {
            $("#info").append("<p>" + data['status'] + " || " + data['msg'] + " </p>");
            if (data['status']) {
                successBox.slideUp(1);
                errorBox.slideUp(1);
                successBox.html(data['msg']).slideDown(500) ;
                getInfo() ;
            }
            else {
                successBox.slideUp(1);
                errorBox.slideUp(1);
                errorBox.html(data['msg']).slideDown(500) ;
                getInfo() ;
            }
        })
    }) ;


    var getInfo = function () {
        $("#commentBox").empty() ;
        $.post("/getInfo" , function (data) {
            if (data['status']) {
                isAuth = true ;
                getComment();
                $("#auth").html(JSON.stringify(data['status'])) ;
            }
            else {
                $("#auth").html("unknown user") ;
            }
        }) ;
    }  ;
    var getComment = function () {
        $.post("/getComment" , {} , function (data) {
            $("#commentBox").html("") ;
            data.forEach(function (cm , index) {
                console.log(index , cm) ;
                $("#commentBox").append("<li class='list-group-item list-group-item-info'><strong> " + cm.user + " </strong> : " + cm.text + " <button style='float: right' class='btn btn-primary' type='button'>Messages <span class='badge'>" + cm.like +"</span></button></li>") ;
            });
        }) ;
    } ;

    getInfo() ;


}) ;