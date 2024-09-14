function GerarQRCode() {
  const data = document.querySelector("textarea").value
  const output = document.querySelector("#output")
  const plotImage = document.querySelector("#QRCodeImage")
  const elementDown = document.getElementById("downImage")
  const loadingDiv = document.getElementById("loading")

  if (data.length <= 0) {
    alert("Por favor, informe um valor para gerar o QRCode!")
    output.style.display = "none"
    loadingDiv.style.display = "none"
    return
  }

  if (data.length >= 256) {
    alert("A quantidade de caracteres excede o limite para o QRCode!")
    output.style.display = "none"
    loadingDiv.style.display = "none"
    return
  }

  const requestApi =
    "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data="
  const createdQrcode = requestApi + encodeURIComponent(data)

  loadingDiv.style.display = "block"
  output.style.display = "none"
  elementDown.style.display = "none"

  function normalizeFileName(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^a-zA-Z0-9 ]/g, "") 
      .replace(/\s+/g, "-") 
      .toLowerCase()
  }

  // Cria um novo objeto de imagem para carregar o QRCode de forma assíncrona
  const img = new Image()

  img.onload = () => {
    plotImage.src = createdQrcode
    loadingDiv.style.display = "none" 
    output.style.display = "block" 

    fetch(createdQrcode)
      .then((response) => response.blob())
      .then((blob) => {
        const fileName = normalizeFileName(data)
        const blobUrl = URL.createObjectURL(blob)

        // Define o href e o nome do arquivo de download, mas não baixa ainda
        elementDown.href = blobUrl
        elementDown.download = `${fileName}.jpg`
        elementDown.style.display = "block"

        // Libera a memória do URL Blob ao clicar no link
        elementDown.onclick = () => {
          setTimeout(() => URL.revokeObjectURL(blobUrl), 100) // Limpa o blob após o download
        }
      })
      .catch(() => {
        alert("Erro ao baixar a imagem do QRCode.")
        loadingDiv.style.display = "none"
      })
  }

  img.onerror = () => {
    alert("Erro ao gerar o QRCode. Tente novamente.")
    loadingDiv.style.display = "none"
    output.style.display = "none"
  }

  img.src = createdQrcode
}
