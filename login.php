<?php
$servername = "localhost";
$dbusername = "njohnson";
$dbpassword = "5a5a8usyv";
$dbname = "zadmin_sample";

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
        echo "logged in";
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
