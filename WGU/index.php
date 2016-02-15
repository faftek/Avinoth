<?php	session_start();  ?>
<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link href='https://fonts.googleapis.com/css?family=PT+Sans:400,700' rel='stylesheet' type='text/css'>

	<link rel="stylesheet" href="css/style.css"> 
  	<script src="js/jquery-2.1.4.js"></script>
    <script src="js/jquery.cookie.js"></script>
	<script src="js/main.js"></script> 

	<title>Ultimate SPA Site for WGU Project</title>
</head>

<body>
	<!-- shows loading whenever page is actively being used -->
	<div id="statusDiv" style="display: none;"><div id="statusDivContent">Loading...</div></div>
	<header role="banner"> <!-- side banner -->
		<span id="menuButton">
			<img id="menuImage" class="inverted" src="/Avinoth/img/glyphicons/211.png" style="display: inline;">
		</span>
		
	</header>
	
	
	<div id="sidebar" style="width: 300px;">
		<div class="sidebarNav" data-location="home" style="color: rgb(52, 73, 94); background-color: rgb(236, 240, 241);"><img src="" class="" /><a href="#home">Home</a></div>
		<div class="sidebarNav" data-location="application" style="color: rgb(255, 255, 255); background-color: rgb(52, 73, 94);"><img class="inverted" src="" /><a href="#App">Application</a></div>
		<div class="sidebarNav" data-location="setting" style="color: rgb(255, 255, 255); background-color: rgb(52, 73, 94);"><img class="inverted" src="" /><a href="#Settings">Settings</a></div>
		<div class="sidebarNav" data-location="info" style="color: rgb(255, 255, 255); background-color: rgb(52, 73, 94);"><img class="inverted" src="" /><a href="#Info">More info</a></div>
	</div>
	<div id="content" style="width: calc(100% - 300px);">HI123</div>
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