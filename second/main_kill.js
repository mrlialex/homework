function ele(id) {
  return document.getElementById(id);
}

function initState() {
  let tempArr = readStore('roleState');
  let tempList = tempArr.split(',');
  tempList.forEach(item => {
    roleState.push(parseInt(item));
  })
  console.log(roleState);
}

function initPlayerList() {
  let arr = window.localStorage.getItem('playerList');
  arr.split(',').forEach(function (item) {
    playerList.push(parseInt(item));
  });
  console.log(playerList);
}

function initKillList() {
  let arr = window.localStorage.getItem('killList');
  if (arr) {
    arr.split(',').forEach(function (item) {
      killList.push(parseInt(item));
    });
  } else {
    killList = []
  }
}

var box = ele('box');
var kill = ele('kill');
var quitRole = -1;
var arrCard, arrSkill, len;
var roleState = [];
var playerList = [];
var wordList = ['警察', '平民', '杀手'];
var killList = [];

initPlayerList();
initKillList();
initState();
initBox(playerList);

box.onclick = function (e) {
  let node = e.target.parentNode.parentNode;
  console.log(node.nodeName);
  if(node.nodeName.toLowerCase() !== 'div') return false;
  let skillNode = node.getElementsByTagName('ul')[0];
  initSkill();
  skillNode.style.visibility = 'visible';
  quitRole = node.id;
}

kill.onclick = function () {
  if (!roleState[quitRole]) return false;
  roleState[quitRole] = 0;
  storeList(roleState);
  killList.push(quitRole);
  storeKillList(killList);
  window.location.href = 'daily.html';
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

function storeList(list) {
  let temp = list.toString();
  store('roleState', temp);
}

function storeKillList(list) {
  let temp = list.toString();
  store('killList', temp);
}

function store(item, val) {
  window.localStorage.setItem(item, val);
}

function readStore(item) {
  return window.localStorage.getItem(item);
}