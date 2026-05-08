// NO IMPORT COMMAND HERE

// --- DOM ELEMENTS ---
const directoryList = document.getElementById('directoryList');
const searchInput = document.getElementById('searchInput');
const locationFilter = document.getElementById('locationFilter');

// --- 1. POPULATE THE LOCATION DROPDOWN ---
function populateLocations() {
    const locations = [...new Set(friendsDatabase.map(friend => friend.met))];
    
    locations.forEach(loc => {
        const option = document.createElement('option');
        option.value = loc;
        option.textContent = loc;
        locationFilter.appendChild(option);
    });
}

// --- 2. RENDER THE APPLE-STYLE DIRECTORY ---
function renderDirectory(data) {
    directoryList.innerHTML = ""; 

    if (data.length === 0) {
        directoryList.innerHTML = `<p style="color: #888; text-align: center; padding: 2rem;">No matching records found.</p>`;
        return;
    }

    data.forEach(friend => {
        const card = document.createElement('div');
        card.className = 'friend-card';
        
        card.innerHTML = `
            <div class="card-header">
                <div class="name-group">
                    <h2 class="name">${friend.name}</h2>
                    <span class="alias">"${friend.aliases[0] || 'No alias'}"</span>
                </div>
                <div class="toggle-icon">+</div>
            </div>
            <div class="card-details">
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Status</span>
                        <span class="detail-value">${friend.status}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Phone</span>
                        <span class="detail-value">${friend.phone}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Age</span>
                        <span class="detail-value">${friend.age}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Origin</span>
                        <span class="detail-value">Met at ${friend.met}</span>
                    </div>
                    <div class="detail-item full-width">
                        <span class="detail-label">Aliases</span>
                        <span class="detail-value">${friend.aliases.join(', ')}</span>
                    </div>
                    <div class="detail-item full-width">
                        <span class="detail-label">Notes</span>
                        <span class="detail-value">${friend.details}</span>
                    </div>
                </div>
            </div>
        `;

        const header = card.querySelector('.card-header');
        header.addEventListener('click', () => {
            document.querySelectorAll('.friend-card.active').forEach(activeCard => {
                if(activeCard !== card) activeCard.classList.remove('active');
            });
            card.classList.toggle('active');
        });

        directoryList.appendChild(card);
    });
}

// --- 3. FILTER & SEARCH LOGIC ---
function filterData() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedLocation = locationFilter.value;

    const filtered = friendsDatabase.filter(friend => {
        const matchesSearch = friend.name.toLowerCase().includes(searchTerm) || 
                              friend.aliases.some(alias => alias.toLowerCase().includes(searchTerm));
        
        const matchesLocation = selectedLocation === "All" || friend.met === selectedLocation;

        return matchesSearch && matchesLocation;
    });

    renderDirectory(filtered);
}

// Listen for typing and dropdown changes
searchInput.addEventListener('input', filterData);
locationFilter.addEventListener('change', filterData);

// --- INITIALIZE ---
populateLocations();
renderDirectory(friendsDatabase);