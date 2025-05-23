// ✅ Supabase Client
const supabase = window.supabase.createClient(
    'https://ckplqzcvhfxtwuqxthlo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrcGxxemN2aGZ4dHd1cXh0aGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MjY3NTcsImV4cCI6MjA2MzMwMjc1N30.Q65OhLTaD4jMNSHCXGhrDNdjCYwXbp185jkF_C5Lgvw'
  );
  
  // ✅ DOM Elements
  const API_URL = 'http://127.0.0.1:8000/menu';
  
  const loginForm = document.getElementById('login-form');
  const loginWrapper = document.getElementById('login-wrapper');
  const adminDashboard = document.getElementById('admin-dashboard');
  const logoutBtn = document.getElementById('logout-btn');
  
  const tableBody = document.querySelector('#menu-table tbody');
  const form = document.getElementById('menu-form');
  const cancelBtn = document.getElementById('form-cancel');
  const idInput = document.getElementById('item-id');
  
  // ✅ Init view
  adminDashboard.style.display = 'none';
  logoutBtn.style.display = 'none';
  
  // ✅ Login logic
  async function loginWithSupabase(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Login failed: ' + error.message);
      return false;
    }
    return true;
  }
  
  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
  
    const success = await loginWithSupabase(email, password);
    if (success) {
      loginWrapper.style.display = 'none';
      adminDashboard.style.display = 'block';
      logoutBtn.style.display = 'inline-block';
      loadMenu();
    }
  });
  
  // ✅ Logout
  logoutBtn?.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      adminDashboard.style.display = 'none';
      loginWrapper.style.display = 'block';
      logoutBtn.style.display = 'none';
    } else {
      alert('Logout failed: ' + error.message);
    }
  });
  
  // ✅ Load menu
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
  
  // ✅ Reset form
  function resetForm() {
    form.reset();
    idInput.value = '';
  }
  
  cancelBtn.onclick = resetForm;
  
  // ✅ Save menu item
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
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        const data = await res.json();
        if (!data.id) throw new Error('No ID returned from server');
      }
      await loadMenu();
      resetForm();
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert('Error saving menu item. Please try again.');
    }
  };
  
  // ✅ Edit / Delete handlers
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
      if (!id) return;
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
  