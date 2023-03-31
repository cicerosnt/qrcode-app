function GerarQRCode() {
  var inputUsuario = document.querySelector('textarea').value;
  var output = document.querySelector('#output');
  
  console.log(output);
  
  if (inputUsuario.length <= 0) {
    alert("Por favor, informe para gerar o QGCode!");
    output.style.display = 'none';
    return;
  }
  var GoogleChartAPI = 'https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=H&chl=';
  var conteudoQRCode = GoogleChartAPI + encodeURIComponent(inputUsuario);
  document.querySelector('#QRCodeImage').src = conteudoQRCode;
  
  output.style.display = 'block';
}