/* Mundo Gambito — landing
   Envío del formulario de leads a Formspree sin recargar la página.
   Si JavaScript está desactivado, el form se envía igual de forma nativa
   y Formspree muestra su propia pantalla de confirmación. */

(function () {
  'use strict';

  var form = document.getElementById('signupForm');
  if (!form) return;

  var successBox = document.getElementById('successBox');
  var successEmail = document.getElementById('successEmail');
  var errorNote = document.getElementById('errorNote');
  var submitBtn = form.querySelector('.signup-submit');
  var planField = document.getElementById('plan');

  function showError(msg) {
    errorNote.textContent = msg;
    errorNote.classList.add('visible');
  }

  function clearError() {
    errorNote.textContent = '';
    errorNote.classList.remove('visible');
  }

  // Los botones "Quiero este plan" dejan registrado qué plan miraba el visitante.
  Array.prototype.forEach.call(document.querySelectorAll('[data-plan]'), function (btn) {
    btn.addEventListener('click', function () {
      if (planField) planField.value = btn.getAttribute('data-plan');
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // El endpoint todavía no se configuró: no hay a dónde enviar.
    if (form.action.indexOf('PEGAR_ENDPOINT') !== -1) {
      showError('Falta pegar el endpoint de Formspree en el atributo action del formulario, en public/index.html.');
      return;
    }

    clearError();

    var email = document.getElementById('email').value;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          successEmail.textContent = email;
          form.style.display = 'none';
          successBox.style.display = 'block';
          successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
        return res.json().then(function (data) {
          var detalle = data && data.errors && data.errors.length
            ? data.errors.map(function (x) { return x.message; }).join(' ')
            : 'No pudimos registrar tus datos.';
          throw new Error(detalle);
        });
      })
      .catch(function (err) {
        showError(err.message + ' Probá de nuevo o escribinos por mail.');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sumarme a la prueba';
      });
  });
})();
