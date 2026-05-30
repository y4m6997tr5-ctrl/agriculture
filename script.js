const fieldsContainer = document.getElementById("fields-container");
const addFieldButton = document.getElementById("add-field-button");
const farmTitleInput = document.getElementById("farm-title-input");

const vegetables = {
  tomato: {
    name: "トマト",
    emoji: "🍅"
  },

  cucumber: {
    name: "きゅうり",
    emoji: "🥒"
  },

  eggplant: {
    name: "なす",
    emoji: "🍆"
  },

  watermelon: {
    name: "スイカ",
    emoji: "🍉"
  }
};

let fields = [];

function saveData() {

  localStorage.setItem(
    "farm-app-data",
    JSON.stringify({
      farmTitle: farmTitleInput.value,
      fields: fields
    })
  );

}

function loadData() {

  const savedData = localStorage.getItem("farm-app-data");

  if (!savedData) {
    createField();
    return;
  }

  try {

    const parsedData = JSON.parse(savedData);

    farmTitleInput.value =
      parsedData.farmTitle || "すいすい農園";

    fields = parsedData.fields || [];

    if (fields.length === 0) {
      createField();
      return;
    }
loadData();
