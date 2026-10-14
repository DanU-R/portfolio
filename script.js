
    (function(){
      var button=document.querySelector('.theme');
      var nav=document.querySelector('.nav');
      var menu=document.querySelector('.menu');
      var systemLight=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches;
      document.body.classList.add(systemLight?'light-view':'dark-view');
      button.setAttribute('aria-pressed',String(systemLight));
      button.addEventListener('click',function(){
        var isLight=document.body.classList.contains('light-view');
        document.body.classList.toggle('light-view',!isLight);
        document.body.classList.toggle('dark-view',isLight);
        button.setAttribute('aria-pressed',String(isLight));
      });

      Array.prototype.forEach.call(document.querySelectorAll('[data-print]'),function(trigger){
        trigger.addEventListener('click',function(){window.print()});
      });
      function closeMenu(){
        nav.classList.remove('nav-open');
        menu.setAttribute('aria-expanded','false');
        menu.setAttribute('aria-label','Buka menu navigasi');
      }
      menu.addEventListener('click',function(){
        var open=nav.classList.toggle('nav-open');
        menu.setAttribute('aria-expanded',String(open));
        menu.setAttribute('aria-label',open?'Tutup menu navigasi':'Buka menu navigasi');
      });
      document.addEventListener('click',function(event){if(!nav.contains(event.target)){closeMenu()}});
      document.addEventListener('keydown',function(event){if(event.key==='Escape'){closeMenu()}});

      var links=Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
      var sections=links.map(function(link){return document.querySelector(link.getAttribute('href'))}).filter(Boolean);
      function setActive(id){
        links.forEach(function(link){link.classList.toggle('active',link.getAttribute('href')==='#'+id)});
      }
      links.forEach(function(link){
        link.addEventListener('click',function(event){
          var target=document.querySelector(link.getAttribute('href'));
          if(!target){return}
          event.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          setActive(target.id);
          closeMenu();
        });
      });
      document.querySelectorAll('.actions a[href^="#"]').forEach(function(link){
        link.addEventListener('click',function(event){
          var target=document.querySelector(link.getAttribute('href'));
          if(!target){return}
          event.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          setActive(target.id);
        });
      });
      if('IntersectionObserver' in window){
        var observer=new IntersectionObserver(function(entries){
          var visible=entries.filter(function(entry){return entry.isIntersecting}).sort(function(a,b){return b.intersectionRatio-a.intersectionRatio})[0];
          if(visible){setActive(visible.target.id)}
        },{rootMargin:'-22% 0px -62% 0px',threshold:[0,.1,.3]});
        sections.forEach(function(section){observer.observe(section)});
      }

      var projectCards=Array.prototype.slice.call(document.querySelectorAll('.project'));
      function setProject(card,open){
        card.classList.toggle('is-expanded',open);
        var toggle=card.querySelector('.detail-toggle');
        if(toggle){
          toggle.setAttribute('aria-expanded',String(open));
          var label=toggle.getAttribute('aria-label')||'Lihat detail proyek';
          if(!toggle.dataset.openLabel){toggle.dataset.openLabel=label.replace(/^Lihat/i,'Tutup')}
          if(!toggle.dataset.closedLabel){toggle.dataset.closedLabel=label}
          toggle.setAttribute('aria-label',open?toggle.dataset.openLabel:toggle.dataset.closedLabel);
        }
      }
      projectCards.forEach(function(card){
        var toggle=card.querySelector('.detail-toggle');
        card.addEventListener('click',function(event){
          if(event.target.closest('.detail-toggle')||event.target.closest('a')){return}
          if(window.matchMedia('(hover: none)').matches){
            setProject(card,!card.classList.contains('is-expanded'));
          }
        });
        card.addEventListener('keydown',function(event){
          if((event.key==='Enter'||event.key===' ')&&!event.target.closest('.detail-toggle')&&!event.target.closest('a')){
            event.preventDefault();
            setProject(card,!card.classList.contains('is-expanded'));
          }
        });
        if(toggle){
          toggle.addEventListener('click',function(event){
            event.stopPropagation();
            setProject(card,!card.classList.contains('is-expanded'));
          });
        }
      });
    })();
  