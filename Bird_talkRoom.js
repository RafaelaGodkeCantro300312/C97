var firebaseConfig = {
  apiKey: "AIzaSyB-oTjGzDFX3Xdd7ZMVCgbZV6ParowkMR8",
  authDomain: "bird-talk.firebaseapp.com",
  databaseURL: "https://bird-talk-default-rtdb.firebaseio.com",
  projectId: "bird-talk",
  storageBucket: "bird-talk.appspot.com",
  messagingSenderId: "170734762794",
  appId: "1:170734762794:web:b93db5323a4030431e7c53",
  measurementId: "G-1HXTJL17JM"
};
  firebase.initializeApp(firebaseConfig);
  userName=localStorage.getItem("userName");
  document.getElementById("userName").innerHTML="Bem-vindo! "+userName+" :)";
function addRoom() {
  room_name=document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose:"adding room name"
  });
  localStorage.setItem("room_name", room_name);
  window.location="Bird_talkPage.html";
}
function getData() {
  firebase.database().ref("/").on('value', function(snapshot){
    document.getElementById("output").innerHTML="";
    snapshot.forEach(function(childSnapshot){
      childKey=childSnapshot.key;
      room_names=childKey;
      console.log("room_name-"+room_names);
      row="<div class='room_name' id="+room_names+" onclick='redirectToRoomName(this.id)'>#"+room_names+"</div><hr>";
      document.getElementById("output").innerHTML+=row;
    });
  });
}
getData();
function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location="Bird_talkPage.html";
}
function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("room_name");
  window.location="index.html";
}