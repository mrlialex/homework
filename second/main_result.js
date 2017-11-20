function store(item, val) {
  window.localStorage.setItem(item, val);
}

function readStore(item) {
  return window.localStorage.getItem(item);
}

function ele(type, val) {
  switch (type) {
    case 'id':
      return document.getElementById(val);
      break;
    case 'tag':
      return document.getElementsByTagName(val);
      break;
    case 'class':
      return document.getElementsByClassName(val);
      break;
    default:
      console.log('wrong type');
      break;
  }
}

function readStoreList(list) {
  let str = readStore(list);
  let arr = [];
  str.split(',').forEach((item) => {
    arr.push(parseInt(item));
  });
  return arr;
}

function init() {
  creatDaily();
  let result = readStore('result');
  if ( result === 'win') {
    resText.innerHTML = '人民胜利';
    resDesc.innerHTML = '太棒了！你知道吗？人民的力量无穷无尽的哦！'
  } else {
    resText.innerHTML = '杀手胜利';
    resDesc.innerHTML = '太棒了！你知道吗？在捉鬼游戏中只有20%的杀手取得游戏最终的胜利哦！'
  }
}
var resText = ele('id', 'resText');
var resDesc = ele('id', 'resDesc');
var dailyBox = ele('id', 'dailyBox');

var killList = readStoreList('killList');
var voteList = readStoreList('voteList');
var playerList = readStoreList('playerList');
var day = JSON.parse(window.localStorage.getItem('daily')).day;

var role = ['警察', '平民', '杀手'];

init();

function creatDaily() {
  let str = ''
  for(let i = 0; i < day; i++) {
    str += '<li><h1 class="date">第' + (i + 1) + '天</h1><span class="time">0小时07分</span><div class="details"><p><span>晚上：</span><span>' + (killList[i] + 1) + '号被杀手杀死，' + (killList[i] + 1) + '号是' + role[playerList[killList[i]]-1] + '</span></p><p><span>白天：</span><span>' + (voteList[i] + 1) + '号被全民投票投死，' + (voteList[i] + 1) + '号是' + role[playerList[voteList[i]]-1] +'</span></p></div></li>'
  }
  dailyBox.innerHTML = str;
}