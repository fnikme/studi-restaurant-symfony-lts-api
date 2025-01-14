// Implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");
const formIncription = document.getElementById("formulaireInscription");

inputNom.addEventListener("keyup", validateFrom);
inputPreNom.addEventListener("keyup", validateFrom);
inputMail.addEventListener("keyup", validateFrom);
inputPassword.addEventListener("keyup", validateFrom);
inputValidationPassword.addEventListener("keyup", validateFrom);

btnValidation.addEventListener("click",InscrireUtilisateur);

//Function permettant de valider tout formulaire
function validateFrom(){
    const nomOK = validateRequired(inputNom);
    const prenomOK = validateRequired(inputPreNom);
    const mailOK = validateMail(inputMail);
    const passwordOK = validatePassword(inputPassword);
    const passwordConfirmgOK = validateConfirmationPassword(inputPassword, inputValidationPassword);

    if(nomOK && prenomOK && mailOK && passwordOK && passwordConfirmgOK){
        btnValidation.disabled = false;
    }
    else{
        btnValidation.disabled = true;
    }

}

function validateConfirmationPassword(inputPwd, inputConfirmPwd){
    if(inputPwd.value == inputConfirmPwd.value){
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    }
    else{inputConfirmPwd.classList.add("is-invalid");
         inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}

function validatePassword(input){
    //Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateMail(input){
    //Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if(mailUser.match(emailRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateRequired(input){
     if(input.value !=''){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function InscrireUtilisateur(){
    let dataForm = new FormData(formIncription);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    let raw = JSON.stringify({
        "firstName": dataForm.get("nom"),
        "lastName": dataForm.get("prenom"),
        "email": dataForm.get("email"),
        "password": dataForm.get("mdp")
    });


    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

    fetch("http://localhost:8000/api/registration", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


