jQuery(document).ready(function($){
	
	//sidebar navigation change
	$(".sidebarNav").click(function(){
		var path = $(this).attr("data-location");
		loadPage(path);
		//alert(module +" "+page);
		$(".sidebarNav").css("background-color", "#34495e");
		$(".sidebarNav").css("color", "white");
		$(".sidebarNav").find($("img")).attr("class", "inverted");
		$(this).css("background-color", "#ecf0f1");
		$(this).css("color", "#34495e");
		$(this).children().first().attr("class", "");
	});

	var $loading = $('#statusDiv').fadeOut(0);
	$(document)
	  .ajaxStart(function () {
	    $loading.fadeIn(200);
	  })
	  .ajaxStop(function () {
	    $loading.fadeOut(200);
	  });

	var menuState = "open"; //true = open, false = closed
	$("#menuButton").click(function(){
		if(menuState == "open")
		{
			var switchUrl = "/Avinoth/img/glyphicons/517.png";
			$("#sidebar").css("width", "0px");
			$("#content").css("width", "calc(100% - 0px)");
			menuState = "closed";
		}
		else
		{
			var switchUrl = "/Avinoth/img/glyphicons/211.png";
			$("#sidebar").css("width", "300px");
			$("#content").css("width", "calc(100% - 300px)");
			menuState = "open";
		}
	    $("#menuImage")
	        .fadeOut(400, function() {
	            $("#menuImage").attr('src',switchUrl);
	        })
	        .fadeIn(400);
	});

});

//NATHAN FUNCTIONS

function loggedin() {
	$('.main-nav').hide();
	$('#sidebar').show();
	$('#menuButton').show();
	$.post("content.php",{func: "loggedIn"} , function(result){
	var obj = JSON.parse(result);
	document.getElementById("content").innerHTML = obj.html;
	});
	
}
function notlogged() {
	loggedin();
	//$('#sidebar').hide();
	//$('#menuButton').hide();
}

function login() {
    var $form_modal = $('.cd-user-modal');
    var error = false;
    var func = "login";
    var username = $("#signin-Username").val();
    var password = $("#signin-password").val();
    if(username.length == 0) {
	alert("PUT IN A USERNAME");
	error = true;
    }
    if(password.length == 0) {
	alert("PUT IN A PASSWORD");
	error = true;
    }
    if(error == true) {
	return;
    }
    
    $.post("content.php", {username: username, password: password, func: func}, function(result){
    	if(JSON.parse(result).status == 0) {
    		alert(JSON.parse(result).html);
			document.getElementById("content").innerHTML = JSON.parse(result).html;
			loggedin();
	    	$form_modal.removeClass('is-visible');
    	}
    });
}

function register() {
    var $form_modal = $('.cd-user-modal');
    var error;
    var func = "register";
    var username = $("#signup-username").val();
    var email = $("#signup-email").val();
    var password = $("#signup-password").val();
    var first = $("#signup-first").val();
    var last = $("#signup-last").val();
    if(username.length == 0) {
	alert("PUT IN A USERNAME");
	error = true;
    }
    if(password.length == 0) {
	alert("PUT IN A PASSWORD");
	error = true;
    }
    if(email.length == 0) {
	alert("PUT IN AN EMAIL");
	error = true;
    }
    if(first.length == 0) {
	alert("PUT IN YOUR FIRST NAME");
	error = true;
    }
    if(last.length == 0) {
	alert("PUT IN YOUR LAST NAME");
	error = true;
    }
    if(error) {
	return;
    }

    $.post("content.php", {first: first, last: last, email: email, username: username, password: password, func: func}, function(result){
	if(result.indexOf("success") != -1) {
	    alert("Successfully registered!");
	    $form_modal.removeClass('is-visible');
	}   
	else if(result.indexOf("username") != -1) {
	    alert("username is taken!");   
	}
	else{
	    alert("unknown error");   
	}
    });
}
	
function loadPage(path, notifyMesage, backButton)
{
	switch(path) {
		case "/":
			$(".sidebarNav").css("background-color", "#34495e");
			$(".sidebarNav").css("color", "white");
			$(".sidebarNav").find($("img")).attr("class", "inverted");
			$(".sidebarNav:eq( 0 )").css("background-color", "#ecf0f1");
			$(".sidebarNav:eq( 0 )").css("color", "#34495e");
			$(".sidebarNav:eq( 0 )").children().first().attr("class", "");
		break;
		case "application":
			$(".sidebarNav").css("background-color", "#34495e");
			$(".sidebarNav").css("color", "white");
			$(".sidebarNav").find($("img")).attr("class", "inverted");
			$(".sidebarNav:eq( 1 )").css("background-color", "#ecf0f1");
			$(".sidebarNav:eq( 1 )").css("color", "#34495e");
			$(".sidebarNav:eq( 1 )").children().first().attr("class", "");
		break;
		case "setting":
			$(".sidebarNav").css("background-color", "#34495e");
			$(".sidebarNav").css("color", "white");
			$(".sidebarNav").find($("img")).attr("class", "inverted");
			$(".sidebarNav:eq( 2 )").css("background-color", "#ecf0f1");
			$(".sidebarNav:eq( 2 )").css("color", "#34495e");
			$(".sidebarNav:eq( 2 )").children().first().attr("class", "");
		break;
		case "info":
			$(".sidebarNav").css("background-color", "#34495e");
			$(".sidebarNav").css("color", "white");
			$(".sidebarNav").find($("img")).attr("class", "inverted");
			$(".sidebarNav:eq( 3 )").css("background-color", "#ecf0f1");
			$(".sidebarNav:eq( 3 )").css("color", "#34495e");
			$(".sidebarNav:eq( 3 )").children().first().attr("class", "");
		break;
	}
}