
const input = document.getElementById('input')
const btn = document.getElementById("submitBtn")
const container = document.getElementById('tasks')
const base_url = 'http://localhost:3000/'
window.onload = async () => display( await getData())

const getData = async() =>{
    const res = await fetch(base_url + 'tasks', {method: 'GET'})
    const data = await res.json()
    return data 
}
const createTask = async() =>{
    if(input.value === ''){ return }
    const payload = {
        name: input.value 
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    const res = await fetch(base_url, options)
    input.value = ''
    display(await getData())
}

const deleteTask = async (id) =>{
    await fetch(base_url + 'task/' + id, {method: 'DELETE'})
    display(await getData())
}
const editTask = async (id, div) =>{
    div.classList.toggle('editing')
    div.contentEditable = div.classList.value === 'editing' ? true : false
    let check = div.classList.value 
    const payload = {
        name: div.textContent
    }
    const options = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }
    if(check !== 'editing'){
        await fetch(base_url + 'task/' + id, options)
    }
}

const display = async (data) =>{
    console.log(data)
    container.innerHTML = ''
    data.forEach(element => {
        const id = element._id

        const divText = document.createElement('div')
        divText.textContent = element.name

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'DELETE'
        deleteBtn.onclick = () => deleteTask(id)

        const editBtn = document.createElement('button')
        editBtn.textContent = 'EDIT'
        editBtn.onclick = () => editTask(id, divText)

        container.append(divText, deleteBtn, editBtn)
    });
}
btn.addEventListener('click', (e) =>  {
    e.preventDefault()
    createTask()
})