const API_URL = 'http://127.0.0.1:8000/menu';

const tableBody = document.querySelector('#menu-table tbody');
const form = document.getElementById('menu-form');
const cancelBtn = document.getElementById('form-cancel');
const idInput = document.getElementById('item-id');

// Load and render menu items
async function loadMenu() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        
        tableBody.innerHTML = data.map(item => `
            <tr>
                <td>${item.id || ''}</td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>$${item.price}</td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.category}</td>
                <td class="${item.signature ? 'signature-true' : 'signature-false'}">${item.signature ? '✔' : '✖'}</td>
                <td>
                    <button class="action-btn edit" data-id="${item.id || ''}">Edit</button>
                    <button class="action-btn delete" data-id="${item.id || ''}">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading menu:', error);
        alert('Error loading menu items. Please refresh the page.');
    }
}

// Reset form
function resetForm() {
    form.reset();
    idInput.value = '';
}

// Add or update menu item
form.onsubmit = async (e) => {
    e.preventDefault();
    const id = idInput.value.trim();
    const item = {
        name: form.name.value,
        description: form.description.value,
        price: parseFloat(form.price.value),
        image: form.image.value,
        category: form.category.value,
        signature: form.signature.checked
    };

    try {
        if (id) {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            });
        } else {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            });
            const data = await response.json();
            if (!data.id) throw new Error('No ID returned from server');
        }
        await loadMenu();
        resetForm();
    } catch (error) {
        console.error('Error saving menu item:', error);
        alert('Error saving menu item. Please try again.');
    }
};

cancelBtn.onclick = resetForm;

// Handle Edit & Delete buttons
tableBody.onclick = async (e) => {
    if (e.target.classList.contains('edit')) {
        const id = e.target.dataset.id;
        const res = await fetch(API_URL);
        const data = await res.json();
        const item = data.find(i => String(i.id) === String(id));
        if (item) {
            idInput.value = item.id;
            form.name.value = item.name;
            form.description.value = item.description;
            form.price.value = item.price;
            form.image.value = item.image;
            form.category.value = item.category;
            form.signature.checked = !!item.signature;
        }
    }

    if (e.target.classList.contains('delete')) {
        const id = e.target.dataset.id;
        if (!id) {
            console.error('No ID found for delete operation');
            return;
        }
        if (confirm('Delete this item?')) {
            try {
                const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                await loadMenu();
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Error deleting item. Please try again.');
            }
        }
    }
};

// Initial load
loadMenu();
