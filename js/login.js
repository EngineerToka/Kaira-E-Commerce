// Login

document.querySelector('.signIn').addEventListener('submit',function(e){
    e.preventDefault(); // Prevent form from reloading the page
    
    const email= document.getElementById('logEmail').value;
    const password= document.getElementById('logPass').value;
    
    logIn(email,password)
    
    
    })
    
   function logIn(email,password){
    user=JSON.parse(localStorage.getItem('users')||'[]')
    userExsist= user.find(user=>user.email == email && user.password == password)
        if(userExsist){
            localStorage.setItem('loggedIn',true)
            window.location.href = 'kaira/../index.html';
            localStorage.setItem('currentUser',JSON.stringify(user))

            
        }else{
            window.location.href = 'kaira/../login.html';
            alert('Invalid email or password.');
        }
    }
    console.log('Page loaded');