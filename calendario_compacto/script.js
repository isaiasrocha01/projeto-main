(function(){
const monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const daysGrid = document.getElementById('daysGrid');
const monthTitle = document.getElementById('monthTitle');
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');
const todayBtn = document.getElementById('todayBtn');
const goMetasBtn = document.getElementById('goMetas');

let viewDate = new Date();
viewDate.setDate(1);

function buildSelectors(){
 monthNames.forEach((m,i)=>{ const o=document.createElement('option'); o.value=i; o.textContent=m; monthSelect.appendChild(o); });
 const currentYear=(new Date()).getFullYear();
 for(let y=currentYear-5;y<=currentYear+5;y++){ const o=document.createElement('option'); o.value=y; o.textContent=y; yearSelect.appendChild(o); }
}
function daysInMonth(year,month){ return new Date(year,month+1,0).getDate(); }
function hasEventsForDate(ymd){ try{ const db=JSON.parse(localStorage.getItem('calendarEvents')||'{}'); return Array.isArray(db[ymd]) && db[ymd].length>0; }catch(e){ return false; } }

function render(){
 const year=viewDate.getFullYear(); const month=viewDate.getMonth();
 monthTitle.textContent = monthNames[month]+' '+year;
 monthSelect.value=month; yearSelect.value=year;
 daysGrid.innerHTML='';
 const firstWeekday=new Date(year,month,1).getDay();
 const totalDays=daysInMonth(year,month);
 for(let i=0;i<firstWeekday;i++){ const sp=document.createElement('div'); sp.className='day empty'; daysGrid.appendChild(sp); }
 const today=new Date();
 for(let d=1; d<=totalDays; d++){
  const dateObj=new Date(year,month,d);
  const cell=document.createElement('div');
  cell.className='day';
  const ymd=dateObj.getFullYear()+'-'+String(dateObj.getMonth()+1).padStart(2,'0')+'-'+String(dateObj.getDate()).padStart(2,'0');
  if(hasEventsForDate(ymd)) cell.classList.add('has-event');
  if(dateObj.toDateString()===today.toDateString()) cell.classList.add('today');
  cell.textContent=d;
  cell.setAttribute('role','button'); cell.setAttribute('tabindex','0');
  cell.addEventListener('click',()=>openDayPage(ymd));
  cell.addEventListener('keydown',(e)=>{ if(e.key==='Enter'||e.key===' ') openDayPage(ymd); });
  daysGrid.appendChild(cell);
 }
}

function openDayPage(ymd){ window.location.href='day.html?date='+encodeURIComponent(ymd); }

prevBtn.addEventListener('click',()=>{ viewDate.setMonth(viewDate.getMonth()-1); render(); });
nextBtn.addEventListener('click',()=>{ viewDate.setMonth(viewDate.getMonth()+1); render(); });
monthSelect.addEventListener('change',(e)=>{ viewDate.setMonth(parseInt(e.target.value,10)); render(); });
yearSelect.addEventListener('change',(e)=>{ viewDate.setFullYear(parseInt(e.target.value,10)); render(); });
todayBtn.addEventListener('click',()=>{ viewDate=new Date(); viewDate.setDate(1); render(); });
goMetasBtn.addEventListener('click',()=>{ 
  window.location.href='metas.html?year='+viewDate.getFullYear()+'&month='+(viewDate.getMonth()+1); 
});

buildSelectors(); render();
})();

