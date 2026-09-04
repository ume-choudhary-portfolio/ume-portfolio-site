
const floatingNav = document.getElementById('floatingNav');
const handleNav = () => {
  if (!floatingNav) return;
  floatingNav.classList.toggle('show', window.scrollY > 560);
};
window.addEventListener('scroll', handleNav, {passive:true});
handleNav();

// subtle entrance motion
document.querySelectorAll('.hero-left, .hero-visual, .stats, .about, .content-section, .contact').forEach((el, i)=>{
  el.animate([{opacity:0, transform:'translateY(14px)'},{opacity:1, transform:'translateY(0)'}],
    {duration:650, delay:Math.min(i*70,350), easing:'cubic-bezier(.2,.7,.2,1)', fill:'both'});
});

// Keep the interactive demos functional if demos.html is opened.
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
  if(!document.getElementById('caseTitle')) return;
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

const aiQs={
  leave:{q:'How do I find the leave policy for my location?',a:'I would identify the employee’s country/entity, surface the approved policy article for that location, and offer case creation only if the knowledge answer does not resolve the query.'},
  onboarding:{q:'What is the status of my onboarding request?',a:'I would confirm the relevant request context, show the current workflow stage and guide the employee to the next expected step.'},
  payroll:{q:'I have a question about my latest payslip. Where should I go?',a:'I would guide the employee to the correct payroll service, capture the minimum information required for routing and escalate only when knowledge is insufficient.'}
};
document.querySelectorAll('.question-row button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.question-row button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const d=aiQs[btn.dataset.q];
    document.getElementById('employeeQuestion').textContent=d.q;
    document.getElementById('botAnswer').textContent=d.a;
  });
});
