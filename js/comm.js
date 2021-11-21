function post(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status==200) {
                console.log(xhr.responseText);
                callback(JSON.parse(xhr.responseText), xhr.status);
            } else {
                callback((xhr.responseText===undefined ? "": xhr.responseText), xhr.status);
            }
            console.log(xhr.status);
            console.log(xhr.responseText);
        }};
    xhr.send(JSON.stringify(data));
}

function checkResponse(text, status) {
    if (status==200) {
        alert("OK\n"+text);
        return;
    }

    alert("ERROR: "+status+"\n"+ text);
}