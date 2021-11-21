const CR_ID = "cr_id";
var cr_id;

function el(id) {
    return document.getElementById(id);
}

function init() {
    initVideo();
    initId();
    readLanguages();
    loadChannels();
    loadtranslators();
    enterListenerForVideoAddress();
    console.log("SubsVideos started.");
}

function initId() {
    cr_id = localStorage.getItem(CR_ID);
    if (cr_id==null) {
        cr_id = Math.floor(Math.random() * 100000000);
        localStorage.setItem(CR_ID, cr_id);
    }
}

function enterListenerForVideoAddress() {
    el('videoID').addEventListener("keydown", event => {
        if (event.code=='Enter') {
            loadVideo('loadVideoButton');
        }
    });
}

function switchToAddNew() {
    el("listVideos").style.display = "none";
    el("addNew").style.display = "block";
}

function switchToList() {
    el("addNew").style.display = "none";
    el("listVideos").style.display = "block";
}