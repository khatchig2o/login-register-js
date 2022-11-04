let thelist = document.getElementsByClassName('information')[0]
let editbut = document.getElementsByClassName('switch1')[0]
let subbut = document.getElementsByClassName('switch1')[0]

let usersList = JSON.parse(localStorage.getItem('user-list'))

if (!localStorage.key('user-list') || !usersList.length) {
    const errorTextTag = document.createElement('p')
    errorTextTag.innerText = 'Ther is no users to show yet'
    errorTextTag.classList.add('P-empty-error')
    thelist.append(errorTextTag)
} else {
    let usersList = JSON.parse(localStorage.getItem('user-list'))
    for (let i = 0; i < usersList.length; i++) {
        let parentBox = document.createElement('div')
        parentBox.classList.add('infodiv')

        let forme = document.createElement('form')
        let div1 = generateTag('div', "user-box")
        let input1 = generateinput("username", usersList[i].firstName)
        let label1 = generateTag('p', '', 'user Name :', ' ')

        let div2 = generateTag('div', "user-box")
        let input2 = generateinput("Laste Name", usersList[i].lasteName)
        let label2 = generateTag('p', '', 'Laste Name :', ' ')

        let div3 = generateTag('div', "user-box")
        let input3 = generateinput("email", usersList[i].Email)
        let label3 = generateTag('p', '', 'Email :', ' ')

        let div4 = generateTag('div', 'button-box')
        let buttonTag = generateTag('button', 'p-button', 'Delete', ' ')
        let editTag = generateTag('button', 'p-button', 'Edit', ' ',"switch1")
        let submittag = generateTag('button', 'p-button', 'submit', ' ','switch2')

        buttonTag.addEventListener("click", () => {
            let newarr = deleteUser(i, usersList)
            localStorage.setItem("user-list", JSON.stringify(newarr))
            window.location.reload();
        })


        editTag.addEventListener("click", () => {

            input1.readOnly = false
            input2.readOnly = false
            input3.readOnly = false


            input1.classList.add('p-input')
            input2.classList.add('p-input')
            input3.classList.add('p-input')
        })

        submittag.addEventListener("click", () => {

            usersList[i].firstName = input1.value
            usersList[i].lasteName = input2.value
            usersList[i].Email = input3.value
            localStorage.setItem('user-list', JSON.stringify(usersList))

            input1.readOnly = true
            input2.readOnly = true
            input3.readOnly = true

            input1.classList.remove('p-input')
            input2.classList.remove('p-input')
            input3.classList.remove('p-input')
        })


        div1.append(input1)
        div1.append(label1)
        forme.append(div1)

        div2.append(input2)
        div2.append(label2)
        forme.append(div2)

        div3.append(input3)
        div3.append(label3)
        forme.append(div3)

        parentBox.append(forme)

        div4.append(buttonTag)
        div4.append(editTag)
        div4.append(submittag)
        parentBox.append(div4)
        thelist.append(parentBox)
    }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function deleteUser(index, arr) {
    arr.splice(index, 1);
    return arr;
}

function generateTag(tagName, tagClassName, keyName, value, second) {
    // let <br> = document.createElement('br')
    let tag = document.createElement(tagName)
    if (tagClassName) {
        tag.classList.add(tagClassName)
    }
    if (keyName && value) {
        tag.innerText = keyName + " " + value
    }
    if(second){
        tag.classList.add(second)
    }

    return tag
}

function generateinput(names, info) {
    let input = document.createElement('input')
    input.readOnly = true
    input.name = names
    input.required = " "
    input.value = info
    return input

}