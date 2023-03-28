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
    room_name=localStorage.getItem("room_name");

function send() {
  msg=document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:userName,
    message:msg,
    like:0
  });
  document.getElementById("msg").value="";
}
function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("room_name");
    window.location="index.html";
}
function voltar() {
    localStorage.removeItem("room_name");
    window.location="Bird_talkRoom.html";
}
function getData() {
  firebase.database().ref("/"+room_name).on('value', function(snapshot) {
    document.getElementById("output").innerHTML="";
    snapshot.forEach(function(childSnapshot){
      childKey=childSnapshot.key;
      childData=childSnapshot.val();
      if(childKey !="purpose") {
        firebase_message_id=childKey;
        message_data=childData;
        console.log(firebase_message_id);
        console.log(message_data);
        name=message_data['name'];
        message=message_data['message'];
        like=message_data['like'];
        nameWithTag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
        messageWithTag="<h4 class='message_h4'>"+message+"</h4>";
        likeButton="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
        spanWithTag="<span class='glyphicon glyphicon-thumbs-up'> Like: "+like+"</span></button><hr>";
        row=nameWithTag+messageWithTag+likeButton+spanWithTag;
        document.getElementById("output").innerHTML+=row;
      }
    })
  })
}
getData();
function updateLike(message_id) {
  console.log("botão like pressionado-"+message_id);
  button_id=message_id;
  likes=document.getElementById(button_id).value;
  updateLikes=Number(likes)+1;
  console.log(updateLikes);
  firebase.database().ref(room_name).child(message_id).update({
    like:updateLikes
  });
}