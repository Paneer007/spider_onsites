//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 - github token
const alphabetUpper = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const alphabetLower =['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const numberList=[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const symbolList =["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "-", ".", "`", "~", "|", "<", ">", "=", "-", "_"]
const updatePasswordUI=(passString)=>{
    const passwordStuff = document.getElementById("passwordStuff")
    passwordStuff.innerText=`new password : ${passString}`
}
const generatePass=(inputVal,result)=>{
    let passString=''
    const len = result.length
    for(let i=0;i<inputVal;i++){
        let randomNumber = Math.floor(Math.random()*(len))
        if(result[randomNumber]=='upperCheck'){
            let randomNumber = Math.floor(Math.random()*26)
            passString+=alphabetUpper[randomNumber]
        }else if(result[randomNumber]=='lowerCheck'){
            let randomNumber = Math.floor(Math.random()*26)
            passString+=alphabetLower[randomNumber]
        }else if(result[randomNumber]=='numberCheck'){
            let randomNumber = Math.floor(Math.random()*10)
            passString+=numberList[randomNumber]
        }else if(result[randomNumber]=='symbolCheck'){
            let randomNumber = Math.floor(Math.random()*21)
            passString+=symbolList[randomNumber]
        }
    }
    updatePasswordUI(passString)
}

const generateThePasswordCheck =()=>{
    const inputVal = document.getElementById('inputVal').value
    const upperCheck = document.getElementById('upperCheck').checked
    const lowerCheck = document.getElementById('lowerCheck').checked
    const numberCheck = document.getElementById('numberCheck').checked
    const symbolCheck = document.getElementById('symbolCheck').checked
    const shouldEvalCheck = upperCheck||lowerCheck||numberCheck||symbolCheck
    const result = (inputVal==''?false:true)&&shouldEvalCheck
    let CheckObject={upperCheck,lowerCheck,numberCheck,symbolCheck}
    if(result==true){
        let result = Object.keys(CheckObject).filter(function(x) { 
            return CheckObject[x] !== false; 
        });
        generatePass(inputVal,result)
    }else{
        alert("error")
    }
}
const homePageEventListeners=()=>{
    const submitButton = document.getElementById("submitButton")
    submitButton.addEventListener('click',()=>{
        generateThePasswordCheck()
    })
}
const makeHomePage=()=>{
    const root  = document.getElementById('root')
    root.innerHTML=`
    <div id="mainPage">
        <div id="passwordGeneratorTitle">
            <h2>Password Generator</h2>
        </div>
        <div id="TheMainContent">
            <div id="TakeInput">
                <input placeholder="enter password length"  type="number" id="inputVal"/>
                <div>
                    <label>UpperCase <input type="checkbox" id="upperCheck" value="upperCase"></label>
                    <label>LowerCase <input type="checkbox" id="lowerCheck" value="lowerCase"></label>
                    <label>Numbers <input type="checkbox" id="numberCheck" value="numberCheck"></label>
                    <label>Symbols <input type="checkbox" id="symbolCheck" value="symbolCheck"></label>
                </div> 
            </div>
            <div id="submitstuff">
                <button id="submitButton">Submit</button>
            </div>
        </div>
        <div id="GeneratedPassword">
            <p id="passwordStuff">Enter Details</p>
        </div>
    </div>
    `
}
const main=()=>{
    makeHomePage()
    homePageEventListeners()
}
main()