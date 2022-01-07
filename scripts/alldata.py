import requests
import json

url = "https://www.balldontlie.io/api/v1/games/?seasons[]=2021&per_page=100&start_date=2022-01-01&page="

for i in range(8):
    this_url = url + str(i+1)
    r = requests.get(url = this_url)
    data = r.json()
    with open("page_" + str(i+1) + '.json', "w") as f:
        json.dump(data, f, sort_keys=True, indent=4)

print('done')

