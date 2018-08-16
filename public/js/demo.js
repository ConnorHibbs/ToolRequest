
$().ready(() => {
$("#tabs").tabs();

$("tbody").sortable({
    items: "> tr:not(:first)",
    appendTo: "parent",
    helper: "clone"
}).disableSelection();

$("#tabs ul li a").droppable({
    hoverClass: "drophover",
    tolerance: "pointer",
    drop: function(e, ui) {
        var tabdiv = $(this).attr("href");
        $(tabdiv + " table tr:last").after("<tr>" + ui.draggable.html() + "</tr>");
        ui.draggable.remove();
    }
});

});