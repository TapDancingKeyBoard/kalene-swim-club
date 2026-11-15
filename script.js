// Mobile menu
var menuBtn = document.querySelector('.menu-btn');
var menu = document.querySelector('.nav ul');
if (menuBtn) {
  menuBtn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
}

// Footer year
var y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

// Forms: build a message and open Facebook Messenger to the club's page
var MESSENGER = 'https://m.me/Kaleneswimclub';

document.querySelectorAll('form[data-messenger]').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var err = form.querySelector('.err');
    if (!form.checkValidity()) {
      if (err) err.textContent = 'Please fill in the required fields.';
      form.reportValidity();
      return;
    }
    if (err) err.textContent = '';

    var lines = [form.dataset.messenger];
    form.querySelectorAll('input, select, textarea').forEach(function (f) {
      if (f.value.trim()) lines.push(f.dataset.label + ': ' + f.value.trim());
    });
    var text = lines.join('\n');

    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(function () {});
    window.open(MESSENGER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');

    var sent = form.parentElement.querySelector('.sent');
    if (sent) sent.classList.add('show');
    form.reset();
  });
});
