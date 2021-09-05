// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
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
            player[0].querySelector("[id=secondary]").remove();
            //document.getElementById("movie_player").style = "width:93%"
            document.getElementById("related").style = "display:none";
        }
    }, 1000);

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
