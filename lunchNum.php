<?php
$servername = "localhost";
$dbusername = "admin_default";
$dbpassword = "H7z@x@h3!";
$dbname = "admin_default";

$lunchNum = $_POST['lunchNumber'];

// Create connection
$conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if(id_exists($conn, $lunchNum)) {
        echo "found";
}
else {
    echo "nop";
}

function id_exists($conn, $lunchNum) {
    $result = mysqli_query($conn,"SELECT `id` FROM students WHERE `studentId` = '$lunchNum'");
    if(mysqli_num_rows($result) == 1) {
        return true;
    }
    else {
        return false;
    }
}
?>
