<?php
include("connect.php");
include("logging.php");
$data = json_decode(file_get_contents('php://input'), true);
logline($mysqli, "0list_videos input: ".json_encode($data));
$sql = "SELECT t.id, t.title, t.language_id, t.video_id, t.translator_id, t.status, t.creator_id, s.link, s.channel_id"
    ." FROM `title` t, subs_videos s WHERE (t.status='OK' OR t.creator_id=".$data['creator_id'].")";
$sql = $sql." AND t.video_id=s.id";
if ($data['languageId']!=0) {
    $sql = $sql." AND t.language_id=".$data['languageId'];
}
if ($data['translatorId']!=4) {
    $sql = $sql." AND t.translator_id=".$data['translatorId'];
}
if ($data['channelId']!=0) {
    $sql = $sql." AND s.channel_id=".$data['channelId'];
}
logline($mysqli, "1list_videos 1");
logline($mysqli, "2list_videos: ".$sql);

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
