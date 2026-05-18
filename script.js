const tableBody = document.getElementById("tableBody");
const grandTotal = document.getElementById("grandTotal");

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
function toggleExtraOptions() {

  const box =
    document.getElementById(
      "extraOptionsBox"
    );

  if (
    box.style.display === "none" ||
    box.style.display === ""
  ) {

    box.style.display = "block";

  } else {

    box.style.display = "none";

  }
}
function toggleCharges() {

  const shippingBox =
    document.getElementById(
      "shippingBox"
    );

  const discountBox =
    document.getElementById(
      "discountBox"
    );

  if (
    shippingBox.style.display ===
      "none" ||
    shippingBox.style.display === ""
  ) {

    shippingBox.style.display =
      "block";

    discountBox.style.display =
      "block";

  } else {

    shippingBox.style.display =
      "none";

    discountBox.style.display =
      "none";

  }
}
function generateInvoiceNumber() {
  const random = Math.floor(Math.random() * 100000);

  document.getElementById("invoiceNo").innerText =
    "INV-" + random;
}

function generateDate() {
  const today = new Date();

  document.getElementById("invoiceDate").innerText =
    today.toLocaleDateString();
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
          .map(
            (product) =>
              `<option value="${product.name}"></option>`
          )
          .join("")}
      </datalist>
    </td>

    <td>
      <input
        type="number"
        value="0"
        class="mrp"
        onchange="calculateTotal()"
      >
    </td>

    <td>
      <input
        type="number"
        value="0"
        class="price"
        onchange="calculateTotal()"
      >
    </td>

    <td>
      <input
        type="number"
        value="1"
        class="qty"
        onchange="calculateTotal()"
      >
    </td>

    <td class="rowTotal">0</td>

    <td>
      <button
        class="remove-btn"
        onclick="removeRow(this)"
      >
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
      product.name.toLowerCase() ===
      input.value.toLowerCase()
  );

  if (selectedProduct) {
    row.querySelector(".mrp").value =
      selectedProduct.mrp;

    row.querySelector(".price").value =
      selectedProduct.rate;

    calculateTotal();
  }
}

function removeRow(button) {
  button.parentElement.parentElement.remove();

  calculateTotal();
}

function calculateTotal() {
  let total = 0;

  const rows = document.querySelectorAll(
    "#tableBody tr"
  );

  rows.forEach((row) => {
    const qty =
      parseFloat(
        row.querySelector(".qty").value
      ) || 0;

    const price =
      parseFloat(
        row.querySelector(".price").value
      ) || 0;

    const rowTotal = qty * price;

    row.querySelector(".rowTotal").innerText =
      rowTotal.toFixed(2);

    total += rowTotal;
  });

  const shippingCharge =
    parseFloat(
      document.getElementById("shippingCharge")
        .value
    ) || 0;

  const discount =
    parseFloat(
      document.getElementById("discount").value
    ) || 0;

  const oldBalance =
  parseFloat(
    document.getElementById("oldBalance")
      ?.value
  ) || 0;
  const oldBalanceText =
  document.getElementById(
    "oldBalanceText"
  );

const oldBalancePrint =
  document.getElementById(
    "oldBalancePrint"
  );

if (oldBalance > 0) {

  oldBalanceText.innerText =
    oldBalance.toFixed(2);

  oldBalancePrint.style.display =
    "block";

} else {

  oldBalancePrint.style.display =
    "none";

}

const finalTotal =
  total +
  shippingCharge +
  oldBalance -
  discount;
  
  grandTotal.innerText =
    finalTotal.toFixed(2);
    const shippingBox =
  document.getElementById(
    "shippingBox"
  );

const discountBox =
  document.getElementById(
    "discountBox"
  );

if (shippingCharge > 0) {
  shippingBox.style.display = "block";
} else {
  shippingBox.style.display = "none";
}

if (discount > 0) {
  discountBox.style.display = "block";
} else {
  discountBox.style.display = "none";
}
}

function saveInvoiceRecord() {
  const customerName =
    document.getElementById("customerName")
      .value;

  const customerPhone =
    document.getElementById("customerPhone")
      .value;

  const invoiceNo =
    document.getElementById("invoiceNo")
      .innerText;

  const invoiceDate =
    document.getElementById("invoiceDate")
      .innerText;

  const total =
    document.getElementById("grandTotal")
      .innerText;

  const items = [];

  document
    .querySelectorAll("#tableBody tr")
    .forEach((row) => {
      items.push({
        product:
          row.querySelector(".product").value,

        mrp:
          row.querySelector(".mrp").value,

        rate:
          row.querySelector(".price").value,

        qty:
          row.querySelector(".qty").value,

        total:
          row.querySelector(".rowTotal")
            .innerText,
      });
    });

  const invoiceData = {
    invoiceNo,
    invoiceDate,
    customerName,
    customerPhone,
    total,
    items,
    shippingCharge:
  document.getElementById(
    "shippingCharge"
  )?.value || 0,

discount:
  document.getElementById(
    "discount"
  )?.value || 0,

oldBalance:
  document.getElementById(
    "oldBalance"
  )?.value || 0,
    createdAt: new Date().toLocaleString(),
  };

  let records =
    JSON.parse(
      localStorage.getItem("invoiceRecords")
    ) || [];

  records.push(invoiceData);

  localStorage.setItem(
    "invoiceRecords",
    JSON.stringify(records)
  );
  
}

function viewRecords() {

  const records =
    JSON.parse(
      localStorage.getItem(
        "invoiceRecords"
      )
    ) || [];

  const recordsList =
    document.getElementById(
      "recordsList"
    );

  if (records.length === 0) {

    recordsList.innerHTML =
      "<p>No invoice records found.</p>";

  } else {

    recordsList.innerHTML = records
      .map((record, index) => {

        const itemsHTML =
          record.items
            .map(
              (item) => `
              <tr>
                <td>${item.product}</td>
                <td>₹${item.mrp}</td>
                <td>₹${item.rate}</td>
                <td>${item.qty}</td>
                <td>₹${item.total}</td>
              </tr>
            `
            )
            .join("");

        return `

          <div class="record-card">

            <h3>
              ${record.invoiceNo}
            </h3>

            <p>
              <strong>Customer:</strong>
              ${record.customerName}
            </p>

            <p>
              <strong>Mobile:</strong>
              ${record.customerPhone}
            </p>

            <p>
              <strong>Total:</strong>
              ₹${record.total}
            </p>

            <p>
              <strong>Date:</strong>
              ${record.createdAt}
            </p>

            <button
              class="show-more-btn"
              onclick="toggleRecordDetails(${index})"
            >
              Show More
            </button>

            <div
              id="recordDetails${index}"
              class="record-details"
            >

              <hr>

              <p>
                <strong>Invoice Date:</strong>
                ${record.invoiceDate}
              </p>

              <p>
                <strong>Shipping:</strong>
                ₹${record.shippingCharge || 0}
              </p>

              <p>
                <strong>Discount:</strong>
                ₹${record.discount || 0}
              </p>

              <p>
                <strong>Old Balance:</strong>
                ₹${record.oldBalance || 0}
              </p>

              <div class="record-products">
              <button
  class="record-print-btn"
  onclick="printSavedInvoice(${index})"
>
  Print / Save PDF
</button>

                <h4>
                  Purchased Products
                </h4>

                <table class="record-table">

                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>MRP</th>
                      <th>Rate</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    ${itemsHTML}
                  </tbody>

                </table>

              </div>

            </div>

          </div>

        `;
      })
      .reverse()
      .join("");
  }

  document.getElementById(
    "recordsModal"
  ).style.display = "block";
}
function searchRecords() {

  const input =
    document.getElementById(
      "recordSearch"
    ).value.toLowerCase();

  const cards =
    document.querySelectorAll(
      ".record-card"
    );

  cards.forEach((card) => {

    const text =
      card.innerText.toLowerCase();

    if (text.includes(input)) {

      card.style.display = "block";

    } else {

      card.style.display = "none";

    }

  });

}
function toggleRecordDetails(index) {

  const details =
    document.getElementById(
      `recordDetails${index}`
    );

  if (
    details.style.display ===
      "block"
  ) {

    details.style.display = "none";

  } else {

    details.style.display = "block";

  }
}
function closeRecords() {
  document.getElementById(
    "recordsModal"
  ).style.display = "none";
}
function printInvoice() {

  saveInvoiceRecord();

  window.print();

}


function sendWhatsApp() {

  const customerName =
    document.getElementById(
      "customerName"
    ).value;

  const customerPhone =
    document.getElementById(
      "customerPhone"
    ).value;

  const invoiceNo =
    document.getElementById(
      "invoiceNo"
    ).innerText;

  const total =
    document.getElementById(
      "grandTotal"
    ).innerText;

  if (
    customerPhone.trim() === ""
  ) {

    alert(
      "Please enter customer mobile number"
    );

    return;
  }

  let message =
    `Hello ${
      customerName || "Customer"
    },%0A%0A`;

  message +=
    `Thank you for shopping with Healthy Mart.%0A`;

  message +=
    `Invoice Number: ${invoiceNo}%0A`;

  message +=
    `Total Amount: ₹${total}%0A%0A`;

  message +=
    `Thank you ❤️`;

  const whatsappURL =
    `https://wa.me/91${customerPhone}?text=${message}`;

  window.open(
    whatsappURL,
    "_blank"
  );

}
function printSavedInvoice(index) {

  const records =
    JSON.parse(
      localStorage.getItem(
        "invoiceRecords"
      )
    ) || [];

  const record = records[index];

  if (!record) return;

  let itemsHTML = "";

  record.items.forEach((item) => {

    itemsHTML += `
      <tr>
        <td>${item.product}</td>
        <td>${item.mrp}</td>
        <td>${item.rate}</td>
        <td>${item.qty}</td>
        <td>${item.total}</td>
      </tr>
    `;
  });

  const printWindow =
    window.open(
      "",
      "",
      "width=900,height=700"
    );

  printWindow.document.write(`
    <html>

    <head>

      <title>
        Invoice ${record.invoiceNo}
      </title>

      <style>

        body {
          font-family: Arial;
          padding: 20px;
          color: #111;
        }

        h1 {
          margin-bottom: 5px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        table,
        th,
        td {
          border: 1px solid #ccc;
        }

        th {
          background: #15803d;
          color: white;
        }

        th,
        td {
          padding: 10px;
          text-align: center;
        }

        .top {
          margin-bottom: 20px;
        }

        .total {
          margin-top: 20px;
          text-align: right;
          font-size: 22px;
          font-weight: bold;
        }

      </style>

    </head>

    <body>

      <div class="top">

        <h1>
          HR FOOD PRODUCTS
        </h1>

        <p>
          Invoice No :
          ${record.invoiceNo}
        </p>

        <p>
          Customer :
          ${record.customerName}
        </p>

        <p>
          Mobile :
          ${record.customerPhone}
        </p>

        <p>
          Date :
          ${record.invoiceDate}
        </p>

      </div>

      <table>

        <thead>

          <tr>
            <th>Product</th>
            <th>MRP</th>
            <th>Rate</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>

        </thead>

        <tbody>

          ${itemsHTML}

        </tbody>

      </table>

      <p>
        Shipping :
        ₹${record.shippingCharge || 0}
      </p>

      <p>
        Discount :
        ₹${record.discount || 0}
      </p>

      <p>
        Old Balance :
        ₹${record.oldBalance || 0}
      </p>

      <div class="total">

        Grand Total :
        ₹${record.total}

      </div>

      <script>
        window.print();
      </script>

    </body>

    </html>
  `);

  printWindow.document.close();

}

generateInvoiceNumber();

generateDate();

addRow();