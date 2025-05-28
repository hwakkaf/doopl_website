document.querySelectorAll('.select-button').forEach(sb => {
  sb.addEventListener('click', function() {
    const select = this.parentElement;
    const optionsList = select.querySelector('.select-options');
    
    // Toggle active state
    select.classList.toggle('active');
    
    if (select.classList.contains('active')) {
      // Calculate space below and above
      const buttonRect = this.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      const optionsHeight = optionsList.scrollHeight;
      
      // Check if there's enough space below (with 10px buffer)
      if (spaceBelow < optionsHeight + 10 && spaceAbove >= optionsHeight + 10) {
        optionsList.classList.add('above');
      } else {
        optionsList.classList.remove('above');
      }
    }

    // Close when clicking outside
    document.addEventListener('click', function closeSelect(e) {
      if (!select.contains(e.target)) {
        select.classList.remove('active');
        document.removeEventListener('click', closeSelect);
      }
    });
  })
});

// Option selection (unchanged)
document.querySelectorAll('.select-option').forEach(option => {
  option.addEventListener('click', function(e) {
    e.preventDefault();
    const select = this.closest('.doopl-select');
    const button = select.querySelector('.select-button');
    
    button.querySelector('.select-text').textContent = this.textContent;
    select.classList.remove('active');
  });
});
