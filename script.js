class Type {
  constructor(name, resists, weakness, immune, color) {
    this.name = name;
    this.resists = resists;
    this.weakness = weakness;
    this.immune = immune;
    this.color = color;
  }
  setWeakness(weakness) {
    this.weakness = weakness;
  }
  setResists(resists) {
    this.resists = resists;
  }
  setImmune(immune) {
    this.immune = immune;
  }
  equals(type) {
    if (type == this.name || type.name == this.name) {
      return true;
    }
    return false;
  }
}

// Declaring types
let normal = new Type("Normal", null, null, null, "#A8A77A");
let fire = new Type("Fire", null, null, null, "#EE8130");
let water = new Type("Water", null, null, null, "#6390F0");
let electric = new Type("Electric", null, null, null, "#F7D02C");
let grass = new Type("Grass", null, null, null, "#7AC74C");
let ice = new Type("Ice", null, null, null, "#96D9D6");
let fighting = new Type("Fighting", null, null, null, "#C22E28");
let poison = new Type("Poison", null, null, null, "#A33EA1");
let ground = new Type("Ground", null, null, null, "#E2BF65");
let flying = new Type("Flying", null, null, null, "#A98FF3");
let psychic = new Type("Psychic", null, null, null, "#F95587");
let bug = new Type("Bug", null, null, null, "#A6B91A");
let rock = new Type("Rock", null, null, null, "#B6A136");
let ghost = new Type("Ghost", null, null, null, "#735797");
let dragon = new Type("Dragon", null, null, null, "#6F35FC");
let dark = new Type("Dark", null, null, null, "#705746");
let steel = new Type("Steel", null, null, null, "#B7B7CE");
let fairy = new Type("Fairy", null, null, null, "#D685AD");

// Type array
var allTypes = [normal, fire, water, electric, grass, ice, fighting, poison, ground, flying, psychic, bug, rock, ghost, dragon, dark, steel, fairy];

// Setting weaknesses
normal.setWeakness([fighting]);
fire.setWeakness([water, ground, rock]);
water.setWeakness([electric, grass]);
electric.setWeakness([ground]);
grass.setWeakness([fire, ice, poison, flying, bug]);
ice.setWeakness([fire, fighting, rock, steel]);
fighting.setWeakness([flying, psychic, fairy]);
poison.setWeakness([ground, psychic]);
ground.setWeakness([water, grass, ice]);
flying.setWeakness([electric, ice, rock]);
psychic.setWeakness([bug, ghost, dark]);
bug.setWeakness([fire, flying, rock]);
rock.setWeakness([water, grass, fighting, ground, steel]);
ghost.setWeakness([ghost, dark]);
dragon.setWeakness([ice, dragon, fairy]);
dark.setWeakness([fighting, bug, fairy]);
steel.setWeakness([fire, fighting, ground]);
fairy.setWeakness([poison, steel]);

// Setting resistances 
fire.setResists([fire, grass, ice, bug, steel, fairy]);
water.setResists([fire, water, ice, steel]);
electric.setResists([electric, flying, steel]);
grass.setResists([water, electric, grass, ground]);
ice.setResists([ice]);
fighting.setResists([bug, rock, dark]);
poison.setResists([grass, fighting, poison, bug, fairy]);
ground.setResists([poison, rock]);
flying.setResists([grass, fighting, bug]);
psychic.setResists([fighting, psychic]);
bug.setResists([grass, fighting, ground]);
rock.setResists([normal, fire, poison, flying]);
ghost.setResists([poison, bug]);
dragon.setResists([fire, water, electric, grass]);
dark.setResists([ghost, dark]);
steel.setResists([normal, grass, ice, flying, psychic, bug, rock, dragon, steel, fairy]);
fairy.setResists([fighting, bug, dark]);

// Setting immunities
normal.setImmune([ghost]);
ground.setImmune([electric]);
flying.setImmune([ground]);
ghost.setImmune([normal, fighting]);
dark.setImmune([psychic]);
steel.setImmune([poison]);
fairy.setImmune([dragon]);

function getTypeDefense(type_1, type_2){
  let type1 = null;
  let type2 = null;
  for(var i = 0; i < allTypes.length; i++){
    if(allTypes[i].equals(type_1)){
      type1 = allTypes[i];
    } 
    if(type_2 != null){
      if(allTypes[i].equals(type_2)){
        type2 = allTypes[i];
      }
    }
  }
  if(type2 != null){
    var currentEl = null;

    var x4arr = [];
    var x2arr = [];
    var x1arr = [];
    var x12arr = [];
    var x14arr = [];
    var x0arr = [];
    var sum = [];

    // x4
    currentEl = document.getElementById('x4');
    var x4output = "";
    x4arr = getCombinedArr(type1.weakness, type2.weakness);
    x4output = getArrayOutput(x4arr, x4output);
    if(x4output != ""){
      currentEl.style.display = "flex";
      currentEl.innerHTML = "<b>4x Damage</b> " + x4output;
    } else {
      currentEl.style.display = "none";
    }
    sum = allTypes.filter(n => !x4arr.includes(n));

    // x1/4
    currentEl = document.getElementById('x14');
    var x14output = "";
    if(type1.resists != null && type2.resists != null){
      x14arr = getCombinedArr(type1.resists, type2.resists);
      x14output = getArrayOutput(x14arr, x14output);
    } 
    if(x14output != ""){
      currentEl.style.display = "flex";
      currentEl.innerHTML = "<b>¼x Damage</b> " + x14output;
    } else {
      currentEl.style.display = "none";
    }
    sum = sum.filter(n => !x14arr.includes(n));
    console.log(sum);

    // x0
    currentEl = document.getElementById('x0');
    if(type1.immune != null && type2.immune != null){
      var shared = getCombinedArr(type1.immune, type2.immune);
      x0arr = type1.immune.concat(type2.immune);
      if(shared.length != 0){
        x0arr = x0arr.filter(n => !shared.includes(n));
        x0arr.push(shared[0]);
      }
    } else if(type1.immune == null && type2.immune != null){
      x0arr = type2.immune;
    } else if(type1.immune != null && type2.immune == null){
      x0arr = type1.immune;
    }
    var x0output = "";
    x0output = getArrayOutput(x0arr, x0output);
    if(x0output != ""){
      currentEl.style.display = "flex";
      currentEl.innerHTML = "<b>0x Damage</b> " + x0output;
    } else {
      currentEl.style.display = "none";
    }
    sum = sum.filter(n => !x0arr.includes(n));

    // Everything else
    var resistances = [];
    var weaknesses = [];

    if(type1.resists != null && type2.resists != null){
      resistances = type1.resists.concat(type2.resists);
    } else if(type1.resists != null && type2.resists == null){
      resistances = type1.resists;
    } else if(type1.resists == null && type2.resists != null){
      resistances = type2.resists;
    }

    weaknesses = type1.weakness.concat(type2.weakness);

    for(var i = 0; i < sum.length; i++){
      for(var j = 0; j < weaknesses.length; j++){
        for(var n = 0; n < resistances.length; n++){
          if(sum[i] == weaknesses[j] && sum[i] == resistances[n]){
            x1arr.push(resistances[n]);
          } 
        }
      }
    }

    x12arr = resistances.filter(n => !x1arr.includes(n));
    x12arr = x12arr.filter(n => !x14arr.includes(n));
    x12arr = x12arr.filter(n => !x4arr.includes(n));
    x12arr = x12arr.filter(n => !x0arr.includes(n));
    sum = sum.filter(n => !x12arr.includes(n));
    sum = sum.filter(n => !x1arr.includes(n));
    x2arr = sum.filter(n => weaknesses.includes(n));
    sum = sum.filter(n => !x2arr.includes(n));
    x1arr = x1arr.concat(sum);

    currentEl = document.getElementById('x12');
    var x12output = "";
    x12output = getArrayOutput(x12arr, x12output);
    if(x12output != ""){
      currentEl.style.display = "flex";
      currentEl.innerHTML = "<b>½x Damage</b> " + x12output;
    } else {
      currentEl.style.display = "none";
    }

    currentEl = document.getElementById('x2');
    var x2output = "";
    x2output = getArrayOutput(x2arr, x2output);
    if(x2output != ""){
      currentEl.style.display = "flex";
      currentEl.innerHTML = "<b>2x Damage</b> " + x2output;
    } else {
      currentEl.style.display = "none";
    }

    currentEl = document.getElementById('x1');
    var x1output = "";
    x1output = getArrayOutput(x1arr, x1output);
    if(x1output != ""){
      currentEl.style.display = "flex";
      currentEl.innerHTML = "<b>1x Damage</b> " + x1output;
    } else {
      currentEl.style.display = "none";
    }
    
  } else {
    document.getElementById('x4').style.display = "none";

    var sum = type1.weakness.concat(type1.immune, type1.resists);

    // Get weaknesses
    var x2output = "";
    document.getElementById('x2').innerHTML = "<b>2x Damage</b> " + getArrayOutput(type1.weakness, x2output);

    // Get neutral
    var x1output = "";
    document.getElementById('x1').innerHTML = "<b>1x Damage</b> " + getArrayOutput(allTypes.filter(n => !sum.includes(n)), x1output);

    // Get resistances 
    var x12output = "";
    if(type1.resists != null){
      x12output = getArrayOutput(type1.resists, x12output);
      document.getElementById('x12').innerHTML = "<b>½x Damage</b> " + x12output;
      document.getElementById('x12').style.display = "flex";
    } else {
      document.getElementById('x12').style.display = "none";
    }

    // Get immunities
    var x0output = "";
    if(type1.immune != null){
      x0output = getArrayOutput(type1.immune, x0output);
      document.getElementById('x0').innerHTML = "<b>0x Damage</b> " + x0output;
      document.getElementById('x0').style.display = "flex";
    } else {
      document.getElementById('x0').style.display = "none";
    }
  }
}

function getArrayOutput(arr, output){
  if(arr != null){
    if(arr.length != 0){
      for(var i = 0; i < arr.length; i++){
        output += "<span style='background-color:" + arr[i].color + ";'>" + arr[i].name + "</span>";
      }
    }
  }
  return output;
}

function getCombinedArr(arr1, arr2) {
  var output = [];
  if(arr1 != null && arr2 != null){
    if(arr1.length != 0){
      for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
          if (arr1[i].equals(arr2[j])) {
            output.push(arr2[j]);
            break;
          } 
        }
      }
    }
  } 
  return output;
}

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
    this.document.querySelector(".navigation > a").style.color = "var(--red)";
    flag = 1;

    this.document
      .querySelector("#submit")
      .addEventListener("click", function () {
        var name = document.querySelector("#name").value;
        var color = document.querySelector("#color").value;
        var region = document.querySelector("#region").value;
        var battleY = document.querySelector("#battle-yes");
        var battle = "";
        var comment = document.querySelector("#comment").value;

        var commentbody = document.querySelector("#comments");

        if (battleY.checked) {
          battle = "Competitive battle seems cool";
        } else {
          battle = "Competitive battle isn't really my thing";
        }

        region += " Fan";

        commentbody.innerHTML +=
          "<div class='card mb-3'><div class='card-body'><h5 class='card-title' style='color:" +
          color +
          ";'>" +
          name +
          "</h5>" +
          "<h6 class='card-subtitle mb-2 ms-2 text-body-secondary extra'>" +
          region +
          " // " +
          battle +
          "</h6>" +
          "<p class='card-text ms-2'>" +
          comment +
          "</p></div></div>";
      });
  } else if (currentPage.includes("calculator")) {
    this.document.querySelector(".navigation > a").style.color = "var(--red)";
    flag = 1;

    // Type 1 List
    var liList1 = document.querySelectorAll("#type1 .selectable");
    var current1 = document.querySelector("#type1 .selected");
    current1.style.backgroundColor = getTypeColor(current1.textContent);
    current1.style.color = "#FFFFFF";
    for (var i = 0; i < liList1.length; i++) {
      liList1[i].addEventListener("click", function () {
        var former = document.querySelector("#type1 .selected");
        former.style.backgroundColor = "";
        former.style.color = "#666666";
        former.classList.remove("selected");
        this.classList.add("selected");
        this.style.backgroundColor = getTypeColor(this.textContent);
        this.style.color = "#FFFFFF";

        var selected = document.querySelectorAll('.selected');
        getTypeDefense(selected[0].textContent, selected[1].textContent);
      });
    }

    // Type 2 List
    var liList2 = document.querySelectorAll("#type2 .selectable");
    var current2 = document.querySelector("#type2 .selected");
    current2.style.backgroundColor = getTypeColor(current2.textContent);
    current2.style.color = "#FFFFFF";
    for (var i = 0; i < liList2.length; i++) {
      liList2[i].addEventListener("click", function () {
        var former = document.querySelector("#type2 .selected");
        former.style.backgroundColor = "";
        former.style.color = "#666666";
        former.classList.remove("selected");
        this.classList.add("selected");
        this.style.backgroundColor = getTypeColor(this.textContent);
        this.style.color = "#FFFFFF";

        var selected = document.querySelectorAll('.selected');
        getTypeDefense(selected[0].textContent, selected[1].textContent);
      });
    }

    var allSelected = this.document.querySelectorAll('.selected');
    getTypeDefense(allSelected[0].textContent, allSelected[1].textContent);
  }

  var navigationList1 = document.querySelectorAll(".navigation > a");
  var navigationList2 = document.querySelectorAll(".navigation > div > a");
  for (var i = 0; i < navigationList1.length; i++) {
    if (
      currentPage.includes(
        navigationList1[i].textContent.toLowerCase().trimStart().split(" ")[0]
      )
    ) {
      navigationList1[i].style.color = "var(--red)";
      flag = 1;
    }
  }
  if (flag != 1) {
    for (var i = 0; i < navigationList2.length; i++) {
      if (
        currentPage.includes(
          navigationList2[i].textContent.toLowerCase().trimStart().split(" ")[0]
        )
      ) {
        navigationList2[i].style.color = "var(--red)";
        flag = 1;
      }
    }
  }
  if (flag != 1) {
    this.document.querySelectorAll(".navigation > div > a")[0].style.color =
      "var(--red)";
  }
});

function getTypeColor(text) {
  for(var i = 0; i < allTypes.length; i++){
    if(allTypes[i].name == text){
      return allTypes[i].color;
    }
  }
  if(text == "Defending →Attacking ↓"){
    return "#FFFFFF";
  }
  return "#000000";
}
