const form = document.getElementById('inputForm');
const submittedDataDiv = document.getElementById('submittedData');

form.addEventListener('submit', async (event) => {
    console.log('Script loaded');
    event.preventDefault();
    console.log('Form submitted');

    const formData = new FormData(form);

    try {
        const response = await fetch('/level1/submit', {
            method: 'POST',
            body: formData
        });
        console.log('Fetch request complete');

        if (response.ok) {
            const data = await response.text();
            console.log('Response data:', data);
            submittedDataDiv.innerHTML = data;
        } else {
            throw new Error('Failed to submit form data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
