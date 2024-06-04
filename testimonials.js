const host = "http://127.0.0.1:8080";
const testimonialsContainer = document.querySelector(".testimonials-container");

// Function to fetch and render testimonials
function getTestimonials() {
    axios.get(`${host}/testimonials`)
        .then(response => {
            console.log(response.data);
            renderTestimonials(response.data.todos); // Ensure this matches the FastAPI response structure
        })
        .catch(error => {
            console.error('Error fetching testimonials:', error);
        });
}

// Function to render testimonials
function renderTestimonials(testimonials) {
    testimonialsContainer.innerHTML = ''; // Clear the container
    testimonials.forEach(testimonial => {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.classList.add('testimonial-item');
        testimonialDiv.innerHTML = `
            <div class="testimonial-content">
                <p>${testimonial.text}</p>
                <span class="testimonial-author">- ${testimonial.author}</span>
                <span class="testimonial-date">${testimonial.date}</span>
            </div>
        `;
        
        // Create and append delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'x';
        deleteBtn.addEventListener('click', function () {
            deleteTestimonial(testimonial.id);
        });
        
        testimonialDiv.appendChild(deleteBtn);
        testimonialsContainer.appendChild(testimonialDiv);
    });
}

// Function to add a testimonial
function addTestimonial() {
    const testimonialInput = document.querySelector('.testimonial-input');
    const authorInput = document.querySelector('.author-input');
    const text = testimonialInput.value.trim();
    const author = authorInput.value.trim();
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    
    if (text === '' || author === '') return;
    const uniqueId = Math.floor(Date.now() / 1000);

    let testimonialData = {
        id: uniqueId, // Assuming the backend assigns an ID
        text: text,
        date: date,
        author: author
    };

    axios.post(`${host}/testimonials`, testimonialData)
        .then(response => {
            testimonialInput.value = '';
            authorInput.value = '';
            getTestimonials();
        })
        .catch(error => {
            console.error('Error adding testimonial:', error);
        });
}

// Function to delete a testimonial
function deleteTestimonial(testimonialId) {
    axios.delete(`${host}/testimonial/${testimonialId}`) // Ensure the endpoint matches the FastAPI route
        .then(function (response) {
            console.log('Testimonial deleted:', response.data);
            getTestimonials();
        })
        .catch(function (error) {
            console.error('Error deleting testimonial:', error);
        });
}

// Ensure event listeners are added only once
document.addEventListener('DOMContentLoaded', function () {
    getTestimonials();
});


