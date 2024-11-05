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

function removeItem(index, quantity) {
    if (items[index].quantity > quantity) {
        items[index].quantity -= quantity;
    } else {
        items.splice(index, 1);
    }
    updateItemList();
}

function updateItemList() {
    let itemList = document.getElementById('item-list');
    itemList.innerHTML = '';

    items.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;

        let removeQuantityInput = document.createElement('input');
        removeQuantityInput.type = 'number';
        removeQuantityInput.min = '1';
        removeQuantityInput.placeholder = 'Qtd a Remover';

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Apagar';
        deleteButton.onclick = () => {
            let quantityToRemove = parseInt(removeQuantityInput.value);
            if (!isNaN(quantityToRemove) && quantityToRemove > 0) {
                removeItem(index, quantityToRemove);
            } else {
                alert('Por favor, insira uma quantidade válida para remover.');
            }
        };

        listItem.appendChild(removeQuantityInput);
        listItem.appendChild(deleteButton);
        itemList.appendChild(listItem);
    });

    updateTotalPrice();
}

function updateTotalPrice() {
    let totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}
