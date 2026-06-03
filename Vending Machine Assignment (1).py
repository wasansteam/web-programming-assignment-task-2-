# Vending Machine Assignment


vending_machine_stock = {
    "A1": {"name": "Coca-Cola", "price": 1.50, "stock": 5},
    "A2": {"name": "Pepsi", "price": 1.50, "stock": 3},
    "B1": {"name": "Potato Chips", "price": 2.00, "stock": 4},
    "B2": {"name": "Chocolate Bar", "price": 1.75, "stock": 2},
    "C1": {"name": "Bottled Water", "price": 1.00, "stock": 10},
    "C2": {"name": "Skittles", "price": 1.25, "stock": 0} 
}

def display_menu():
    print("\n--- VENDING MACHINE ---")

    for code, details in vending_machine_stock.items():
        status = "Available"
        if details["stock"] <= 0:
            status = "OUT OF STOCK"
        
        
        print(code + " - " + details["name"] + " ($" + str(details["price"]) + ") [" + status + "]")
    print("-----------------------\n")

running = True

while running:
    display_menu()
    
    user_selection = input("Enter code (or type 'EXIT'): ").upper()
    
    if user_selection == "EXIT":
        print("Goodbye!")
        running = False
        break
        
   
    if user_selection not in vending_machine_stock:
        print("Invalid code, try again.")
        continue 
        
    selected_item = vending_machine_stock[user_selection]
    
    # Check stock
    if selected_item["stock"] <= 0:
        print("Sorry, that item is out of stock!")
        continue

    print("You picked " + selected_item["name"] + ". Price is $" + str(selected_item["price"]))
    
    # Money part
    inserted_money = 0.0
    item_price = selected_item["price"]
    
    while inserted_money < item_price:
        needed_amount = item_price - inserted_money
        # Rounding because floats get weird in python sometimes
        print("Still owe: $" + str(round(needed_amount, 2)))
        
        money_input = float(input("Insert money: $"))
        
        if money_input <= 0:
            print("Put in real money please.")
        else:
            inserted_money += money_input
            print("Total so far: $" + str(inserted_money))

    # Dispensing
    print("\nDispensing " + selected_item["name"] + "...")
    selected_item["stock"] = selected_item["stock"] - 1 # basic subtraction
    print("Done!")
    
    # Change
    change = inserted_money - item_price
    if change > 0:
        print("Your change: $" + str(round(change, 2)))
    
    # Ask to loop again
    another = input("\nBuy something else? (yes/no): ").lower()
    if another != "yes" and another != "y":
        print("Thanks for using my machine!")
        running = False