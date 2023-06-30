const formulario =  document.querySelector('.form')
const cardList = document.querySelector('.card_list')
const btnCleanAll = document.querySelector('.btn_cleanAll')
const card = document.querySelector('.card')


let list = []
let id = 0



const createTask = (task, comment) => {
    
    const newTask = {
        id: id,
        taskName: task,
        priority: 'normal',
        state: 'Pending',
        comment: comment ? comment: '---'
    }
    id ++
    list.push(newTask)
    
   
}

const deleteTask = (item) => {
    let value = parseInt(item)
    let arrayIndex
    list.forEach((element, index) => {
        if(element.id === value) {
            arrayIndex = index
           
        }
    })
    
    list.splice(arrayIndex, 1)
    saveDB()
    
}

const checkedTask = (item) => {
   let indexArray = list.findIndex((element)=> element.id === parseInt(item)) 

   list[indexArray].state = 'Done'
   saveDB()
}

const unCheckedTask = (item) => {
    let indexArray = list.findIndex((element)=> element.id === parseInt(item)) 
 
    list[indexArray].state = 'Pending'
    saveDB()
 }

const saveDB = () => {
    localStorage.setItem('tasks', JSON.stringify(list))
    printDB()
}

const isChecked = (checkbox, item) => {

    let indexArray 
    
    if(checkbox === 'p-urgente') {
       
        indexArray = list.findIndex((element)=> element.id === parseInt(item)) 
        
        list[indexArray].priority = 'urgente'
        saveDB()
    } else if(checkbox === 'p-normal') {
        
        indexArray = list.findIndex((element)=> element.id === parseInt(item)) 

        list[indexArray].priority = 'normal'
        saveDB()
    } else {
        priority = ''
       
    }

   
   
}

const printDB = () => {
    cardList.innerHTML = ''

    list = JSON.parse(localStorage.getItem('tasks'))
    

    if(list === null || list.length === 0) {
        list = []
        id = 0
        cardList.innerHTML = `
        <h3 class="msg_listContainer">No hay Tareas Listadas</h3>
    `
    } else {
        list.forEach(element => {
           
            cardList.innerHTML += 
            `
                <div class="card ${element.state === "Done" ? 'task_done' : element.priority === "urgente" ? 'task_urgent' : ''}">
                        <div class="task">
                            <svg fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                            <path d="m1783.68 1468.235-315.445 315.445v-315.445h315.445Zm-541.327-338.823v112.94h-903.53v-112.94h903.53Zm338.936-338.824V903.53H338.824V790.59h1242.465ZM621.176 0c93.403 0 169.412 76.01 169.412 169.412 0 26.09-6.437 50.484-16.94 72.62L999.98 468.255l-79.962 79.962-226.221-226.334c-22.137 10.504-46.532 16.942-72.622 16.942-93.402 0-169.411-76.01-169.411-169.412C451.765 76.009 527.775 0 621.176 0Zm395.295 225.882v112.942h790.588v1016.47h-451.765v451.765H112.941V338.824h225.883V225.882H0V1920h1421.478c45.176 0 87.755-17.619 119.717-49.581l329.224-329.11c31.962-32.076 49.581-74.655 49.581-119.831V225.882h-903.53Z" fill-rule="evenodd"/>
                            </svg>
                            <div class="taskName">
                                <aside><b>${element.taskName}</b> <span>- ${element.state}</span></aside>
                                <h4>Comentarios: <i>${element.comment}</i></h4>
                            </div>
                            
                        </div>
                        <div class="checkbox_container" >
                            <h3>Prioridad</h3>
                            <div>
                                <label for="urgente"><strong>Urgente</strong></label>
                                <input type="checkbox" class="priority_check" name="p-urgente" id="${element.id}" value="urgente" ${element.priority === 'urgente' ? 'checked' : ''}>
                            </div>
                            <div>
                                <label for="normal"><strong>Normal</strong></label>
                                <input type="checkbox" class="priority_check" name="p-normal" id="${element.id}" value="normal" ${element.priority === 'normal' ? 'checked' : ''}>
                            </div>
                        </div>
                        <div class="btn_container">
                            <i class="fa-solid fa-reply ${element.state === "Done" ? '' : 'hidden'}" id="${element.id}"></i>
                            <i class="fa-solid fa-check ${element.state === "Done" ? 'hidden' : ''}" id="${element.id}"></i>
                            <i class="fa-solid fa-trash" id="${element.id}"></i>
                        </div>
                </div>
            `
        })
    }

    id = list[list.length -1].id + 1
}

//DOM Events
formulario.addEventListener('submit', e => {
    e.preventDefault()
    
    const task = e.target.task.value
    const comment = e.target.comment.value

    createTask(task, comment)
    saveDB()
    printDB()
    formulario.reset()
})

document.addEventListener('DOMContentLoaded', printDB)

btnCleanAll.addEventListener('click', function() {
    
    const response = confirm("¿Seguro que desea limpiar la lista en su totalidad?")

    if(response === true){
        localStorage.removeItem('tasks')
        printDB()
        return 
    } else {
        return 
    }

})

cardList.addEventListener('click', (e) => {
    
    
    const checkbox = e.target.name
   
    const btn = e.target.className
    let item = e.target.getAttribute('id')
    

   isChecked(checkbox, item)

    if(btn.split(' ')[1] === 'fa-trash'){
        deleteTask(item)
        printDB()
    } else if(btn.split(' ')[1] === 'fa-check') {
        checkedTask(item)
        printDB()
        
    } else if(btn.split(' ')[1] === 'fa-reply') {
        unCheckedTask(item)
        printDB()
        
    } else {
        return
    }
     
    
})



