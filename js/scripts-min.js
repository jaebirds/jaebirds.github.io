$.lazyLoadXT.updateEvent+=" layoutComplete",$(document).ready((function(){function t(t){for(var o=window.location.search.substring(1).split("&"),e=0;e<o.length;e++){var n=o[e].split("=");if(n[0]==t)return n[1]}return!1}var o=t("sort"),e=t("page");jQuery.fn.hasScrollBar=function(){return this.get(0).scrollHeight>this.height()};var n=$("#content").isotope({itemSelector:".item",layoutMode:"masonry",filter:".featured",percentPosition:!0,fitWidth:!0,masonry:{columnWidth:".item",gutter:8}});function i(t){n.isotope("layout")}n.on("layoutComplete",(function(){$(window).trigger("layoutComplete")})),n.find("video").each((function(t,o){$(o).on("loadeddata",i)})),$(window).scroll((function(){n.isotope("layout")}));var a=$("#default-sort");o&&(o="."+o,a.removeClass("selected"),n.isotope({filter:o}),(a=$(".sort-menu li[data-id='"+o+"']")).addClass("selected"));var s=!0,r=0;$(".sort-menu li").click((function(){window.scrollTo(0,0),a.removeClass("selected"),n.isotope({filter:$(this).data("id")}),setTimeout((function(){n.isotope("layout")}),300),setTimeout((function(){n.isotope("layout")}),1e3),(a=$(this)).addClass("selected"),$(window).width()<1280&&($("#sidebarbg").animate({marginLeft:"-300"},500),s=!1)})),$(".menubutton").click((function(){"work-button"==$(this).attr("id")?(s||($(".content-popup").fadeOut(500,(function(){$(this).css("pointer-events","none"),r=0})),$("#sidebarbg").animate({marginLeft:"0"},500),$("#topbarmask").animate({marginLeft:"0"},500),$("#website-logo").removeClass("mini",600),$("#content").animate({marginLeft:"320",opacity:"1"},500,(function(){$(this).css("pointer-events","")})),s=!0),$(window).width()<1280&&($("#sidebarbg").animate({marginLeft:"0"},500),s=!0)):(s&&($("#sidebarbg").animate({marginLeft:"-300"},500),$("#topbarmask").animate({marginLeft:"-300"},500),$("#website-logo").addClass("mini",600),s=!1),$("#content").animate({marginLeft:"0",opacity:"0"},500,(function(){$(this).css("pointer-events","none")})),"about-button"==$(this).attr("id")?(1==r||r>0&&$(".content-popup").fadeOut(500,(function(){$(this).css("pointer-events","none")})),$("#about-popup").fadeIn(600,(function(){$(this).css("pointer-events",""),r=1}))):"contact-button"==$(this).attr("id")&&(2==r||r>0&&$(".content-popup").fadeOut(500,(function(){$(this).css("pointer-events","none")})),$("#contact-popup").fadeIn(600,(function(){$(this).css("pointer-events",""),r=2}))))})),"about"==e?$("#about-button").click():"contact"==e&&$("#contact-button").click(),$("#contactFormError").hide(),$("#contactForm").submit((function(t){t.preventDefault(),""==$("input[name=name]").val()||""==$("input[name=email]").val()||""==$("textarea[name=message]").val()?$("#contactFormError").show("blind",500):$.ajax({url:"https://www.enformed.io/tb23sius",method:"post",dataType:"json",accepts:"application/json",data:$("#contactForm").serialize(),success:function(){$("#contactForm").fadeOut(500),$("#contactFormSubmitted").fadeIn(700)},error:function(){alert("Error")}})})),$(window).resize((function(){$(window).width()>1280&&1==s&&($("#sidebarbg").animate({marginLeft:"0"},0),$("#website-logo").removeClass("mini",0))})),$("img, video").lazyLoadXT(),$("img").on("lazyload",(function(){n.isotope("layout")})),$("[data-fancybox]").fancybox({buttons:["thumbs","close"],video:{tpl:'<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}" preload="none" muted loop><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',autoStart:!0}}),$("html").fadeIn(0)}));