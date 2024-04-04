"""
  Pre-reqs:
    pip install gTTS playsound
"""


import requests
import json
import time
import os
import datetime
from gtts import gTTS
import os
import playsound

url = "https://grading.bootcampspot.com/api/centralgrading/v1/submissions"
authToken = input("Enter AuthToken: ")
playsound.playsound("test.mp3", True)

if authToken == None: 
  raise Exception("You need provide a AuthToken")
  exit()

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
    print("https://grading.bootcampspot.com/queue?offset=20")
    if res > 0:
      vox = gTTS(text=prompt, lang="en", slow=False)
      vox.save(f"vox{cnt}.mp3")
      playsound.playsound(f"vox{cnt}.mp3")
      time.sleep(100)
      os.remove(f"vox{cnt}.mp3")
  except Exception as e: 
    print("Error getting request!")
    print(e)
  finally:
    time.sleep(50)
    cnt += 1
    print("\n")




"""
Using Festival for TTS on Linux

os.system(f'echo "{prompt}" | festival --tts')
"""






