let humidity = 70

const gaugeFill = document.getElementById("gauge-fill")
const humidityText = document.getElementById("humidity-text")
const statusText = document.getElementById("status")
const character = document.getElementById("character")

const waterButton = document.getElementById("water-button")

function updateUI() {

  gaugeFill.style.width = humidity + "%"

  humidityText.textContent = humidity + "%"

  if (humidity >= 70) {

    statusText.textContent = "とても元気！"

    character.textContent = "🥬"

  }

  else if (humidity >= 40) {

    statusText.textContent = "少し乾燥中"

    character.textContent = "🌱"

  }

  else {

    statusText.textContent = "カラカラ！"

    character.textContent = "🥺"

  }

}

waterButton.addEventListener("click", () => {

  humidity = 100

  updateUI()

})

setInterval(() => {

  humidity--

  if (humidity < 0) {
    humidity = 0
  }

  updateUI()

}, 5000)

updateUI()
