function listVideos() {
    let data = {};
    data.creator_id = cr_id;
    data.channelId = el("channelSelList").value;
    data.translatorId = el("translatorSelList").value;
    data.words = el("words").value;
    data.languageId = el("langSelList").value;
    console.log(data);
    post("php/list_videos.php", data, videosListed);
}

function createVideoLink(videoId) {
    return "https://www.youtube.com/watch?v="+videoId;
}

function createVideoLine(video) {
    let lineDiv = document.createElement("div");
    lineDiv.className = "listLine";
    let title = document.createElement("div");
    let titleLink = document.createElement("a");
    let linkText = document.createTextNode(video.title);
    titleLink.appendChild(linkText);
    titleLink.href = createVideoLink(video.link);
    titleLink.title = "Open video";
    titleLink.target = "_blank";
    title.appendChild(titleLink);
    title.className = "listCol titleCol";
    lineDiv.appendChild(title);
    let lang = document.createElement("div");
    lang.className = "listCol shortCol";
    lang.innerHTML = languages.find( el => el.id==video.language_id).name;
    lineDiv.appendChild(lang);
    let channel = document.createElement("div");
    channel.className = "listCol shortCol";
    channel.innerHTML = globChannels.find( el => el.id==video.channel_id).channel_name;
    lineDiv.appendChild(channel);

    return lineDiv;
}


function videosListed(data) {
    el("videoList").innerHTML = "";
    data.forEach(video => {
        let vl = createVideoLine(video);
        el("videoList").appendChild(vl);
    });
    console.log("received"+data);
}