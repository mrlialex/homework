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

function readStoreList (item) {
  let str = window.localStorage.getItem(item);
  if (!str) {
    return [];
  }
  let arr = [];
  str.split(',').forEach(function(item){
    arr.push(parseInt(item));
  });
  return arr;
}

function storeList (item, list) {
  let str = list.toString()
  window.localStorage.setItem(item, str);
}

function store (item, val) {
  window.localStorage.setItem(item, val);
}

function readStore(item) {
  return window.localStorage.getItem(item);
}

function clear () {
  window.localStorage.clear();
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

//警察1 平民2 杀手3
var imgList = ['police.png', 'citizen.png', 'killer.png'];
var wordList = ['警察', '平民', '杀手'];