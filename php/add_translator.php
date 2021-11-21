<?php
include("connect.php");
$data = json_decode(file_get_contents('php://input'), true);
$sql = "INSERT INTO translator (name, status, creator_id) VALUES ('".$data['translator_name']."','NEW',".$data['creator_id'].");";
$result = $mysqli->query($sql);
echo "{\"result\":".$result."}";
?>