const form = document.getElementById("form");
const text = document.getElementById("text"); // 入力されたテキスト
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const radioForm = document.getElementById("radioForm");
let taskArray = [
  {
    id: 0,
    name: "ほげ",
    status: "作業中",
  },
  {
    id: 1,
    name: "ほげ",
    status: "作業中",
  },
  {
    id: 2,
    name: "ほげ",
    status: "作業中",
  },
];

const displayTaskArray = (taskArray) => {
  console.log("@@@", taskArray);
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
        buttonTagStatus.innerHTML = task.status;
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
          toggleStatus(task.id);
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

const addTaskArray = (taskArray) => {
  taskArray.push({
    id: taskArray.length,
    name: text.value,
    status: "作業中",
    delete: "削除",
  });
};

const toggleStatus = (id) => {
  taskArray = taskArray.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        status: task.status === "作業中" ? "完了" : "作業中",
      };
    } else {
      return task;
    }
  });
  displayTaskArray(taskArray);
};
// const toggleStatus = (buttonTagStatus) => {
//   const chooseButton = buttonTagStatus.closest("button");
//   if (chooseButton.innerText === "作業中") {
//     chooseButton.innerText = "完了";
//   } else {
//     chooseButton.innerText = "作業中";
//   }
// };

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

const formReset = (form) => form.reset();

let filterValue = "";
const filterCheck = () => {
  let flag = false; // 選択されているか否かを判定するフラグ
  for (let i = 0; i < document.radios.filter.length; i++) {
    if (document.radios.filter[i].checked) {
      flag = true;
      console.log(document.radios.filter[i].value);
      filterValue = document.radios.filter[i].value;
    }
  }
  if (!flag) {
    filterValue = "すべて";
  }
};

const filterTask = () => {
  let filterTaskArray = [];
  if (filterValue === "すべて") {
    displayTaskArray(taskArray);
    console.log(taskArray);
  } else {
    filterTaskArray = taskArray.filter((task) => task.status == filterValue);
    displayTaskArray(filterTaskArray);
    console.log(filterTaskArray);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTaskArray(taskArray);
  displayTaskArray(taskArray);
  formReset(form);
  // console.log(taskArray);
});

radioForm.addEventListener("click", (e) => {
  filterCheck();
  filterTask();
});
