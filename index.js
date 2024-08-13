 const apikey="ca88b5dd04b07b44397072b2c583a1b1";
 const dataEl=document.getElementById("weather-info");
 const cityEl=document.getElementById("city");

 const formEl=document.querySelector("form");

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityval=cityEl.value;
    getweatherinfo(cityval);
});
async function getweatherinfo(cityval)
{
    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=${apikey}&units=metric`)
        if(!response.ok)
        {
            throw new Error("Network response failed");
        }
        const data=await response.json();
        const temperature=Math.round(data.main.temp);
        const descr=data.weather[0].description
        const icon=data.weather[0].icon;
        const details=[
            `Feels like:${Math.round(data.main.feels_like)}`,
            `Humidity:${data.main.humidity}%`,
            `Wind Speed:${data.wind.speed} m/s`,
        ]
        dataEl.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`
         
        dataEl.querySelector(".temp").textContent=`${temperature}°C`;
        dataEl.querySelector(".desc").textContent=descr;
        dataEl.querySelector(".detail").innerHTML =details.map((details)=>`<div>${details}</div>`).join("");
    
    
    }
    catch(error)
    {
        dataEl.querySelector(".icon").innerHTML="";
         
        dataEl.querySelector(".temp").textContent="";
        dataEl.querySelector(".desc").textContent="An error occured..please try again later";
        dataEl.querySelector(".detail").innerHTML ="";
        
    }
}