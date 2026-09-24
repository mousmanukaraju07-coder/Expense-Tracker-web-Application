let transactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];


// Add Transaction
function addTransaction() {

    const description =
        document.getElementById("description").value.trim();

    const amount =
        Number(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;


    // Validation
    if (description === "" || amount <= 0) {

        alert("Please enter description and valid amount");

        return;
    }


    // Create transaction
    const transaction = {

        description: description,

        amount: amount,

        type: type
    };


    // Add transaction to array
    transactions.push(transaction);


    // Save to localStorage
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );


    // Clear inputs
    document.getElementById("description").value = "";

    document.getElementById("amount").value = "";


    // Display transactions
    displayTransactions();


    // Update balance
    updateSummary();


    alert("Transaction added successfully!");
}



// Display Transactions
function displayTransactions() {

    const transactionList =
        document.getElementById("transactionList");


    transactionList.innerHTML = "";


    transactions.forEach(function(transaction) {

        const li =
            document.createElement("li");


        li.textContent =
            transaction.description +
            " - ₹" +
            transaction.amount +
            " - " +
            transaction.type;


        transactionList.appendChild(li);

    });
}



// Update Balance, Income and Expense
function updateSummary() {

    let income = 0;

    let expense = 0;


    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {

            income += transaction.amount;

        }
        else if (transaction.type === "expense") {

            expense += transaction.amount;

        }

    });


    const balance = income - expense;


    document.getElementById("income").textContent =
        "₹" + income;

    document.getElementById("expense").textContent =
        "₹" + expense;

    document.getElementById("balance").textContent =
        "₹" + balance;
}



// Load existing transactions
displayTransactions();

updateSummary();