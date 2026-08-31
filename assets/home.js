(function(){
  "use strict";
  var root=document.documentElement;

  /* ---------- theme ---------- */
  var tBtn=document.getElementById('themeBtn');
  var moon='<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  var sun='<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>';
  function setIcon(){
    var ico=document.getElementById('themeIcon'); if(!ico)return;
    var dark = root.getAttribute('data-theme')==='dark' ||
      (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme:dark)').matches);
    ico.innerHTML = dark ? sun : moon;
  }
  if(tBtn){
    tBtn.addEventListener('click',function(){
      var cur=root.getAttribute('data-theme');
      var dark = cur==='dark' || (!cur && window.matchMedia('(prefers-color-scheme:dark)').matches);
      root.setAttribute('data-theme', dark ? 'light' : 'dark');
      setIcon();
    });
    setIcon();
    window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change',setIcon);
  }

  /* ---------- nav scroll ---------- */
  var nav=document.getElementById('nav');
  if(nav){
    var onScroll=function(){ nav.classList.toggle('scrolled', window.scrollY>10); };
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  }

  /* ---------- mobile drawer ---------- */
  var drawer=document.getElementById('drawer'), toggle=document.getElementById('navToggle');
  if(drawer&&toggle){
    var openD=function(){drawer.classList.add('open');toggle.setAttribute('aria-expanded','true');};
    var closeD=function(){drawer.classList.remove('open');toggle.setAttribute('aria-expanded','false');};
    toggle.addEventListener('click',openD);
    drawer.querySelectorAll('[data-close]').forEach(function(el){el.addEventListener('click',closeD);});
    drawer.querySelectorAll('.drawer-panel a').forEach(function(el){el.addEventListener('click',closeD);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeD();});
  }

  /* ---------- liposome build (only if present) ---------- */
  var SVGNS="http://www.w3.org/2000/svg";
  function ring(id,r,count,headR,color){
    var g=document.getElementById(id); if(!g)return;
    for(var i=0;i<count;i++){
      var a=(i/count)*Math.PI*2;
      var hx=200+Math.cos(a)*r, hy=200+Math.sin(a)*r;
      var tx=200+Math.cos(a)*(r+(id==='lipoOuter'?14:-14)), ty=200+Math.sin(a)*(r+(id==='lipoOuter'?14:-14));
      var ln=document.createElementNS(SVGNS,'line');
      ln.setAttribute('x1',hx);ln.setAttribute('y1',hy);ln.setAttribute('x2',tx);ln.setAttribute('y2',ty);
      ln.setAttribute('stroke','rgba(99,214,159,.35)');ln.setAttribute('stroke-width','2');
      g.appendChild(ln);
      var c=document.createElementNS(SVGNS,'circle');
      c.setAttribute('cx',hx);c.setAttribute('cy',hy);c.setAttribute('r',headR);c.setAttribute('fill',color);
      g.appendChild(c);
    }
  }
  ring('lipoOuter',150,34,4.6,'#63D69F');
  ring('lipoInner',112,26,4.2,'#3FBF83');

  /* ---------- pricing toggle (only if present) ---------- */
  var tSub=document.getElementById('tSub'), tOne=document.getElementById('tOne');
  if(tSub&&tOne){
    var amt=document.getElementById('priceAmt'), was=document.getElementById('priceWas'),
        per=document.getElementById('pricePer'), buy=document.getElementById('buyBtn'),
        flex=document.getElementById('featFlex');
    var sub=function(on){
      tSub.classList.toggle('on',on); tOne.classList.toggle('on',!on);
      tSub.setAttribute('aria-selected',on); tOne.setAttribute('aria-selected',!on);
      if(on){ amt.textContent='$63'; if(was){was.style.display=''; was.textContent='$74';}
        if(per)per.textContent='/ month, delivered'; if(buy)buy.textContent='Subscribe · $63/mo'; if(flex)flex.style.display='';
      }else{ amt.textContent='$74'; if(was)was.style.display='none';
        if(per)per.textContent='one-time'; if(buy)buy.textContent='Add to cart · $74'; if(flex)flex.style.display='none'; }
    };
    tSub.addEventListener('click',function(){sub(true);});
    tOne.addEventListener('click',function(){sub(false);});
  }

  /* ---------- reveal + batch fill ---------- */
  var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var reveals=[].slice.call(document.querySelectorAll('.reveal'));
  var bfill=document.getElementById('batchFill');
  if(reduce||!('IntersectionObserver' in window)){
    reveals.forEach(function(el){el.classList.add('in');});
    if(bfill)bfill.style.width='68%';
  }else{
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
    reveals.forEach(function(el){io.observe(el);});
    if(bfill){
      var bio=new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ bfill.style.width='68%'; bio.disconnect(); } });
      },{threshold:.4});
      bio.observe(bfill);
    }
  }

  var yr=document.getElementById('yr'); if(yr)yr.textContent=new Date().getFullYear();
})();
