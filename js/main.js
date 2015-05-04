jQuery(document).ready(function($){
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

//Read all available cookies:

$.cookie(); // => { "name": "value" }
//Delete cookie:

// Returns true when cookie was successfully deleted, otherwise false
$.removeCookie('name'); // => true
$.removeCookie('nothing'); // => false

// Need to use the same attributes (path, domain) as what the cookie was written with
$.cookie('name', 'value', { path: '/' });
// This won't work!
$.removeCookie('name'); // => false
// This will work!
$.removeCookie('name', { path: '/' }); // => true

//Note: when deleting a cookie, you must pass the exact same path, domain and secure options that were used to set the cookie, unless you're relying on the default options that is.
//Configuration
//raw

//By default the cookie value is encoded/decoded when writing/reading, using encodeURIComponent/decodeURIComponent. Bypass this by setting raw to true:

$.cookie.raw = true;

//json

//Turn on automatic storage of JSON objects passed as the cookie value. Assumes JSON.stringify and JSON.parse:

$.cookie.json = true;

//Cookie Options

//Cookie attributes can be set globally by setting properties of the $.cookie.defaults object or individually for each call to $.cookie() by passing a plain object to the options argument. Per-call options override the default options.
//expires

expires: 365

//Define lifetime of the cookie. Value can be a Number which will be interpreted as days from time of creation or a Date object. If omitted, the cookie becomes a session cookie.
//path

path: '/'

//Define the path where the cookie is valid. By default the path of the cookie is the path of the page where the cookie was created (standard browser behavior). If you want to make it available for instance across the entire domain use path: '/'. Default: path of page where the cookie was created.

//Note regarding Internet Explorer:

    //Due to an obscure bug in the underlying WinINET InternetGetCookie implementation, IE’s document.cookie will not return a cookie if it was set with a path attribute containing a filename.

//(From Internet Explorer Cookie Internals (FAQ))

//This means one cannot set a path using path: window.location.pathname in case such pathname contains a filename like so: /check.html (or at least, such cookie cannot be read correctly).
//domain

domain: 'notchuptek.com'

//Define the domain where the cookie is valid. Default: domain of page where the cookie was created.
//secure

secure: true

//If true, the cookie transmission requires a secure protocol (https). Default: false.
//Converters

//Provide a conversion function as optional last argument for reading, in order to change the cookie's value to a different representation on the fly.

//Example for parsing a value into a number:

$.cookie('foo', '42');
$.cookie('foo', Number); // => 42

//Dealing with cookies that have been encoded using escape (3rd party cookies):

$.cookie.raw = true;
$.cookie('foo', unescape);

//You can pass an arbitrary conversion function.
//Contributing

//Check out the Contributing Guidelines
//Authors

//Klaus Hartl

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

	//REMOVE THIS - it's just to show error messages 
	$form_login.find('input[type="submit"]').on('click', function(event){
		event.preventDefault();
		$form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});
	$form_signup.find('input[type="submit"]').on('click', function(event){
		event.preventDefault();
		$form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});


	//IE9 placeholder fallback
	//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	})
		});
	}

});


//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	// If this function exists...
    	if (this.setSelectionRange) {
      		// ... then use it (Doesn't work in IE)
      		// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      		var len = $(this).val().length * 2;
      		this.setSelectionRange(len, len);
    	} else {
    		// ... otherwise replace the contents with itself
    		// (Doesn't work in Google Chrome)
      		$(this).val($(this).val());
    	}
	});
};

function login() {
    var error = false;
    var username = $("#signin-email").val();
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
    
    $.post("login.php", {username: username, password: password}, function(result){
	if(result.indexOf("logged in") != -1) {
	    $.cookie("username", username);
	    document.write(result);
	}   
	else if(result.indexOf("login failed") != -1) {
	    alert("cannot log you in!");   
	}
	else{
	    alert("unknown error");   
	}
    });
}

function register() {
    var error;
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

    $.post("register.php", {first: first, last: last, email: email, username: username, password: password}, function(result){
	if(result.indexOf("success") != -1) {
	    alert("Successfully registered!");
	}   
	else if(result.indexOf("username") != -1) {
	    alert("username is taken!");   
	}
	else{
	    alert("unknown error");   
	}
    });
}
