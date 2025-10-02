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
})
