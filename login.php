<?php
$servername = "localhost";
$dbusername = "admin_default";
$dbpassword = "H7z@x@h3!";
$dbname = "admin_default";

$username = $_POST['username'];
$password = $_POST['password'];

// Create connection
$conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if(user_exists($conn, $username)) {
    if(password_iscorrect($conn, $username, $password)) {
	session_start();
        echo '<!--logged in -->
			<center>
		
		<form>
			Please Input your lunch number: <br>
			<input type="text" id="lunchNumber"> <br>
			<input type="button" value="Submit" onClick="checkNum()">
		</form>
	</center>
	';
    }
}
else {
    echo "nop";
}



function user_exists($conn, $username) {
    $result = mysqli_query($conn,"SELECT `username` FROM users WHERE `username` = '$username'");
    if(mysqli_num_rows($result) == 1) {
        return true;
    }
    else {
        return false;
    }
}
       
function getSalt($conn, $username) {
    $result = mysqli_query($conn,"SELECT `salt` FROM `users` WHERE `username` = '$username'");
    while($row = mysqli_fetch_assoc($result)) {
        return $row["salt"];
    }
}

function password_iscorrect($conn, $username, $password) {
    $salt = getSalt($conn, $username);
    $hashed = hash("sha256", $password . $salt);
    $result = mysqli_query($conn,"SELECT `password` FROM `users` WHERE `username` = '$username'");
    while($row = mysqli_fetch_assoc($result)) {
        if($row["password"] == $hashed) {
            return true;   
        }
        else {
            return false;   
        }
    }
}
?>
