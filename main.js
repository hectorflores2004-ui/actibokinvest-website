(function(){
  var b=document.querySelector('.burger'),m=document.querySelector('.mobile');
  if(b&&m){b.addEventListener('click',function(){m.classList.toggle('open')});
    m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){m.classList.remove('open')})})}
  // Pegue aquí la dirección de Formspree, p. ej. 'https://formspree.io/f/xxxxxxxx'.
  // Si queda vacía, el formulario abre el correo del visitante como respaldo.
  var FORM_ENDPOINT='https://formspree.io/f/xjywkerb';
  var f=document.getElementById('contact-form');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(f),en=document.documentElement.lang==='en';
    var st=document.getElementById('form-status'),btn=f.querySelector('button[type=submit]');
    function say(msg,ok){if(st){st.textContent=msg;st.className='form-status '+(ok?'ok':'err');if(st.scrollIntoView)st.scrollIntoView({block:'center',behavior:'smooth'})}}
    var T=en?{sending:'Sending…',ok:'Thank you! We received your inquiry and will reply within one business day.',err:'We could not send your message. Please try again or write to actiboknegocios@gmail.com.'}
            :{sending:'Enviando…',ok:'¡Gracias! Recibimos su consulta y le responderemos en un día hábil.',err:'No pudimos enviar su mensaje. Inténtelo de nuevo o escriba a actiboknegocios@gmail.com.'};
    if(d.get('_gotcha'))return;
    if(!FORM_ENDPOINT){
      var subject=encodeURIComponent((en?'Inquiry from website – ':'Consulta desde el sitio web – ')+d.get('name'));
      var lines=[(en?'Name: ':'Nombre: ')+d.get('name'),(en?'Email: ':'Correo: ')+d.get('email'),
        (en?'Country: ':'País: ')+d.get('country'),(en?'Interest: ':'Interés: ')+d.get('interest'),'',d.get('message')];
      window.location.href='mailto:actiboknegocios@gmail.com?subject='+subject+'&body='+encodeURIComponent(lines.join('\n'));
      return;
    }
    d.append('_subject',(en?'Website inquiry – ':'Consulta del sitio web – ')+d.get('name'));
    d.append('_language',en?'en':'es');
    btn.disabled=true;say(T.sending,true);
    fetch(FORM_ENDPOINT,{method:'POST',body:d,headers:{'Accept':'application/json'}})
      .then(function(r){if(!r.ok)throw new Error(r.status);f.reset();say(T.ok,true)})
      .catch(function(){say(T.err,false)})
      .then(function(){btn.disabled=false});
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
