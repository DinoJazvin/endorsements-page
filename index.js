import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://endorsements-database-3bb7f-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements") 

const buttonEL = document.getElementById("publish-btn")
const inputEl = document.getElementById("myTextarea")
const endorsementsEl = document.getElementById("textarea-container")

onValue(endorsementsInDB, function(snapshot) {
    let comments = Object.values(snapshot.val())

    clearEndorsementsLists()
    clearInput()
    for(let comment of comments){
        // console.log(comment)
        addEndorsement(comment)
    }
})

buttonEL.addEventListener("click", function(){
    let inputVal = inputEl.value

    push(endorsementsInDB, inputVal)
    clearInput()
})

function clearEndorsementsLists(){
    endorsementsEl.innerHTML = ""
}

function clearInput(){
    inputEl.value = ""
}

function addEndorsement(inputVal){
    endorsementsEl.innerHTML += `<textarea id="endorsements-output">${inputVal}</textarea>`
}