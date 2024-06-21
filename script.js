document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video");
  const captureButton = document.getElementById("captureButton");
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const result = document.getElementById("result");
  //カメラにアクセスして映像を取得
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      console.error("カメラへのアクセスが許可されませんでした", err);
      result.textContent = "カメラへのアクセスが許可されませんでした";
    });
  captureButton.addEventListener("click", () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/png");

    Tesseract.recognize(image, "jpn", { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => {
        console.log(text);
        result.textContent = text;
      })
      .catch((err) => {
        console.log("実行中にエラーが発生しました", err);
        result.textContent = "実行中にエラーが発生しました";
      });
  });
});
