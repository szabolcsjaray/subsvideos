<?php
include("connect.php");
$data = json_decode(file_get_contents('php://input'), true);
$sql = "INSERT INTO channel (channel_name, presenter, link, status, creator_id) VALUES ('".$data['channel_name']."','".$data['presenter']."','".$data['link']."','NEW',".$data['creator_id'].");";
$result = $mysqli->query($sql);
echo "{'result':".$result."}";
?>