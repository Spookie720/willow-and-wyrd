import os
import time
import random
from colorama import init, Fore, Style

# Initialize colorama so colors work on all systems
init(autoreset=True)


# --- Helper functions ---
def clear_screen():
    """clear the terminal screen"""
    os, system("cls" if os.name == "nt" else "clear")


def slow_print_center(text, delay=0.02, color=Fore.WHITE, width=50):
    """Print text centered with a little typewriter effect"""
    line = text.center(width)
    for ch in line :
        print(color + ch + Style.RESET_ALL, end="", flush=True)
        time.sleep(delay)
        print() # newline at the end

def sparkle_line(width=50):
    """
    print a line of random sparkles under the title
    """
    sparkles = ["✦", "✧", "⋆", "★"]
    chars = []

    for _ in range(width):
        if random.random() < 0.12: # ~12% chance to be a sparkle
            chars.append(random.choice(sparkles))
        else:
            chars.append(" ")
    print(Fore.MAGENTA + "".join(chars) + Style.REST_ALL)


#---Title screen ---

def show_title():
    clear_screen()

    border = "=" * 50

    # Top border

    print(Fore.CYAN + border + Style.RESET_ALL)
    time.sleep(0.1)

    # Magical title lines with typewriter effect
    slow_print_center("🌿  W I L L O W   &   W Y R D  🌙", color=Fore.GREEN)
    slow_print_center("a Wispmire project", color=Fore.WHITE)
    slow_print_center("where healing meets the strange", color=Fore.MAGENTA)

    #Bottom border
    print(Fore.CYAN + border + Style.RESET_ALL)
    time.sleep(0.2)

    # A few sparkle animation lines
    for _ in range(3):
        sparkle_line()
        time.sleep(0.25)

def main():
    show_title()
    print()
    print("Welcome to your Spellbook. ✨")
    print("This is your cozy starting point for Willow & Wyrd.")
    print("Soon, this menu will lead to your Grimoire, Healing Brews,")
    print("Wyrd Flow, Coven Contacts, and more.")

if __name__ == "__main__";
    main()
