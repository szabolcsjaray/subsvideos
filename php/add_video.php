<?php
include("connect.php");
include("logging.php");
$data = json_decode(file_get_contents('php://input'), true);
$sql = "INSERT INTO subs_videos (title, link, channel_id, status, creator_id) VALUES ('".$data['title']."','".$data['link']."',".$data['channel_id'].",'NEW',".$data['creator_id'].");";
$result = $mysqli->query($sql);
if ($result!=1) {
    $retVal = "{\"result\":".$result.",\"id\":".$mysqli->insert_id."}";
} else {
    $videoId = $mysqli->insert_id;
    $str = "";
    foreach($data['language_titles'] as $languageTitle) {

        $code = $languageTitle['code'];
        $sql2 = "SELECT id FROM language WHERE code = '$code';";
        logline($mysqli, "select lang id: ".$sql2);
        $result2 = $mysqli->query($sql2);
        logline($mysqli, "res: ".$result2->num_rows);
        if ($result2->num_rows==0) {
            logline($mysqli, "Not found: $code.");
            $retVal = "{\"result\":".$result2.",\"id\":".$mysqli->insert_id."}";
            break;
        }
        $row = $result2->fetch_assoc();
        logline($mysqli, "id: ".$row['id']);
        $sql1 = "INSERT INTO title (title, language_id, video_id, translator_id, status, creator_id) VALUES ('".mysqli_real_escape_string($mysqli,$languageTitle['title'])."',".$row['id'].",".$videoId.",".$languageTitle['translator_id'].","."'NEW',".$data['creator_id'].");";
        logline($mysqli, "insert: ".$sql1);
        $result1 = $mysqli->query($sql1);
    }
    $retVal = "{\"result\":".$result.",\"id\":\"".$sql1."\"}";
}
echo $retVal;
?>