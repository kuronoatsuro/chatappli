// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database, "chat");

// 送信ボタン押した時の処理
$('#send').on('click',function(){

  // 入力欄のデータを取得
  const userName = $('#userName').val();
  const text = $('#text').val();
  console.log(userName, text);

// 送信したものをオブジェクトにまとめる
const message = {
  userName: userName,
  text: text,
}

const newPostRef = push(dbRef);
set(newPostRef, message);
});

// 指定した場所にデータが追加されたことを検知
onChildAdded(dbRef, function(data){
  // 追加されたデータをfirebaseから受け取って分解
  const message = data.val();
  const key = data.key;
  console.log(data, message, key);

  let chatMsg = ` 
    <div>
      <div>${message.userName}</div>
      <div>${message.text}</div> 
    </div>
  `;

  $('#output').append(chatMsg);
});

$('#deleteBtn').on('click', function () {
  localStorage.clear();
  $('#todoList').empty();
  taskList = [];
});

// 結果発表
// if(
//   taskList.includes()||
//   taskList.includes()||
//   taskList.includes()||
//   taskList.includes()||
//   taskList.includes()||
// ){
//   $('#html').css({
//     'background-image':'../img/correct.jpeg'
//   })
// };

