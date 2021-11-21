var translatorOpen = false;
var globTranslators;

function newtranslator() {
    if (translatorOpen) return;

    translatorOpen = true;
    el("newtranslator").style.display = "block";
    el("newtranslatorName").value = "";
}

function addNewtranslator() {
    let name = el("newtranslatorName").value.trim();
    if (name.length==0) {
        alert("Fill in translator name.");
        return;
    }
    addtranslatorToDB(name);
    loadtranslators();

    translatorOpen = false;
    el("newtranslator").style.display = "none";
}

function addtranslatorToDB(name) {
    let data = {"translator_name":name, "creator_id": cr_id};
    post("php/add_translator.php", data, checkResponse);
}

function cancelNewtranslator() {
    translatorOpen = false;
    el("newtranslator").style.display = "none";
}

function addtranslatorOption(name, id, selEl) {
    var opt = document.createElement('option');
    opt.value = id;
    opt.innerHTML = name;
    opt.translator_id = id;
    selEl.appendChild(opt);
}

function loadtranslators() {
    let data = {"creator_id": cr_id};
    post("php/read_translators.php", data, refreshtranslators);
}

function refreshtranslators(translators, response) {
    if (response!=200) {
        alert("Problem occured at translator loading. Status:" + response);
        return;
    }
    let selEl = el("translatorSel");
    let selElList = el("translatorSelList");
    selEl.innerHTML = "";
    selElList.innerHTML = "";
    translators.forEach(translator => {
        addtranslatorOption(translator.name, translator.id, selEl);
        addtranslatorOption(translator.name, translator.id, selElList);
    });
    globTranslators = translators;
    fillTranslators();
}

function fillTranslators() {
    for(let l in langs) {
        let selEl = el("translatorSel"+langs[l].languageCode);
        selEl.innerHTML = "";
        globTranslators.forEach(translator => {
            addtranslatorOption(translator.name, translator.id, selEl);
        });
    }
}