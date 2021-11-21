//load the IFrame Player API code asynchronously
var player;

var actTitle = "";
var langs = [];
var videoLoaded = false;

function initVideo() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

//gets called once the player API has loaded
function onYouTubeIframeAPIReady() {
    player = new YT.Player('videoFrame', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
}

function pauseVideo() {
    player.pauseVideo();
    console.log("Video time:" + player.getCurrentTime());
}

function startVideo() {
    player.playVideo();
}

var rate = 1;

var captRetry = 0;

function getCaptionData(){
    player.loadModule("captions");
    var tracklist = player.getOption("captions", "tracklist");
    //player.pauseVideo();
    console.log(tracklist);
    if (tracklist === undefined || tracklist.length==0) {
        captRetry++;
        if (captRetry<6) {
            setTimeout(function(){ getCaptionData() }, 1000);
            return;
        }
    }
    let langsStr = "";
    let sep = "";
    for (let caption in tracklist) {
        langsStr = langsStr + sep + tracklist[caption].displayName;
        sep = ", ";
        console.log( tracklist[caption].displayName);
    }
    el("languages").innerHTML = langsStr;
    player.stopVideo("captions");
    langs = tracklist;
    createTitleInputs(langs);
    videoLoaded = true;
    el("addNewVideoButton").disabled = false;
}

function onPlayerReady(event) {
    player.loadModule("captions");
    let data = player.getVideoData();
    console.log(data );
    actTitle = data.title;
    el("videoTitle").innerHTML = actTitle;
    player.mute("captions");
    player.playVideo("captions");
    captRetry = 0;
    setTimeout(function(){ getCaptionData() }, 3000);
}

function onPlayerStateChange(event) {
    console.log("Player state changed: " + event.data);
}

const VIDEO_ADDRESS_TEMPLATE = "http://www.youtube.com/embed/VIDEOID?rel=0&amp;controls=1&amp;hd=1&amp;showinfo=1&amp;enablejsapi=1";

function extractIdStandard(videoId, idPart) {
    let idEnds = videoId.substr(idPart).search('&');
    if (idEnds==-1) {
        videoId = videoId.substr(idPart+2);
    } else {
        videoId = videoId.substr(idPart+2,idEnds-2);
    }
    return videoId;
}

function extractIdShorts(videoId, idPart) {
    let idEnds = videoId.substr(idPart).indexOf('?');
    if (idEnds==-1) {
        videoId = videoId.substr(idPart+8);
    } else {
        videoId = videoId.substr(idPart+8,idEnds-2);
    }
    return videoId;
}

function extractIdShortLink(videoId, idPart) {
    let idEnds = videoId.indexOf('?');
    if (idEnds==-1) {
        videoId = videoId.substr(idPart+9);
    } else {
        videoId = videoId.substr(idPart+9,idEnds-2);
    }
    return videoId;
}

function loadVideo(id) {
    el("addNewVideoButton").disabled = true;
    videoLoaded = false;
    let videoId = el("videoID").value;
    if (!videoId.startsWith('http://www.youtube.com/') &&
        !videoId.startsWith('https://www.youtube.com/') &&
        !videoId.startsWith('https://youtu.be/') &&
        !videoId.startsWith('http://youtu.be/')) {
        alert('Wrong video address!\nOnly Youtube videos could be stored.');
        return;
    }
    if (videoId.startsWith('http')) {
        let idPart  = videoId.search('v=');
        let shortPart = videoId.search('/shorts/');
        let youtuBePart = videoId.search('youtu.be/');
        if (idPart!=-1 && videoId.length>=idPart+7) {
            videoId = extractIdStandard(videoId, idPart);
            // TODO handling of the shorts.
            // Getting the video id from such a string: https://www.youtube.com/shorts/gafi9xTG5fU
        } else if (shortPart!=-1) {
            videoId = extractIdShorts(videoId, shortPart);
        } else if (youtuBePart!=-1) {
            videoId = extractIdShortLink(videoId, youtuBePart);
        } else {
            alert('Wrong video address!\n Video id cannot be found.');
            return;
        }
        el("videoID").value = videoId;
    }
    let address = VIDEO_ADDRESS_TEMPLATE.replace("VIDEOID", videoId);
    console.log(address);
    el('videoFrame').src = address;
    el("videoDiv").style.display = "block";
}

function addNewVideo() {
    let videoLink = el("videoID").value;
    if (videoLink.length==0) {
        alert("No video loaded.");
        return;
    }
    let data = {};
    data.title = el("videoTitle").innerHTML;
    data.channel_id= el("channelSel").value;
    data.creator_id = cr_id;
    data.link = el("videoID").value;
    data.language_titles = [];
    console.log(langs);
    for(let l in langs) {
        //if (langs[l].languageCode!='en') {
            let languageTitle = {};
            languageTitle.code = langs[l].languageCode;
            languageTitle.title = el("title"+langs[l].languageCode).value;
            languageTitle.translator_id = el("translatorSel"+languageTitle.code).value;
            console.log(JSON.stringify(languageTitle));
            data.language_titles.push(languageTitle);
            console.log(JSON.stringify(data.language_titles));
        //}
    }
    console.log(JSON.stringify(data));


    post("php/add_video.php", data, videoAdded);
}

function videoAdded(data, status) {
    if (status==200) {
        if (data.result==1) {
            alert("Video added, now adding titles in more languages.");
            return;
        }
        alert("An error occured while adding video to DB.");
    }
    alert("Connection problem with the server: " + status);
}
