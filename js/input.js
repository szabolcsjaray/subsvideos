function createTitleInput(lang, code) {
    let inputS = "<div class=\"languegaName\">" + lang + "</div> : ";
    inputS += "<input type=\"text\" id=\"title"+code+"\" size=\"100\">"+
        "<select id=\"translatorSel"+code+"\" type=\"select\" class=\"menu\" title=\"Select translator.\"></select>" +
        "<button onclick=\"copyTitle(\'"+code+"\');\">copy title</button>"+
        "<button onclick=\"clearTitle(\'"+code+"\');\">clear title</button>"
    return inputS;
}

function copyTitle(code) {
    el("title"+code).value = el("videoTitle").innerHTML;
}

function clearTitle(code) {
    el("title"+code).value = "";
}

function createTitleInputs(langs) {
    let divS = "";
    for(let l in langs) {
        //if (langs[l].languageCode!='en') {
            divS += (createTitleInput(langs[l].displayName, langs[l].languageCode) + "<br>");
        //}
    }
    el("langTitles").innerHTML = divS;
    fillTranslators();
}