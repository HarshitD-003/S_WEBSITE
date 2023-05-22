var CardsEv = document.querySelectorAll(".card-ev");
var CardTextsEv = document.querySelectorAll(".card-text-ev");
var CardBtnsEv = document.querySelectorAll(".card-button-ev");
var CardTextShowEv = document.querySelectorAll(".show-text-ev");
var CardsImgEv = document.querySelectorAll(".card-img-ev");

var ModalEv = document.getElementById("popup-ev");
var BtnCloseEv = document.getElementsByClassName("close-ev")[0];
var ModalBigImageEv = document.querySelector("#modal-big-image-ev");
var ModalWrapperImageSmallEv = document.getElementById("modal-wrapper-image-small-ev");
var ModalTextEv = document.querySelector("#modal-text-ev");
var ModalHeaderEv = document.querySelector("#modal-header-ev");

function SplitText(text) {
    return text.split(/(?<=^(?:.{230})+)(?!$)/)[0];
}  

function AddClass(Card) {
    Card.querySelector(".show-text-ev").classList.add('show-ev');
    Card.querySelector("img").classList.add('showImg-ev');
    Card.querySelector(".card-button-ev").classList.add('show-ev');
    Card.classList.add('shadow-ev');
}

function RemoveClass(Card) {
    Card.querySelector(".show-text-ev").classList.remove('show-ev');
    Card.querySelector("img").classList.remove('showImg-ev');
    Card.querySelector(".card-button-ev").classList.remove('show-ev');
    Card.classList.remove('shadow-ev');
}

function OpenModal(input) {
    var Card = input.parentNode;
    AddClass(Card);
    ModalEv.style.display = "block"; 
} 

function CloseModal() {
    ModalTextEv.textContent = " "
    ModalEv.style.display = "none"; 
    ModalBigImageEv.src = " ";
    while (ModalWrapperImageSmallEv.hasChildNodes()) {
        ModalWrapperImageSmallEv.removeChild(ModalWrapperImageSmallEv.lastChild);
    }
    CardTextShowEv.forEach(CardText => {
        CardText.classList.remove('show-ev');
    });
    CardBtnsEv.forEach(CardBtn => {
        CardBtn.classList.remove('show-ev');
    });
    CardsImgEv.forEach(CardImg => {
        CardImg.classList.remove('showImg-ev');
    });
} 

function ContentModal(input) {
    var WrapperImage = input.parentNode.getElementsByClassName("wrapper-image-ev")[0];
    var images = WrapperImage.querySelectorAll("img");
    for (var i in images) {
        if (i == 0) {
            ModalBigImageEv.src = images[i].src;
        } else {
            if (images[i].tagName == 'IMG') {
                const img = document.createElement("img");
                img.src = images[i].src;
                ModalWrapperImageSmallEv.appendChild(img);
            }  
        }
    } 
    ModalTextEv.textContent = input.parentNode.getElementsByClassName("card-text-ev")[0].textContent;
    ModalHeaderEv.textContent = input.parentNode.querySelector("h2").textContent;
}

function SliderImage() {
    var ImageSmalls = ModalWrapperImageSmallEv.querySelectorAll("img");
    var NumofSmallChild = ImageSmalls.length;
    if (NumofSmallChild > -1) {
        ImageSmalls.forEach(ImageSmall => {
            ImageSmall.onclick = () => {
                ImgSrc = ImageSmall.src;
                ImageSmall.src = ModalBigImageEv.src;
                ModalBigImageEv.src = ImgSrc;
            }
        })
    }
}

CardsEv.forEach(Card => {
    Card.onmouseover = function(event) {
        AddClass(Card);
    };
    Card.onmouseout = function(event) {
        if (ModalEv.style.display != 'block') {
            RemoveClass(Card);
        }
    };
});

CardTextsEv.forEach(CardText => {
    var Text = CardText.textContent
.trim();
    var CountText = Text.length;
    if (CountText >= 230) {
        CardText.previousElementSibling.innerText = SplitText(Text);
    }
});

CardBtnsEv.forEach(CardBtn => {
    CardBtn.onclick = function() {  
        OpenModal(this);
        ContentModal(this);
        SliderImage();
    };  
});

window.onclick = function(event) {
    if (event.target == ModalEv) {
        CloseModal();
    }
};

BtnCloseEv.onclick = function() {
    CloseModal();
};
