SubsVideos project

YouTube videos stored in a database wit hsome extra info:
- list of languages of subtitles available for the videos
- list of titles for those languages
- channel of the videos
- name of translators for the subtitles (if available)

Features:
- add new video to the  database
- search videos from the database with optional filters of language (of subs), channel, translator, part of the title

SubsVideos is using YouTube embedded video API to extract available subtitle languages and original title of the video.

connect.php is not added (should be in /php folder), it should look like this:

<?php
    $mysqli = new mysqli("<db server>", "<user>", "<password>", "<db name>");
    if ($mysqli->connect_errno) {
        echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }
    mysqli->set_charset("utf8");
?>
