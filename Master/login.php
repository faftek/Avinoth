<?php
$servername = getenv('IP');
$dbname = "avinoth_SPA";
$dbusername = "avinoth_spa";
$dbpassword = "H7z@x@h3!";

$func = $_POST['func'];
// Create connection
$conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
//check which function to run *******MOVE TO SWTICH CASE LATER******
if($func == "login") {
$username = $_POST['username'];
$password = $_POST['password'];
login($conn, $username, $password);
}

if($func == "register") {
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$first = $_POST['first'];
$last = $_POST['last'];
register($conn, $username, $password, $email, $first, $last);
}

if($func == "lunchNum") {
	$lunchNum = $_POST['lunchNumber'];
	lunchID_exists($conn, $lunchNum);
}

//main functions to run
function login($conn, $username, $password) {
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
}

function register($conn, $username, $password, $email, $first, $last) {
if(!user_exists($conn, $username)) {
    $salt = uniqid(mt_rand(), true);
    $hashed = hash("sha256", $password . $salt);
    mysqli_query($conn, "INSERT INTO `users`(`first_name`, `last_name`, `username`, `password`, `salt`, `email`, `active`, `admin`) VALUES ('$first','$last','$username','$hashed','$salt','$email',1,0)");
    echo "success";
}
else {
    echo "username";
}
}

function lunchID_exists($conn, $lunchNum) {
    $result = mysqli_query($conn,"SELECT `id` FROM students WHERE `id` = '$lunchNum'");
    if(mysqli_num_rows($result) == 1) {
        echo "found";
    }
    else {
        echo "nop";
    }
}

//SUBFUNCTIONS
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
