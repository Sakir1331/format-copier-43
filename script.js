// البيانات الأساسية
let products = [
    {
        id: "1",
        name: "فستق مالح",
        type: "كرتون",
        quantity: 3,
        bags: 2,
        size: 12,
    },
    {
        id: "2",
        name: "فستق ليمون",
        type: "كرتون",
        quantity: 5,
        bags: 2,
        size: 12,
    }
];

// تحميل البيانات من التخزين المحلي
function loadProducts() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }
    renderProducts();
}

// حفظ البيانات في التخزين المحلي
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// عرض الإشعار
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// عرض المنتجات في الجدول
function renderProducts() {
    const tbody = document.getElementById('productsBody');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.name}</td>
            <td>${product.type}</td>
            <td>${product.quantity}</td>
            <td>${product.bags}</td>
            <td>${product.size || ''}</td>
            <td>
                <button class="edit-btn" onclick="editProduct('${product.id}')">تعديل</button>
                <button class="delete-btn" onclick="deleteProduct('${product.id}')">حذف</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// إضافة منتج جديد
function addProduct() {
    const newProduct = {
        id: Date.now().toString(),
        name: prompt('أدخل اسم المنتج:') || '',
        type: prompt('أدخل نوع المنتج (كرتون/كيس/شوال):') || 'كرتون',
        quantity: parseInt(prompt('أدخل الكمية:')) || 0,
        bags: parseInt(prompt('أدخل عدد الأكياس:')) || 0,
        size: parseInt(prompt('أدخل الحجم:')) || 12
    };

    if (newProduct.name) {
        products.push(newProduct);
        saveProducts();
        renderProducts();
        showToast('تم إضافة المنتج بنجاح');
    }
}

// تعديل منتج
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.name = prompt('أدخل اسم المنتج:', product.name) || product.name;
        product.type = prompt('أدخل نوع المنتج:', product.type) || product.type;
        product.quantity = parseInt(prompt('أدخل الكمية:', product.quantity)) || product.quantity;
        product.bags = parseInt(prompt('أدخل عدد الأكياس:', product.bags)) || product.bags;
        product.size = parseInt(prompt('أدخل الحجم:', product.size)) || product.size;

        saveProducts();
        renderProducts();
        showToast('تم تعديل المنتج بنجاح');
    }
}

// حذف منتج
function deleteProduct(id) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        renderProducts();
        showToast('تم حذف المنتج بنجاح');
    }
}

// ترتيب المنتجات حسب الاسم
function sortByName() {
    products.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    renderProducts();
    showToast('تم الترتيب حسب الاسم');
}

// ترتيب المنتجات حسب الكمية
function sortByQuantity() {
    products.sort((a, b) => b.quantity - a.quantity);
    renderProducts();
    showToast('تم الترتيب حسب الكمية');
}

// نسخ النص
function copyText() {
    const text = products.map(product => {
        let text = product.name;
        if (product.quantity > 0) {
            text += ` ${product.quantity} ${product.type}`;
            if (product.bags > 0) {
                text += ` و ${product.bags} ${product.bags > 10 ? "اكياس" : "كيس"}`;
            }
        } else if (product.bags > 0) {
            text += ` ${product.bags} ${product.bags > 10 ? "اكياس" : "كيس"}`;
        }
        if (product.size) {
            text += ` رقم ${product.size}`;
        }
        return text;
    }).join('\n');

    navigator.clipboard.writeText(text);
    showToast('تم نسخ النص بنجاح');
}

// إضافة مستمعي الأحداث
document.getElementById('addProduct').addEventListener('click', addProduct);
document.getElementById('sortByName').addEventListener('click', sortByName);
document.getElementById('sortByQuantity').addEventListener('click', sortByQuantity);
document.getElementById('copyText').addEventListener('click', copyText);

// تحميل البيانات عند بدء التطبيق
loadProducts();