import requests
import json
import time
import os
import datetime

url = "https://grading.bootcampspot.com/api/centralgrading/v1/submissions"
authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk2NzczLCJtaW51dGVzVGltZW91dCI6NjAsImNyZWF0aW9uVGltZSI6IjIwMjMtMDYtMjFUMjM6NDI6MjIuODI1MDMwNjYyWiJ9.lpxDH0HUnBfUxMhwf3MwUj3Z-XRneaN1OSPpuIcb5ew"

payload = json.dumps({
  "offset": 0,
  "programs": [
    1
  ],
  "resultsPerPage": 10,
  "role": {
    "id": 1,
    "name": "Central Grader"
  }
})
headers = {
  'authority': 'grading.bootcampspot.com',
  'accept': 'application/json',
  'accept-language': 'en-US,en;q=0.5',
  'authtoken': authToken,
  'content-type': 'application/json',
  'cookie': '_dd_s=rum=1&id=54c3443c-3fd3-49ec-9e2f-9f1a5e3b68dc&created=1687018367134&expire=1687024913359',
  'origin': 'https://grading.bootcampspot.com',
  'referer': 'https://grading.bootcampspot.com/queue?offset=0&programs=1',
  'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Linux"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
}

# Query Queue
def qq():
  return requests.request("POST", url, headers=headers, data=payload).json()["totalResults"]


cnt = 1
while True:
  try:
    print(datetime.datetime.now())
    print(f"Request: {str(cnt)}")
    
    res = qq()
    print(f"Assignments: {str(res)}")
    
    prompt = f"{str(res)} in the queue"
    if res > 0:
      os.system(f'echo "{prompt}" | festival --tts')
  except Exception as e: 
    print("Error getting request!")
    print(e)
  finally:
    time.sleep(50)
    cnt += 1
    print("\n")




  





