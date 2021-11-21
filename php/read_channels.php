<?php
include("connect.php");
$data = json_decode(file_get_contents('php://input'), true);
$sql = "SELECT id, channel_name, presenter FROM channel WHERE status='OK' or creator_id=".$data['creator_id'];
$result = $mysqli->query($sql);
$rows = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($rows, $row);
    }
}
$mysqli->close();
echo(json_encode($rows));
?>
