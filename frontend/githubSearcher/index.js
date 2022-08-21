//Get the Authorisation token from github inorder to use the api at its full limit else rate cap of 50 req an hour will be present
let userData = []
const makeHomePage=()=>{
    const root = document.getElementById('root')
    root.innerHTML=`
    <div id="mainPage">
        <div id="GitHubTitle">
            <h2>GitHub Profile Searcher</h2>
        </div>
        <div id="TheMainContent">
            <div id="TakeInput">
                <input placeholder="enter user profile name"  id="inputValProfileName"/>
                <button id="submitButtonUser">Submit</button>
            </div>
            <div id="TakeInput">
                <input placeholder="enter repository name"  id="inputValRepoName"/>
                <button id="submitButtonRepo">Submit</button>
            </div>
        </div>
        <div id="SearchedProfile">
        </div>
    </div>
    `
    
}
const addUserCards=()=>{
    const SearchedProfile = document.getElementById('SearchedProfile')
    SearchedProfile.innerHTML=''
    userData.forEach(x=>{
        const cardDiv=document.createElement('div')
        SearchedProfile.appendChild(cardDiv)
        console.log(x)
        cardDiv.className="CardTypeOfInput"
        const Name = document.createElement('p')
        cardDiv.appendChild(Name)
        Name.textContent=x.userName
        Name.className="UsernameCard"
        const FollowerDiv = document.createElement('div')
        cardDiv.appendChild(FollowerDiv)
        let NameTag=  document.createElement('p')
        FollowerDiv.appendChild(NameTag)
        NameTag.textContent="Follower List"
        NameTag.className="followTag"
        for(let i=0;i<Math.min((x.respFollowers.data==undefined?0:x.respFollowers.data.length),3);i++){
            let NameTag=  document.createElement('p')
            FollowerDiv.appendChild(NameTag)
            NameTag.textContent=x.respFollowers.data[i].login
        }
        const FollowingDiv = document.createElement('div')
        cardDiv.appendChild(FollowingDiv)
        let NewNameTag=  document.createElement('p')
        FollowingDiv.appendChild(NewNameTag)
        NewNameTag.textContent="Following List"
        NewNameTag.className="followTag"
        for(let i=0;i<Math.min((x.respFollowing.data==undefined?0:x.respFollowing.data.length),3);i++){
            let NameTag=  document.createElement('p')
            FollowingDiv.appendChild(NameTag)
            NameTag.textContent=x.respFollowing.data[i].login
        }
    })
}
const searchForUserByUsername=async()=>{
    const userName = document.getElementById('inputValProfileName').value
    const respFollowing = await axios.get(`https://api.github.com/users/${userName}/following`)
    const respFollowers = await axios.get(`https://api.github.com/users/${userName}/followers`)
    userData=[]
    userData.push({userName,respFollowers,respFollowing})
    addUserCards()
}
const searchForUserByRepo=async()=>{
    const inputValRepoName = document.getElementById('inputValRepoName').value
    const resp = await axios.get(`https://api.github.com/search/repositories?q=${inputValRepoName}`)
    console.lo
    let repoData = resp.data.items
    repoData=repoData.slice(0,3)
    console.log(repoData)
    counter=0
    let finalUserObject=[]
    let updateUserData = await repoData.forEach(async(x)=>{
        counter++
        const respFollowers = await axios.get(x.owner.followers_url)   
        const respFollowing = await axios.get(`https://api.github.com/users/${x.owner.login}/following`)
        const userName = x.owner.login
        console.log(respFollowers,respFollowing,userName)
        finalUserObject.push({respFollowers,respFollowing,userName})
        if(counter==3){
            userData=finalUserObject
            addUserCards()
        }
        
    })
}
const addHomePageEventListeners=()=>{
    const submitButtonUser = document.getElementById('submitButtonUser')
    const submitButtonInput = document.getElementById('submitButtonRepo')
    submitButtonUser.addEventListener('click',()=>{
        searchForUserByUsername()
    })
    submitButtonInput.addEventListener('click',()=>{
        searchForUserByRepo()
    })
}
const main=()=>{
    makeHomePage()
    addHomePageEventListeners()
}
main()