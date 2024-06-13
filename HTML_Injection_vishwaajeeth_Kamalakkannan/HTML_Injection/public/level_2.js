const form = document.getElementById('inputForm');
const submittedDataDiv = document.getElementById('submittedData');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    console.log([...formData.entries()]);

    try {
        const response = await fetch('/level2/submit', {
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



