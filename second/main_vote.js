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
}

function initVoteList() {
  let arr = window.localStorage.getItem('voteList');
  if (arr) {
    arr.split(',').forEach(function (item) {
      voteList.push(parseInt(item));
    });
  } else {
      voteList = []
  }
}

var box = ele('box');
var kill = ele('kill');
var quitRole = -1;
var arrCard, arrSkill, len;
var roleState = [];
var playerList = [];
var wordList = ['警察', '平民', '杀手'];
var voteList = [];

initPlayerList();
initVoteList();
initState();
initBox(playerList);

box.onclick = function (e) {
  let node = e.target.parentNode.parentNode;
  if (node.nodeName.toLowerCase() !== 'div') return false;
  let skillNode = node.getElementsByTagName('ul')[0];
  initSkill();
  skillNode.style.visibility = 'visible';
  quitRole = node.id;
}

kill.onclick = function () {
  if (!roleState[quitRole]) return false;
  roleState[quitRole] = 0;
  storeList(roleState);
  voteList.push(quitRole);
  storeVoteList(voteList);
  judge(playerList, roleState);
  if(!readStore('result')){
    window.location.href = 'daily.html';
  } else {
    window.location.href = 'result.html';
  }
}

function judge(playerList, roleState) {
  let len = playerList.length;
  let arrAlive = [];
  let capNum = 0, peopleNum = 0, killerNum = 0;
  for (let i = 0; i < len; i++) {
    arrAlive.push( playerList[i] * roleState[i] );
  }
  arrAlive.forEach( item => {
    switch (item) {
      case 1:
        capNum++;
        break;
      case 2:
        peopleNum++;
        break;
      case 3:
        killerNum++;
        break;
      case 0:
        break;
    }
  });
  if ( killerNum === 0 ) {
    store('result', 'win');
    console.log('people win!');
  }
  if ( killerNum >= (peopleNum + capNum - 1) ) {
    store('result', 'fail');
    console.log(' killer win!')
  }
  console.log(readStore('result'), arrAlive);
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

function storeVoteList(list) {
  let temp = list.toString();
  store('voteList', temp);
}

function store(item, val) {
  window.localStorage.setItem(item, val);
}

function readStore(item) {
  return window.localStorage.getItem(item);
}