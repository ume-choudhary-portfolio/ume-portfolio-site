
const menuBtn=document.getElementById('menuBtn'),nav=document.getElementById('nav');menuBtn?.addEventListener('click',()=>nav.classList.toggle('open'));nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const glow=document.getElementById('mouseGlow');addEventListener('pointermove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,end=+el.dataset.count,s=el.dataset.suffix||'',st=performance.now(),dur=850;function tick(n){const p=Math.min(1,(n-st)/dur);el.textContent=Math.round(end*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);cio.unobserve(el)}),{threshold:.4});document.querySelectorAll('[data-count]').forEach(x=>cio.observe(x));
document.querySelectorAll('#filters button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.f;document.querySelectorAll('.skill').forEach(c=>c.classList.toggle('hidden',!(f==='all'||c.dataset.cat===f)))}));
document.querySelectorAll('.service button').forEach(b=>b.addEventListener('click',()=>{const c=b.closest('.service');c.classList.toggle('open');b.textContent=c.classList.contains('open')?'Close ↑':'Explore →'}));
// Tabs on demo page
function setTab(name){document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active',p.id==='tab-'+name));}
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));
// Global map region explainer
const regions={emea:['EMEA','Multi-country service design, stakeholder workshops, governance, integration dependencies and business readiness within a common transformation model.'],na:['North America','Cross-functional alignment and consistent service-design decisions across global and regional stakeholders.'],latam:['LATAM','Future-state standardisation balanced with regional operating needs, readiness and implementation planning.'],apac:['APAC','Global-local coordination, workstream alignment and stakeholder decision support across multiple countries.']};
document.querySelectorAll('[data-region]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-region]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const d=regions[b.dataset.region];const el=document.getElementById('mapInfo');if(el)el.innerHTML='<b>'+d[0]+'</b><br>'+d[1]}));

// Dashboard KPI interactive example
const kpiData={velocity:['42','Sprint velocity','Trend line shows delivery throughput against recent sprints, helping identify whether commitments are realistic.'],burndown:['67%','Backlog burn down','Shows completed versus remaining scope so Product Owners and delivery leads can spot slippage early.'],risk:['4 / 3 / 2','RAID health','A simple heat map of open risks, actions and issues keeps dependencies visible before governance forums.'],adoption:['84%','Tool adoption','Combines active usage, story or ticket throughput and training completion to target follow up enablement.']};document.querySelectorAll('[data-kpi]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-kpi]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const d=kpiData[b.dataset.kpi],el=document.getElementById('dashboardDemo');if(el)el.innerHTML='<div class="dash-number">'+d[0]+'</div><div><b>'+d[1]+'</b><p>'+d[2]+'</p></div>';}));

// Power BI credential page tab switcher
const powerbiFinanceContent={
  income:{
    title:'Financial Statements in Power BI',
    text:'A general-ledger model turned into a working <b>Income Statement</b> and <b>Balance Sheet</b>. Built on a star schema, a <code>FactGLTran</code> fact against date, GL-account and header dimensions, with finance DAX measures for current ratio, debt ratio, gross and operating margin, and a sign-flip pattern so contra accounts read correctly. A waterfall walks revenue down to net income.',
    image:'assets/powerbi-financial-dashboard.png',
    alt:'Financial statements dashboard in Power BI'
  },
  balance:{
    title:'Financial Statements in Power BI',
    text:'The same capstone model also supports a working <b>Balance Sheet</b> view, using the same dimensional model and finance measures to present a structured statement view with clean account grouping, ratio reporting and executive-friendly layout. It shows I can move from data model to usable finance reporting, not just dashboard styling.',
    image:'assets/powerbi-financial-dashboard.png',
    alt:'Balance sheet style Power BI dashboard'
  }
};
function setPowerbiTab(name){
  document.querySelectorAll('[data-powerbi-tab]').forEach(b=>b.classList.toggle('active',b.dataset.powerbiTab===name));
  const d=powerbiFinanceContent[name],title=document.getElementById('powerbiFinanceTitle'),text=document.getElementById('powerbiFinanceText'),img=document.getElementById('powerbiFinanceImage');
  if(title)title.textContent=d.title;
  if(text)text.innerHTML=d.text;
  if(img){img.src=d.image;img.alt=d.alt;}
}
document.querySelectorAll('[data-powerbi-tab]').forEach(b=>b.addEventListener('click',()=>setPowerbiTab(b.dataset.powerbiTab)));
