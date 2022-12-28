const text = document.getElementById("text"),
  task = document.getElementById("task"),
  addButton = document.getElementById("addButton"),
  form = document.getElementById("form");

const addButtonClick = (el) => {
  return (task.innerText = el.value);
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addButtonClick(text);
});
// addButton.addEventListener(
//   "click",
//   () => {
//     addButtonClick(text);
//   },
//   false
// );

const players = [
  {
    No: "1",
    grade: "二冠",
    name: "藤井",
    age: 19,
  },
  {
    No: "2",
    grade: "竜王",
    name: "豊島",
    age: 31,
  },
];

const playerList = document.getElementById("playerList");

players.forEach((player) => {
  // 配列の中のオブジェクトの数だけ処理を繰り返す
  const tr = document.createElement("tr");
  playerList.appendChild(tr); // 表の中に８個の「tr」（行）ができる
  // 1行の中を生成
  const objArray = Object.entries(player); // オブジェクトを配列に
  objArray.forEach((arr) => {
    // No, name, age, gradeの4回繰り返す
    const td = document.createElement("td");
    td.textContent = arr[1]; // arr[1]はvalueの部分
    tr.appendChild(td);
  });
});

// const array = [{ id: "ID", name: "名前", status: "状態" }];
// const array2 = [{ id: 0, name: "タスク", status: "作業中" }];

// // 配列の長さの文だけループを回す
// for (let i = 0; i < array.length; i++) {
//   const getData = document.getElementById("getData");
//   const arrayId = document.createTextNode(array[i].id);
//   getData.appendChild(arrayId);
//   const arrayName = document.createTextNode(array[i].name);
//   getData.appendChild(arrayName);
//   const arrayStatus = document.createTextNode(array[i].status);
//   getData.appendChild(arrayStatus);
// }
// for (let i = 0; i < array2.length; i++) {
//   const getData2 = document.getElementById("getData2");
//   const arrayId = document.createTextNode(array2[i].id);
//   getData2.appendChild(arrayId);
//   const arrayName = document.createTextNode(array2[i].name);
//   getData2.appendChild(arrayName);
//   const arrayStatus = document.createTextNode(array2[i].status);
//   getData2.appendChild(arrayStatus);
// }
