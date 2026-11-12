(function(){
  var b=document.querySelector('.burger'),m=document.querySelector('.mobile');
  if(b&&m){b.addEventListener('click',function(){m.classList.toggle('open')});
    m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){m.classList.remove('open')})})}
  var f=document.getElementById('contact-form');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(f),en=document.documentElement.lang==='en';
    var subject=encodeURIComponent((en?'Inquiry from website – ':'Consulta desde el sitio web – ')+d.get('name'));
    var lines=[(en?'Name: ':'Nombre: ')+d.get('name'),(en?'Email: ':'Correo: ')+d.get('email'),
      (en?'Country: ':'País: ')+d.get('country'),(en?'Interest: ':'Interés: ')+d.get('interest'),'',d.get('message')];
    window.location.href='mailto:actiboknegocios@gmail.com?subject='+subject+'&body='+encodeURIComponent(lines.join('\n'));
  })}
})();
(function(){
  var c=document.getElementById('calc');if(!c)return;
  var en=document.documentElement.lang==='en';
  function f(n){return '$'+n.toLocaleString(en?'en-US':'es-SV',{minimumFractionDigits:2,maximumFractionDigits:2})}
  function u(){
    var inc=parseFloat(c.income.value)||0,exp=parseFloat(c.expenses.value)||0,
        iva=parseFloat(c.iva.value)||0,isr=parseFloat(c.isr.value)||0;
    var ivaAmt=inc*iva/100,base=Math.max(inc-exp,0),isrAmt=base*isr/100;
    document.getElementById('r-iva').textContent=f(ivaAmt);
    document.getElementById('r-base').textContent=f(base);
    document.getElementById('r-isr').textContent=f(isrAmt);
    document.getElementById('r-tot').textContent=f(ivaAmt+isrAmt);
  }
  c.addEventListener('input',u);u();
})();
