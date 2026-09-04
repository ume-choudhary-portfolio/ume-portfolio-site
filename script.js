
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if(navToggle && nav){
  navToggle.addEventListener('click', ()=> {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true':'false');
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});
},{threshold:.12});
reveals.forEach(el=>io.observe(el));

document.querySelectorAll('.skill-filters button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.skill-filters button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter=btn.dataset.filter;
    document.querySelectorAll('.skill-card').forEach(card=>{
      card.classList.toggle('hidden', !(filter==='all'||card.dataset.cat===filter));
    });
  });
});
const allSkills=document.getElementById('showAllSkills');
if(allSkills){allSkills.addEventListener('click',()=>{
  const b=document.querySelector('.skill-filters button[data-filter="all"]'); if(b)b.click();
  document.querySelector('#skills')?.scrollIntoView({behavior:'smooth'});
});}

// Case lifecycle demo
const steps=[
  {title:'Payroll query received',text:'The employee submits a payroll query through the service portal. Required information is captured at source to avoid follow-up.',badge:'NEW',metric:'Complete intake'},
  {title:'Request categorised',text:'The request is classified against a clear service taxonomy so downstream routing and reporting remain consistent.',badge:'CLASSIFIED',metric:'Category confirmed'},
  {title:'Assigned to the right team',text:'Routing logic directs the case to the responsible team, reducing manual handoffs and ambiguity in ownership.',badge:'ASSIGNED',metric:'Owner identified'},
  {title:'SLA and progress monitored',text:'The service team works the case against the agreed service level, with escalation logic available when thresholds are at risk.',badge:'IN PROGRESS',metric:'SLA on track'},
  {title:'Resolved and knowledge captured',text:'The employee receives a clear resolution. Reusable knowledge can be improved so similar requests are easier to resolve in future.',badge:'RESOLVED',metric:'Closed with outcome'}
];
let caseIndex=0;
const caseBtns=[...document.querySelectorAll('#caseSteps button')];
function renderCase(){
  if(!document.getElementById('caseTitle'))return;
  document.getElementById('caseTitle').textContent=steps[caseIndex].title;
  document.getElementById('caseText').textContent=steps[caseIndex].text;
  document.getElementById('caseBadge').textContent=steps[caseIndex].badge;
  document.getElementById('caseMetric').textContent=steps[caseIndex].metric;
  document.getElementById('caseStepLabel').textContent=`Step ${caseIndex+1} of ${steps.length}`;
  caseBtns.forEach((b,i)=>b.classList.toggle('active',i===caseIndex));
}
caseBtns.forEach((b,i)=>b.addEventListener('click',()=>{caseIndex=i;renderCase();}));
document.getElementById('nextCase')?.addEventListener('click',()=>{caseIndex=Math.min(steps.length-1,caseIndex+1);renderCase();});
document.getElementById('prevCase')?.addEventListener('click',()=>{caseIndex=Math.max(0,caseIndex-1);renderCase();});

// AI self-service demo
const aiQs={
  leave:{q:'How do I find the leave policy for my location?',a:'I would identify the employee’s country/entity, surface the approved policy article for that location, and offer case creation only if the knowledge answer does not resolve the query.'},
  onboarding:{q:'What is the status of my onboarding request?',a:'I would confirm the relevant request context, show the employee the current workflow stage and owner where appropriate, and guide them to the next expected step without requiring a separate status-chasing case.'},
  payroll:{q:'I have a question about my latest payslip. Where should I go?',a:'I would guide the employee to the correct payroll service, capture the minimum information needed for routing and, where knowledge is insufficient, create or hand off the request to the responsible team.'}
};
document.querySelectorAll('.question-row button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.question-row button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const d=aiQs[btn.dataset.q];
    document.getElementById('employeeQuestion').textContent=d.q;document.getElementById('botAnswer').textContent=d.a;
  });
});

// Global programme demo
const regionText={
  emea:['Scalable service design','Discovery workshops, requirement validation, governance, Workday dependency coordination, readiness and stakeholder decision support.'],
  na:['Stakeholder alignment','Cross-functional requirements, design decisions and readiness coordination across a global operating model.'],
  latam:['Standardisation with local context','Future-state process design, service governance and implementation planning while recognising regional operating needs.'],
  apac:['Global-local delivery coordination','Workstream alignment, integration dependencies, business readiness and decision support across multiple countries and stakeholder groups.']
};
document.querySelectorAll('.region').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.region').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const [h,p]=regionText[btn.dataset.region];
    const d=document.getElementById('regionDetail');
    d.innerHTML=`<div><small>Focus</small><h3>${h}</h3></div><div><small>Programme mechanisms</small><p>${p}</p></div>`;
  });
});
