var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#smooth-scroller'),
    smooth: true
});

function firstPageAnim() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: 10,
        opacity: 0,
        duration: 2,
        // delay:-.5,
        ease: "expo.inOut"
    })

        .to(".boundingelem", {
            y: 0,
            duration: 1.5,
            ease: "expo.inOut",
            delay: -.1,
            stagger: .2
        })

        .from("#hero-footer", {
            y: -5,
            opacity: 0,
            duration: 2,
            delay: -1.5,
            ease: "expo.inOut",

        })
}
firstPageAnim();

function scaleCircle() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;


    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;
        // console.log(xscale, yscale)
        cursorFollower(xscale, yscale);
        timeout = setTimeout(function () {
            circle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`

        }, 100)
    })

}

scaleCircle();


var circle = document.querySelector('#minicircle');

function cursorFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        circle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    });

}

cursorFollower();




document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector('img'), {
            opacity: 0,
            ease: Power1,
            duration: 0.5
        })
    })

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;


        gsap.to(elem.querySelector('img'), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
        })
    })
})