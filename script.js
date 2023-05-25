var delta,last,bg = document.getElementsByClassName('bg')[0],player = document.getElementsByClassName('player')[0];

var move = dir => {
  if(dir==last)return;
  bg.className = 'bg '+dir;
  player.className = 'player ingo'+dir;
  delta = new Date().getMilliseconds();
  last = dir;
}

document.body.addEventListener('keydown', e=>{
  if(e.key.includes('Arrow')){
    move(e.key.split("Arrow").pop().toLowerCase());
    e.preventDefault();
  }else{
    let dir = e.key=='w'?'up':e.key=='s'?'down':e.key=='a'?'left':e.key=='d'?'right':null;
    if(dir)move(dir);
  }
});

document.body.addEventListener('keyup', e=>{
  let dir;
  if(e.key.includes('Arrow'))dir = e.key.split("Arrow").pop().toLowerCase();
  else dir = e.key=='w'?'up':e.key=='s'?'down':e.key=='a'?'left':e.key=='d'?'right':null;
  if(dir&&[...bg.classList].includes(dir))setTimeout(()=>{
    if([...bg.classList].includes(dir)){
      bg.classList.remove(dir);
      player.classList.remove('ingo'+dir);
      player.style.backgroundImage = 'url("sprites/ingo_'+dir+1+'.png")';
      if(dir==last)last = '';
    }
  },100-Math.abs(new Date().getMilliseconds()-delta)%100);
});

var trainer = name => {
  let style = document.createElement('style');
  style.type = 'text/css';
  ['up','right','left','down'].forEach(e => {
    style.innerHTML += '.'+name+e+'{animation: '+name+'_'+e+' 0.6s linear 0s infinite normal} @keyframes '+name+'_'+e+' {';
    for(i=1;i<6;i++){
      let prop = 'sprites/'+name+'_'+e+(i>4?1:i)+'.png';
      style.innerHTML += ' '+(i-1)*25+'%{background-image: url("'+prop+'")}';
      new Image().src = prop;
    }
    style.innerHTML += '} ';
  });
  document.head.appendChild(style);
}

trainer('ingo');