// Obtener elementos del DOM
const productForm = document.getElementById('productForm');
const productName = document.getElementById('productName');
const productCategory = document.getElementById('productCategory');
const productPrice = document.getElementById('productPrice');
const productList = document.getElementById('productList');

const viewAllBtn = document.getElementById('viewAll');
const filterUnder100Btn = document.getElementById('filterUnder100');
const searchZapatillasBtn = document.getElementById('searchZapatillas');
const searchChombaBtn = document.getElementById('searchChomba');

// Función para obtener los productos del localStorage
const getProductsFromStorage = () => {
    return JSON.parse(localStorage.getItem('products')) || [];
};

// Función para guardar productos en localStorage
const saveProductsToStorage = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
};

// Función para renderizar productos
const renderProducts = (products) => {
    productList.innerHTML = '';
    products.forEach(({ name, category, price }) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${name}</h3>
            <p>Categoria: ${category}</p>
            <p>Precio: $${price}</p>
        `;
        productList.appendChild(productDiv);
    });
};

// Función para agregar producto
const addProduct = (e) => {
    e.preventDefault();

    const newProduct = {
        name: productName.value.trim(),
        category: productCategory.value.trim(),
        price: parseFloat(productPrice.value.trim())
    };

    if (!newProduct.name || !newProduct.category || isNaN(newProduct.price)) {
        alert("Todos los campos son requeridos y el precio debe ser un número.");
        return;
    }

    const products = getProductsFromStorage();
    products.push(newProduct);
    saveProductsToStorage(products);

    // Limpiar formulario
    productName.value = '';
    productCategory.value = '';
    productPrice.value = '';

    renderProducts(products);
};

// Eventos para las acciones
viewAllBtn.addEventListener('click', () => {
    const products = getProductsFromStorage();
    renderProducts(products);
});

filterUnder100Btn.addEventListener('click', () => {
    const products = getProductsFromStorage();
    const filteredProducts = products.filter(product => product.price < 100);
    renderProducts(filteredProducts);
});

searchZapatillasBtn.addEventListener('click', () => {
    const products = getProductsFromStorage();
    const filteredProducts = products.filter(product => product.category.toLowerCase() === 'zapatillas');
    renderProducts(filteredProducts);
});

searchChombaBtn.addEventListener('click', () => {
    const products = getProductsFromStorage();
    const filteredProducts = products.filter(product => product.name.toLowerCase() === 'chomba');
    renderProducts(filteredProducts);
});

// Evento de agregar producto
productForm.addEventListener('submit', addProduct);

// Inicializar vista con productos almacenados
document.addEventListener('DOMContentLoaded', () => {
    const products = getProductsFromStorage();
    renderProducts(products);
});
