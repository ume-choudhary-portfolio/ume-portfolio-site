
// navigation
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
menuBtn?.addEventListener('click',()=>mainNav.classList.toggle('open'));
mainNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mainNav.classList.remove('open')));

// cursor glow
const glow = document.getElementById('cursorGlow');
window.addEventListener('pointermove', e => {
  if(!glow) return;
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// scroll reveal
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible'); observer.unobserve(entry.target);}
  });
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// count-up metrics
const counters = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const duration = 900;
    const tick = now=>{
      const p = Math.min(1,(now-start)/duration);
      const eased = 1-Math.pow(1-p,3);
      el.textContent = Math.round(end*eased)+suffix;
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
},{threshold:.5});
counters.forEach(c=>countObserver.observe(c));

// skills filter
document.querySelectorAll('#skillFilter button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#skillFilter button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.skill').forEach(card=>{
      card.classList.toggle('hidden', !(f==='all'||card.dataset.cat===f));
    });
  });
});

// expandable "what I do"
document.querySelectorAll('[data-expandable] button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const card=btn.closest('[data-expandable]');
    card.classList.toggle('expanded');
    btn.textContent = card.classList.contains('expanded') ? 'Close ↑' : 'Explore →';
  });
});

// tilt
document.querySelectorAll('[data-tilt]').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-2px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});

// modal
const modal=document.getElementById('demoModal');
const views={case:document.getElementById('demoCase'),ai:document.getElementById('demoAI'),global:document.getElementById('demoGlobal')};
function openDemo(type){
  Object.values(views).forEach(v=>v?.classList.remove('active'));
  views[type]?.classList.add('active');
  modal?.classList.add('open');
  modal?.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeDemo(){
  modal?.classList.remove('open'); modal?.setAttribute('aria-hidden','true'); document.body.style.overflow='';
}
document.querySelectorAll('.demo-open').forEach(btn=>btn.addEventListener('click',()=>openDemo(btn.dataset.demo)));
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeDemo));
window.addEventListener('keydown',e=>{if(e.key==='Escape')closeDemo();});

// case simulator
const caseSteps=[
 {s:'NEW REQUEST',t:'Employee payroll query received',p:'A structured intake captures the employee’s request, relevant context and required details at source.',b:'NEW',o:'Complete intake'},
 {s:'CLASSIFICATION',t:'Request categorised',p:'A clear service taxonomy supports consistent routing, reporting and ownership.',b:'CLASSIFIED',o:'Category confirmed'},
 {s:'ASSIGNMENT',t:'Case routed to the responsible team',p:'Routing rules reduce manual handoffs and direct the request to the right service owner.',b:'ASSIGNED',o:'Owner identified'},
 {s:'SERVICE CONTROL',t:'SLA and escalation monitored',p:'The case is worked against an agreed service level, with escalation logic when thresholds are at risk.',b:'IN PROGRESS',o:'SLA on track'},
 {s:'OUTCOME',t:'Resolved and knowledge improved',p:'The employee receives a clear resolution and reusable knowledge can be improved for future self-service.',b:'RESOLVED',o:'Closed with outcome'}
];
document.querySelectorAll('#caseStepper button').forEach((btn,i)=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#caseStepper button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const d=caseSteps[i];
    document.getElementById('simStatus').textContent=d.s;
    document.getElementById('simTitle').textContent=d.t;
    document.getElementById('simText').textContent=d.p;
    document.getElementById('simBadge').textContent=d.b;
    document.getElementById('simOutcome').textContent=d.o;
  });
});

// AI simulator
const aiData={
 leave:['How do I find the leave policy for my location?',"I would identify the employee's location, surface the approved knowledge content for that entity, and offer case creation only when self-service does not resolve the request."],
 payroll:['I have a question about my payslip. Where should I go?',"I would guide the employee to the correct payroll service, capture the minimum information needed for routing, and escalate to a case when the knowledge journey is insufficient."],
 onboarding:['What is the status of my onboarding request?',"I would surface the current request context and next expected step where appropriate, helping reduce status-chasing and unnecessary duplicate cases."]
};
document.querySelectorAll('[data-ai]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-ai]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const [q,a]=aiData[btn.dataset.ai];
    document.getElementById('aiQuestion').textContent=q;document.getElementById('aiAnswer').textContent=a;
  });
});

// region explorer
const regionData={
 emea:['EMEA','Scalable service design, stakeholder workshops, governance, integration dependencies and business readiness across a global operating model.'],
 na:['North America','Cross-functional alignment, consistent service design and clear decision governance across global and regional stakeholders.'],
 latam:['LATAM','Future-state process standardisation balanced with regional operating needs, readiness and implementation planning.'],
 apac:['APAC','Global-local delivery coordination, workstream alignment and stakeholder decision support across multiple countries.']
};
document.querySelectorAll('[data-region]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-region]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const [name,desc]=regionData[btn.dataset.region];
    document.getElementById('regionInfo').innerHTML=`<b>${name}</b><span>${desc}</span>`;
  });
});
