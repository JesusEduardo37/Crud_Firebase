const btnUpdate = document.getElementById('btnUpdate')

let idUpdate
let id 
document.addEventListener('DOMContentLoaded', () => {
    idUpdate = location.search.substring(1).split("&")
    id = idUpdate[0].substring(3, idUpdate[0].length)
    getUser(id)
    //console.log('@@@ idUpdate => ', idUpdate, id)
})

const btnCancel = document.getElementById('btnCancel')
btnCancel.addEventListener('click', () => {
    window.location.replace('/')
})

btnUpdate.addEventListener('click', (e) => {
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const address = document.getElementById('address').value
    const phone = document.getElementById('phone').value
    const city = document.getElementById('city').value
    const cp = document.getElementById('zipcode').value

    //Validaciones 
    if(firstname.trim().length !== 0 && lastname.trim().length !== 0){
        const obj = {
            id,
            firstname, 
            lastname, 
            address, 
            phone, 
            city, 
            cp
        }
        fetch('http://localhost:9000/update', {
            method: 'POST', 
            body: JSON.stringify(obj), 
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(async(res) => {
            const result = await res.json()
                if (result.msg === 'success') {
                    window.location.replace('/')    
                }        
            //console.log('@@ result => ', res)
        }).catch((error) => {
            console.log('@@@ error => ', error)
        })
    }
    e.preventDefault()
})


const getUser = async(id) => {
    //console.log(id)
    const user = await fetch(`http://localhost:9000/get-update/${id}`)
    const result = await user.json()
    if ( result.msg === 'success'){
        loadDataUser(result.data)
    } else {
        alert('User Not Found')
    }
    //console.log('@@ result => ', result )
}

const loadDataUser = (user) => {
    console.log(user)
    const id = document.getElementById('id')
    const firstname = document.getElementById('firstname')
    const lastname = document.getElementById('lastname')
    const address = document.getElementById('address')
    const phone = document.getElementById('phone')
    const city = document.getElementById('city')
    const zipcode = document.getElementById('zipcode')

    id.value = id 
    firstname.value = user.firstname
    lastname.value = user.lastname
    address.value = user.address
    phone.value = user.phone
    city.value = user.city
    zipcode.value = user.cp
}