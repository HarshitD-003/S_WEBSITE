const texts = ["No one has ever become poor by giving.", "Let us sacrifice our today so that our children can have a better tomorrow.", "The truest form of love is how you behave toward someone, not how you feel about them."];
const texts2 = ["-Anne Frank", "- A.P.J. Abdul Kalam", "-Shiv Khera"];
        const colors = ["purple", "#FF6000", "green"];
        const line = document.querySelector(".line-car");
        const textElement = document.getElementById("text-car");
        const textElement2 = document.getElementById("text-car2");
        let currentIndex = 0;

        function changeTextAndLine() {
            currentIndex = (currentIndex + 1) % texts.length;
            textElement.textContent = texts[currentIndex];
            textElement.style.color = colors[currentIndex];
            textElement2.textContent = texts2[currentIndex];
            textElement2.style.color = colors[currentIndex];
            line.style.backgroundColor = colors[currentIndex];
        }

        setInterval(changeTextAndLine, 3000);
        changeTextAndLine();


// Class Selector
var $Texts = document.querySelectorAll(".FadeText");

// Global variables
let delayMultiplier = 0.032;
let currentIndex2 = 0;

// Loop all Texts
function changeText() {
    currentIndex2 = (currentIndex2 + 1) % 3;
    if (currentIndex2 === 0) {
        delayMultiplier = 0.075;
    } else if (currentIndex2 === 1) {
        delayMultiplier = 0.039;
    } else {
        delayMultiplier = 0.03;
    }
for($i in $Texts){

    // clear $conext
    $htmlTag = false;
    $content = "";

    for($x in $Texts[$i].innerHTML){

        delay = (delayMultiplier * $x).toFixed(2);
        char = ($Texts[$i].innerHTML.charAt($x));

        // check if HTML tag opens
        if(char == "<"){
            $htmlTag = true;
        }

        // Check Status of HTML Tag and fill wrapped char into Context    
        if($htmlTag == false){
            $content += "<span style='animation-delay:"+delay+"s'>"+char+"</span>";
        }else{
            $content += char;
        }

        // check if HTML tag closes
        if(char == ">"){
            $htmlTag = false;
        }
    }

    // Change Text into wrapped text
    $Texts[$i].innerHTML = $content;

}
}
setInterval(changeText, 3000);
changeText();
