const base_url= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector(".submit");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".To select");
let result=document.querySelector(".bottom-text p");
let icon=document.querySelector("i");

window.addEventListener("load",()=>{
    updateExchangeRate();
})

let printResult=(first,second)=>{
    let ans=first*second;
    if(first>ans){
        result.style.color="red";
    }else if(first<ans){
        result.style.color="green";
    }
    result.innerText=`${first} ${fromCurr.value}=${ans} ${toCurr.value}`; 
}

let updateExchangeRate=async ()=>{
    let amt=document.querySelector("input");
    let amtVal=amt.value;
    if(amtVal<1 || amtVal===""){
        amtVal=1;
        amt.value="1";
    }
    
        
    const url=`${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data= await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    console.log(printResult(amt.value,rate));
    printResult(amt.value,rate); 
}


for(let select of dropdown){
    for (countryCodes in countryList){
        let NEW=document.createElement("option");
        NEW.innerText=countryCodes;
        NEW.value=countryCodes;
        if(select.name==="from" && countryCodes==="INR"){
            NEW.selected=true;
        }else if(select.name==="to" && countryCodes==="USD"){
            NEW.selected=true;
        }
        select.appendChild(NEW);
    }
    select.addEventListener("change",(evt)=>{
        //extraxcted the value
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let Img=element.parentElement.querySelector("img");
    Img.src=newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});









