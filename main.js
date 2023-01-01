const text = document.getElementById("text"); // 入力されたテキスト
const addButton = document.getElementById("addButton");
const form = document.getElementById("form");
const taskList = document.getElementById("taskList");
let numId = 0;
let taskArray = [
  // {
  //   id: 0,
  //   name: "ほげ",
  //   status: "作業中",
  // },
  // {
  //   id: 1,
  //   name: "ほげ",
  //   status: "作業中",
  // },
  // {
  //   id: 2,
  //   name: "ほげ",
  //   status: "作業中",
  // },
];

const displayTaskArray = (taskArray) => {
  // tbodyを初期化
  taskList.innerHTML = "";

  taskArray.forEach((task) => {
    // 配列の中のオブジェクトの数だけ処理を繰り返す
    const tr = document.createElement("tr");
    taskList.appendChild(tr);
    const objArray = Object.entries(task); // オブジェクトを配列に変換
    // console.log(objArray);
    objArray.forEach((arr) => {
      const td = document.createElement("td");
      const buttonTagStatus = document.createElement("button");
      const buttonTagDelete = document.createElement("button");
      if (arr[0] === "status") {
        buttonTagStatus.innerHTML = "作業中";
        td.appendChild(buttonTagStatus);
        tr.appendChild(td);
      } else if (arr[0] === "delete") {
        buttonTagDelete.innerHTML = "削除";
        td.appendChild(buttonTagDelete);
        tr.appendChild(td);
      } else {
        td.textContent = arr[1]; // arr[1]はvalueの部分
        tr.appendChild(td);
      }

      buttonTagStatus.addEventListener(
        "click",
        () => {
          toggleStatus(buttonTagStatus);
        },
        false
      );

      buttonTagDelete.addEventListener(
        "click",
        () => {
          deleteTask(task.id);
        },
        false
      );
    });
  });
};

displayTaskArray(taskArray);

const toggleStatus = (el) => {
  const chooseButton = el.closest("button");
  if (chooseButton.innerText === "作業中") {
    chooseButton.innerText = "完了";
  } else {
    chooseButton.innerText = "作業中";
  }
};

const deleteTask = (id) => {
  taskArray = taskArray
    .filter((task) => task.id !== id)
    .map((task, index) => {
      return {
        ...task,
        id: index,
      };
    });

  displayTaskArray(taskArray);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  taskArray.push({
    id: taskArray.length,
    name: text.value,
    status: "作業中",
    delete: "削除",
  });
  displayTaskArray(taskArray);
  // console.log(taskArray);
});
