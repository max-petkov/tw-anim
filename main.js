showDialogues();

function showDialogues() {
    const container = document.querySelectorAll(".chats__container");
    const gradient = document.querySelector(".circle");

    const topChat = document.querySelector(".chat[data-chat='1']");
    const middleChat = document.querySelector(".chat[data-chat='2']");
    const bottomChat = document.querySelector(".chat[data-chat='3']");

    topChat.setAttribute("data-text", topChat.textContent.trim());
    topChat.style.minHeight = topChat.scrollHeight + "px";
    middleChat.setAttribute("data-text", middleChat.textContent.trim());
    middleChat.style.minHeight = middleChat.scrollHeight + "px";
    bottomChat.setAttribute("data-text", bottomChat.textContent.trim());
    bottomChat.style.minHeight = bottomChat.scrollHeight + "px";

    const dialogueOne = new Typewriter(topChat, { delay: 17});
    const dialogueTwo = new Typewriter(middleChat, { delay: 10});
    const dialogueThree = new Typewriter(bottomChat, { delay: 17});
    const hideTypewriterCursor = (chat) => chat.querySelector(".Typewriter__cursor").classList.add("hide");

    const tl = gsap.timeline({
        repeat: -1,
        defaults: {
            duration: 1.2,
            ease: Power3.easeInOut
        },
    });
    
    tl
    .fromTo(container, { y: "30%", autoAlpha: 1, scale: 1}, {y: "20%"})
    .fromTo(topChat, {
        autoAlpha: 0
    }, {
        autoAlpha: 1, 
        onComplete: () => tl.pause(),
        onStart: () => {
            startTypeWriter(tl,{dialogue: dialogueOne, chat: topChat, speed: 17, pause: 300 });
            gsap.to(gradient, {right: "110%", top: "75%", duration: 1.2, ease: Power2.easeInOut});
        }
    }, "<")
    .fromTo(container, {y: "20%"}, {y: "10%"})
    .fromTo(middleChat, {
        autoAlpha: 0
    }, {
        autoAlpha: 1, 
        onComplete: () => tl.pause(),
        onStart: () => {
            startTypeWriter(tl,{dialogue: dialogueTwo, chat: middleChat, speed: 10, pause: 350 });
            gsap.to(gradient, {right: "85%", top: "115%", duration: 1.2, ease: Power2.easeInOut});
        }
    }, "<")
    .fromTo(container, { y: "10%", }, {y: "0",})
    .fromTo(bottomChat, {
        autoAlpha: 0
    }, {
        autoAlpha: 1, 
        onComplete: () => tl.pause(),
        onStart: () => {
            startTypeWriter(tl,{dialogue: dialogueThree, chat: bottomChat, speed: 17, pause: 350 });
            gsap.to(gradient, {right: "100%", top: "100%", duration: 1.2, ease: Power2.easeInOut});
        }
       }, "<")
    .fromTo(container, {
        transformOrigin: "center", 
        scale: 1,
        autoAlpha: 1
    }, {
        scale: 0.5, 
        autoAlpha: 0, 
        ease: Power3.easeInOut, 
        duration: 1.5,
    }, "+=1");

    function startTypeWriter(tl, config) {
        config.chat.firstElementChild.textContent = null;
        config.dialogue.pauseFor(config.pause)
        .typeString(config.chat.getAttribute("data-text"))
        .start()
        .callFunction(() => {
            tl.play();
            hideTypewriterCursor(config.chat);
        });
    }
}