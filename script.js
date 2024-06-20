document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video");
  const captureButton = document.getElementById("captureButton");
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const result = document.getElementById("result");
  //カメラにアクセスして映像を取得
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      console.error("カメラへのアクセスが許可されませんでした", err);
    });
  captureButton.addEventListener("click", () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/png");

    Tesseract.recognize(image, "jpn", { logger: (m) => console.log(m) }).then(
      ({ data: text }) => {
        result.textContent = text;
      }
    );
  });
});
