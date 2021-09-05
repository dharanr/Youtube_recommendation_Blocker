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
    let config = {
        home : {
            hide    : true,
            message : {
                display : true,
                content : "<div style='margin-top:20px; font-weight:500; color: green'> Peace Bruhh !!</div>" +
                          "<div style='margin-top:20px'> Home page blocked <br> Due to " +
                              "<span> Recommendation-engine content manipulation</span> <br>" +
                          "</div><br>",
            }
        },

        related_videos : {
            hide    : true,
        },
    };


    //Home - Utils
    var home = {
       init : function(){
           home.hide.logo();
           home.hide.forwards();
           home.show.message();

           //Listeners
           document.getElementById("logo").addEventListener("click", home.hide.logo());
           document.getElementById("items").addEventListener("click", home.hide.forwards());
           document.getElementById("guide-button").addEventListener("click", function(){
               home.hide.logo();
               home.hide.forwards();
           });
       },

       hide : {
          logo : function(){
              let logoElem = document.getElementsByTagName("ytd-topbar-logo-renderer");
              for(let i = 0; i< logoElem.length; i++){
                  logoElem[i].style="pointer-events:none";
              }
          },

          forwards : function(){
              setTimeout(function(){
                  let elem = document.getElementsByTagName("ytd-guide-entry-renderer")[0];
                  if (elem!=undefined) elem.querySelector("[title=Home]").remove();
              }, 700);
          },
       },
       show : {
          message : function(){
              //If home results rendered - then render the message there
              var elements = document.getElementsByTagName("ytd-two-column-browse-results-renderer")
              for(let i =0; i < elements.length; i++){
                  let domElement = elements[i];
                  if(domElement!=null && domElement.getAttribute("page-subtype") == "home")
                  {
                      domElement.style = "color: grey; display: flex; font-size: 20px; color: grey; display: flex; flex-direction:column; font-size: 20px;margin-left: 65%;margin-top: 19%;"
                      domElement.innerHTML = config.home.message.content;
                  }
              }
          }
       },
    };


    var player = {
        init : function(){
            player.hide.recommendations();

            //Observer - init
            let playerContainer = document.getElementById("player-theater-container");
            if (playerContainer!=undefined){
                var observer = new MutationObserver(function(config){
                    player.align(config[0].addedNodes.length!=0);
                });
                observer.observe(playerContainer, {'childList':true});
            }
        },

        align : function(isTheatre){
            if(isTheatre){
                document.getElementById("movie_player").style = "width:100%";
                document.getElementById("ytd-player").style = "height:100%";
            }
            else{
                document.getElementById("movie_player").style = "width:93.5%";
                document.getElementById("ytd-player").style = "height:93.7%";
            }
        },

        hide : {
            recommendations : function(){
                setTimeout(function(){
                    var playerContainer = document.getElementsByTagName("ytd-watch-flexy");
                    if(playerContainer!=null && playerContainer!=undefined){
                        playerContainer[0].querySelector("[id=secondary]").remove();
                        player.align(document.getElementById("player-theater-container").children.length != 0);
                    }
                },500);
            }
        },
    }

    //Init
    home.init();
    player.init();

})();
