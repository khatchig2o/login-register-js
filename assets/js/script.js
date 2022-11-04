const loginButton = document.getElementsByClassName('P-login-button')[0]
const riggisterbutton = document.getElementsByClassName('P-Riggister-button')[0]
const loginForm = document.getElementsByClassName('P-login-form')[0]
const riggisterForm = document.getElementsByClassName('P-riggister-form')[0]
const body = document.getElementsByClassName('login-box')[0]
const registerinp = document.getElementsByClassName('P-input-text')
const loginErrors = document.getElementsByClassName('P-error-text')
const errorchek = document.getElementsByClassName('chek')
let rigBlock = document.getElementById('P-riggister-block')
let logBlock = document.getElementById('P-login-block')
let logb = document.getElementById('logb')
let rigb = document.getElementById('rigb')

////////////////////////////////////////////////////////////////////////////////////////
// switch

rigb.addEventListener("click", () => {
  rigBlock.style.left = "30px";
  logBlock.style.left = "-500px";
  body.style.height = "550px"

})
logb.addEventListener("click", () => {
  rigBlock.style.left = "500px";
  logBlock.style.left = "30px";
  body.style.height = "400px"
})


////////////////////////////////////////////////////////////////////////////////////////
// login form

loginButton.addEventListener('click', function () {
  let isValidate = true

  for (let i = 0; i < loginForm.length; i++) {
    let x = getErrorText(loginForm[i].name)
    if (!loginForm[i].value.trim()) {
      isValidate = false
      x.innerHTML = 'You must fill user name field'
      body.style.height = "440px"
    } else {
      x.innerHTML = ''
      body.style.height = "400px"
    }
  }

  if (loginForm.userName.value && !ValidateEmail(loginForm.userName.value)) {
    let x = getErrorText('userName')
    x.innerHTML = 'pleas enter a valid email addres';
    isValidate = false
  } else {
    if (loginForm.userName.value.length) {
      let x = getErrorText('userName')
      x.innerHTML = ''
    }
  }

  if (loginForm.password.value.length && loginForm.password.value.length <= 6) {
    isValidate = false
    let x = getErrorText('password')
    x.innerHTML = 'min characters  password  value must be 7'
    body.style.height = "440px"
  } else {
    if (loginForm.password.value.length) {
      let x = getErrorText('password')
      x.innerHTML = ''
      body.style.height = "400px"
    }
  }

  if (isValidate) {
    if (localStorage.key("user-list")) {
      let userlist = localStorage.getItem("user-list")
      userlist = JSON.parse(userlist)
      let answer = validations(userlist)
      if (answer) {
        console.log("your loged in succesfully");
      } else {
        console.log("you have enterd wrong email or password");
      }
    }
  }
})

////////////////////////////////////////////////////////////////////////////////////////
// register form
riggisterbutton.addEventListener('click', function () {
  let canRegister = true
  for (let i = 0; i < riggisterForm.length; i++) {
    let x = getErrorText(riggisterForm[i].name)
    if (!riggisterForm[i].value.trim()) {
      canRegister = false
      x.innerHTML = 'You cant leav this empty'
    } else {
      x.innerHTML = ''
    }
  }

  if (riggisterForm.emailAddres.value && !ValidateEmail(riggisterForm.emailAddres.value)) {
    canRegister = false
    let x = getErrorText('emailAddres')
    x.innerHTML = 'pleas enter a valid email addres';
  } else {
    if (riggisterForm.emailAddres.value.length) {
      let x = getErrorText('emailAddres')
      x.innerHTML = ''
    }
  }

  if (riggisterForm.passwordN1.value.length && riggisterForm.passwordN1.value.length <= 6) {
    canRegister = false
    let x = getErrorText('passwordN1')
    x.innerHTML = 'min characters  password  value must be 7'
  } else if (loginForm.password.value.length) {
    let x = getErrorText('passwordN1')
    x.innerHTML = ''
  }

  if (riggisterForm.passwordN2.value.length && riggisterForm.passwordN1.value != riggisterForm.passwordN2.value) {
    canRegister = false
    let x = getErrorText('passwordN2')
    x.innerHTML = 'The comfermaton password dose not mach the password'
  } else if (loginForm.password.value.length) {
    let x = getErrorText('passwordN2')
    x.innerHTML = ''
  }


  if (canRegister) {
    body.style.height = "550px"
    let riggisterUser = {}
    let arr = []
    let double = false
    riggisterUser = {
      firstName: riggisterForm.firstName.value,
      lasteName: riggisterForm.lastName.value,
      Email: riggisterForm.emailAddres.value,
      password: riggisterForm.passwordN1.value
    }
    var Email;
    if (localStorage.key("user-list")) {
      x = localStorage.getItem("user-list")
      x = JSON.parse(x)
      console.log(x);
      double = duplicet(x, riggisterUser);
      if (double === true) {
        let x = getErrorText('emailAddres')
        x.innerHTML = 'this email is alredy in use';
      } else {
        x.push(riggisterUser)
        localStorage.setItem("user-list", JSON.stringify(x))
        clear()
      }
    } else {
      arr.push(riggisterUser)
      localStorage.setItem("user-list", JSON.stringify(arr))
      clear()
    }
  } else {
    body.style.height = "600px"
  }
});
////////////////////////////////////////////////////////////////////////////////////////
//functions 

function getErrorText(attrName) {
  let errorText = ''
  for (let i = 0; i < loginErrors.length; i++) {
    if (loginErrors[i].getAttribute('data-login') === attrName) {
      errorText = loginErrors[i]
    }
  }

  return errorText
}

function ValidateEmail(email) {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(mailFormat)
}

function clear() {
  for (let i = 0; i < registerinp.length; i++) {
    registerinp[i].value = ""
  }
}

function duplicet(arr, compare) {
  let flag
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].Email === compare.Email) {
      flag = true
      break;
    } else {
      flag = false
    }
  }
  return flag;
}

function validations(arr) {
  let isvalde = false
  for (let i = 0; i < arr.length; i++) {
    if (loginForm.userName.value == arr[i].Email) {
      isvalde = true
      if (loginForm.password.value != arr[i].password) {
        isvalde = false
      }
    }
  }
  return isvalde
}