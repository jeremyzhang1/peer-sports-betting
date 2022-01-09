import requests
import json
from datetime import datetime, timedelta

yesterday = datetime.now() - timedelta(1)
yest = datetime.strftime(yesterday, '%Y-%m-%d')

url = 'https://www.balldontlie.io/api/v1/games/?seasons[]=2021&start_date=' + yest + '&end_date=' + yest
r = requests.get(url)
data = r.json()

# with open("daily.json", "w") as f:
#     json.dump(data, f, sort_keys=True, indent=4)

winners = {}
for game in data['data']:
    game_id = game['id']
    winner = game['home_team']['id']
    if game['visitor_team_score'] > game['home_team_score']:
        winner = game['visitor_team']['id']
    winners[game_id] = winner

print(winners)