var languages = [];

function readLanguages() {
    let data = {"creator_id": cr_id};
    post("php/read_langs.php", data, refreshLanguages);
}

function addLOption(lSel, name, id)  {
    var opt = document.createElement('option');
    opt.value = id;
    opt.innerHTML = name;
    lSel.appendChild(opt);
}

function refreshLanguages(langData, response) {
    languages.length = 0;
    let lSel = el("langSelList");
    lSel.innerHTML = "";
    addLOption(lSel, "-", 0);
    langData.forEach(language => {
        var l = {"id": language.id, "name": language.name, "code": language.code};
        languages.push(l);
        addLOption(lSel, language.name, language.id);
    });
}