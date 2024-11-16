const goBack = document.getElementById('back');
const lev1 = document.getElementById('level1');
const lev2 = document.getElementById('level2');
lev2.disabled = true;
lev2.style.backgroundColor = 'transparent';
const adress = window.location.href;

const buttonsCheck = adress.split('#')[1];
const lev2Check = buttonsCheck.split('-')[1];
if(lev2Check == 'true'){
  lev2.disabled = false;
  lev2.style.backgroundColor = 'gold';
}


goBack.addEventListener('click',function(){
  location.assign('index.html');
});

lev1.addEventListener('click',function(){
  location.assign('lev1.html');
});
lev2.addEventListener('click',function(){
  location.assign('lev2.html');
});