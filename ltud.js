let viewActivitiesMainDiv = document.getElementById("viewActivitiesMainDiv");
viewActivitiesMainDiv.style = "display: none";
let addActivitiesMainDiv = document.getElementById("addActivitiesMainDiv");
addActivitiesMainDiv.style = "display: none"
let mainDivs = document.getElementsByClassName("main");
let navbarLis = document.getElementsByClassName("navbarLi");
let decideNavbarLi = document.getElementById("decideNavbarLi");
decideNavbarLi.classList.add("active");
let viewNavbarLi = document.getElementById("viewNavbarLi");
let addNavbarLi = document.getElementById("addNavbarLi");

let allActivitiesDiv = document.getElementById("allActivitiesDiv");
let allActivitiesList = "<ol>";
let data;
let tagsArray = [];
let canDoThis = [];
let divToUpdate;
let classToUpdate;
let inputName;
let locationRadiosDiv = document.getElementById("locationRadiosDiv");
let tagCheckboxesDiv = document.getElementById("tagCheckboxesDiv");
let radios = document.getElementsByClassName("radios");
let locationInput;
let tagCheckboxes = document.getElementsByClassName("tagCheckboxes");
let decideButton = document.getElementById("decideButton");
let decision = document.getElementById("decision");
let activitiesForThisLocation = [];
let newActivityName;
let addActivityDiv = document.getElementById("addActivityDiv");
let saveButton = document.getElementById("saveButton");
let addActivityNameInput = document.getElementById("addActivityNameInput");
let addLocationCheckboxes = document.getElementsByClassName("addLocationCheckboxes");
let newLocationsArray = [];
let addOtherLocationCheckbox = document.getElementById("addOtherLocationCheckbox");
let addOtherLocationInput = document.getElementById("addOtherLocationInput");
addOtherLocationInput.style = "display: none";
let newLocationString = "";
let newLocationStringCondensed = "";
let addTagCheckboxes = document.getElementsByClassName("addTagCheckboxes");
let addOtherTagCheckbox = document.getElementById("addOtherTagCheckbox");
let addOtherTagInput = document.getElementById("addOtherTagInput");
addOtherTagInput.style = "display: none";
let newTagsArray = [];
let goToAddActivitiesButton = document.getElementById("goToAddActivitiesButton");
let clearButton = document.getElementById("clearButton");
let clicked; 
let addActivityFeedback = document.getElementById("addActivityFeedback");




let activities = [
  {
    activityName: "Work out",
    location: ["atHome"],
    tags: ["toDo"],
  },
  {
    activityName: "Read a novel",
    location: ["atHome","atWork"],
    tags: ["fun"],
  },
  {
    activityName: "Listen to a podcast",
    location: ["atHome","atWork"],
    tags: ["fun", "learning"],
  },
  {
    activityName: "Watch a movie",
    location: ["atHome","atWork"],
    tags: ["fun"],
  },
  {
    activityName: "Finish your homework",
    location: ["atHome"],
    tags: ["toDo","learning"],
  }
];

decideNavbarLi.onclick = function(){
  showMainDiv(document.getElementById("decideMainDiv"));
  uncheckCheckboxes(tagCheckboxes);
  makeNavbarLiActive(decideNavbarLi);
}

viewNavbarLi.onclick = function(){
  showMainDiv(viewActivitiesMainDiv);
  makeNavbarLiActive(viewNavbarLi);
}

addNavbarLi.onclick = function(){
  showMainDiv(addActivitiesMainDiv);
  uncheckCheckboxes(addTagCheckboxes);
  uncheckCheckboxes(addLocationCheckboxes);
  makeNavbarLiActive(addNavbarLi);
}

goToAddActivitiesButton.onclick = function(){
  showMainDiv(addActivitiesMainDiv);
  makeNavbarLiActive(addNavbarLi);
}

function showMainDiv(divToShow){
  for (i = 0; i < mainDivs.length; i++){
    let mainDiv = mainDivs[i];
    if(mainDiv == divToShow){
      divToShow.style = "display: grid";
    } else {
      mainDiv.style = "display: none";
    }
  }
  divToShow.style = "display: grid";
}

function makeNavbarLiActive(clickedNavbarLi){
  decideNavbarLi.classList.remove("active");
  for (i = 0; i < navbarLis.length; i++){
    let navbarLi = navbarLis[i];
    if (navbarLi == clickedNavbarLi){
      navbarLi.classList.add("active");
    } else {
      navbarLi.classList.remove("active");
    }
  }
}

decideButton.onclick = function () {
  getActivitiesForLocation();
  getActivitiesWithTagsForLocation();
  if (canDoThis.length > 1) {
    randomNumber = getRandomNumber();
  } else {
    decision.innerHTML = canDoThis;
  }
  
};

function setCheckedLocation() {
  for (i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      locationInput = radios[i].value;
      break;
    }
  }
}

function getActivitiesForLocation() {
  setCheckedLocation();
  for (let activity of activities) {
    if (activity.location.includes(locationInput)) {
      activitiesForThisLocation.push(activity);
    }
  }
}

function setCheckedTags() {
  for (i = 0; i < tagCheckboxes.length; i++) {
    if (tagCheckboxes[i].checked) {
      tagsArray.push(tagCheckboxes[i].value);
    }
  }
}

function getActivitiesWithTagsForLocation() {
  setCheckedTags();
  for (let activityForThisLocation of activitiesForThisLocation) {
    for (let tag of tagsArray) {
      if (activityForThisLocation.tags.includes(tag)) {
        canDoThis.push(activityForThisLocation.activityName);
      }
    }
  }
}

function clearArrays(){
  tagsArray = [];
  activitiesForThisLocation = [];
  canDoThis = [];
}



function populateList() {
  for (i = 0; i < activities.length; i++) {
    let activity = activities[i];
    let activityLi = "<li>" + activity.activityName + "</li>";
    allActivitiesList += activityLi;
  }
  allActivitiesList += "</ol>";
  allActivitiesDiv.innerHTML = allActivitiesList;
}

function getAjaxObject() {
  var ajaxRequest;
  try {
    ajaxRequest = new XMLHttpRequest();
  } catch (e) {
    try {
      ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        alert("Something went wrong");
        ajaxRequest = null;
      }
    }
  }
  return ajaxRequest;
}

function getRandomNumber() {
  let ajaxRequest = getAjaxObject();
  let url = "https://api.random.org/json-rpc/1/invoke";
  if (ajaxRequest != null) {
    ajaxRequest.open("POST", url);
    ajaxRequest.onreadystatechange = function () {
      if (ajaxRequest.readyState == 4) {
        let resultJSON = JSON.parse(ajaxRequest.responseText); // the result will be in json format.
        console.log(resultJSON);
        let randomNumber = parseInt(resultJSON.result.random.data);
        showDecision(randomNumber);
      }
    };
    data = {
      jsonrpc: "2.0",
      method: "generateIntegers",
      params: {
        apiKey: "4093a042-4c25-4d6d-b73d-8f8a88cb53d3",
        n: 1,
        min: 1,
        max: canDoThis.length,
        replacement: true,
        base: 10,
      },
      id: 683489,
    };
    data = JSON.stringify(data);
    ajaxRequest.send(data);
  } // if (ajaxRequest != null)
}

function showDecision(randomNumber) {
let doThis = canDoThis[randomNumber];
decision.innerHTML = doThis;
clearArrays();
}




saveButton.onclick = function(){
  newActivityName = addActivityNameInput.value;
  addLocationsToNewActivity();
  addTagsToNewActivity();
  activities.push({
    activityName: newActivityName,
    location: newLocationsArray,
    tags: newTagsArray
  });
  allActivitiesList = allActivitiesList.substring(0,allActivitiesList.length-5);
  allActivitiesList += `<li>${newActivityName}</li></ol>`;
  allActivitiesDiv.innerHTML = allActivitiesList;
  addActivityNameInput.value = "";
  console.log("Added: \n" + (activities[activities.length-1]).activityName + "\n" + (activities[activities.length-1]).location + "\n" +(activities[activities.length-1]).tags);
  addOtherLocationInput.value = "";
  addOtherTagInput.value = "";
  sayActivitySaved();
  uncheckCheckboxes(addLocationCheckboxes);
  uncheckCheckboxes(addTagCheckboxes);
}

function sayActivitySaved(){
  addActivityFeedback.innerHTML = "Activity was saved!";
  setTimeout(function(){ 
    addActivityFeedback.innerHTML = "";
   }, 2000);
}

function uncheckCheckboxes(checkboxes){
  for (i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}
function addLocationsToNewActivity(){
  for (i = 0; i < addLocationCheckboxes.length; i++) {
    let addLocationCheckbox = addLocationCheckboxes[i];
    if (addLocationCheckbox.checked) {
      if (addLocationCheckbox.value == "addAtWork"){
        newLocationsArray.push("atWork");
      } else if (addLocationCheckbox.value == "addAtHome"){
        newLocationsArray.push("atHome");
      } else if (addLocationCheckbox.value == "addOtherLocation"){
        newLocationString = addOtherLocationInput.value;
        newLocationStringCondensed = (newLocationString.split(" ").join("")).trim();
        newLocationsArray.push(newLocationStringCondensed);
        addNewOptionToUI(newLocationStringCondensed, newLocationString, locationRadiosDiv, "radio", "radios", "location");
      }
    }
  }
}

function addTagsToNewActivity(){
  for (i = 0; i < addTagCheckboxes.length; i++) {
    let addTagCheckbox = addTagCheckboxes[i];
    if (addTagCheckbox.checked) {
      if (addTagCheckbox.value == "addFun"){
        newTagsArray.push("fun");
      } else if (addTagCheckbox.value == "addHousework"){
        newTagsArray.push("housework");
      } else if (addTagCheckbox.value == "addToDo"){
        newTagsArray.push("toDo");
      } else if (addTagCheckbox.value == "addOtherTag"){
        newTagString = addOtherTagInput.value;
        newTagStringCondensed = (newTagString.split(" ").join("")).trim();
        newTagsArray.push(newTagStringCondensed);
        addNewOptionToUI(newTagStringCondensed, newTagString, tagCheckboxesDiv, "checkbox", "checkboxes", newTagStringCondensed + "checkbox",  );
      }
    }
  }
}

addOtherTagCheckbox.onclick = function(){
  showHideAddInput(addOtherTagCheckbox, addOtherTagInput);
}

addOtherLocationCheckbox.onclick = function(){
  showHideAddInput(addOtherLocationCheckbox, addOtherLocationInput);
}

function addNewOptionToUI(newStringCondensed, newString, divToUpdate, inputType, classToUpdate, inputName){
    divToUpdate.innerHTML += `<input type="${inputType}" id="${newStringCondensed}${inputType}" class = ${classToUpdate}" name="${inputName}" value="${newStringCondensed}"><label for="${newStringCondensed}">&nbsp${newString}</label><br>`;

}

function showHideAddInput(checkbox, input){
  if (checkbox.checked){
    input.style = "display: inline-block";
  } else {
    input.style = "display: none";
  }
}

clearButton.onclick = function(){
  activities = [];
  allActivitiesList = "";
  allActivitiesDiv.innerHTML = "<br>";
}

uncheckCheckboxes(tagCheckboxes);
populateList();
