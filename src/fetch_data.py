import requests

def fetch_data():
    url = "https://api.publicapis.org/entries"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(f"Fetched {len(data['entries'])} entries!")
    else:
        print("Failed to fetch data")

if __name__ == "__main__":
    fetch_data()
