window.addEventListener("DOMContentLoaded", function() {
    var thlist = this.document.querySelectorAll('#types div span');
    for(var i = 0; i < thlist.length; i++){
        thlist[i].style.backgroundColor = getTypeColor(thlist[i].textContent);
    }
    var tdlist = this.document.querySelectorAll('#types td');
    for(var i = 0; i < tdlist.length; i++){
        if(tdlist[i].textContent != ""){
            if(tdlist[i].textContent == "0"){
                tdlist[i].style.backgroundColor = "#666666";
                tdlist[i].style.borderColor = "#666666";
            } else if(tdlist[i].textContent == "½"){
                tdlist[i].style.backgroundColor = "#dc5858";
                tdlist[i].style.borderColor = "#bb4d4d";
            } else if(tdlist[i].textContent == "2"){
                tdlist[i].style.backgroundColor = "#6bbd74";
                tdlist[i].style.borderColor = "#56965d";
            }
        }
    }
});

function getTypeColor(text){
    switch(text){
        case "Normal":
            return "#A8A77A";
        case "Fire":
            return "#EE8130";
        case "Water":
            return "#6390F0";
        case "Electric":
            return "#F7D02C";
        case "Grass":
            return "#7AC74C";
        case "Ice":
            return "#96D9D6";
        case "Fighting":
            return "#C22E28";
        case "Poison":
            return "#A33EA1";
        case "Ground":
            return "#E2BF65";
        case "Flying":
            return "#A98FF3";
        case "Psychic":
            return "#F95587";
        case "Bug":
            return "#A6B91A";
        case "Rock":
            return "#B6A136";
        case "Ghost":
            return "#735797";
        case "Dragon":
            return "#6F35FC";
        case "Dark":
            return "#705746";
        case "Steel":
            return "#B7B7CE";
        case "Fairy":
            return "#D685AD";
        default:
            return "#ffffff";
    }
}