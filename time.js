let currentt = document.getElementById('current-time');
let currentd = document.getElementById('currentdate')
let hourhand = document.getElementById('hourhand')
let minhand = document.getElementById('minhand')
let sechand = document.getElementById('sechand')
let country = document.getElementById('country')
let cname = document.getElementById('cname')
let select = document.getElementById('select')
let selectedtime = document.getElementById('selectedtime')
let selecteddate = document.getElementById('selecteddate')
let cselectedtime = document.getElementById('cselectedtime')
let cselecteddate = document.getElementById('cselecteddate')
let addbutton = document.getElementById('addbutton')
let shourhand = document.getElementById('shourhand')
let sminhand = document.getElementById('sminhand')
let cshourhand = document.getElementById('cshourhand')
let csminhand = document.getElementById('csminhand')
let details = document.querySelector('.details')
let timedisplay = document.querySelector('timedisplay')
let clock2 = document.getElementById('clock2')
let cselect = document.getElementById('cselect') 
let cdetails = document.getElementById('cdetails')
let difftime = document.getElementById('diff-time')
// let ssechand = document.getElementById('ssechand')

// let pause = document.getElementById('pause')
// pause.addEventListener('click',()=>{
//     pause.classList.toggle('fa-play')
// })


let c1hour=0;
let c2hour=0;
let c1min=0;
let c2min=0;

let c1m=0;
let c2m=0;





let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

addbutton.addEventListener('click',()=>{
    addbutton.classList.toggle('hide')
    clock2.classList.toggle('hide')
})

let timezone =async () => {
  await  fetch('http://worldtimeapi.org/api/timezone')
        .then((data) => {
            return data.json();
        })
        .then((timezone) => {
            console.log(timezone);
            timezone.map(item => {
               optionelement(select,item);
               optionelement(cselect,item)
                // select.append(option);
                // cselect.append(option)
            })

        }).catch((err)=>{
            console.log(err.message);
        })
}
timezone()

let optionelement=(id,item)=>{
    const option = document.createElement('option')
    option.value = item;
    option.textContent += item;
    id.append(option);
}


let printvalue  = async () => {

    let selectedvalue = select.value;

    await fetch(`http://worldtimeapi.org/api/timezone/${selectedvalue}`)
        .then((time) => {
            return time.json();
        })
        .then((data) => {
            console.log(data);
            let countrydate = data.datetime.split('.');
            console.log(countrydate[0]);
            let now = new Date(countrydate[0])
            console.log(now);

            console.log(data.timezone);
            console.log(data.datetime);


            let time = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
            let minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
            let seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
            let ampm = now.getHours() >= 12 ? "PM" : "AM";
            c1m=ampm;
            let date = now.getDate();
            let month = now.getMonth() + 1;
            let year = now.getFullYear();
            let day = now.getDay();
            c1hour=now.getHours();
            c1min=minutes;
            let currenttime = `${time} : ${minutes} : ${seconds} : ${ampm}`;
            selectedtime.innerHTML = currenttime;
            let currentdate = `${date} / ${month} / ${year} | ${days[day]}`
            selecteddate.innerHTML = currentdate;

            currenttime ? details.style.display = "flex" : details.style.display = 'none';
            shourhand.style.transform = `rotate(calc( (${time} * 30deg) + ${minutes} * 0.5deg ))`
            sminhand.style.transform = `rotate(calc( ${minutes} * 6deg ))`
            // ssechand.style.transform = `rotate(calc( ${seconds} * 6deg ))`
        })
}

let cprintvalue = () => {
    let selectedvalue = cselect.value;

    fetch(`http://worldtimeapi.org/api/timezone/${selectedvalue}`)
        .then((time) => {
            return time.json();
        })
        .then((data) => {
            console.log(data);
            let countrydate = data.datetime.split('.');
            console.log(countrydate[0]);
            let now = new Date(countrydate[0])
            console.log(now);

            console.log(data.timezone);
            console.log(data.datetime);


            let time = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
            let minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
            let seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
            let ampm = now.getHours() >= 12 ? "PM" : "AM";
     
            let date = now.getDate();
            let month = now.getMonth() + 1;
            let year = now.getFullYear();
            let day = now.getDay();
            c2hour=now.getHours();
            c2min=minutes;
            let currenttime = `${time} : ${minutes} : ${seconds} : ${ampm}`;
            cselectedtime.innerHTML = currenttime;
            let currentdate = `${date} / ${month} / ${year} | ${days[day]}`
            cselecteddate.innerHTML = currentdate;

            currenttime ? cdetails.style.display = "flex" : cdetails.style.display = 'none';
            cshourhand.style.transform = `rotate(calc( (${time} * 30deg) + ${minutes} * 0.5deg ))`
            csminhand.style.transform = `rotate(calc( ${minutes} * 6deg ))`
            // ssechand.style.transform = `rotate(calc( ${seconds} * 6deg ))`
        })

}

let diffgmt=()=>{
    let diffhour = c1hour > c2hour ? c1hour-c2hour : c2hour-c1hour;
    let diffmin = c1min > c2min ? c1min-c2min : c2min-c1min;
    let plus="";

    if (c1hour > c2hour) {
        plus ="+"
    } else {
        plus ="-"
    }

   
    let gmt = `${plus}  ${diffhour} hrs : ${diffmin} mins`
    difftime.innerText=gmt;

    
    
}

let settime = () => {
    let now = new Date();
    let time = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
    let minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    let seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    let ampm = now.getHours() >= 12 ? "PM" : "AM";
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let day = now.getDay();

    let currenttime = `${time} : ${minutes} : ${seconds} : ${ampm}`;
    currentt.innerHTML = currenttime;
    let currentdate = `${date} / ${month} / ${year} | ${days[day]}`
    currentd.innerHTML = currentdate;

    hourhand.style.transform = `rotate(calc( (${time} * 30deg) + ${minutes} * 0.5deg ))`
    minhand.style.transform = `rotate(calc( ${minutes} * 6deg ))`
    sechand.style.transform = `rotate(calc( ${seconds} * 6deg ))`
    requestAnimationFrame(settime)
}

requestAnimationFrame(settime)




