const folderPath = "images/songs_img/";

const originalFiles = [];
for (let i = 3192; i <= 3252; i++) {
    originalFiles.push("IMG_" + i + ".PNG"); 
}

const infiniteFiles = [...originalFiles, ...originalFiles, ...originalFiles];

const carousel = document.getElementById('albumCarousel');
const scrollContainer = document.getElementById('scrollContainer');
const searchInput = document.getElementById('searchInput');
const scrollFill = document.getElementById('scrollFill');

const focusModal = document.getElementById('focusModal');
const focusImage = document.getElementById('focusImage');

function renderGallery(filesToRender) {
    carousel.innerHTML = ""; 
    
    if (filesToRender.length === 0) {
        carousel.innerHTML = `<h2 style="color: rgba(255,255,255,0.5); font-weight: 400; font-style: italic;">No images found...</h2>`;
        return;
    }

    filesToRender.forEach(filename => {
        const card = document.createElement('div');
        card.className = 'album-card';
        
        const fullImagePath = folderPath + filename;
        
        card.innerHTML = `<img src="${fullImagePath}" alt="${filename}" onerror="this.parentElement.style.display='none'">`;
        
        card.onclick = () => openFocus(fullImagePath);
        
        carousel.appendChild(card);
    });

    setTimeout(() => {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
    }, 100);
}

function openFocus(imageSrc) {
    focusImage.src = imageSrc;
    focusModal.classList.add('active');
}

function closeFocus() {
    focusModal.classList.remove('active');
    setTimeout(() => { focusImage.src = ""; }, 400); 
}

scrollContainer.addEventListener('scroll', () => {
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const currentScroll = scrollContainer.scrollLeft;
    const percentage = (currentScroll / maxScroll) * 100;
    
    scrollFill.style.width = `${percentage}%`;

    if (currentScroll <= 0) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
    }
    if (currentScroll >= maxScroll - 5) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
    }
});

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if(searchTerm === "") {
            renderGallery(infiniteFiles);
            return;
        }

        const filteredFiles = originalFiles.filter(filename => {
            return filename.toLowerCase().includes(searchTerm);
        });
        
        renderGallery(filteredFiles);
    });
}
renderGallery(infiniteFiles);
