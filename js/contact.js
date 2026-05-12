
const titleElement = document.getElementById('animated-title');
const words = ["HELLO", "CONTACT ME", "WHATS UP GNG??"];
let wordIndex = 0;

if (titleElement) {
    setInterval(() => {
        wordIndex = (wordIndex + 1) % words.length;
        titleElement.innerText = words[wordIndex];
    }, 800);
}

//UI toGGLE
function toggleRelation() {
    const relation = document.getElementById('userRelation').value;
    document.getElementById('friend-group').style.display = (relation === 'Friend') ? 'block' : 'none';
    document.getElementById('relative-group').style.display = (relation === 'Relative') ? 'block' : 'none';
}

function toggleContact() {
    const method = document.getElementById('contactMethod').value;
    document.getElementById('email-group').style.display = (method === 'Email') ? 'block' : 'none';
    document.getElementById('phone-group').style.display = (method === 'Phone') ? 'block' : 'none';
}

//frwd LOGIC
function forwardMessage() {
    const name = document.getElementById('userName').value || "Someone";
    const relation = document.getElementById('userRelation').value;
    let specificRelation = "";
    
    if (relation === "Friend") {
        specificRelation = document.getElementById('friendStatus').value;
    } else if (relation === "Relative") {
        specificRelation = document.getElementById('relativeStatus').value;
    }

    const method = document.getElementById('contactMethod').value;
    const email = document.getElementById('userEmail').value;
    const phone = document.getElementById('userPhone').value;
    const msg = document.getElementById('userMessage').value;

    // Check if message is empty
    if (!msg) {
        alert("Please write a message first!");
        return;
    }

    let finalMessage = `New message from ${name}!\n`;
    finalMessage += `Relation: ${relation} (${specificRelation})\n`;
    
    if (method === "Email") {
        finalMessage += `Their Email: ${email}\n\n`;
    } else if (method === "Phone") {
        finalMessage += `Their Phone: ${phone}\n\n`;
    }

    finalMessage += `Message:\n${msg}`;
    const encodedMessage = encodeURIComponent(finalMessage);

    if (method === "Email") {
        window.location.href = `mailto:baig.121807@gmail.com?subject=Portfolio Contact: ${name}&body=${encodedMessage}`;
        showSuccessScreen();
    } else if (method === "Phone") {
        window.location.href = `sms:+918885808266?&body=${encodedMessage}`;
        showSuccessScreen();
    } else {
        alert("Please select a mode of contact before sending!");
    }
}

function showSuccessScreen() {
    const overlay = document.getElementById('successScreen');
    overlay.classList.add('active');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}

