console.log('Client side Jave Script is loaded')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
messageone.textContent = ''
messagetwo.textContent = ''
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value 
        
    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
         response.json().then((data) => {
         if(data.error){
            messageone.textContent = data.error 
         }else{ 
             messagetwo.textContent = data.Location + ' Temperature : ' + data.Temperature
             + ' Feels Like : ' + data.FeelsLike
             

         }
         
})   
    
})
})
