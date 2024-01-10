function GerarQRCode() {
  var data = document.querySelector('textarea').value;
  var output = document.querySelector('#output');
  
  if (data.length <= 0) {
    alert("Por favor, informe uma valor para gerar o QRCode!");
    output.style.display = 'none';
    return;
  }
  if (data.length >= 256) {
    alert("A quantidade de caracteres excede o limite para o QRCode! ");
    output.style.display = 'none';
    return;
  }
  
  
  var requestApi = 'https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=H&chl=';
  var createdQrcode = requestApi + encodeURIComponent(data);
  var plotImage = document.querySelector('#QRCodeImage');
  
  plotImage.src = createdQrcode;
    
  output.style.display = 'block';
  
  var elementDown = document.getElementById("downImage");
  
  if(plotImage != null){
    elementDown.href = createdQrcode+".jpg";
    elementDown.style.display = "none"
  }else{
    elementDown.style.display = "none"
  }
}