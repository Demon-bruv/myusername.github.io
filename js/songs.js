// 1. THE EXACT FOLDER PATH
const folderPath = "images/songs_img/";

// 2. GENERATE YOUR EXACT FILE NAMES (3192 to 3252 .PNG)
const originalFiles = [];
for (let i = 3192; i <= 3252; i++) {
    originalFiles.push("IMG_" + i + ".PNG"); 
}

// THE INFINITE LOOP TRICK: Copy the list 3 times so it feels endless
const infiniteFiles = [...originalFiles, ...originalFiles, ...originalFiles];

// 3. DOM ELEMENTS
const carousel = document.getElementById('albumCarousel');
const scrollContainer = document.getElementById('scrollContainer');
const searchInput = document.getElementById('searchInput');
const scrollFill = document.getElementById('scrollFill');

const focusModal = document.getElementById('focusModal');
const focusImage = document.getElementById('focusImage');

// 4. RENDER THE GALLERY
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
        
        // Added onclick event to trigger the Focus mode!
        card.innerHTML = `<img src="${fullImagePath}" alt="${filename}" onerror="this.parentElement.style.display='none'">`;
        
        card.onclick = () => openFocus(fullImagePath);
        
        carousel.appendChild(card);
    });

    // Start user in the exact middle of the duplicated list for the infinite loop illusion
    setTimeout(() => {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
    }, 100);
}

// 5. CLICK-TO-FOCUS LOGIC
function openFocus(imageSrc) {
    focusImage.src = imageSrc;
    focusModal.classList.add('active');
}

function closeFocus() {
    focusModal.classList.remove('active');
    setTimeout(() => { focusImage.src = ""; }, 400); // Clear after animation
}

// 6. SCROLL PROGRESS BAR & INFINITE LOOP LOGIC
scrollContainer.addEventListener('scroll', () => {
    // Math for the Progress Bar
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const currentScroll = scrollContainer.scrollLeft;
    const percentage = (currentScroll / maxScroll) * 100;
    
    scrollFill.style.width = `${percentage}%`;

    // The Infinite Teleporting Trick
    // If they scroll to the very beginning, teleport them to the middle clone
    if (currentScroll <= 0) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
    }
    // If they scroll to the very end, teleport them back to the middle clone
    if (currentScroll >= maxScroll - 5) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
    }
});

// 7. SEARCH FUNCTION (Searches the original list to prevent endless duplicates)
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // If search is empty, go back to infinite looping mode
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

// RUN IT (Using the triple-length list for looping)
renderGallery(infiniteFiles);