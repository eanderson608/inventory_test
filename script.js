window.onload = function() {

    var inventoryTables = document.getElementsByClassName("inventory-table");

    for (var i = 0; i < inventoryTables.length; i++) {

        for (var j = 0; j < 20; j++) {
            var cell = document.createElement("div");
            cell.classList.add('inventory-cell');
            cell.setAttribute('ondrop', 'drop(event)');
            cell.setAttribute('ondragover', 'allowDrop(event)')
            cell.id = 'cell' + j

            inventoryTables[i].appendChild(cell);
        }
    }
}

function addItem(type, count) {
    console.log('addItem');
    var cells = document.getElementsByClassName("inventory-cell");

    for (var i = 0; i < cells.length; i++) {

        if (cells[i].firstChild == null && cells[i].parentNode.style.visibility != 'hidden') {

            var item = document.createElement('div');
            var text = document.createElement('span');
            item.appendChild(text);
            item.setAttribute('data-item-type', type);
            item.setAttribute('data-item-count', count);
            item.classList.add('inventory-item');
            item.setAttribute("draggable", "true");
            item.setAttribute("ondragstart", "drag(event)");

            var now = new Date();
            item.id = now.getTime();

            item.style.backgroundImage = "url('WEED.png')";

            text.innerHTML = count;

            cells[i].appendChild(item);
            break;
        }
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var source = document.getElementById(data)
    if (ev.target.firstChild == null) {
        ev.target.appendChild(source);

    } else if (source.getAttribute('data-item-type') == ev.target.getAttribute('data-item-type') && source.id != ev.target.id) {
        c1 = Number(source.getAttribute('data-item-count'));
        c2 = Number(ev.target.getAttribute('data-item-count'));
        newCount = (c1 + c2).toFixed(1)
        source.parentNode.removeChild(source);
        ev.target.setAttribute('data-item-count', newCount);
        ev.target.getElementsByTagName('span')[0].innerHTML = newCount;

    } else if (source.getAttribute('data-item-type') != ev.target.getAttribute('data-item-type') && ev.target.getAttribute('data-item-type') != null) {
        var parentTarget = ev.target.parentNode;
        var parentSource = source.parentNode;
        if (source.id != ev.target.id) {
            parentTarget.replaceChild(source, ev.target);
            parentSource.appendChild(ev.target);
        }
    }
}
