var roleImg = ele('id', 'roleImg');
var playerRole = ele('id', 'playerRole');
var roleAvatar = ele('id', 'roleAvatar');
var roleText = ele('id', 'roleText');
var btn = ele('id', 'btn');
var order = ele('id', 'order');
var roleView = ele('id', 'roleView');
var roleBox = ele('id', 'roleBox');
var title = ele('id', 'title');
var roleContainer = ele('id', 'roleContainer');
var playerList = shuffle( readStoreList('playerList') );
var len = playerList.length;

var cardOrder = 1;
var showFlag = false; //用于角色
var turnFlag = false;

boxInit(playerList);

btn.onclick = function () {
  if (turnFlag) {
    storeList('playerList', playerList);
    window.location.href = 'daily.html';
    return false;
  }
  if (showFlag && cardOrder == len) {
    beforeGame(playerList);
    turnFlag = true;
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
  cardInit(order);
  if (showFlag) {
    playerRole.style.display = 'none';
    roleImg.style.display = 'block';
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

