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
    delete: REMOVE,
  },
  {
    id: 1,
    name: "ほげ",
    status: DOING,
    delete: REMOVE,
  },
  {
    id: 2,
    name: "ほげ",
    status: DOING,
    delete: REMOVE,
  },
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
    // タスクのDOMを生成する
    const tr = document.createElement("tr");
    // const tdId = document.createElement("td");
    const tdName = document.createElement("td");
    const tdStatus = document.createElement("td");
    const tdDelete = document.createElement("td");
    // const buttonStatus = document.createElement("button");
    // const buttonDelete = document.createElement("button");
    const divStatusOut = document.createElement("div");
    const divStatusIn = document.createElement("div");
    const divDelete = document.createElement("div");

    // タスクの状態に合わせてdivタグへclassを追加する
    const toggleStatusClass = (task) => {
      task.status === DOING
        ? (divStatusOut.classList.remove(
            "contents__table-status-div--done_out"
          ),
          divStatusIn.classList.remove("contents__table-status-div--done_in"),
          divStatusOut.classList.add("contents__table-status-div--doing"),
          tdName.classList.remove("content__table-name--done"))
        : (divStatusOut.classList.remove("contents__table-status-div--doing"),
          divStatusOut.classList.add("contents__table-status-div--done_out"),
          divStatusIn.classList.add("contents__table-status-div--done_in"),
          tdName.classList.add("content__table-name--done"));
    };

    taskList.appendChild(tr);
    // タスクのID
    // tdId.textContent = task.id;
    // tr.appendChild(tdId);

    // 状態ボタン
    // buttonStatus.textContent = task.status;
    // tdStatus.appendChild(buttonStatus);
    tdStatus.appendChild(divStatusOut);
    divStatusOut.appendChild(divStatusIn);
    tr.appendChild(tdStatus);
    tdStatus.classList.add("content__table-status");
    // divStatusOut.classList.add("contents__table-status-div--doing");
    toggleStatusClass(task);

    // タスクの名前
    tdName.textContent = task.name;
    tr.appendChild(tdName);
    tdName.classList.add("content__table-name");

    // 削除ボタン
    // buttonDelete.textContent = REMOVE;
    // tdDelete.appendChild(buttonDelete);
    divDelete.textContent = "i";
    tdDelete.appendChild(divDelete);
    tr.appendChild(tdDelete);
    tdDelete.classList.add("content__table-delete");
    divDelete.classList.add("contents__table-delete-div");

    // 状態ボタンが押されたときの処理
    // buttonStatus.addEventListener("click", () => {
    divStatusOut.addEventListener("click", () => {
      toggleStatus(task.id);
    });
    // 削除ボタンが押されたときの処理
    // buttonDelete.addEventListener("click", () => {
    divDelete.addEventListener("click", () => {
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
  const filterTaskArray = taskArray.filter(
    (task) => task.status == selectedRadio
  );
  selectedRadio === ALL
    ? displayTaskArray(taskArray)
    : displayTaskArray(filterTaskArray);
};

// 追加ボタンが押されたときの処理
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTaskArray(taskArray);
  displayTaskArray(taskArray);
  formReset(textForm);
});

// ラジオボタンが押されたときの処理
radioForm.addEventListener("click", () => {
  filterTask();
});
