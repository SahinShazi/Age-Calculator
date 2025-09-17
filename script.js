document.addEventListener('DOMContentLoaded', function() {
  // Set max date to today
  const today = new Date();
  const maxDate = today.toISOString().split('T')[0];
  document.getElementById('dob').setAttribute('max', maxDate);
  
  // Calculate button event
  document.getElementById('calculate-btn').addEventListener('click', calculateAge);
  
  function calculateAge() {
    const dobInput = document.getElementById('dob').value;
    const errorMsg = document.getElementById('error-msg');
    const resultDiv = document.getElementById('result');
    const yearsElement = document.getElementById('years');
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');
    const birthdayText = document.getElementById('birthday-text');
    
    // Reset
    errorMsg.classList.remove('show');
    
    // Validate input
    if (!dobInput) {
      errorMsg.textContent = 'Please select your date of birth';
      errorMsg.classList.add('show');
      return;
    }
    
    const dob = new Date(dobInput);
    const today = new Date();
    
    if (dob > today) {
      errorMsg.textContent = 'Future date entered. Please select a date in the past.';
      errorMsg.classList.add('show');
      return;
    }
    
    // Calculate age
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();
    
    if (days < 0) {
      months--;
      // Get days in the previous month
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    // Animate counting up
    animateValue(yearsElement, 0, years, 1000);
    animateValue(monthsElement, 0, months, 1000);
    animateValue(daysElement, 0, days, 1000);
    
    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilBirthday === 0) {
      birthdayText.textContent = '🎉 Happy Birthday! 🎉';
    } else if (daysUntilBirthday === 1) {
      birthdayText.textContent = 'Only 1 day until your next birthday!';
    } else {
      birthdayText.textContent = `${daysUntilBirthday} days until your next birthday!`;
    }
    
    // Show result with animation
    resultDiv.classList.add('show');
  }
  
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
});