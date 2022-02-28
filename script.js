const Boxes=document.querySelectorAll(".box");
const Icons=document.getElementsByClassName("icon");
const Ques=document.getElementsByClassName("ques"); //for difference
const See=document.getElementById('see');
const Start= document.getElementById("start");
const Stop= document.getElementById("stop");
const sec=document.querySelector(".sec");
const msec=document.querySelector(".msec");
const scorebox=document.querySelector(".score-box");
const Score=document.querySelector("#score");
const no_of_active=document.getElementsByClassName("active");

//Hidding Every Icon
const HideAll=(sec)=>{
    setTimeout(()=>{
        [...no_of_active].forEach(act => act.classList.remove("active"));
        [...Icons].forEach(icon => icon.style.display = 'none');
        [...Ques].forEach(que => que.style.display = 'block');
    },sec*1000)
    // Calling Suffle function
    suffle();
}



// For See Every ICON
See.addEventListener('click',()=>{
    // console.log(icons);
    // console.log(typeof(icons));
    // [...Icons].forEach(icon => {
    //     console.log(icon);
    // });
    [...Icons].forEach(icon => icon.style.display = 'block');
    [...Ques].forEach(que => que.style.display = 'none');
    HideAll(3);
})



// For Card Click
Boxes.forEach((Box)=>{
    Box.addEventListener("click", (e)=>{
        if (!Start_value){
        let QuesIcon=e.target.children;
        QuesIcon[0].style.display="none";
        QuesIcon[1].style.display="block";
        // console.log(QuesIcon[1]);
        // if(!('active' ==QuesIcon[1].className.slice(-6,))){}
        setTimeout(()=>{
            QuesIcon[0].style.display="block";
            QuesIcon[1].style.display="none";
            // console.log(QuesIcon[1]);
        },2000);
    }
    });
});


Stop.style.display = "none";
var time_sec,time_msec;
var sc=0;
let Start_value=false;
// Start The game
Start.addEventListener('click',()=>{
    sc=0
    document.body.style.backgroundImage = "url('game.png')";
    Start_value=true;
    HideAll(0.1);
    // Style Change
    Start.style.display="none";
    scorebox.style.display="none";
    Stop.style.display="inline-block";
    See.style.display="none";
    Boxes.forEach((Box)=>{
        Box.style.transform="none";
    });


// Start Timer
    sec.innerHTML=`09`;
    var sec_value = 9;
    time_sec=setInterval(()=>{
        sec_value-=1;
        sec.innerHTML=`0${sec_value}`;
    },1000)
    msec.innerHTML="00"
    var msec_value = 0;
    time_msec=setInterval(()=>{
        msec_value += 1;
        if(msec_value==100)
            msec_value=0;
        msec.innerHTML=`${msec_value}`;
    },1)


// Timer
    setTimeout(()=>{
        document.body.style.backgroundImage = "url('back.jpg')";
        Start_value=false
        Start.style.display="inline-block";
        Stop.style.display="none";
        See.style.display="block";
        clearInterval(time_sec)
        clearInterval(time_msec)
        sec.innerHTML="00";
        msec.innerHTML="00";

    // Score calculator
        const scored=no_of_active.length/2
        console.log(scored)
        scorebox.style.display="block";
        if (scored==8)
            alert(`Congratulations... \nYou Scored: ${scored}/8 \nAccuracy: ${(scored/8)*100}%`)
        else
            alert(`Keep it Up... \nYou Scored: ${scored}/8 \n Accuracy: ${(scored/8)*100}%`);
        
        HideAll(0.1);
    },10000)


    let first,second,fail1,fail2;
    Boxes.forEach((Box)=>{
        Box.addEventListener("click", (e)=>{
            if(!first){
                first=e.target.children;
                first[0].style.display="none";
                first[1].style.display="block";
                // fail1=setTimeout(()=>{
                //     first[0].style.display="block";
                //     first[1].style.display="none";
                //     first[1].classList.remove("active")
                // },3000);
            }
            else if(!second){
                second=e.target.children;
                second[0].style.display="none";
                second[1].style.display="block";
                // fail2=setTimeout(()=>{
                //     second[0].style.display="block";
                //     second[1].style.display="none";
                //     second[1].classList.remove("active")
                // },3000);
                if (first[1].className==second[1].className){
                    // clearInterval(fail1);
                    // clearInterval(fail2);
                    first[1].classList.add("active")
                    second[1].classList.add("active")
                    first=undefined;
                    second=undefined;
                }
                else{
                    first[1].classList.remove("active")
                    second[1].classList.remove("active")
                    setTimeout(() => {
                        first[0].style.display="block";
                        first[1].style.display="none";
                        second[0].style.display="block";
                        second[1].style.display="none";
                        first=undefined;
                        second=undefined;
                    }, 500);
                    
                    
                }
            }
                
        });
    });
});


// Stop Button
Stop.addEventListener('click',()=>{
    Start_value=false
    Start.style.display="inline-block";
    Stop.style.display="none";
    See.style.display="block";
    clearInterval(time_sec)
    clearInterval(time_msec)
    sec.innerHTML="00";
    msec.innerHTML="00";
    scorebox.style.display="block";
    document.body.style.backgroundImage = "url('back.jpg')";
    HideAll(0.1);
});

// Suffle Card
function suffle(){
    const random_icons=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    random_icons.sort(function(a, b){return 0.5 - Math.random()});
    [...Icons].forEach((icon,index)=>{
        // removing image
        for (let i = 1; i < 9; i++) {
            if (icon.classList.contains(`icon${i}`))
            {
                icon.classList.remove(`icon${i}`)
                break;
            }
        }
        // Adding Random Image...
        icon.classList.add(`icon${random_icons[index]}`);
    })
}