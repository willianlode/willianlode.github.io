let emojis=[
    "🎈",
    "🎈",
    "🎃",
    "🎃",
    "⚽",
    "⚽",
    "🏀",
    "🏀",
    "🕹",
    "🕹",
    "🪁",
    "🪁",
    "🎸",
    "🎸",
    "💣",
    "💣",
    "🎄",
    "🎄",
    "🎪",
    "🎪",
  "👓",
  "👓",
  "🧶",
  "🧶",
  "🛹",
  "🛹",
  "🚆",
  "🚆",
  "🛴",
  "🛴"];
let selectedCards=[];
let turnedElements=[];
let matchedElements=[];
let matchCards=[];
let points=0;
let items;
let item;

//shulling emojis
for (let i = emojis.length -1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i+1));
  let k = emojis[i];
  emojis[i] = emojis[j];
  emojis[j] = k;
}
for(let i=0; i<emojis.length;i++){
    let box=document.createElement("div");
    box.className="item";
    box.id=i;
    box.innerHTML=emojis[i];
    document.querySelector(".game").appendChild(box);
}
init();
function init(){
  items=document.getElementsByClassName("item");
  for(let i=0;i<items.length;i++){
    item=items[i];
    item.addEventListener("click", turnCards);
  }
};

function turnCards(){
  if(selectedCards.length===2){
    console.log(turnedElements);
    console.log(selectedCards);
    turnedElements.forEach((turnedElement) => {
      turnedElement.className="item";
    });
    turnedElements.pop();
    turnedElements.pop();
    selectedCards.pop();
    selectedCards.pop();
  }
  selectedCards.push(this.innerHTML);
  this.className="turned";
  if(selectedCards.length<2){
    turnedElements.forEach((turnedElement) => {
      turnedElement.className="item";
    });
    turnedElements=[];
    turnedElements.push(this);
  };  
  if(selectedCards.length===2){
    
    turnedElements.push(this);
    checkMatch();
    
  }
};


function checkMatch(){
  
  if(selectedCards[0]===selectedCards[1]){
    matchCards.push(selectedCards.pop());
    matchCards.push(selectedCards.pop());
    turnedElements.forEach((turnedElement) => {
      turnedElement.removeEventListener("click", turnCards);
      matchedElements.push(turnedElement);
      matchedElements.forEach((matchedElement)=>{
        matchedElement.className="match turned";});
    });
    turnedElements.pop();
    turnedElements.pop();
    scorePoints();
  }
};
function scorePoints(){
  points++;
  document.querySelector("#score").textContent=points;
};
