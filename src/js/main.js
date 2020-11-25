// Object fit images
objectFitImages();

// Lazy Load images
window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.expand = 100;
lazySizesConfig.hFac = 0.4;
lazySizes.init();


// Swiper
var carousel = new Swiper('#js-carousel-container', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
})

// For youtube videos
function findVideos() {
    let videos = document.querySelectorAll('.video');

    for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
    }
}

function setupVideo(video) {
    let link = video.querySelector('.video__link');
    let media = video.querySelector('.video__media');
    let button = video.querySelector('.video__btn');
    let id = parseMediaURL(media);

    video.addEventListener('click', () => {
        let iframe = createIframe(id);

        link.remove();
        button.remove();
        video.appendChild(iframe);
    });

    link.removeAttribute('href');
    video.classList.add('video--enabled');
}

function parseMediaURL(media) {
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
}

function createIframe(id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
}

function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();

(function (){
    const body = document.querySelector('body');
    const burger = document.getElementById('burger');
    const closeButton = document.getElementById('closeButton');
    const nav = document.getElementById('navigation');
    const overlay = document.getElementById('overlay')
    const navLinks = document.querySelectorAll('.menu > .menu__item');

    burger.onclick = function (event) {
        event.preventDefault()
        if (!nav.classList.contains('js-open')) {
            nav.classList.add('js-open');
            overlay.classList.add('js-open');
            body.classList.add('js-lock');

            navLinks.forEach((link, index) => {
                console.log('open', index)
                if (!link.style.animation) {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
                }
            })
        } else {
            return
        }
    }

    closeButton.onclick = function (event) {
        event.preventDefault()
        if (nav.classList.contains('js-open')) {
            nav.classList.remove('js-open');
            overlay.classList.remove('js-open');
            body.classList.remove('js-lock');

            navLinks.forEach((link, index) => {
                console.log('close', index)
                if (link.style.animation) {
                    link.style.animation = '';
                }
            })
        } else {
            return
        }
    }

    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade .5s ease forward ${index / 7 + 0.3}s`
        }
    })
})()