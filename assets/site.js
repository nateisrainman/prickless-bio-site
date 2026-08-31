/* Prickless Bio shared script: theme toggle + scroll reveal */
(function(){
  "use strict";
  var root=document.documentElement;
  var moon='<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  var sun='<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>';
  var icon=document.getElementById('themeIcon');
  function isDark(){
    return root.getAttribute('data-theme')==='dark' ||
      (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme:dark)').matches);
  }
  function setIcon(){ if(icon) icon.innerHTML=isDark()?sun:moon; }
  var btn=document.getElementById('themeBtn');
  if(btn){ btn.addEventListener('click',function(){ root.setAttribute('data-theme', isDark()?'light':'dark'); setIcon(); }); }
  setIcon();
  window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change',setIcon);

  var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var reveals=[].slice.call(document.querySelectorAll('.reveal'));
  if(reduce||!('IntersectionObserver' in window)){
    reveals.forEach(function(el){el.classList.add('in');});
  }else{
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{threshold:.1,rootMargin:'0px 0px -6% 0px'});
    reveals.forEach(function(el){io.observe(el);});
  }
  var yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();
})();
