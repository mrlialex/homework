var box = ele('id', 'box');
var kill = ele('id', 'kill');
var error = ele('id', 'error');
var text = ele('id', 'text');
var confirmBtn = ele('id', 'confirmBtn');
var quitRole = -1;
var arrCard, arrSkill, len;
var roleState = readStoreList('roleState');
var playerList = readStoreList('playerList');
var killList = readStoreList('killList') || [];
var turnFlag = true;
initBox(playerList);

box.onclick = function (e) {
  let node = e.target.parentNode.parentNode;
  if(node.nodeName.toLowerCase() !== 'div') return false;
  let skillNode = node.getElementsByTagName('ul')[0];
  initSkill();
  skillNode.style.visibility = 'visible';
  quitRole = node.id;
}

kill.onclick = function () {
  if ( playerList[quitRole] === 3 ) {
    text.innerText = '不可以杀自己哦';
    error.style.display = 'block';
    return false;
  }
  if (!roleState[quitRole]) {
    text.innerText = '你确定今夜放大家一条生路吗？';
    error.style.display = 'block';
    turnFlag = false;
  }
  roleState[quitRole] = 0;
  storeList('roleState', roleState);
  killList.push(quitRole);
  storeList('killList', killList);
  if (turnFlag) {
    window.location.href = 'daily.html';
  }
}

confirmBtn.onclick = function () {
  error.style.display = 'none';
  if (!turnFlag) {
    window.location.href = 'daily.html';
  }
}

function initSkill() {
  for (let i = 0; i < len; i++) {
    arrSkill[i].style.visibility = 'hidden';
  }
}

function initBox(list) {
  let len1 = list.length;
  let arr = '';
  for (let i = 0; i < len1; i++) {
    let showName = roleState[i] ? '玩家' : wordList[list[i] - 1];
    let bgColor = roleState[i] ? 'style = "background: #F6CA75"' : 'style = "background: #81b09a"';
    arr += '<div id="' + i + '" class="card"><div class="player" ><p class="role" ' + bgColor + '>' + showName + '</p><p class="num">' + (i + 1) + '号</p></div ><ul class="skill"><li><img src="img/knife.gif" width="30" height="30"></li><li><img src="img/fangdajing.gif" width="30" height="30"></li><li><img src="img/mubiao.gif" width="30" height="30"></li><li class="marginclear"><img src="img/shizi.gif" width="30" height="30"></li></ul></div>'
  }
  box.innerHTML = arr;
  arrCard = document.getElementsByClassName('card');
  arrSkill = document.getElementsByClassName('skill');
  len = arrCard.length;
}
