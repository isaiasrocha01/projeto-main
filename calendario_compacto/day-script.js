(function(){
const qs=(sel)=>document.querySelector(sel);
const qsi=(sel)=>document.querySelectorAll(sel);

const params=new URLSearchParams(location.search);
let dateParam=params.get('date');
if(!dateParam){
  const t=new Date();
  dateParam=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
}

const dayNames=['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
const monthNames=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const parts=dateParam.split('-');
const currentDate=new Date(parseInt(parts[0]),parseInt(parts[1])-1,parseInt(parts[2]));

const dateTitle=qs('#dateTitle');
const weekdayTitle=qs('#weekdayTitle');
const eventsList=qs('#eventsList');
const eventsCount=qs('#eventsCount');
const eventTime=qs('#eventTime');
const eventTitle=qs('#eventTitle');
const eventDesc=qs('#eventDesc');
const saveBtn=qs('#saveBtn');
const clearBtn=qs('#clearBtn');
const backBtn=qs('#backBtn');
const prevDayBtn=qs('#prevDay');
const nextDayBtn=qs('#nextDay');
const eventMeta=qs('#eventMeta');
const metaName=qs('#metaName');

function formatFull(date){ return date.getDate()+' '+monthNames[date.getMonth()]+' '+date.getFullYear(); }
function keyFor(dateObj){ return dateObj.getFullYear()+'-'+String(dateObj.getMonth()+1).padStart(2,'0')+'-'+String(dateObj.getDate()).padStart(2,'0'); }
function readDB(){ try{ return JSON.parse(localStorage.getItem('calendarEvents')||'{}'); } catch(e){ return {}; } }
function saveDB(db){ localStorage.setItem('calendarEvents',JSON.stringify(db)); }

function renderEvents(){
  const key=keyFor(currentDate);
  const db=readDB();
  const arr=Array.isArray(db[key])?db[key]:[];
  eventsList.innerHTML='';
  eventsCount.textContent=arr.length;
  if(arr.length===0){ 
    const e=document.createElement('div'); e.className='empty'; e.textContent='Nenhum evento. Adicione à direita.'; eventsList.appendChild(e); 
    return; 
  }
  arr.forEach((ev,idx)=>{
    const node=document.createElement('div'); node.className='event';
    const left=document.createElement('div'); left.className='meta';
    left.innerHTML='<div style="font-weight:700">'+(ev.time?ev.time+' — ':'')+(ev.title||'Sem título')+'</div>'+'<div style="font-size:12px;opacity:0.9">'+(ev.desc||'')+'</div>'+(ev.meta?('<div style="font-size:12px;opacity:0.85">Meta: '+ev.meta+(ev.done?' ✅':' ❌')+'</div>'):'');
    const right=document.createElement('div');
    right.innerHTML='<button data-i="'+idx+'" class="btn del">Excluir</button>';
    node.appendChild(left); node.appendChild(right);
    eventsList.appendChild(node);
  });
  qsi('.del').forEach(btn=>{
    btn.addEventListener('click',()=>{ deleteEventAt(parseInt(btn.dataset.i,10)); });
  });
}

function addEvent(ev){
  const key=keyFor(currentDate);
  const db=readDB();
  if(!Array.isArray(db[key])) db[key]=[];
  db[key].push(ev);
  saveDB(db);
  renderEvents();
  eventTitle.value=''; eventDesc.value=''; eventTime.value=''; eventMeta.checked=false; metaName.value='';
}

function deleteEventAt(index){
  const key=keyFor(currentDate);
  const db=readDB();
  if(!Array.isArray(db[key])) return;
  db[key].splice(index,1);
  if(db[key].length===0) delete db[key];
  saveDB(db);
  renderEvents();
}

saveBtn.addEventListener('click',()=>{
  const title=eventTitle.value.trim();
  const desc=eventDesc.value.trim();
  const time=eventTime.value||'';
  let meta='';
  if(eventMeta.checked) meta = metaName.value.trim() || title;
  if(!title && !desc && !time && !meta){ alert('Adicione ao menos um título, descrição ou meta.'); return; }
  addEvent({ title, desc, time, meta, done:false });
});

clearBtn.addEventListener('click',()=>{
  eventTitle.value=''; eventDesc.value=''; eventTime.value=''; eventMeta.checked=false; metaName.value='';
});

backBtn.addEventListener('click',()=>{ location.href='calendario.html'; });
prevDayBtn.addEventListener('click',()=>{
  currentDate.setDate(currentDate.getDate()-1);
  history.replaceState({},'', '?date='+keyFor(currentDate));
  loadUI();
});
nextDayBtn.addEventListener('click',()=>{
  currentDate.setDate(currentDate.getDate()+1);
  history.replaceState({},'', '?date='+keyFor(currentDate));
  loadUI();
});

function loadUI(){
  dateTitle.textContent=formatFull(currentDate);
  weekdayTitle.textContent=dayNames[currentDate.getDay()];
  renderEvents();
}

loadUI();
})();
