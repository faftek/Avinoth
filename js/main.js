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
	
	var $form_modal = $('.cd-user-modal'),
		$form_login = $form_modal.find('#cd-login'),
		$form_signup = $form_modal.find('#cd-signup'),
		$form_forgot_password = $form_modal.find('#cd-reset-password'),
		$form_modal_tab = $('.cd-switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
		$back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
		$main_nav = $('.main-nav');

	//open modal

	$main_nav.on('click', function(event){

		if( $(event.target).is($main_nav) ) {
			// on mobile open the submenu
			$(this).children('ul').toggleClass('is-visible');
		} else {
			// on mobile close submenu
			$main_nav.children('ul').removeClass('is-visible');
			//show modal layer
			$form_modal.addClass('is-visible');	
			//show the selected form
			( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
		}

	});

	//close modal
	$('.cd-user-modal').on('click', function(event){
		if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
			$form_modal.removeClass('is-visible');
		}	
	});
	//close modal when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$form_modal.removeClass('is-visible');
	    }
    });

	//switch from a tab to another
	$form_modal_tab.on('click', function(event) {
		event.preventDefault();
		( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
	});

	//hide or show password
	$('.hide-password').on('click', function(){
		var $this= $(this),
			$password_field = $this.prev('input');
		
		( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
		( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
		//focus and move cursor to the end of input field
		$password_field.putCursorAtEnd();
	});

	//show forgot-password form 
	$forgot_password_link.on('click', function(event){
		event.preventDefault();
		forgot_password_selected();
	});

	//back to login from the forgot-password form
	$back_to_login_link.on('click', function(event){
		event.preventDefault();
		login_selected();
	});

	function login_selected(){
		$form_login.addClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.addClass('selected');
		$tab_signup.removeClass('selected');
	}

	function signup_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.addClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.removeClass('selected');
		$tab_signup.addClass('selected');
	}

	function forgot_password_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.addClass('is-selected');
	}

});

jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	// If this function exists...
    	if (this.setSelectionRange) {
      		// ... then use it (Doesn't work in IE)
      		var len = $(this).val().length * 2;
      		this.setSelectionRange(len, len);
    	} else {
    		// ... otherwise replace the contents with itself
    		// (Doesn't work in Google Chrome)
      		$(this).val($(this).val());
    	}
	});
};

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
	$('#sidebar').hide();
	$('#menuButton').hide();
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

	function checkNum() {
		var func = "checkTicket";
		var TicketNumber = $("#TicketNumber").val();
		if(TicketNumber.length == 0) {
			alert("PUT IN A DAMN NUMBER");
			return;	
		}
		
		$.post("content.php", {TicketNumber: TicketNumber, func: func}, function(result){
			if(result.indexOf("found") != -1) {
	   			alert("found it!");
			}
			else{
				alert("ERROR");
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