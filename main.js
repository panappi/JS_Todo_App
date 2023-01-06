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
  // {
  //   id: 0,
  //   name: "ほげ",
  //   status: DOING,
  //   delete: REMOVE,
  // },
  // {
  //   id: 1,
  //   name: "ほげ",
  //   status: DOING,
  //   delete: REMOVE,
  // },
  // {
  //   id: 2,
  //   name: "ほげ",
  //   status: DOING,
  //   delete: REMOVE,
  // },
];

// タスクを配列に追加する
const addTaskArray = (taskArray) => {
  taskArray.push({
    id: taskArray.length,
    name: text.value,
    status: DOING,
    delete: REMOVE,
  });
};

// タスクの状態をトグルで入れ替える
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

// タスクを配列から削除する
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

// タスクをhtmlに表示する(tbodyに追加する)
const displayTaskArray = (taskArray) => {
  taskList.innerHTML = ""; // tbodyを初期化

  taskArray.map((task) => {
    // タスクのDOMを生成
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdName = document.createElement("td");
    const tdStatus = document.createElement("td");
    const tdDelete = document.createElement("td");
    const buttonStatus = document.createElement("button");
    const buttonDelete = document.createElement("button");

    taskList.appendChild(tr);
    // タスクのID
    tdId.textContent = task.id;
    tr.appendChild(tdId);
    // タスクの名前
    tdName.textContent = task.name;
    tr.appendChild(tdName);
    // 状態ボタン
    buttonStatus.textContent = task.status;
    tdStatus.appendChild(buttonStatus);
    tr.appendChild(tdStatus);
    // 削除ボタン
    buttonDelete.textContent = REMOVE;
    tdDelete.appendChild(buttonDelete);
    tr.appendChild(tdDelete);

    buttonStatus.addEventListener("click", () => {
      toggleStatus(task.id);
    });
    buttonDelete.addEventListener("click", () => {
      deleteTask(task.id);
    });
  });
};

displayTaskArray(taskArray);

// タスク入力フォームのテキストをリセットする
const formReset = (textForm) => textForm.reset();

// ラジオボタンに合わせてタスクの表示を変更する
const filterTask = () => {
  // 選択されているラジオボタンのvalueを取得する
  const selectedRadio = radioForm.status.value;
  if (selectedRadio === ALL) {
    displayTaskArray(taskArray);
  } else {
    const filterTaskArray = taskArray.filter(
      (task) => task.status == selectedRadio
    );
    displayTaskArray(filterTaskArray);
  }
};

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTaskArray(taskArray);
  displayTaskArray(taskArray);
  formReset(textForm);
});

radioForm.addEventListener("click", () => {
  filterTask();
});
