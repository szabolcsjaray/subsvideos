<?php
    include("connect.php");

    $sql = "SELECT id, name, code FROM language";
    $result = $mysqli->query($sql);
    if ($result->num_rows > 0) {
        $rows = [];
        while($row = $result->fetch_assoc()) {
            array_push($rows, $row);
        }
    }
    $mysqli->close();
    echo(json_encode($rows));
?>