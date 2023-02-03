// validacao de campos e de campo de venda
const seller = document.querySelector(".switch-button");
const checkSeller = document.querySelector("#seller");

if (seller) {
  seller.addEventListener("click", () => {
    if (checkSeller.checked) {
      checkSeller.checked = false;
    } else {
      checkSeller.checked = true;
    }
  });
}
let formRegist = document.querySelector(".form-regist");

if (formRegist) {
  formRegist.addEventListener("submit", (e) => {
    e.preventDefault();

    if (checkInputs()) {
      e.target.submit();
    }
  });
}
function checkInputs() {
  let status = true;

  let pass = document.querySelector("#pass");
  let confirmpass = document.querySelector("#confirmpass");

  let passVal = pass.value.trim();
  let confirmpassVal = confirmpass.value.trim();

  if (passVal != confirmpassVal) {
    console.log("senha errada");
    status = false;
  }
  return status;
}

// adicionar imagem no campo de anuncio

const inputFile = document.querySelector("#prodImg");
const selectImage = document.querySelector(".chooseImage");
const formPost = document.querySelector("#addPost");

if (selectImage) {
  selectImage.innerHTML = "Choose an image";
}

if (inputFile) {
  inputFile.addEventListener("change", (e) => {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        const readerTarget = e.target;
        const img = document.createElement("img");
        img.src = readerTarget.result;
        img.classList.add("pictureSelected");
        selectImage.innerHTML = "";
        selectImage.style.borderColor = "#20d010";
        selectImage.appendChild(img);
      });

      reader.readAsDataURL(file);
    } else {
      selectImage.innerHTML = "Choose an image";
      selectImage.style.borderColor = " #d01110";
    }
  });
}
