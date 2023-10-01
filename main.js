// setTypewriter();
showChats();

function showChats() {
    const container = document.querySelectorAll(".chats__container");
    const topChat = document.querySelector(".chat[data-chat='1']");
    const middleChat = document.querySelector(".chat[data-chat='2']");
    const bottomChat = document.querySelector(".chat[data-chat='3']");
    const hideTypewriterCursor = (chat) => chat.querySelector(".Typewriter__cursor").classList.add("hide");
    const tl = gsap.timeline({
        repeat: -1,
        defaults: {
            duration: 1.5,
            ease: Power3.easeInOut
        },
    });
    
    tl
    .fromTo(container, { y: "30%"}, {y: "20%"})
    .fromTo(topChat, {
        autoAlpha: 0
    }, {
        autoAlpha: 1, 
        onComplete: () => {
            console.log("Completed...");
            // tl.pause();
        },
        onStart: () => {
            console.log("Started...");
            startTypeWriter(tl,{chat: topChat, speed: 17, pause: 300 });
            // tl.pause();
        }, 
       }, "<")
    // .fromTo(container, {y: "20%"}, {y: "10%"})
    // .fromTo(middleChat, {
    //     autoAlpha: 0
    // }, {
    //     autoAlpha: 1, 
    //     onComplete: () => tl.pause(),
    //     onStart: () => startTypeWriter(tl,{chat: middleChat, speed: 10, pause: 350 })
    //    }, "<")
    // .fromTo(container, { y: "10%", }, {y: "0",})
    // .fromTo(bottomChat, {
    //     autoAlpha: 0
    // }, {
    //     autoAlpha: 1, 
    //     onComplete: () => tl.pause(),
    //     onStart: () => startTypeWriter(tl,{chat: bottomChat, speed: 17, pause: 350 })
    //    }, "<")
    // .fromTo([topChat, middleChat, bottomChat], {transformOrigin: "left", scale: 1}, {scale: 0.5, autoAlpha: 0, ease: Power3.easeInOut, duration: 1.5}, "+=1")

    function startTypeWriter(tl, config) {
        config.chat.style.minHeight = config.chat.scrollHeight + "px"; // <= Add min height to the chat container

        const text = config.chat.textContent.trim();
        let tw = new Typewriter(config.chat,{
            delay: config.speed,
        })

        tw.pauseFor(config.pause)
        .typeString(text)
        .start()
        .callFunction(() => {
            hideTypewriterCursor(config.chat);
        });

    }
}