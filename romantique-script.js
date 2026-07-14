/* ---------- glow follows cursor ---------- */
const glow = document.getElementById('glow-follow');
document.addEventListener('mousemove', (e)=>{
  glow.style.left = e.clientX+'px';
  glow.style.top = e.clientY+'px';
});

/* ---------- rising embers ---------- */
const field = document.getElementById('petal-field');
for(let i=0;i<14;i++){
  const em = document.createElement('div');
  em.className='ember';
  em.style.left = Math.random()*100+'vw';
  em.style.bottom = '-10px';
  em.style.animationDuration = (7+Math.random()*6)+'s';
  em.style.animationDelay = (Math.random()*9)+'s';
  field.appendChild(em);
}

/* ---------- ambient petals ---------- */
for(let i=0;i<16;i++){
  const p = document.createElement('div');
  p.className='petal';
  p.style.left = Math.random()*100+'vw';
  p.style.top = '-5vh';
  p.style.animationDuration = (9+Math.random()*8)+'s';
  p.style.animationDelay = (Math.random()*10)+'s';
  const scale = 0.6+Math.random()*0.8;
  p.style.transform = `scale(${scale})`;
  field.appendChild(p);
}

/* ---------- steps navigation ---------- */
const steps = document.querySelectorAll('.step');
const dotsWrap = document.getElementById('dots');
let current = 0;
steps.forEach((_,i)=>{
  const d = document.createElement('span');
  if(i===0) d.classList.add('active');
  dotsWrap.appendChild(d);
});

function updateDots(){
  [...dotsWrap.children].forEach((d,i)=> d.classList.toggle('active', i===current));
}

function nextStep(){
  steps[current].classList.remove('visible','fade-in');
  current++;
  if(current>=steps.length) current = steps.length-1;
  const s = steps[current];
  s.classList.add('visible');
  void s.offsetWidth;
  s.classList.add('fade-in');
  updateDots();
  if(current===2) initQuiz();
}

/* ---------- quiz ---------- */
const quizData = [
  {
    q: "Entre nous, tu dirais que c'est plutôt...",
    options: ["Léger et fun", "Ça devient sérieux", "Encore un mystère"],
    reactions: ["J'aime bien cette légèreté, honnêtement.",
                 "Je ne vais pas dire le contraire.",
                 "Le mystère, ça a son charme aussi."]
  },
  {
    q: "Ce qui te plaît dans nos discussions...",
    options: ["On rigole facilement", "On peut parler de tout", "Ça a un truc naturel"],
    reactions: ["Pareil pour moi, ça compte plus qu'on ne le pense.",
                 "C'est rare, et j'y fais attention.",
                 "Naturel, oui, c'est exactement le mot."]
  },
  {
    q: "Et pour la suite, tu préférerais...",
    options: ["Continuer à discuter comme ça", "Un appel un de ces jours", "Voir où ça mène, sans se presser"],
    reactions: ["Ça me va très bien, on a le temps.",
                 "Ça peut se faire, dis-moi juste quand.",
                 "Sans se presser, j'aime cette idée."]
  }
];
let qIndex = 0;

function initQuiz(){
  qIndex = 0;
  renderQuiz();
}

function renderQuiz(){
  const data = quizData[qIndex];
  document.getElementById('quizProgress').textContent = `${qIndex+1} / ${quizData.length}`;
  document.getElementById('quizQuestion').textContent = data.q;
  document.getElementById('quizReaction').textContent = '';
  document.getElementById('quizNextBtn').style.display = 'none';
  const optWrap = document.getElementById('quizOptions');
  optWrap.innerHTML = '';
  data.options.forEach((opt, i)=>{
    const b = document.createElement('button');
    b.textContent = opt;
    b.onclick = ()=>answerQuiz(i);
    optWrap.appendChild(b);
  });
}

function answerQuiz(i){
  const data = quizData[qIndex];
  document.getElementById('quizReaction').textContent = data.reactions[i];
  [...document.getElementById('quizOptions').children].forEach(b=>b.disabled=true);
  document.getElementById('quizNextBtn').style.display = 'inline-block';
  document.getElementById('quizNextBtn').textContent = qIndex < quizData.length-1 ? 'Suite' : 'Continuer';
}

function handleQuizNext(){
  qIndex++;
  if(qIndex < quizData.length){
    renderQuiz();
  } else {
    nextStep();
  }
}

/* ---------- reply -> WhatsApp ---------- */
function sendReply(){
  const input = document.getElementById('replyInput');
  const val = input.value.trim();
  if(!val){
    input.focus();
    input.placeholder = "Écris juste un petit mot avant d'envoyer...";
    return;
  }
  const phone = '22892213239';
  const text = encodeURIComponent(val);
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}
