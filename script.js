const tableBody = document.getElementById("tableBody");

const products = [
  {
    name: "MILLET KANJI MIX 900G",
    mrp: 350,
    rate: 300,
  },
  {
    name: "LITTLE MILLET IDLY-DOSA POWDER 500G",
    mrp: 80,
    rate: 80,
  },
  {
    name: "WHEAT PUTTU PODI 500G",
    mrp: 60,
    rate: 60,
  },
  {
    name: "CORN PUTTU PODI 500G",
    mrp: 70,
    rate: 70,
  },
  {
    name: "NAVARA PUTTU PODI 500G",
    mrp: 90,
    rate: 90,
  },
  {
    name: "RAGI PUTTU PODI 500G",
    mrp: 60,
    rate: 60,
  },
  {
    name: "RAGI PODI 500G",
    mrp: 60,
    rate: 55,
  },
  {
    name: "CORN RAVA 500G",
    mrp: 80,
    rate: 70,
  },
];
const grandTotal = document.getElementById("grandTotal");

function generateInvoiceNumber() {
  const random = Math.floor(Math.random() * 100000);
  document.getElementById("invoiceNo").innerText = "INV-" + random;
}

function generateDate() {
  const today = new Date();
  document.getElementById("invoiceDate").innerText = today.toLocaleDateString();
}

function addRow() {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>
      <input 
        type="text" 
        placeholder="Product Name" 
        class="product"
        list="productSuggestions"
        oninput="fillProductDetails(this)"
      >

      <datalist id="productSuggestions">
        ${products
          .map(product => `<option value="${product.name}"></option>`)
          .join("")}
      </datalist>
    </td>

    <td>
      <input type="number" value="0" class="mrp" onchange="calculateTotal()">
    </td>

    <td>
      <input type="number" value="0" class="price" onchange="calculateTotal()">
    </td>

    <td>
      <input type="number" value="1" class="qty" onchange="calculateTotal()">
    </td>

    <td class="rowTotal">0</td>

    <td>
      <button class="remove-btn" onclick="removeRow(this)">
        X
      </button>
    </td>
  `;

  tableBody.appendChild(row);

  calculateTotal();
}

function fillProductDetails(input) {
  const row = input.parentElement.parentElement;

  const selectedProduct = products.find(
    (product) =>
      product.name.toLowerCase() === input.value.toLowerCase()
  );

  if (selectedProduct) {
    row.querySelector(".mrp").value = selectedProduct.mrp;
    row.querySelector(".price").value = selectedProduct.rate;

    calculateTotal();
  }
}

function removeRow(button) {
  button.parentElement.parentElement.remove();
  calculateTotal();
}

function calculateTotal() {
  let total = 0;

  const rows = document.querySelectorAll("#tableBody tr");

  rows.forEach((row) => {
    const qty = parseFloat(row.querySelector(".qty").value) || 0;
    const price = parseFloat(row.querySelector(".price").value) || 0;

    const rowTotal = qty * price;

    row.querySelector(".rowTotal").innerText = rowTotal.toFixed(2);

    total += rowTotal;
  });

  grandTotal.innerText = total.toFixed(2);
}

function printInvoice() {
  window.print();
}

function sendWhatsApp() {
  const customerName = document.getElementById("customerName").value;
  const customerPhone = document.getElementById("customerPhone").value;
  const invoiceNo = document.getElementById("invoiceNo").innerText;
  const total = document.getElementById("grandTotal").innerText;

  if (!customerPhone) {
    alert("Please enter customer mobile number");
    return;
  }

  let message = `Hello ${customerName || "Customer"},%0A%0A`;

  message += `Thank you for shopping with HR FOOD PRODUCTS.%0A`;
  message += `Invoice Number: ${invoiceNo}%0A`;
  message += `Total Amount: ₹${total}%0A%0A`;
  message += `Thank you ❤️`;

  const whatsappURL = `https://wa.me/91${customerPhone}?text=${message}`;

  window.open(whatsappURL, "_blank");
}

generateInvoiceNumber();
generateDate();
addRow();