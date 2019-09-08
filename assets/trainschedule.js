var name;
var destination;
var firstArrival;
var frequency;
var database;
var trainFirebaseData;
var newFirebaseData;
var time;
var clock;

var trainList = ["train2", "train3", "train1"]
const Train1 = {
  trainName: "rando trainer",
  Destination: "travel Station",
  TimeFirstTrain: "01:00",
  Frequency: "5",
}

const train2 = {
  trainName: "anyones choochoo",
  Destination: "Satans lair",
  TimeFirstTrain: "11:00",
  Frequency: "33",
}

const train3 = {
  trainName: "Sam and frodo",
  Destination: "mordor",
  TimeFirstTrain: "18:00",
  Frequency: "55",
}



$(document).ready(function () {
  function runningClock() {
    time = moment().format("hh:mm:ss A");
    $("#time").text(time);
  }
  clock = setInterval(runningClock, 1000);
  var config = {
    apiKey: "AIzaSyADgptu-z1GomsAfWzHrkDbs9sbpOKLV_s",
    authDomain: "fir-train-955b3.firebaseapp.com",
    databaseURL: "https://fir-train-955b3.firebaseio.com",
    projectId: "fir-train-955b3",
    storageBucket: "fir-train-955b3.appspot.com",
    messagingSenderId: "1003867411881",
    appId: "1:1003867411881:web:d0847707f675c61b"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  $("#submitButton").on("click", function (event) {
    event.preventDefault();
    name = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstArrival = $("#firstTrainTimeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();
    console.log(firstArrival);
    trainFirebaseData = {
      DatatrainName: name,
      Datadest: destination,
      DatafirstArrival: firstArrival,
      Datafrequency: frequency,
      TimeStamp: firebase.database.ServerValue.TIMESTAMP
    };
    database.ref().push(trainFirebaseData);
    clear();
  });
  database.ref().on("child_added", function (childSnapshot) {
    var snapName = childSnapshot.val().DatatrainName;
    var snapDest = childSnapshot.val().Datadest;
    var snapFreq = childSnapshot.val().Datafrequency;
    var snapArrival = childSnapshot.val().DatafirstArrival;
    var firstArrivalConverted = moment(snapArrival, "HH:mm A").subtract(1, "years");
    var diff = moment().diff(moment(firstArrivalConverted), "minutes");
    var left = diff % snapFreq;
    var timeLeft = snapFreq - left;
    var newArrival = moment().add(timeLeft, "m").format("HH:mm: A");
    $("#table-info").append("<tr><td>" + snapName + "</td><td>" + snapDest + "</td><td>" + snapFreq + "</td><td>" +
      newArrival + "</td><td>" + timeLeft + "</td></tr>");
  });
  function clear() {
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#frequencyInput").val("");
  }
});