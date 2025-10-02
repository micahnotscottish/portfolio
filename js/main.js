// Small JS for future enhancements. Currently keeps place for interactivity.
document.addEventListener('DOMContentLoaded',()=>{
  // Smooth scrolling for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href = a.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  })

  // Copy-to-clipboard buttons
  const toastWrap = document.createElement('div');
  toastWrap.className = 'toast-wrap';
  document.body.appendChild(toastWrap);

  function showToast(text){
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = text;
    toastWrap.appendChild(t);
    setTimeout(()=>{t.style.opacity=0; t.addEventListener('transitionend',()=>t.remove())},2000);
  }

  document.querySelectorAll('button.copy').forEach(btn=>{
    btn.addEventListener('click',async ()=>{
      const val = btn.getAttribute('data-copy');
      try{
        await navigator.clipboard.writeText(val);
        showToast('Copied: ' + val);
      }catch(e){
        showToast('Copy failed');
      }
    })
  })

  // Persist job-summary contenteditable fields to localStorage
  const JOB_KEY = 'portfolio_job_summaries_v1';
  function loadJobSummaries(){
    try{return JSON.parse(localStorage.getItem(JOB_KEY)||'{}')}catch(e){return {}}
  }
  function saveJobSummaries(obj){ localStorage.setItem(JOB_KEY, JSON.stringify(obj)) }

  const jobFields = document.querySelectorAll('.job-summary[contenteditable]');
  const stored = loadJobSummaries();
  jobFields.forEach(el=>{
    const id = el.getAttribute('data-job-id');
    if(stored[id]) el.textContent = stored[id];
    // save on blur or input with debounce
    let t;
    el.addEventListener('input', ()=>{
      clearTimeout(t); t = setTimeout(()=>{ stored[id]=el.textContent; saveJobSummaries(stored); showToast('Saved'); },800);
    })
    el.addEventListener('blur', ()=>{ stored[id]=el.textContent; saveJobSummaries(stored); })
  })

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    })
  },{threshold:0.12});
  reveals.forEach(r=>io.observe(r));

})
