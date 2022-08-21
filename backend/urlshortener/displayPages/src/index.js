import axios from "axios"
import './index.css'
const sendUrlToBackend=async ()=>{
    const inputUrl = document.getElementById('inputUrl').value
    const body={url:inputUrl}
    const resp = await axios.post('http://localhost:3001/api/url',body)
    console.log (resp)
    if(resp.status==200){
        const outcomeTag = document.getElementById('outcomeTag')
        outcomeTag.innerHTML = `
        new site link : http://localhost:3001/api/url/${resp.data.uid} <a href="http://localhost:3001/api/url/${resp.data.uid}">Click me</a> `
    }
}

const homePageUIEventListeners =()=>{
    const submitButton = document.getElementById('submitButton')
    submitButton.addEventListener('click',()=>{
        sendUrlToBackend()
    })
}
const homePageUI=()=>{
    const root = document.getElementById("root")
    root.innerHTML=`
    <div id="MainContent">
        <div id="TitlePage">
            <h2>Url Shortener</h2>
        </div>
        <div id="EnterUrl">
            <div id="TakeInput">
                <input placeholder="enter url"  id="inputUrl"/>
                <button id="submitButton">Submit</button>
            </div>
        </div>
        <div id="ResultUrl">
            <p id="outcomeTag">Enter a url to get the shortened url</p>
        </div>
    </div>
    `
}
const main =()=>{
    homePageUI()
    homePageUIEventListeners()
}
main()
