function getEle (id) {
  return document.getElementById(id);
}

function initList() {
  let arr =  window.localStorage.getItem('playerList');
  let listout = []
  let list = arr.split(',').forEach(function (item) {
    listout.push(parseInt(item));
  });
  return shuffle(listout);
}
var roleImg = getEle('roleImg');
var playerRole = getEle('playerRole');
var roleAvatar = getEle('roleAvatar');
var roleText = getEle('roleText');
var btn = getEle('btn')
var order = getEle('order');
var roleView = getEle('roleView');
var roleBox = getEle('roleBox');
var title = getEle('title');
var roleContainer = getEle('roleContainer');
var playerList = initList();
var len = playerList.length;
//警察1 平民2 杀手3
var imgList = ['police.png', 'citizen.png', 'killer.png'];
var wordList = ['警察', '平民', '杀手'];
var cardOrder = 1;
var showFlag = false;
var turnFlag = false;

boxInit(playerList);

btn.onclick = function () {
  if (turnFlag) {
    console.log('GAME BEGIN');
    return false;
  }
  if (showFlag && cardOrder == len) {
    beforeGame(playerList);
    turnFlag = true;
    console.log('yo');
    return false;
  }
  if (showFlag) {
    cardOrder++;
    order.innerHTML = cardOrder;
    btn.innerHTML = '查看' + cardOrder + '号身份';
  } else if (cardOrder == len) {
    btn.innerHTML = '法官查看身份';
  } else {
    btn.innerHTML = '隐藏并传递给' + parseInt(cardOrder+1)  + '号';
  }
  showRole(cardOrder);
  showFlag = !showFlag;
}

function boxInit (list) {
  let temp = '';
  let len = list.length;
  for(let i = 0; i < len; i++) {
    temp += creatCard(list[i], i);
  }
  roleContainer.innerHTML = temp;
}

function creatCard(roleNum,index) {
  return '<li><div class="game-role"><p class="cardRole">' + wordList[roleNum - 1] + '</p><p class="cardNum">' + (index + 1) + '号</p></div></li>';
}

function showRole (order) {
  if (showFlag) {
    playerRole.style.display = 'none';
    roleImg.style.display = 'block';
    cardInit(order);
  } else {
    playerRole.style.display = 'block';
    roleImg.style.display = 'none';
  }
}

function cardInit (order) {
  let num = order - 1;
  let arrNum = playerList[num] - 1;
  roleAvatar.src = 'img/' + imgList[arrNum];
  roleText.innerHTML = '角色：' + wordList[arrNum];
}

function beforeGame (list) {
  roleView.style.display = 'none';
  roleBox.style.display = 'block';
  btn.innerHTML = '开始游戏';
  title.innerHTML = '法官日记';
}

function shuffle(arr) {
  let _arr = arr.slice();
  for (let i = _arr.length; i--;) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = temp;
  }

  return _arr;
}