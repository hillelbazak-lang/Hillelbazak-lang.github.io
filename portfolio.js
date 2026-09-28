// Load portfolio data from config.json
fetch('config.json')
    .then(response => response.json())
    .then(data => {
        populatePortfolio(data);
    })
    .catch(error => console.error('Error loading portfolio data:', error));

function populatePortfolio(config) {
    // Set about text
    document.getElementById('aboutText').textContent = config.aboutText;
    
    // Set contact info
    document.getElementById('contactEmail').href = `mailto:${config.contactEmail}`;
    document.getElementById('contactEmail').textContent = config.contactEmail;
    
    const instagramLink = document.getElementById('contactInstagram');
    instagramLink.href = config.instagramUrl;
    instagramLink.textContent = config.instagramHandle;
    
    // Populate gallery
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';
    
    config.paintings.forEach(painting => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        galleryItem.innerHTML = `
            <img src="${painting.image}" alt="${painting.title}" />
            <div class="gallery-item-info">
                <h3>${painting.title}</h3>
                <p>${painting.description}</p>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openModal(painting));
        galleryGrid.appendChild(galleryItem);
    });
}

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

function openModal(painting) {
    modal.style.display = 'block';
    modalImage.src = painting.image;
    captionText.innerHTML = `
        <h3>${painting.title}</h3>
        <p>${painting.description}</p>
        ${painting.year ? `<p><strong>Year:</strong> ${painting.year}</p>` : ''}
        ${painting.medium ? `<p><strong>Medium:</strong> ${painting.medium}</p>` : ''}
        ${painting.dimensions ? `<p><strong>Dimensions:</strong> ${painting.dimensions}</p>` : ''}
    `;
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.style.display = 'none';
    }
});
