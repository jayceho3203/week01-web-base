const API_URL = 'http://127.0.0.1:8000/menu';

let name = 'Jayce Restaurant';
const year = 2003;
let isOpen = true;
let menuItems = [];

function greet() {
    let message = `Welcome to ${name}, established in ${year}!`;
    console.log(message);
}

async function fetchMenu() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        menuItems = data;
        renderMenuCards('all'); // mặc định hiển thị tất cả
    } catch (error) {
        console.error('Error loading menu:', error);
        alert('Error loading menu items. Please refresh the page.');
    }
}

function renderMenuCards(filter = 'all') {
    const menuContainer = document.getElementById('menu-items');
    if (!menuContainer) return;

    let filteredItems = [...menuItems];

    if (filter !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === filter);
    } else {
        filteredItems.sort((a, b) => Number(b.signature) - Number(a.signature)); // ưu tiên signature
    }

    if (filteredItems.length === 0) {
        menuContainer.innerHTML = `<p style="text-align:center; color: gray;">No items found for this category.</p>`;
        return;
    }

    menuContainer.innerHTML = filteredItems.map(item => `
        <div class="menu__item">
            <img src="${item.image}" alt="${item.name}" class="menu__item-image">
            <h3 class="menu__item-title">
                ${item.name} ${item.signature ? '<span style="color:orange;">★</span>' : ''}
            </h3>
            <p class="menu__item-description">${item.description}</p>
            <p class="menu__item-price">$${item.price}</p>
        </div>
    `).join('');
}

// Bắt sự kiện click trên các tab
document.addEventListener('DOMContentLoaded', () => {
    greet();
    fetchMenu();

    // Add smooth scroll for logo click
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const tabs = document.querySelectorAll('.menu-tab-btn');
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            renderMenuCards(filter);
        });
    });
});
