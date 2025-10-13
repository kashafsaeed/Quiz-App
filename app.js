const qData = [
  {q:"What does HTML stand for?", o:["Hyper Text Markup Language","High Text Machine Language","Hyper Tool Multi Language","None"], a:0},
  {q:"What does CSS stand for?", o:["Cascading Style Sheets","Creative Style System","Computer Style Sheet","Colorful Style Syntax"], a:0},
  {q:"What language is used for web apps?", o:["Python","C++","JavaScript","Java"], a:2},
  {q:"Which HTML tag is used to link CSS file?", o:["<style>","<css>","<link>","<script>"], a:2},
  {q:"Which property changes text color in CSS?", o:["font-color","text-style","color","background"], a:2},
  {q:"Inside which HTML element do we put JavaScript?", o:["<js>","<scripting>","<javascript>","<script>"], a:3},
  {q:"Which symbol is used for comments in JavaScript?", o:["//","<!-- -->","#","**"], a:0},
  {q:"Which method is used to write text in HTML using JS?", o:["writeHTML()","document.write()","text()","innerText()"], a:1},
  {q:"Which CSS property controls text size?", o:["font-size","text-size","font-style","size"], a:0},
  {q:"Which HTML tag makes text bold?", o:["<i>","<b>","<u>","<em>"], a:1}
];

let i=0, score=0, time=30*60, t;
const $=id=>document.getElementById(id);

$("start-btn").onclick=()=>{
  $("start-box").style.display="none";
  $("quiz-box").style.display="block";
  showQ();
  t=setInterval(()=>{
    let min=Math.floor(time/60), sec=time%60;
    $("timer").textContent=`${min}:${sec<10?'0'+sec:sec}`;
    if(--time<0) end();
  },1000);
};

function showQ(){
  let q=qData[i];
  $("question").textContent=q.q;
  $("options").innerHTML="";
  q.o.forEach((opt,j)=>{
    let div=document.createElement("div");
    div.className="option";
    div.textContent=opt;
    div.onclick=()=>select(div,j,q.a);
    $("options").appendChild(div);
  });
  $("remaining").textContent=qData.length-i;
  $("next-btn").disabled=true;
}

function select(el,j,ans){
  [...document.querySelectorAll(".option")].forEach(o=>o.style.background="");
  el.style.background="#8eaed0ff"; // highlight selected option
  if(j===ans) score++;
  $("next-btn").disabled=false;
}

$("next-btn").onclick=()=> i<qData.length-1 ? (i++,showQ()) : end();

function end(){
  clearInterval(t);
  $("quiz-box").style.display="none";
  $("result-box").style.display="block";
  $("score").textContent=`${score}/${qData.length}`;
  $("message").textContent=score==qData.length?"Excellent 🎉":
    score>=qData.length/2?"Good job 💪":"Try again 😊";
}
