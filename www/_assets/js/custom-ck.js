$(document).ready(function(){$("#yes").click(function(){$("#answerNoMessageWrap").hide("medium")});$("#no").click(function(){$("#answerNoMessageWrap").show("medium")});$(function(){$(".hideShowStart").hide();$(".hideShowEnd").hide();$("#select-start").click(function(){$(".hideShowStart").toggle("slow")});$("#select-end").click(function(){$(".hideShowEnd").toggle("slow")})});var e=$(".helper-more").text();$(".helper-more").click(function(){$(this).toggleClass("helper-less");$(this).next(".helper-info").slideToggle("medium");$(this).text()==="Close"?$(this).text(e):$(this).text("Close")});$("#ni-1, #ni-2, #ni-3, #ni-4, #ni-5").autotab_magic();$("#sc1, #sc2, #sc3").autotab_magic();$(function(){$(".different").hide();$(".show").click(function(){$(".different").is(":hidden")&&$(".different").show("slow")});$(".hide").click(function(){$(".different").is(":visible")&&$(".different").hide("slow")})});$(".togglelink").click(function(){$(this).siblings(".info").slideToggle("slow")});$(".show-table").click(function(){$(".sp-breakdown").slideToggle("slow")})});