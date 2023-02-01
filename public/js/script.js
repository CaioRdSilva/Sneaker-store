// validacao de campos e de campo de venda
const seller = document.querySelector(".switch-button");
const checkSeller = document.querySelector("#seller");

if(seller){
seller.addEventListener("click", () => {
  if (checkSeller.checked) {
    checkSeller.checked = false;
  } else {
    checkSeller.checked = true;
  }
});
}
let form = document.querySelector(".form-regist");

if(form){
form.addEventListener("submit", (e) => {
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

const inputFile = document.querySelector("#avatar");
const selectImage = document.querySelector(".chooseImage");

if(selectImage){
selectImage.innerHTML = "Choose an image";
}