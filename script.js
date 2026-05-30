const fieldsContainer = document.getElementById("fields-container")
const addFieldButton = document.getElementById("add-field-button")
const farmTitleInput = document.getElementById("farm-title-input")

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

}

let fields = []

function saveData() {

const data = {

```
farmTitle: farmTitleInput.value,

fields: fields
```

}

localStorage.setItem(
"farm-app-data",
JSON.stringify(data)
)

}

function loadData() {

const savedData = localStorage.getItem("farm-app-data")

if (!savedData) {

```
createField()

return
```

}

try {

```
const parsedData = JSON.parse(savedData)

farmTitleInput.value =
  parsedData.farmTitle || "すいすい農園"

fields = parsedData.fields || []

renderFields()
```

}

catch(error) {

```
createField()
```

}

}

function createField() {

const field = {

```
id: crypto.randomUUID(),

name: "新しい畑",

vegetable: "tomato",

humidity: 70,

sensorConnected: false
```

}

fields.push(field)

renderFields()

saveData()

}

function renderFields() {

fieldsContainer.innerHTML = ""

fields.forEach((field) => {

```
const vegetableData = vegetables[field.vegetable]

let status = "とても元気！"

if (field.humidity < 70) {
  status = "少し乾燥中"
}

if (field.humidity < 40) {
  status = "カラカラ！"
}

const warningHTML = field.humidity < 40
  ? `<div class="warning">⚠️ 水不足です！</div>`
  : ""

const sensorText = field.sensorConnected
  ? "✅ センサー接続済み"
  : "⚠️ センサーに繋がってません"

const sensorClass = field.sensorConnected
  ? "sensor-connected"
  : "sensor-disconnected"

const sensorButtonText = field.sensorConnected
  ? "センサー再接続"
  : "センサーを接続"

const card = document.createElement("div")

card.className = "field-card"

card.innerHTML = `

  <input
    class="field-name"
    value="${field.name}"
    data-id="${field.id}"
  >

  <select
    class="vegetable-select"
    data-id="${field.id}"
  >

    <option value="tomato"
      ${field.vegetable === "tomato" ? "selected" : ""}
    >
      🍅 トマト
    </option>

    <option value="cucumber"
      ${field.vegetable === "cucumber" ? "selected" : ""}
    >
      🥒 きゅうり
    </option>

    <option value="eggplant"
      ${field.vegetable === "eggplant" ? "selected" : ""}
    >
      🍆 なす
    </option>

    <option value="watermelon"
      ${field.vegetable === "watermelon" ? "selected" : ""}
    >
      🍉 スイカ
    </option>

  </select>

  <div class="character">
    ${vegetableData.emoji}
  </div>

  <div class="status">
    ${status}
  </div>

  <div class="gauge">

    <div
      class="gauge-fill"
      style="width:${field.humidity}%"
    ></div>

  </div>

  <div class="humidity-text">
    土のうるおい ${field.humidity}%
  </div>

  <button
    class="water-button"
    data-water-id="${field.id}"
  >
    🚿 水をあげる
  </button>

  ${warningHTML}

  <div class="sensor-area">

    <div class="
      sensor-status
      ${sensorClass}
    ">
      ${sensorText}
    </div>

    <button
      class="sensor-button"
      data-sensor-id="${field.id}"
    >
      ${sensorButtonText}
    </button>

  </div>

`

fieldsContainer.appendChild(card)
```

})

addEvents()

}

function addEvents() {

document.querySelectorAll(".field-name")
.forEach((input) => {

```
  input.addEventListener("input", (e) => {

    const id = e.target.dataset.id

    const field = fields.find((f) => f.id === id)

    field.name = e.target.value

    saveData()

  })

})
```

document.querySelectorAll(".vegetable-select")
.forEach((select) => {

```
  select.addEventListener("change", (e) => {

    const id = e.target.dataset.id

    const field = fields.find((f) => f.id === id)

    field.vegetable = e.target.value

    renderFields()

    saveData()

  })

})
```

document.querySelectorAll(".water-button")
.forEach((button) => {

```
  button.addEventListener("click", (e) => {

    const id = e.target.dataset.waterId

    const field = fields.find((f) => f.id === id)

    field.humidity = 100

    renderFields()

    saveData()

  })

})
```

document.querySelectorAll(".sensor-button")
.forEach((button) => {

```
  button.addEventListener("click", (e) => {

    const id = e.target.dataset.sensorId

    const field = fields.find((f) => f.id === id)

    field.sensorConnected = true

    renderFields()

    saveData()

    alert("センサー接続完了！")

  })

})
```

}

addFieldButton.addEventListener("click", () => {

createField()

})

farmTitleInput.addEventListener("input", () => {

saveData()

})

setInterval(() => {

fields.forEach((field) => {

```
field.humidity -= 1

if (field.humidity < 0) {
  field.humidity = 0
}
```

})

renderFields()

saveData()

}, 5000)

loadData()
