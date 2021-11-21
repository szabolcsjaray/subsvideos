var channelOpen = false;
var globChannels = [];

function newChannel() {
    if (channelOpen) return;

    channelOpen = true;
    el("newChannel").style.display = "block";
    el("newChannelName").value = "";
    el("newPresenter").value = "";
}

function addNewChannel() {
    let name = el("newChannelName").value.trim();
    let presenter = el("newPresenter").value.trim();
    let link = el("newLink").value.trim();
    if (name.length==0 || presenter.length==0) {
        alert("Fill in channel name and preseneter.");
        return;
    }
    addChannelToDB(name, presenter, link);
    addChannelOption(name);

    channelOpen = false;
    el("newChannel").style.display = "none";
}

function addChannelToDB(name, presenter, link) {
    let data = {"channel_name":name, "presenter":presenter, "link": link, "creator_id": cr_id};
    post("php/add_channel.php", data, checkResponse);
}

function cancelNewChannel() {
    channelOpen = false;
    el("newChannel").style.display = "none";
}

function addChannelOption(name, id, sel) {
    var opt = document.createElement('option');
    opt.value = id;
    opt.innerHTML = name;
    opt.channel_id = id;
    sel.appendChild(opt);
}

function loadChannels() {
    let data = {"creator_id": cr_id};
    post("php/read_channels.php", data, refreshChannels);
}

function refreshChannels(channels, response) {
    globChannels = channels;
    if (response!=200) {
        alert("Problem occured at channel loading. Status:" + response);
        return;
    }
    let sel = el("channelSel");
    let selList = el("channelSelList");
    sel.innerHTML = "";
    selList.innerHTML = "";
    addChannelOption("-", 0, selList);
    channels.forEach(channel => {
        addChannelOption(channel.channel_name, channel.id, sel);
        addChannelOption(channel.channel_name, channel.id, selList);
    });
}