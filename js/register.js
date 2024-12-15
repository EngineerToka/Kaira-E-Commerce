// Register
document.querySelector('.signUp').addEventListener('submit',function(){


const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

     userRegister(name,email,password);

})


function userRegister(name,email,password){

  let users=JSON.parse(localStorage.getItem('users')||'[]');
  console.log(users)
  console.log(localStorage.getItem('users'))
  const userCheck= users.find(user=>user.email===email)

    if(userCheck){
       alert('This email is already registered.');
    return;
}
    users.push({name,email,password});

    // as only local storage can store string
    localStorage.setItem('users',JSON.stringify(users))
    alert('Registration successful! You can now log in.');


}

