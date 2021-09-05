// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  YouTube - Home and recommendations hide
// @author       You
// @match        *://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    hideHomePageFunction();
    document.getElementById("logo").addEventListener("click", hideHomePageFunction);
    document.getElementById("items").addEventListener("click", hideHomePageFunction);

    //Hide recommendedd videos
    setTimeout(function(){
        var player = document.getElementsByTagName("ytd-watch-flexy");
        if(player!=null && player!=undefined){
            debugger;
            player[0].querySelector("[id=secondary]").remove();
            playerFix(document.getElementById("player-theater-container").children.length != 0);
        }
    }, 1000);


    var observer = new MutationObserver(function(config){
        debugger;
        playerFix(config[0].addedNodes.length!=0);
    });
    observer.observe(document.getElementById("player-theater-container"), {'childList':true});


    function playerFix(isTheatre){
        if(isTheatre){
            document.getElementById("movie_player").style = "width:100%";
            document.getElementById("ytd-player").style = "height:100%";
        }
        else{
            document.getElementById("movie_player").style = "width:93.5%";
            document.getElementById("ytd-player").style = "height:93.7%";
        }
    }


    function hideHomePageFunction(){
        //Remove Home option
        hideHomeOption();

        //Message to show while opening Home via URL
        var elements = document.getElementsByTagName("ytd-two-column-browse-results-renderer")
        for(let i =0; i < elements.length; i++)
        {
            let domElement = elements[i];
            if(domElement!=null && domElement.getAttribute("page-subtype") == "home")
            {
                domElement.style = "color: grey; display: flex; font-size: 20px; color: grey; display: flex; font-size: 20px;margin-left: 65%;margin-top: 19%;"
                domElement.innerHTML = "Welcome Buddy !! <br> Home page blocked due to Content manipulation";
            }
        }
    }


    //Home Option
    document.getElementById("guide-button").addEventListener("click", hideHomeOption);
    function hideHomeOption(){
        setTimeout(function(){
            //Home option removal in sidebar
            let elem = document.getElementsByTagName("ytd-guide-entry-renderer")[0];

            //Logo -> onclick - disable
            let logoElem = document.getElementsByTagName("ytd-topbar-logo-renderer");
            for(let i = 0; i< logoElem.length; i++){
                logoElem[i].style="pointer-events:none";
            }

            if(elem!=undefined){
                elem.querySelector("[title=Home]").remove();
            }
        }, 1000);
    }

})();
