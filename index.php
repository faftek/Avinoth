<!doctype html>

<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link href='https://fonts.googleapis.com/css?family=PT+Sans:400,700' rel='stylesheet' type='text/css'>

	<link rel="stylesheet" href="css/reset.css"> <!-- CSS reset -->
	<link rel="stylesheet" href="css/style.css"> <!-- Gem style -->
	<script src="js/modernizr.js"></script> <!-- Modernizr -->
  	<script src="js/jquery-2.1.4.js"></script>
    <script src="js/jquery.cookie.js"></script>
	<script src="js/main.js"></script> <!-- Gem jQuery -->
	<?php
	//gotta start that session
	session_start();
	?>
	<title>Log In &amp; Sign Up Form</title>
</head>
<body>
	<!-- shows loading whenever page is actively being used -->
	<div id="statusDiv" style="display: none;"><div id="statusDivContent">Loading...</div></div>
	<header role="banner"> <!-- side banner -->
		<span id="menuButton">
			<img id="menuImage" class="inverted" src="/img/glyphicons/211.png" style="display: inline;">
		</span>
		
		<nav class="main-nav">
			<ul>
				<!-- insert more links here -->
				<li><a class="cd-signin" href="#0">Sign in</a></li>
				<li><a class="cd-signup" href="#0">Sign up</a></li>
			</ul>
		</nav>
	</header>

	<div class="cd-user-modal"> <!-- this is the entire modal form, including the background -->
		<div class="cd-user-modal-container"> <!-- this is the container wrapper -->
			<ul class="cd-switcher">
				<li><a href="#0">Sign in</a></li>
				<li><a href="#0">New account</a></li>
			</ul>

			<div id="cd-login"> <!-- log in form -->
				<form class="cd-form">
					<p class="fieldset">
						<label class="image-replace cd-Username" for="signin-Username">E-mail</label>
						<input class="full-width has-padding has-border" id="signin-Username" type="Username" placeholder="Username">
					</p>

					<p class="fieldset">
						<label class="image-replace cd-password" for="signin-password">Password</label>
						<input class="full-width has-padding has-border" id="signin-password" type="password"  placeholder="Password">
						<a href="#0" class="hide-password">Show</a>
					</p>

					<p class="fieldset">
						<input type="checkbox" id="remember-me" checked>
						<label for="remember-me">Remember me</label>
					</p>

					<p class="fieldset">
						<input class="full-width" type="button" value="Login" onClick="login()">
					</p>
				</form>
				
				<p class="cd-form-bottom-message"><a href="#0">Forgot your password?</a></p>
				<!-- <a href="#0" class="cd-close-form">Close</a> -->
			</div> <!-- cd-login -->

			<div id="cd-signup"> <!-- sign up form -->
				<form class="cd-form">
                    <p class="fieldset">
						<label class="image-replace cd-username" for="signup-username">First Name</label>
						<input class="full-width has-padding has-border" id="signup-first" type="text"  placeholder="First Name">
					</p>
                    
                    <p class="fieldset">
						<label class="image-replace cd-username" for="signup-username">Last Name</label>
						<input class="full-width has-padding has-border" id="signup-last" type="text"  placeholder="Last Name">
					</p>
                    
					<p class="fieldset">
						<label class="image-replace cd-username" for="signup-username">Username</label>
						<input class="full-width has-padding has-border" id="signup-username" type="text" placeholder="Username">
					</p>

					<p class="fieldset">
						<label class="image-replace cd-email" for="signup-email">E-mail</label>
						<input class="full-width has-padding has-border" id="signup-email" type="email" placeholder="E-mail">
					</p>

					<p class="fieldset">
						<label class="image-replace cd-password" for="signup-password">Password</label>
						<input class="full-width has-padding has-border" id="signup-password" type="password"  placeholder="Password">
						<a href="#0" class="hide-password">Show</a>
					</p>

					<p class="fieldset">
						<input type="checkbox" id="accept-terms">
						<label for="accept-terms">I agree to the <a href="#0">Terms</a></label>
					</p>

					<p class="fieldset">
						<input class="full-width has-padding" type="button" onClick="register()" value="Create account">
					</p>
				</form>

				<!-- <a href="#0" class="cd-close-form">Close</a> -->
			</div> <!-- cd-signup -->

			<div id="cd-reset-password"> <!-- reset password form -->
				<p class="cd-form-message">Lost your password? Please enter your email address. You will receive a link to create a new password.</p>

				<form class="cd-form">
					<p class="fieldset">
						<label class="image-replace cd-email" for="reset-email">E-mail</label>
						<input class="full-width has-padding has-border" id="reset-email" type="email" placeholder="E-mail">
						<span class="cd-error-message">Error message here!</span>
					</p>

					<p class="fieldset">
						<input class="full-width has-padding" type="submit" value="Reset password">
					</p>
				</form>

				<p class="cd-form-bottom-message"><a href="#0">Back to log-in</a></p>
			</div> <!-- cd-reset-password -->
			<a href="#0" class="cd-close-form">Close</a>
		</div> <!-- cd-user-modal-container -->
	</div> <!-- cd-user-modal -->
	<div id="sidebar" style="width: 300px;">
		<div class="sidebarNav" data-location="home" style="color: rgb(52, 73, 94); background-color: rgb(236, 240, 241);"><img src="" class="">Home</div>
		<div class="sidebarNav" data-location="application" style="color: rgb(255, 255, 255); background-color: rgb(52, 73, 94);"><img class="inverted" src="">Application</div>
		<div class="sidebarNav" data-location="setting" style="color: rgb(255, 255, 255); background-color: rgb(52, 73, 94);"><img class="inverted" src="">Settings</div>
		<div class="sidebarNav" data-location="info" style="color: rgb(255, 255, 255); background-color: rgb(52, 73, 94);"><img class="inverted" src="">More info</div>
	</div>
	<div id="content" style="width: calc(100% - 300px);">Thank you for using the ABS Bench application. This section is currently in progress, and will be done at some point in the future. Please just select application for now!</div>
</body>

</html>
<?php
	//just a simple(not that secure) login checker
	if(!empty($_SESSION['user'])) {
		echo "<script> loggedin();</script>";
		$loggedin = true;
	}
	if(empty($_SESSION['user'])) {
		echo "<script> notlogged();</script>";
		$loggedin = false;
	}
	
?>