const form = document.getElementById('inputForm');
const submittedDataDiv = document.getElementById('submittedData');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
        alert('Please complete the CAPTCHA.');
        return;
    }

    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    if (!validateName(name)) {
        alert('Please enter a valid name.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const formData = new FormData(form);

    try {
        const response = await fetch('/level5/submit', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.text();
            submittedDataDiv.innerHTML = data;
        } else {
            throw new Error('Failed to submit form data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function validateName(name) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
}
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
