let list = document.getElementById("list")


firebase.database().ref("Todo List").on("child_added", (data) => {

    //create li  tag with text node
    let li = document.createElement("li")
    let hr = document.createElement("hr")
    let liText = document.createTextNode(data.val().value)
    li.appendChild(liText)
    list.appendChild(li)
    li.appendChild(hr)

    //create delete button
    let delBtn = document.createElement("button")
    let delText = document.createTextNode("Delete")
    delBtn.setAttribute("class", "liBtn")
    delBtn.setAttribute("id", data.val().key)
    delBtn.setAttribute("onclick", "deleteItem(this)")
    delBtn.appendChild(delText)
    list.appendChild(delBtn)

    //create edit button
    let editBtn = document.createElement("button")
    let editText = document.createTextNode("Edit")
    editBtn.setAttribute("class", "liBtn")
    editBtn.setAttribute("id", data.val().key)
    editBtn.setAttribute("onclick", "editItem(this)")
    editBtn.appendChild(editText)
    list.appendChild(editBtn)


})

let addTodo = () => {
    let todo_item = document.getElementById("todo-item")

    if (todo_item.value == "") {
        alert("Please enter text!")
    } else {

        let key = firebase.database().ref("Todo List").push().key;

        let item = {
            value: todo_item.value,
            key: key
        }
        firebase.database().ref("Todo List").child(key).set(item)
        todo_item.value = ""
    }
}



let deleteItem = (del) => {
    firebase.database().ref("Todo List").child(del.id).remove()
    del.previousSibling.remove()
    del.nextSibling.remove()
    del.remove()

}


let editItem = (edit) => {
    let editVal = prompt("Enter edit value", edit.previousSibling.previousSibling.firstChild.nodeValue)   //my concept

    if (editVal == "") {
        alert("Please enter text!")
    } else {
        let editList = {
            value: editVal,
            key: edit.id
        }
        firebase.database().ref("Todo List").child(edit.id).set(editList)
        edit.previousSibling.previousSibling.firstChild.nodeValue = editVal;
    }
}

let deleteAll = () => {
    firebase.database().ref("Todo List").remove()
    list.innerHTML = ""
}




















































// let list =document.getElementById("list")


// firebase.database().ref("Todo List").on("child_added",function(data){
//     // console.log(data.val())

//     //create li  tag with text node
//     let li = document.createElement("li")
//     let hr = document.createElement("hr")   //my concept
//     let liText = document.createTextNode(data.val().value)
//     li.appendChild(liText)
//     list.appendChild(li)
//     li.appendChild(hr)  //my concept



//     //create delete button
//     let delBtn = document.createElement("button")
//     let delText = document.createTextNode("Delete")
//     delBtn.setAttribute("class","liBtn")
//     delBtn.setAttribute("id",data.val().key)
//     delBtn.setAttribute("onclick","deleteItem(this)")
//     delBtn.appendChild(delText)
//     list.appendChild(delBtn)  //my concept  li.appendChild old

//     //create edit button
//     let editBtn= document.createElement("button")
//     let editText = document.createTextNode("Edit")
//     editBtn.setAttribute("class","liBtn")
//     editBtn.setAttribute("id",data.val().key)
//     editBtn.setAttribute("onclick","editItem(this)")
//     editBtn.appendChild(editText)
//     list.appendChild(editBtn)


// })

// function addTodo(){
//     let todo_item = document.getElementById("todo-item")

//           if(todo_item.value == ""){
//         alert("Please enter text!")
//     }else{

//     let key = firebase.database().ref("Todo List").push().key;

//     let item = {
//         value: todo_item.value,
//         key: key
//     }
//     firebase.database().ref("Todo List").child(key).set(item)
//     todo_item.value = ""
// }

// }



// function deleteItem(del){
//     firebase.database().ref("Todo List").child(del.id).remove()
//     del.previousSibling.remove()  //my concept  del.parentNode.remove() old
//     del.nextSibling.remove() //my concept
//     del.remove()   //my concept

// }


// function editItem(edit){  //edit.parentNode.firstChild.nodValue  old
//     let editVal = prompt("Enter edit value",edit.previousSibling.previousSibling.firstChild.nodeValue)   //my concept

//     if(editVal == ""){
//         alert("Please enter text!")
//     }else{
//         let editList= {
//             value: editVal,
//             key: edit.id
//         }
//         firebase.database().ref("Todo List").child(edit.id).set(editList)
//     edit.previousSibling.previousSibling.firstChild.nodeValue = editVal; 
// }     //my concept
// // console.log(edit.previousSibling.previousSibling.firstChild.nodeValue)
// }

// function deleteAll(){
//     firebase.database().ref("Todo List").remove()
//     list.innerHTML= ""
// }