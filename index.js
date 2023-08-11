import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://shopping-list-884c6-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputEl = document.getElementById('input-el')
const addBtn = document.getElementById('btn-add')
const odEl = document.getElementById('od-el')
const btns = document.querySelector('items')
onValue(shoppingListInDB, function(snapshot){
    if (snapshot.exists()){
        let DbArray = Object.entries(snapshot.val()) 

        renderAll(DbArray)

    }
    else{
        odEl.innerHTML ='No Items Here... Yet'
    }


})
let string = ''
let listOfItems = []
addBtn.addEventListener('click', function(){
    let currentValue = inputEl.value
    if (currentValue){
        listOfItems.push(currentValue)
        localStorage.setItem('myItems', JSON.stringify(listOfItems))
        push(shoppingListInDB, currentValue)
        onValue(shoppingListInDB, function(snapshot){
            console.log(snapshot)
            if (snapshot.exists()){
                let DbArray = Object.entries(snapshot.val()) 
                renderAll(DbArray) 
            }
            else{
                odEl.innerHTML = 'No Items Here... Yet'
            }
 
    })
    }
    else{
        alert('Please Enter An Item in The Input Field')
    }


})

function renderAll(arr){
    odEl.innerHTML = ''
    for (let i=0; i<arr.length; i++){
        let currentItem = arr[i][1]
        let currentId = arr[i][0]
        let currentEl = document.createElement('li')
        currentEl.textContent = currentItem
        odEl.append(currentEl)
        console.log(odEl.textContent)
        currentEl.addEventListener('click', function(){
            let exactLocation = ref(database, `shoppingList/${currentId}`)
            remove(exactLocation)
           


            
        })
    }

    inputEl.value = ''
}
