let reminders = JSON.parse(localStorage.getItem("reminders")) || []

function saveData(){
localStorage.setItem("reminders",JSON.stringify(reminders))
}

function render(){

let list=document.getElementById("reminderList")
list.innerHTML=""

reminders.forEach((r,i)=>{

let li=document.createElement("li")

li.innerHTML=`

<div>

<strong>${r.title}</strong><br>

${r.date} ${r.time}<br>

${r.category} | ${r.priority}

</div>

<div>

<button onclick="deleteReminder(${i})">❌</button>

</div>

`

list.appendChild(li)

})

}

function addReminder(){

let title=document.getElementById("title").value
let date=document.getElementById("date").value
let time=document.getElementById("time").value
let category=document.getElementById("category").value
let priority=document.getElementById("priority").value

let reminder={
title,
date,
time,
category,
priority
}

reminders.push(reminder)

saveData()

render()

scheduleNotification(reminder)

}

function deleteReminder(i){

reminders.splice(i,1)

saveData()

render()

}

render()

function scheduleNotification(rem){

if(!("Notification" in window)) return

Notification.requestPermission()

let now=new Date()

let remindTime=new Date(rem.date+" "+rem.time)

let diff=remindTime-now

if(diff>0){

setTimeout(()=>{

new Notification(rem.title,{
body:"Reminder time!"
})

},diff)

}

}

document.getElementById("darkBtn").onclick=()=>{

document.body.classList.toggle("dark")

}

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {
  installBtn.style.display = "none";
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log("User choice:", outcome);
  deferredPrompt = null;
});

if ("Notification" in window) {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("Notifications allowed");
    }
  });
}
function showNotification(text) {
  if (Notification.permission === "granted") {
    new Notification("Reminder", {
      body: text,
      icon: "icon.png"
    });
  }
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered"));
}