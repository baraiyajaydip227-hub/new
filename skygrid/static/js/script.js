/* 1. HERO BG SLIDESHOW */
const slides=[
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920",
  "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=1920",
];
const slider=document.createElement("div");slider.className="hero-bg-slider";
slides.forEach((url,i)=>{const s=document.createElement("div");s.className="slide"+(i===0?" active":"");s.style.backgroundImage=`url(${url})`;slider.appendChild(s);});
document.body.prepend(slider);
let cur=0;
setInterval(()=>{const a=slider.querySelectorAll(".slide");a[cur].classList.remove("active");cur=(cur+1)%a.length;a[cur].classList.add("active");},4500);

/* 2. CUSTOM CURSOR */
const dot=document.querySelector(".cursor-dot");
const ring=document.querySelector(".cursor-ring");
let mx=0,my=0,rx=0,ry=0;
window.addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;if(dot){dot.style.left=mx+"px";dot.style.top=my+"px";}});
(function loop(){rx+=(mx-rx)*0.18;ry+=(my-ry)*0.18;if(ring){ring.style.left=rx+"px";ring.style.top=ry+"px";}requestAnimationFrame(loop);})();
document.querySelectorAll("a,button,.service-card,.project-card,.why-card,.stat-card,input,textarea,select,.badge,.floating-card,.logo")
  .forEach(el=>{el.addEventListener("mouseenter",()=>ring?.classList.add("hovering"));el.addEventListener("mouseleave",()=>ring?.classList.remove("hovering"));});

/* 3. RELIABLE REVEAL with IntersectionObserver */
const reveals=document.querySelectorAll(".section-header,.service-card,.project-card,.why-card,.stat-card,.glass-form,.contact-info,.hero-left>*,.hero-img-wrapper");
reveals.forEach((el,i)=>{el.classList.add("reveal");el.style.transitionDelay=(i%6)*0.08+"s";});
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});
},{threshold:0.12});
reveals.forEach(el=>io.observe(el));

/* 4. COUNTERS */
const counterIO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el=e.target;
    const raw=el.dataset.count||el.textContent;
    const num=parseInt(raw.replace(/\D/g,""),10)||100;
    const suffix=raw.replace(/[0-9]/g,"").trim()||"+";
    let c=0;const step=Math.max(1,Math.ceil(num/60));
    const t=setInterval(()=>{c+=step;if(c>=num){c=num;clearInterval(t);}el.textContent=c+suffix;},25);
    counterIO.unobserve(el);
  });
},{threshold:0.4});
document.querySelectorAll(".stat-num").forEach(el=>counterIO.observe(el));

/* 5. SUBMIT TOAST */
function triggerSubmit(){
  const t=document.getElementById("successToast");
  if(!t) return;
  t.style.display="block";t.style.opacity=0;t.style.transform="translateY(20px)";
  requestAnimationFrame(()=>{t.style.transition="all .5s ease";t.style.opacity=1;t.style.transform="translateY(0)";});
}
window.triggerSubmit=triggerSubmit;
