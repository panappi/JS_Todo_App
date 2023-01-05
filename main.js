const ALL = "すべて";
const DOING = "作業中";
const DONE = "完了";
const REMOVE = "削除";

const radioForm = document.getElementById("radioForm");
const textForm = document.getElementById("textForm");
const text = document.getElementById("text"); // 入力されたテキスト
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
let taskArray = [
  {
    id: 0,
    name: "ほげ",
    status: DOING,
  },
  {
    id: 1,
    name: "ほげ",
    status: DOING,
  },
  {
    id: 2,
    name: "ほげ",
    status: DOING,
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
    objArray.forEach((arr) => {
      const td = document.createElement("td");
      const buttonTagStatus = document.createElement("button");
      const buttonTagDelete = document.createElement("button");
      if (arr[0] === "status") {
        buttonTagStatus.innerHTML = task.status;
        td.appendChild(buttonTagStatus);
        tr.appendChild(td);
      } else if (arr[0] === "delete") {
        buttonTagDelete.innerHTML = REMOVE;
        td.appendChild(buttonTagDelete);
        tr.appendChild(td);
      } else {
        td.textContent = arr[1]; // arr[1]はvalueの部分
        tr.appendChild(td);
      }

      buttonTagStatus.addEventListener("click", () => {
        toggleStatus(task.id);
      });

      buttonTagDelete.addEventListener("click", () => {
        deleteTask(task.id);
      });
    });
  });
};

displayTaskArray(taskArray);

const addTaskArray = (taskArray) => {
  taskArray.push({
    id: taskArray.length,
    name: text.value,
    status: DOING,
    delete: REMOVE,
  });
};

const toggleStatus = (id) => {
  taskArray = taskArray.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        status: task.status === DOING ? DONE : DOING,
      };
    }
    return task;
  });
  displayTaskArray(taskArray);
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

const formReset = (form) => form.reset();

let filterValue = null;
const filterCheck = () => {
  for (let i = 0; i < document.radios.filter.length; i++) {
    if (document.radios.filter[i].checked) {
      flag = true;
      filterValue = document.radios.filter[i].value;
    }
  }
};

const filterTask = () => {
  let filterTaskArray = [];
  if (filterValue === ALL) {
    displayTaskArray(taskArray);
  } else {
    filterTaskArray = taskArray.filter((task) => task.status == filterValue);
    displayTaskArray(filterTaskArray);
  }
};

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTaskArray(taskArray);
  displayTaskArray(taskArray);
  formReset(textForm);
});

radioForm.addEventListener("click", (e) => {
  filterCheck();
  filterTask();
});
