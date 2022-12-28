const text = document.getElementById("text"), // 入力されたテキスト
  task = document.getElementById("task"), // テキストの反映先
  addButton = document.getElementById("addButton"),
  form = document.getElementById("form"),
  taskList = document.getElementById("taskList");
const addButtonClick = (el) => {
  return (task.innerText = el.value);
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addButtonClick(text);
  console.log(text.value);

  const taskInfo = [
    {
      id: "0",
      name: text.value,
      status: "作業中",
      dlt: "削除",
    },
  ];

  taskInfo.forEach((todo) => {
    // 配列の中のオブジェクトの数だけ処理を繰り返す
    const tr = document.createElement("tr");
    taskList.appendChild(tr);
    const objArray = Object.entries(todo); // オブジェクトを配列に変換
    console.log(objArray);
    objArray.forEach((arr) => {
      const td = document.createElement("td");
      td.textContent = arr[1]; // arr[1]はvalueの部分
      tr.appendChild(td);
    });
  });
});

//////////
// const array = [{ id: "ID", name: "名前", status: "状態" }, { id: 0, name: "タスク", status: "作業中" }];

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
