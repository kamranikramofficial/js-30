const checkboxes = document.querySelectorAll('.checkbox');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const text = checkbox.nextElementSibling.nextElementSibling;
    if (checkbox.checked) {
      text.classList.add('line-through');
    } else {
      text.classList.remove('line-through');
    }
  });
});
