import requests
import json
import time

def l(msg, status=None):
  if status == None: 
    print(f"[ ] {msg}")
  else:
    if status == True: 
      print(f"[+] {msg}")
    elif status == False: 
      print(f"[-] {msg}")
      
authToken = None

with open("cookie", "r") as f:
  authToken = f.readline()

if authToken == None: 
  l(f"No Auth Token present, exiting", False)
  exit()
else: 
  l(f"AuthToken: {authToken}", True)

submission_ids = []

def getSubmissions(offset=0):
  url = "https://grading.bootcampspot.com/api/centralgrading/v1/submissions"

  payload = json.dumps({
  "offset": offset,
  "resultsPerPage": 200,
  "role": {
    "id": 1,
    "name": "Central Grader"
  }})

  headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'max-age=0',
    'cookie': f'authToken={authToken}',
    'if-modified-since': 'Thu, 25 Jan 2024 14:52:42 GMT',
    'if-none-match': '"8e4bb66edf131993e10eec59f8ce77a1"',
    'referer': 'https://grading.bootcampspot.com/',
    'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Referer': 'https://grading.bootcampspot.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'content-type': 'application/json',
    'origin': 'https://grading.bootcampspot.com',
    'Origin': 'https://grading.bootcampspot.com'
  }

  response = requests.request("POST", url, headers=headers, data=payload)

  response_code = response.status_code
  
  if response_code != 200: 
    l(f"Invalid response: {str(response_code)}", False)
    return False
  else: 
    return response.json()

def getSubmissionDetail(assignment_id):
  url = "https://grading.bootcampspot.com/api/centralgrading/v1/submissionDetail"

  payload = json.dumps({
    "role": {
      "id": 1,
      "name": "Central Grader"
    },
    "submissionId": assignment_id
  })
  headers = {
    'accept': 'application/json',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'cookie': f'authToken={authToken}',
    'origin': 'https://grading.bootcampspot.com',
    'referer': 'https://grading.bootcampspot.com/canvasSubmission/1532827',
    'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
  }

  response = requests.request("POST", url, headers=headers, data=payload)
  
  if response.status_code != 200: 
    l(f"Invalid response (assignment_id): {str(assignment_id)}", False)
    l(f"Invalid response: {str(response.status_code)}", False)
    return False
  else: 
    return response.json()

# do debug of this method
def checkIfSkippable(assignment):
  asmt_det = getSubmissionDetail(assignment["id"])
  try: 
    id = asmt_det["id"]
  except Exception as e: 
    l(f"Error in assignment data: {assignment["id"]}")
    l(f"Assignment: {assignment}")
    return l(f"Exception: {e}")

  if len(asmt_det["data"]) == 0:
    return l(f"Skippable assignment: https://grading.bootcampspot.com/canvasSubmission/{id}", True)
  
  isUrlsPresent = False
  for asmt_det_data in asmt_det["data"]:
    if asmt_det_data["key"] == "SubmissionUrl":
      isUrlsPresent = True   
  
  if not isUrlsPresent: 
    l(f"Skippable assignment: https://grading.bootcampspot.com/canvasSubmission/{id}", True)
  else: 
    l(f"Not Skippable: {id}")

def checkForSkipOrEmpty():
  # get all submissions
  l("Getting all submissions")
  submissions = getSubmissions()
  
  total = submissions["totalResults"]
  l(f"Total Submissions: {total}", True)
  
  ofst = 0
  cnt = 1

  l(f"Checking for skip or no links")
  while cnt <= total:
    for asmt in submissions["data"]:
      checkIfSkippable(asmt)
      cnt += 1
    
    l("Incrementing offset")
    ofst += 200
    l("Getting more submissions")
    submissions = getSubmissions(ofst)
    l(f"{cnt} / {total}")

  # Checking last few assignments
  for asmt in submissions["data"]:
    checkIfSkippable(asmt)
    
    l(f"{cnt} / {total}")

  l("Complete")






if __name__ == "__main__":
  checkForSkipOrEmpty()
