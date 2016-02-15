<?php
include 'pages.php';
//DB CONNECT INFO. seriously move dis shit in the future to somewhere else.
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
    $username = sanitize($conn, $_POST['username']);
    $password = sanitize($conn, $_POST['password']);
    login($conn, $username, $password);
}

if($func == "register") {
    $username = sanitize($conn, $_POST['username']);
    $password = sanitize($conn, $_POST['password']);
    $email = sanitize($conn, $_POST['email']);
    $first = sanitize($conn, $_POST['first']);
    $last = sanitize($conn, $_POST['last']);
    register($conn, $username, $password, $email, $first, $last);
}

if($func == "checkTicket") {
	$TicketNum = $_POST['TicketNumber'];
	ticket_exists($conn, $TicketNum);
}

if($func == "loggedIn") {
    loggedin();
    
}
//main functions to run
function login($conn, $username, $password) {
if(user_exists($conn, $username)) {
    if(password_iscorrect($conn, $username, $password)) {
	session_start();
	$_SESSION['user'] = $username;
    applicationHome();
    }
}
else {
    echo "nop";
}
}

function loggedin() {
    applicationHome();
    
}

//used to register new account
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

//check if ticket exists in DB, mainly for searching in the future.
function ticket_exists($conn, $ticketNum) {
    $result = mysqli_query($conn,"SELECT `status` FROM workstations WHERE `ticket_num` = '$ticketNum'");
    if(mysqli_num_rows($result) == 1) {
        echo "found";
    }
    else {
        echo "nop";
    }
}

//SUBFUNCTIONS
//check if user exists. Seperate from password b/c SQL
function user_exists($conn, $username) {
    $result = mysqli_query($conn,"SELECT `username` FROM users WHERE `username` = '$username'");
    if(mysqli_num_rows($result) == 1) {
        return true;
    }
    else {
        return false;
    }
}

//find salt and grab it from database
function getSalt($conn, $username) {
    $result = mysqli_query($conn,"SELECT `salt` FROM `users` WHERE `username` = '$username'");
    while($row = mysqli_fetch_assoc($result)) {
        return $row["salt"];
    }
}

//check if password is correct
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

//sanitize string to prevent SQL injection
function sanitize($conn, $thestring) {
    return mysqli_real_escape_string($conn, $thestring);
}
?>
