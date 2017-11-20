//使用Json来改变，day：1 step： 0123
//{"day":1,"step":0}

var date = {};
var dayList = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
var daily = ele('id', 'daily');
var confirm = ele('id', 'error');
var confirmBtn = ele('id', 'confirmBtn');
var text = ele('id', 'text');
var arrDays, color = '#81b09a';


init();

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

for (let i = 0; i <= date.day; i++) {
  arrDays[i].onclick = function (e) {
    if (i !== date.day) return false;
    let node = e.target.nodeName.toLowerCase();
    if (node === 'li' && parseInt(e.target.id) === date.step) {
      date.step++;
      if(date.step === 4) {
        date.day++;
        date.step = 0;
      } 
      switch (parseInt(e.target.id)) {
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
    }
    store('daily', JSON.stringify(date) );
  }
}

confirmBtn.onclick = function () {
  confirm.style.display = 'none';
  window.location.href = 'daily.html';
}

function createDaily (date) {
  let days = date.day;
  let len = date.step;
  let arr = '';
  for (let i = 0; i <= days; i++) {
    arr += '<div class="day"><p class="title">第' + dayList[i] +'天</p><ul><li id="0">杀手杀人</li><li id="1">亡灵发表遗言</li><li  id="2">玩家轮流发言</li><li id="3">全民投票</li></ul></div>'
  }
  daily.innerHTML = arr;
}

function ele (type, val) {
  if (type === 'id') return document.getElementById(val);
  if (type === 'tag') return document.getElementsByTagName(val);
  if (type === 'class') return document.getElementsByClassName(val);
}

function store (item, val) {
  window.localStorage.setItem(item, val);
}

function readStore (item) {
  return window.localStorage.getItem(item);
}