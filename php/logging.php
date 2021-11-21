<?php
function logline($conn, $line) {
    $date = date("Y.m.d. G:i:s");
    $safeLine = mysqli_real_escape_string($conn, $line);
    $sql = "INSERT INTO logs (time, line) VALUES ('".$date."', '".substr($safeLine,0,500)."');";
    $conn->query($sql);
}
?>