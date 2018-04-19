#!/usr/bin/python

import urllib
import re
import time

REWARD_CROSSWALK = {
	'Orb':'orb.png',
	'Universal_Crystal':'yCrystal.png',
	'Universal_Shard':'yCrystal.png',
	'Transparent_Crystal':'clessCrystal.png',
	'Transparent_Shard':'clessShard.png',
	'Azure_Crystal':'bCrystal.png',
	'Azure_Shard':'bShard.png',
	'Scarlet_Crystal':'rCrystal.png',
	'Scarlet_Shard':'rShard.png',
	'Verdant_Crystal':'gCrystal.png',
	'Verdant_Shard':'gShard.png',
	'Feathers':'feather.png',
	'Sacred_Coin':'coin.png',
	'Sacred_Seal':'seal1.png',
	'Wind_Blessing':'wiBlessing.png',
	'Water_Blessing':'waBlessing.png',
	'Fire_Blessing':'fiBlessing.png',
	'Earth_Blessing':'eaBlessing.png'
}

GLOBAL_MAP = {}
GLOBAL_LIST = []

#{points:"100",amount:"2",img:"orb.png"}
def getDetails(amount, prize) :
	numAmount = int(amount.replace(',',''))

	prizeAmount = re.findall(r'([0-9,]*) <a', prize, re.M|re.I|re.S)
	link = re.findall(r'<a href="/([^"]*)"', prize, re.M|re.I|re.S)
	imgAlt = re.findall(r'<img alt="([^"]*)"', prize, re.M|re.I|re.S)
	#print link
	#print str(numAmount) + ' points gets ' + str(link)

	img = ''
	if len(link) == 1:
		if link[0] == 'Blessing':
			img = REWARD_CROSSWALK[imgAlt[0].replace(' ','_').replace('.png', '')]
		else:
			img = REWARD_CROSSWALK[link[0]]

	prAmt = ''
	if(len(prizeAmount) == 0) :
		if(len(imgAlt) == 3) :
			prAmt = imgAlt[0][5] + '*'
			img = 'thumb.png'
		else :
			prAmt = 'sacredseal'
			img = 'seal1.png'
	else :
		prAmt = str(prizeAmount[0])
	
	lineItem = '{points:"' + str(numAmount) + '",amount:"' + prAmt + '",img:"' + img + '"}'
	GLOBAL_LIST.append(numAmount)
	GLOBAL_MAP[numAmount] = lineItem

# Read the rewards file
rewards_raw = ''
with open('rewards.txt', 'r') as f:
	rewards_raw = f.read()
# Flatten it to one line
rewards_raw = rewards_raw.replace('\n', ' ')
trs = re.findall(r'<tr>(.*?)</tr>', rewards_raw, re.M|re.I|re.S)

for tr in trs:
	tds = re.findall(r'<td>(.*?)</td>', tr, re.M|re.I|re.S)
	if len(tds) > 1:
		# Get the left column
		getDetails(tds[0],tds[1])

		# Check for right col
		if(len(tds) < 3) :
			continue

		# Get the right column
		if tds[2].strip() == '':
			if(len(tds) > 3):
				getDetails(tds[3],tds[4])
		else :
			getDetails(tds[2],tds[3])

GLOBAL_LIST.sort()
sealCount = 1
for amt in GLOBAL_LIST :
	line = GLOBAL_MAP[amt]
	if line.find('sacredseal') > -1:
		line = line.replace('"sacredseal"', 'sealName' + str(sealCount))
		line = line.replace('seal1.png', 'seal' + str(sealCount) + '.png')
		sealCount += 1
	print line + ','
