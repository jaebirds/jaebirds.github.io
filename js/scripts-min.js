$.lazyLoadXT.updateEvent+=" layoutComplete",$(document).ready((function(){var t=function(t){for(var o=window.location.search.substring(1).split("&"),e=0;e<o.length;e++){var n=o[e].split("=");if(n[0]==t)return n[1]}return!1}("page"),o=$(location).prop("hash").substr(1);jQuery.fn.hasScrollBar=function(){return this.get(0).scrollHeight>this.height()};var e=$("#content").isotope({itemSelector:".item",layoutMode:"masonry",filter:".featured",percentPosition:!0,fitWidth:!0,masonry:{columnWidth:".item",gutter:8}});function n(t){e.isotope("layout")}e.on("layoutComplete",(function(){$(window).trigger("layoutComplete")})),e.find("video").each((function(t,o){$(o).on("loadeddata",n)})),$(window).scroll((function(){e.isotope("layout")}));var i=$("#default-sort");o&&(o="."+o,i.removeClass("selected"),e.isotope({filter:o}),(i=$(".sort-menu li[data-id='"+o+"']")).addClass("selected"));var a=!0,s=0;$(".sort-menu li").click((function(){window.scrollTo(0,0),i.removeClass("selected"),e.isotope({filter:$(this).data("id")}),setTimeout((function(){e.isotope("layout")}),300),setTimeout((function(){e.isotope("layout")}),1e3),(i=$(this)).addClass("selected"),$(window).width()<1280&&($("#sidebarbg").animate({marginLeft:"-300"},500),a=!1)})),$(".menubutton").click((function(){"work-button"==$(this).attr("id")?(a||($(".content-popup").fadeOut(500,(function(){$(this).css("pointer-events","none"),s=0})),$("#sidebarbg").animate({marginLeft:"0"},500),$("#topbarmask").animate({marginLeft:"0"},500),$("#website-logo").removeClass("mini",600),$("#content").animate({marginLeft:"320",opacity:"1"},500,(function(){$(this).css("pointer-events","")})),a=!0),$(window).width()<1280&&($("#sidebarbg").animate({marginLeft:"0"},500),a=!0)):(a&&($("#sidebarbg").animate({marginLeft:"-300"},500),$("#topbarmask").animate({marginLeft:"-300"},500),$("#website-logo").addClass("mini",600),a=!1),$("#content").animate({marginLeft:"0",opacity:"0"},500,(function(){$(this).css("pointer-events","none")})),"about-button"==$(this).attr("id")?(1==s||s>0&&$(".content-popup").fadeOut(500,(function(){$(this).css("pointer-events","none")})),$("#about-popup").fadeIn(600,(function(){$(this).css("pointer-events",""),s=1}))):"contact-button"==$(this).attr("id")&&(2==s||s>0&&$(".content-popup").fadeOut(500,(function(){$(this).css("pointer-events","none")})),$("#contact-popup").fadeIn(600,(function(){$(this).css("pointer-events",""),s=2}))))})),"about"==t?$("#about-button").click():"contact"==t&&$("#contact-button").click(),$("#contactFormError").hide(),$("#contactForm").submit((function(t){t.preventDefault(),""==$("input[name=name]").val()||""==$("input[name=email]").val()||""==$("textarea[name=message]").val()?$("#contactFormError").show("blind",500):$.ajax({url:"https://www.enformed.io/tb23sius",method:"post",dataType:"json",accepts:"application/json",data:$("#contactForm").serialize(),success:function(){$("#contactForm").fadeOut(500),$("#contactFormSubmitted").fadeIn(700)},error:function(){alert("Error")}})})),$(window).resize((function(){$(window).width()>1280&&1==a&&($("#sidebarbg").animate({marginLeft:"0"},0),$("#website-logo").removeClass("mini",0))})),$("img, video").lazyLoadXT(),$("img").on("lazyload",(function(){e.isotope("layout")})),$("[data-fancybox]").fancybox({buttons:["thumbs","close"],video:{tpl:'<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}" preload="none" muted loop><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',autoStart:!0}}),$("html").fadeIn(0)}));