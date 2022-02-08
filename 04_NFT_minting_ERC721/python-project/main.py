# Project to serve as a frontend for minting ERC721 tokens
# by interacting with Infura's Rinkeby provider
import tkinter
from tkinter import *
from tkinter import messagebox
from web3 import Web3
import json

FONT = "Courier"
INFURA_URL = "https://rinkeby.infura.io/v3/39122cb0ed414863af406e62cbc6e877"
CONTRACT_ADDRESS = "0xF125706B4F03E011cfA0a87691162934Ae862617"
MY_ADDRESS = "YOUR-ACCOUNT-ADDRESS"
PRIVATE_KEY = "YOUR-PRIVATE-KEY"

with open("build/contracts/NamedToken.json", "r") as abi_file:
    compiled_contract = json.load(abi_file)

CONTRACT_ABI = compiled_contract["abi"]

web3 = Web3(Web3.HTTPProvider(INFURA_URL))
contract_instance = web3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)
NONCE = web3.eth.getTransactionCount(MY_ADDRESS)


# --------------------- Functions to Mint Tokens ---------------------- #
def mint_tokens():
    token_name = token_name_input.get()
    token_name = token_name.lower()
    if len(token_name) == 0:
        messagebox.showinfo(title="Oops", message="Please make sure you have entered the Token Name.")
    elif token_name in token_names_list:
        messagebox.showinfo(title="Oops", message="Token with this name has already been minted. Try a different name to mint a Token")
    else:
        try:
            transaction = contract_instance.functions.mintToken(
                token_name).buildTransaction({
                "gas": 5500000,
                "gasPrice": web3.toWei("10", "gwei"),
                "from": MY_ADDRESS,
                "nonce": NONCE
            })
            signed_txn = web3.eth.account.signTransaction(transaction, private_key=PRIVATE_KEY)
            tx_hash = web3.eth.sendRawTransaction(signed_txn.rawTransaction)
            print(tx_hash)
            token_name_input.delete(0, END)
        except:
            token_name_input.delete(0, END)
            messagebox.showinfo(title="Oops", message="Something went wrong")


# -------------------- Functions to show All Tokens -------------------- #
def get_all_tokens():
    all_tokens = contract_instance.functions.getAllTokens().call()
    output_text.delete("1.0", "end")
    output_text.insert("end", "All Tokens Minted so far \n")
    global token_names_list
    token_names_list = []
    for token in all_tokens:
        token_names_list.append(token[1])
        output_text.insert("end", token)
        output_text.insert("end", "\n")


# -------------------- Functions to get My Tokens --------------------- #
def get_my_tokens():
    my_tokens = contract_instance.functions.getMyTokens().call({'from': MY_ADDRESS})
    output_text.delete("1.0", "end")
    output_text.insert("end", "My Tokens: \n")
    for token in my_tokens:
        output_text.insert("end", token)
        output_text.insert("end", "\n")


# ---------------------------- UI SETUP ------------------------------- #

window = Tk()
window.title("Mint Named Tokens - MNT")
window.config(padx=50, pady=50, bg="white")

canvas = Canvas(height=300, width=300, bg="white", highlightthickness=0)
logo_img = PhotoImage(file="logo.png")
canvas.create_image(150, 150, image=logo_img)
canvas.grid(row=0, column=1)

heading_label = Label(text="Mint your Own Named Token", bg="white", font=(FONT, 24))
heading_label.grid(row=1, column=1, padx=10, pady=10)

token_name_input = Entry(width=24)
token_name_input.grid(row=3, column=1)
token_name_input.focus()

mint_button = Button(text="Mint", highlightthickness=0, command=mint_tokens)
mint_button.grid(row=4, column=1, padx=10, pady=10)

my_tokens_button = Button(text="My Tokens", highlightthickness=0, command=get_my_tokens)
my_tokens_button.grid(row=5, column=1, padx=10, pady=10)

all_tokens_button = Button(text="Reload All Tokens", command=get_all_tokens)
all_tokens_button.grid(row=6, column=1, padx=10, pady=10)

output_text = Text(highlightthickness=0, bg="white", borderwidth=0)
output_text.grid(row=7, column=1, columnspan=2, padx=10, pady=10)

get_all_tokens()
window.mainloop()
