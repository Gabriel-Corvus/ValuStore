let users = [];
let items = [];

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    let user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('Login bem-sucedido!');
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('item-section').style.display = 'block';
    } else {
        alert('Usuário ou senha incorretos.');
    }
}

function register() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    if (username && password) {
        users.push({ username, password });
        alert('Registro bem-sucedido!');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function addItem() {
    let itemName = document.getElementById('item-name').value;
    let itemPrice = document.getElementById('item-price').value;
    let itemQuantity = document.getElementById('item-quantity').value;

    if (itemName && itemPrice && itemQuantity) {
        let item = { name: itemName, price: parseFloat(itemPrice), quantity: parseInt(itemQuantity) };
        items.push(item);
        updateItemList();
        document.getElementById('item-name').value = '';
        document.getElementById('item-price').value = '';
        document.getElementById('item-quantity').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function updateItemList() {
    let itemList = document.getElementById('item-list');
    itemList.innerHTML = '';

    items.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Apagar';
        deleteButton.onclick = () => {
            items.splice(index, 1);
            updateItemList();
        };
        
        listItem.appendChild(deleteButton);
        itemList.appendChild(listItem);
    });
    
    updateTotalPrice();
}

function updateTotalPrice() {
    let totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}
