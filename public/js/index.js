
$().ready(() => {

    for(let i = 0; i < 3; i++) addStep();

    $('#add_steps').click(() => {
        addStep();
    });

    $("#submit_button").click(() => {
        generateRequest();
    });

    $("tbody").sortable({
        appendTo: "parent",
        helper: "clone",
        // update: updateTableNumbering // This re-orders the numbers each time
    }).disableSelection();

    initAutoGrowTextarea();
});

function addStep() {
    let tbody = document.getElementById("steps");

    let hamburgerCell = document.createElement("td");
    hamburgerCell.innerHTML = "<br>&#9776;";
    // hamburgerCell.appendChild(document.createTextNode("<br>&#9776;"));

    let descriptionCell = document.createElement("td");
    let descriptionTextArea = document.createElement("textarea");
    enableAutoGrowOn(descriptionTextArea);
    descriptionTextArea.setAttribute("class", "table-text auto-grow");
    descriptionTextArea.setAttribute("rows", "3");
    descriptionCell.appendChild(descriptionTextArea);

    let timeCell = document.createElement("td");
    let timeTextField = document.createElement("textarea");
    timeTextField.setAttribute("class", "table-text");
    timeTextField.setAttribute("rows", "1");
    timeCell.appendChild(timeTextField);

    let xCell = document.createElement("td");
    let xButton = document.createElement("button");
    xButton.innerHTML = "&times;";
    // xButton.setAttribute("text", "<br>&times;");
    xButton.setAttribute("class", "closeButton");
    xButton.setAttribute("type", "button");
    xButton.setAttribute("onclick", "$(this).closest('tr').remove()");
    xCell.appendChild(xButton);

    let tr = document.createElement("tr");
    tr.appendChild(hamburgerCell);
    tr.appendChild(descriptionCell);
    tr.appendChild(timeCell);
    tr.appendChild(xCell);

    tbody.appendChild(tr);

    // temporarily deciding not to update numbering, instead using hamburgers
    // updateTableNumbering();
}

function updateTableNumbering() {
    let table = document.getElementById("steps_table");

    for (let i = 1, row; row = table.rows[i]; i++) {
        // row.cells[0].innerHTML = i;
        row.cells[0].innerHTML = i;
    }
}

// Controllers for auto-growing text areas
var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on'+event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}
function initAutoGrowTextarea () {
    let textareas = document.getElementsByClassName('auto-grow');
    for(let i = 0; i < textareas.length; i++) {
        enableAutoGrowOn(textareas[i]);
    }
}

function enableAutoGrowOn(textarea) {
    function resize () {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight+'px';
    }
    /* 0-timeout to get the already changed text */
    function delayedResize () {
        window.setTimeout(resize, 0);
    }

    // start listening to events
    observe(textarea, 'change',  resize);
    observe(textarea, 'cut',     delayedResize);
    observe(textarea, 'paste',   delayedResize);
    observe(textarea, 'drop',    delayedResize);
    observe(textarea, 'keydown', delayedResize);

    textarea.focus();
    textarea.select();
    delayedResize();
}

function generateRequest() {
    let request = {};

    request.name = $("#nameField").val();
    request.email = $("#emailField").val();
    request.department = $("#departmentField").val();

    console.log(request);
}