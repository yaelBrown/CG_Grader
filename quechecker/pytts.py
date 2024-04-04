from gtts import gTTS
import os
import playsound

mytext = "I like cookies"

language = "en"

myobj = gTTS(text=mytext, lang=language, slow=False)

myobj.save("test.mp3")

playsound.playsound("test.mp3", True)
..





# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk2NzczLCJtaW51dGVzVGltZW91dCI6NjAsImNyZWF0aW9uVGltZSI6IjIwMjQtMDItMTBUMDA6MTM6MTguMTA5MDk0MDgzWiIsImlzcyI6IjJ1aW5jIiwic3ViIjo5Njc3MywiaWF0IjoxNzA3NTIzOTk4LCJleHAiOjE3MDc1Mjc1OTh9.PC1a4IZIdKmw6OyN5KtirQJdzq1gDaxBdtKRPZwYjUs







from gtts import gTTS
import playsound
import os

x = ['sunny', 'sagar', 'akhil']
tts = 'tts'
for i in range(0,3):
    tts = gTTS(text= x[i], lang = 'en')
    file1 = str("hello" + str(i) + ".mp3")
    tts.save(file1)
    playsound.playsound(file1,True)
    print 'after'
    os.remove(file1)