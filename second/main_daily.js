//使用Json来改变，day：1 step： 0123
//{"day":1,"step":0}

var daily = ele('id', 'daily');
var confirm = ele('id', 'error');
var confirmBtn = ele('id', 'confirmBtn');
var text = ele('id', 'text');
var lawerDaily = ele('id', 'lawerDaily');
var roleBox = ele('id', 'roleBox');
var moreGame = ele('id', 'moreGame');
var back = ele('id', 'back');
var playerList = readStoreList('playerList');
var roleState = readStoreList('roleState');
var killList = readStoreList('killList');
var date = {};
var dayList = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
var arrDays, color = '#81b09a';
var showFlag = true;

init();
boxInit(playerList);

function init () {
  date = readStore('daily') ? JSON.parse(readStore('daily')) : {"day" : 0, "step" : 0};
  createDaily (date);
  arrDays = daily.getElementsByTagName('div');
  for (let i = 0; i < date.day; i++) {
    let list = arrDays[i].getElementsByTagName('ul')[0];
    list.style.display = 'none';
  }
  let liList = arrDays[date.day].getElementsByTagName('li');
  for (let i = 0; i < date.step; i++) {
    liList[i].style.background = color;
  }
}

moreGame.onclick = function () {
  clear();
  window.location.href = 'init.html';
}

for (let i = 0; i <= date.day; i++) {
  arrDays[i].onclick = function (e) {
    if (i !== date.day) return false;
    let node = e.target.nodeName.toLowerCase();
    if (node === 'li' && parseInt(e.target.dataset.step) > date.step) {
      text.innerHTML = '还没到这个步骤哦!'
      confirm.style.display = 'block'
    }
    if (node === 'li' && parseInt(e.target.dataset.step) < date.step ) {
      switch (parseInt(e.target.dataset.step)) {
        case 0:
        text.innerHTML = killList[date.day] !== -1 ? ( killList[date.day] + 1 ) + '号玩家被杀了!！他的身份是' + wordList[playerList[killList[date.day]] - 1] : '杀手放了大家一条生路~今夜无人死亡';
        confirm.style.display = 'block'
        break;
        case 1:
        text.innerHTML = '那个被杀人的人说：我好冤枉啊!'
        confirm.style.display = 'block'
        break;
        case 2:
        text.innerHTML = '群众们各自发表言论，BB了半天还是决定投票!'
        confirm.style.display = 'block'
        break;
      }
    }
    if (node === 'li' && parseInt(e.target.dataset.step) === date.step) {
      date.step++;
      if(date.step === 4) {
        date.day++;
        date.step = 0;
      }
      store('daily', JSON.stringify(date));
      switch (parseInt(e.target.dataset.step)) {
        case 0:
          window.location.href = 'kill.html';
        break;
        case 1:
          text.innerHTML = '请死人发表遗言'
          confirm.style.display = 'block'
          console.log('deadman speak');
        break;
        case 2:
          text.innerHTML = '请存活玩家轮流发言'
          confirm.style.display = 'block'
          console.log('everyone speak');
        break;
        case 3:
          window.location.href = 'vote.html';
        break;
      }
      ele('class', 'day')[date.day].getElementsByTagName('li')[date.step - 1].style.background = color;
    }
    // store('daily', JSON.stringify(date) );
  }
}

confirmBtn.onclick = function () {
  confirm.style.display = 'none';
  // window.location.href = 'daily.html';
}

lawerDaily.onclick = function () {
  if (showFlag) {
    daily.style.display = 'none';
    roleBox.style.display = 'block';
  } else {
    daily.style.display = 'block';
    roleBox.style.display = 'none';
  }
  showFlag = !showFlag;
}

back.onclick = function () {
  if (!showFlag) {
    showFlag = true;
  }
  daily.style.display = 'block';
  roleBox.style.display = 'none';
}

function createDaily (date) {
  let days = date.day;
  let len = date.step;
  let arr = '';
  for (let i = 0; i <= days; i++) {
    arr += '<div class="day"><p class="title">第' + dayList[i] +'天</p><ul><li data-step="0">杀手杀人(点击查看死者)</li><li data-step="1">亡灵发表遗言</li><li data-step="2">玩家轮流发言</li><li data-step="3">全民投票</li></ul></div>'
  }
  daily.innerHTML = arr;
}

function boxInit(list) {
  let temp = '';
  let len = list.length;
  for (let i = 0; i < len; i++) {
    temp += creatCard(list[i], i);
  }
  roleContainer.innerHTML = temp;
  let roleCards = roleBox.getElementsByClassName('cardRole');
  roleState.forEach( function(item, index, arr) {
    if (!item) {
      roleCards[index].style.background = color;
    }
  })
}

function creatCard(roleNum, index) {
  return '<li><div class="game-role"><p class="cardRole">' + wordList[roleNum - 1] + '</p><p class="cardNum">' + (index + 1) + '号</p></div></li>';
}