const uploadBox = document.querySelector(".upload-box"),
previewImg = uploadBox.querySelector("img"),
fileUpload = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download-btn");

let ogImgRatio;

const loadfile = (e) => {
    const file = e.target.files[0]; //select first user files
    if(!file) return;
    previewImg.src = URL.createObjectURL(file); //passing selected file for preview
    previewImg.addEventListener("load", () => {
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImgRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    })
    // console.log(file);
}

widthInput.addEventListener("keyup", () => {
    const height = ratioInput.checked ? widthInput.value / ogImgRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
    const width = ratioInput.checked ? heightInput.value * ogImgRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a  = document.createElement("a");
    const ctx = canvas.getContext("2d");

    const imgQuality = qualityInput.checked ? 0.7 : 1.0;

    //resize image to input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    //drawing selected image into canvas
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    // document.body.appendChild(canvas);

    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = new Date().getTime();
    a.click();
}

downloadBtn.addEventListener("click", resizeAndDownload);
fileUpload.addEventListener("change", loadfile);
uploadBox.addEventListener("click", () => fileUpload.click());
