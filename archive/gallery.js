(async function(){
  const root=document.getElementById('gallery'); const slug=root.dataset.brand;
  const man=await (await fetch('manifest.json')).json();
  document.getElementById('count').textContent=man.count.toLocaleString()+' pieces';
  
  const years=document.getElementById('years'); years.innerHTML='<button class="on" data-y="all">All</button>'+man.years.map(y=>'<button data-y="'+y+'">'+y+'</button>').join('');
  const grid=document.getElementById('grid'); let items=man.items; let cur=[];
  function render(list){cur=list; grid.innerHTML=''; list.forEach((it,i)=>{const a=document.createElement('a'); a.href='#'; a.className='cell'; a.dataset.i=i; a.innerHTML='<img loading="lazy" src="thumb/'+it.src+'" width="'+it.w+'" height="'+it.h+'" alt=""><span>'+it.year+'</span>'; grid.appendChild(a);});}
  render(items);
  years.addEventListener('click',e=>{const b=e.target.closest('button'); if(!b) return; [...years.children].forEach(x=>x.classList.remove('on')); b.classList.add('on'); render(b.dataset.y==='all'?items:items.filter(x=>String(x.year)===b.dataset.y));});
  const lb=document.getElementById('lightbox'), lbimg=lb.querySelector('img'), cap=lb.querySelector('.cap'); let idx=-1;
  function show(i){ if(i<0||i>=cur.length) return; idx=i; const it=cur[i]; lbimg.src=it.src; lbimg.style.width=it.w+'px'; lbimg.style.height=it.h+'px'; cap.textContent=man.brand+' · '+it.year; lb.classList.add('open'); }
  grid.addEventListener('click',e=>{const a=e.target.closest('.cell'); if(!a) return; e.preventDefault(); show(+a.dataset.i);});
  lb.addEventListener('click',e=>{ if(e.target===lb||e.target.classList.contains('x')) lb.classList.remove('open'); });
  document.addEventListener('keydown',e=>{ if(!lb.classList.contains('open')) return; if(e.key==='Escape') lb.classList.remove('open'); if(e.key==='ArrowRight') show(idx+1); if(e.key==='ArrowLeft') show(idx-1); });
  lb.querySelector('.next').onclick=()=>show(idx+1); lb.querySelector('.prev').onclick=()=>show(idx-1);
})();
