<?php
$servername = "localhost";
$dbusername = "admin_default";
$dbpassword = "H7z@x@h3!";
$dbname = "admin_default";

$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$first = $_POST['first'];
$last = $_POST['last'];
// Create connection
$conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if(!user_exists($conn, $username)) {
    $salt = uniqid(mt_rand(), true);
    $hashed = hash("sha256", $password . $salt);
    mysqli_query($conn, "INSERT INTO `users`(`first_name`, `last_name`, `username`, `password`, `salt`, `email`, `active`, `admin`) VALUES ('$first','$last','$username','$hashed','$salt','$email',1,0)");
    echo "success";
}
else {
    echo "username";
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
?>
