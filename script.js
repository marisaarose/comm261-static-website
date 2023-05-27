window.addEventListener("DOMContentLoaded", function () {
  var currentPage = this.location.href;
  var flag = 0;
  if (currentPage.includes("index")) {
    var thlist = this.document.querySelectorAll("#types div span");
    for (var i = 0; i < thlist.length; i++) {
      thlist[i].style.backgroundColor = getTypeColor(thlist[i].textContent);
    }
    var tdlist = this.document.querySelectorAll("#types td");
    for (var i = 0; i < tdlist.length; i++) {
      if (tdlist[i].textContent != "") {
        if (tdlist[i].textContent == "0") {
          tdlist[i].style.backgroundColor = "#666666";
          tdlist[i].style.borderColor = "#666666";
        } else if (tdlist[i].textContent == "½") {
          tdlist[i].style.backgroundColor = "#dc5858";
          tdlist[i].style.borderColor = "#bb4d4d";
        } else if (tdlist[i].textContent == "2") {
          tdlist[i].style.backgroundColor = "#6bbd74";
          tdlist[i].style.borderColor = "#56965d";
        }
      }
    }
    this.document.querySelector('.navigation > a').style.color = "var(--red)";
    flag = 1;
  }

  var navigationList1 = document.querySelectorAll(".navigation > a");
  var navigationList2 = document.querySelectorAll(".navigation > div > a");
  for (var i = 0; i < navigationList1.length; i++) {
    if (currentPage.includes(navigationList1[i].textContent.toLowerCase().trimStart().split(' ')[0])) {
      navigationList1[i].style.color = "var(--red)";
      flag = 1;
    }
  }
  if (flag != 1) {
    for (var i = 0; i < navigationList2.length; i++) {
      if (currentPage.includes(navigationList2[i].textContent.toLowerCase().trimStart().split(' ')[0])) {
        navigationList2[i].style.color = "var(--red)";
        flag = 1;
      }
    }
  }
  if(flag != 1){
    this.document.querySelectorAll('.navigation > div > a')[0].style.color = "var(--red)";
  }
});

function getTypeColor(text) {
  switch (text) {
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
