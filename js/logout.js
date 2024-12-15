document.querySelector('.logOut').addEventListener("click",function(){
    localStorage.removeItem('currentUser');
    window.location.href='kaira/../login.html';
    localStorage.setItem('loggedIn',false)
   
})