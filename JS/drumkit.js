'use strict'
/*
drumkit user clicks on element and a sound play. eazy, but what about having it somehwat record a session?
ill just make a function that ehcks if record is true it adds the el sounds just pressed to a list of sounds to iterate over when user clicks playback.
i suspect the sounds will be player and iterated over incredible fast so ill have to prepare a wait function.
i cant have it record timing so ill focus on playing sounds in sequence by user back to them and a delete recording button ofc
ill add styling to each drum part that react on user inpput this should also play when the recording is playing
*/

const playRecordingBtn = document.querySelector("#recording-button")
const deleteRecordingBtn = document.querySelector("#delete-recording")
const drumkitEL = document.querySelector(".drumkit-section")
const soundFolder = "sounds/"
const soundList = [
    {sound: "clap.wav", key: "q"},
    {sound: "hihat.wav", key: "w"},
    {sound: "kick.wav", key: "e"},
    {sound: "openhat.wav", key: "r"},
    {sound: "ride.wav", key: "t"},
    {sound: "snare.wav", key: "y"},
    {sound: "tink.wav", key: "u"},
    {sound: "tom.wav", key: "i"}
]

instrumentCreator(drumkitEL, soundList, soundFolder)

function instrumentCreator(targetEl, source, sourceFolder){
    source.forEach(e => {
        let {sound, key} = e
        let instrument =  document.createElement("div")
        instrument.id = key
        let text = document.createElement("p")
        instrument.className = "instrument"
        text.textContent = sound.split('').splice(0, (sound.length - 4)).join('')
        addingAudioFunctionality(instrument, sound, sourceFolder)
        instrument.append(text)
        targetEl.append(instrument)
    });
}

window.addEventListener("keydown", (e)=>{
    console.log(e.key)
    let validKey = testKey(e.key)
    if(!validKey)return
    console.log(validKey)
    document.querySelector(`#${validKey.key}`).querySelector("audio").currentTime = 0
    document.querySelector(`#${validKey.key}`).querySelector("audio").play()
    document.querySelector(`#${validKey.key}`).classList.add("instrumentActive")
})
window.addEventListener("keyup", (e)=>{
    console.log(e.key)
    let validKey = testKey(e.key)
    if(!validKey)return
    console.log(validKey)
    document.querySelector(`#${validKey.key}`).classList.remove("instrumentActive")
})

function testKey(key){
    return soundList.find(sound => sound.key === key)
}

function addingAudioFunctionality(targetEl, source, sourceFolder){
    let note = document.createElement("audio")
    note.src = sourceFolder + source
    targetEl.append(note)
    targetEl.addEventListener("mousedown",()=>{note.play(); note.currentTime = 0})
}

drumkitEL.addEventListener("mousedown", (e)=>{
    let clicked = e.target.closest(".instrument")
    if (!clicked){return}
    if(clicked.className === "instrument"){
        recording.push(clicked)
        console.log(recording)
        clicked.classList.add("instrumentActive")
    }
},true)

drumkitEL.addEventListener("mouseup", (e)=>{
    let leaving = e.target.closest(".instrument")
    if (!leaving){return}
    if(leaving.classList.contains("instrumentActive")){
        leaving.classList.remove("instrumentActive")
    }
})

let recording = []
//this takes i and makes it so all timeouts fires at the same time but with increased delay based on time * i so first is 500*0=0 then 500*1=500 then 500*2=1000
function playBack(recording){
    for (let i = 0; i < recording.length; i++) {
        setTimeout(function(){
            recording[i].querySelector("audio").play()
            recording[i].querySelector("audio").currentTime = 0
        }, 500 * i)
    }
}
playRecordingBtn.addEventListener("click", ()=>{
    playBack(recording)
})
deleteRecordingBtn.addEventListener("click",()=>{
    recording = []
})