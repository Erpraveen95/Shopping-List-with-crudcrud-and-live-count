const product = document.querySelector('#Productname')
const price= document.querySelector('#price')
const form = document.querySelector('#myform')
const userList = document.getElementById('ullist');

form.addEventListener('submit',onSubmit)

//loads server data on screen
window.addEventListener("DOMContentLoaded",()=>{
    axios.get('https://crudcrud.com/api/71c3f65d82574c8287720fd0542acb3d/shoppingList')
    .then(res=>{
       for(let i=0;i<res.data.length;i++){
        updateDom((res.data)[i])
       }
      
    })
    .catch(err=>console.error(err))
    }) 

// submit data to server
function onSubmit(e){
    e.preventDefault();
    
    if(product.value === ""){
        alert("please input field")
    }else{
        const userDetails ={
            name: product.value,
            amount:price.value
        }
        axios.post('https://crudcrud.com/api/71c3f65d82574c8287720fd0542acb3d/shoppingList',userDetails)
        .then(res=>{
            console.log(res.data,'details saved success')
            updateDom(res.data)
            total()
        })
        .catch(err=>console.error(err))
        product.value = '';
        price.value= '';
    }
}
// update dom
function updateDom(user){
    const parentNode = userList
    const childHTML = `<li class='list-group-item' id='${user._id}'>${user.name} ${user.amount}
                        <button onclick=deleteUser('${user._id}')>Delete</button></li>`
    parentNode.innerHTML = parentNode.innerHTML+ childHTML   
    total()                
}
//delete functionality
function deleteUser(id){
    axios.delete(`https://crudcrud.com/api/71c3f65d82574c8287720fd0542acb3d/shoppingList/${id}`)
    .then(res=>{
        console.log('data Succesfully deleted')
    }).catch(err=>console.error(err))
    removeUserFromScreen(id)
    total()
}
//remove user from screen
function removeUserFromScreen(id){
    const parentNode = userList
    const childNodeToBeDeleted = document.getElementById(id);
    parentNode.removeChild(childNodeToBeDeleted)
  }
// total count
  function total(){
    var totalExpense=0;
    axios.get('https://crudcrud.com/api/71c3f65d82574c8287720fd0542acb3d/shoppingList')
    .then(res=>{
        res.data.forEach(i => {
            //console.log(i)
            totalExpense+=parseInt(i.amount);
           
        });
        let span = document.getElementById("span")
        span.textContent = `Total Expense is:₹ ${totalExpense}/-`
    })
// Change element content
   
}