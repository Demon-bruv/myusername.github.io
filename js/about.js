function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.icon');

    // Close others if you want only one open at a time (Apple style)
    document.querySelectorAll('.accordion-content').forEach(item => {
        if (item !== content) {
            item.style.maxHeight = null;
            item.previousElementSibling.querySelector('.icon').innerText = '+';
        }
    });

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        icon.innerText = '+';
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.innerText = '-';
    }
}