var obj_num = document.getElementById('num');
var cardBox = document.getElementById('card-box');
var error = document.getElementById('error');
var errorText = document.getElementById('text');
var confirmBtn = document.getElementById('confirmBtn');
var btnGo = document.getElementById('btnGo');
var playerList = [];
var roleState = [];
var flag = true;

confirmBtn.onclick = function () {
  error.style.display = 'none';
  obj_num.value = '';
}

btnGo.onclick = function(){
  let str = window.localStorage.getItem('hasList');
  if (str) {
    window.location.href = 'roles.html';
  }
}

obj_num.onblur = function () {
  let num = this.value;
  num = Number.parseInt(num);
  let reg = /[0-9]{1,2}/g;
  if (!reg.test(num)){
    errorText.innerHTML = 'please use number!';
    error.style.display = 'block';
  } else if (num < 4 || num > 18) {
    errorText.innerHTML = 'number must bigger than 4 and smaller than 18';
    error.style.display = 'block';
  } else {
    playerList = sendCards(num);
    initCardBox(playerList);
    storeList(playerList, roleState);
  }
}
function storeList(playerList, roleState) {
  let arr1 = playerList.toString();
  let arr2 = roleState.toString();
  window.localStorage.clear();
  store('playerList', arr1);
  store('roleState', arr2);
  store('hasList', true);
}

function store (item, val) {
  window.localStorage.setItem(item, val);
}

function initCardBox (list) {
  let cardList = ['<li>警&#12288;察1人</li>', '<li>水&#12288;民1人</li>','<li>杀&#12288;手1人</li>'];
  let nodeContent = '';
  let len = list.length;
  for(let i = 0; i < len; i++){
    nodeContent += cardList[list[i]-1];
  }
  cardBox.innerHTML = nodeContent;
}

function sendCards (playerNumber) {
  let pepNum = Math.ceil(playerNumber / 2);
  let copNum = Math.ceil( (playerNumber - pepNum)/2 );
  let killNum = playerNumber - pepNum - copNum;
  let initArr = [];
  let newArr;
  for(let i = 0; i < copNum; i++) {
    //警察代号1
    initArr.push(1);
  }

  for (let i = 0; i < pepNum; i++) {
    //平民代号2
    initArr.push(2);
  }

  for (let i = 0; i < killNum; i++) {
    //杀手代号3
    initArr.push(3);
  }

  for (let i = 0; i < playerNumber; i++) {
    //设置存活状态
    roleState.push(1);
  }
  return initArr;
}

function shuffle (arr) {
  let _arr = arr.slice();
  for(let i = _arr.length;i--;){
    let j = Math.floor( Math.random() * (i+1) );
    let temp = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = temp;
  }

  return _arr;
}