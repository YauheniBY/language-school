
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
            );
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');
    let menuArrows = document.querySelectorAll('.menu__arrow');
    if(menuArrows.length > 0) {
        Array.from(menuArrows).forEach (arrow => {
            arrow.addEventListener('click', event => {
                arrow.parentElement.classList.toggle('_active');
            })
        })
    }
} else {
    document.body.classList.add('_pc');
}

// iconMenu clicking 

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if(iconMenu) {
    iconMenu.addEventListener('click', (e) => {
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        document.body.classList.toggle('_lock');
    });
}

var $btnTop = document.querySelector('.btn__top');
    $callbackBtn = document.querySelector('.callback');
    $header = document.querySelector('.header__container');

//to top-button click

$btnTop.addEventListener('click', function(e){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//appeare top-contacts and "toTop" button

hatActive ();
    
window.addEventListener('scroll', hatActive);

function hatActive() {

    var scrollTop = window.pageYOffset;

    if (scrollTop <= 800 && ($btnTop.classList.contains('btn__top_active'))) {
        
        $btnTop.classList.remove('btn__top_active');
        $callbackBtn.classList.remove('callback_active');
        $header.classList.remove('header__container_active');

    } else if(scrollTop > 800 && !($btnTop.classList.contains('btn__top_active'))) {

        $btnTop.classList.add('btn__top_active');
        $callbackBtn.classList.add('callback_active');
        $header.classList.add('header__container_active'); 

              
    }
}

// video control panel by click 

const $videoBox = document.querySelector('.reviews__video-box');
const $video = document.querySelector('video');
$videoBox .addEventListener ('click', e => {
    $videoBox.classList.add('reviews__video-box_active');
    $video.play();
    $video.controls = "true";
    $video.addEventListener ('ended', function(){        
        $video.removeAttribute('controls');
        $videoBox.classList.remove('reviews__video-box_active');
    });
});

// footer year set

const $year = document.querySelector('#year');
let currentYear = new Date().getFullYear();

if ($year) {
    if($year.textContent !== `${currentYear}`) {
        $year.textContent = `${currentYear}`;
    }
}

//  input phone mask

window.addEventListener('load', function(){

    var inputs = document.querySelectorAll('.tel');

        Array.from(inputs).forEach(function (input) {input.addEventListener("input", mask);});

        Array.from(inputs).forEach(function (input){input.addEventListener("focus", mask);});

        Array.from(inputs).forEach(function (input) {input.addEventListener("blur", mask);});


    function setCursorPosition(pos, elem) {
        
        elem.focus();

        if (elem.setSelectionRange) {

            elem.setSelectionRange(pos, pos);
        }

        else if (elem.createTextRange) {

            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();

        }

    }

     

    function mask(event) {

        var matrix = "+375_________",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");

        if (def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {

            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;

        });

        if (event.type == "blur") {

            if (this.value.length == 4) {
                this.value = "";
            }

        } else {
            setCursorPosition(this.value.length, this);
        }

    }

        
});


//goto links navigation

const menuLinks = document.querySelectorAll('[data-goto]');
console.log(menuLinks);
if(menuLinks.length > 0) {
    Array.from(menuLinks).forEach (menuLink => {
        console.log(menuLink);
        menuLink.addEventListener('click', onMenuLinkClick);
    });
}

function onMenuLinkClick (e) {
    const menuLink = e.target;
    if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

        if(iconMenu.classList.contains('_active')) {
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
            document.body.classList.remove('_lock');
            }
        window.scrollTo({
            top: gotoBlockValue,
            behavior:"smooth"
        });
        e.preventDefault();
    }
}

