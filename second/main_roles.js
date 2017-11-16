function getEle (id) {
  return document.getElementById(id);
}

function initList() {
  let arr =  window.localStorage.getItem('playerList');
  let listout = []
  let list = arr.split(',').forEach(function (item) {
    listout.push(parseInt(item));
  });
  return listout;
}
var roleImg = getEle('roleImg');
var playerRole = getEle('playerRole');
var roleAvatar = getEle('roleAvatar');
var roleText = getEle('roleText');
var btn = getEle('btn')
var order = getEle('order');
var playerList = initList();
var len = playerList.length;
//警察1 平民2 杀手3
var imgList = ['police.png', 'citizen.png', 'killer.png'];
var wordList = ['警察', '平民', '杀手'];
var cardOrder = 1;
var showFlag = false;

btn.onclick = function () {
  if (showFlag && cardOrder == len) {
    console.log('yo');
    return false;
  }
  if (showFlag) {
    cardOrder++;
    order.innerHTML = cardOrder;
    btn.innerHTML = '查看' + cardOrder + '号身份';
  } else if (cardOrder == len) {
    console.log('yo')
    btn.innerHTML = 'GAME WILL BEGIN';
  } else {
    btn.innerHTML = '隐藏并传递给' + parseInt(cardOrder+1)  + '号';
  }
  console.log(cardOrder, len);
  showRole(cardOrder);
  showFlag = !showFlag;
  console.log(showFlag);
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
