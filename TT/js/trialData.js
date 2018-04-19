app.factory('trialData',function($rootScope) {
	var trialName = 'Thunder\'s Fist' ;
	$rootScope.title = 'Tempest Trials: \'' + trialName + '\' Progress Tracker' ;
	var startDate = new Date(Date.UTC(2018, 3, 21, 7, 00)) ;
	var endDate = new Date(Date.UTC(2018, 4, 1, 6, 59)) ;

	// Character prizes
	var charName = 'Finn' ;

	// Seal Prizes
	var sealName1 = 'Seal Speed' ;
	var sealName2 = 'Fortress Defense' ;
	var sealName3 = 'Drive Attack' ;

	// Normal trial
	// var majorPrizes = [
	// 	{type:'char', points:2000, name:'4* ' + charName},
	// 	{type:'seal', points:12000, name:sealName1},
	// 	{type:'seal', points:20000, name:sealName2},
	// 	{type:'char', points:30000, name:'5* ' + charName},
	// 	{type:'seal', points:40000, name:sealName3},
	// 	{type:'all', points:99999, name:'Everything'}
	// ] ;

	//Mini trial
	var majorPrizes = [
		{type:'char', points:1000, name:'4* ' + charName},
		{type:'seal', points:6000, name:sealName1},
		{type:'seal', points:10000, name:sealName2},
		{type:'char', points:15000, name:'5* ' + charName},
		{type:'seal', points:20000, name:sealName3},
		{type:'all', points:50000, name:'Everything'}
	] ;

	var allPrizes = [
{points:"50",amount:"2",img:"orb.png"},
{points:"100",amount:"1,000",img:"rShard.png"},
{points:"150",amount:"500",img:"feather.png"},
{points:"200",amount:"1,000",img:"bShard.png"},
{points:"250",amount:"20",img:"coin.png"},
{points:"350",amount:"1,000",img:"gShard.png"},
{points:"500",amount:"2",img:"orb.png"},
{points:"750",amount:"1,000",img:"clessShard.png"},
{points:"1000",amount:"4*",img:"thumb.png"},
{points:"1250",amount:"500",img:"feather.png"},
{points:"1500",amount:"2",img:"orb.png"},
{points:"1750",amount:"2,000",img:"rCrystal.png"},
{points:"2000",amount:"20",img:"coin.png"},
{points:"2250",amount:"2,000",img:"bCrystal.png"},
{points:"2500",amount:"500",img:"feather.png"},
{points:"2750",amount:"2,000",img:"gCrystal.png"},
{points:"3000",amount:"2",img:"orb.png"},
{points:"3500",amount:"2,000",img:"clessCrystal.png"},
{points:"4000",amount:"750",img:"feather.png"},
{points:"4500",amount:"2",img:"orb.png"},
{points:"5000",amount:"20",img:"coin.png"},
{points:"5500",amount:"750",img:"feather.png"},
{points:"6000",amount:sealName1,img:"seal1.png"},
{points:"7000",amount:"2",img:"orb.png"},
{points:"8000",amount:"2,000",img:"yCrystal.png"},
{points:"9000",amount:"1,000",img:"feather.png"},
{points:"10000",amount:sealName2,img:"seal2.png"},
{points:"11250",amount:"3",img:"orb.png"},
{points:"12500",amount:"1",img:"eaBlessing.png"},
{points:"13750",amount:"20",img:"coin.png"},
{points:"15000",amount:"5*",img:"thumb.png"},
{points:"16250",amount:"1,000",img:"feather.png"},
{points:"17500",amount:"3",img:"orb.png"},
{points:"18750",amount:"4,000",img:"yCrystal.png"},
{points:"20000",amount:sealName3,img:"seal3.png"},
{points:"21250",amount:"1,000",img:"feather.png"},
{points:"22500",amount:"1",img:"orb.png"},
{points:"23750",amount:"4,500",img:"yCrystal.png"},
{points:"25000",amount:"3",img:"orb.png"},
{points:"26250",amount:"1,000",img:"feather.png"},
{points:"27500",amount:"1",img:"orb.png"},
{points:"28750",amount:"5,000",img:"yCrystal.png"},
{points:"30000",amount:"3",img:"orb.png"},
{points:"31250",amount:"1,000",img:"feather.png"},
{points:"32500",amount:"1",img:"orb.png"},
{points:"33750",amount:"6,000",img:"yCrystal.png"},
{points:"35000",amount:"3",img:"orb.png"},
{points:"36250",amount:"1,000",img:"feather.png"},
{points:"37500",amount:"1",img:"orb.png"},
{points:"38750",amount:"7,000",img:"yCrystal.png"},
{points:"40000",amount:"3",img:"orb.png"},
{points:"41250",amount:"1,000",img:"feather.png"},
{points:"42500",amount:"1",img:"orb.png"},
{points:"43750",amount:"8,000",img:"yCrystal.png"},
{points:"45000",amount:"3",img:"orb.png"},
{points:"46250",amount:"1,000",img:"feather.png"},
{points:"47500",amount:"1",img:"orb.png"},
{points:"48750",amount:"9,000",img:"yCrystal.png"},
{points:"50000",amount:"3",img:"orb.png"}
	] ;

	// Stores the total amount of each prize
	var prizeAmounts = {
		orb:0,
		feather:0,
		crystal:0,
		coin:0
	} ;

	// Stores how many of each prize I've gotten
	var gotPrizeAmounts = {
		orb:0,
		feather:0,
		crystal:0,
		coin:0
	}

	var points = 0 ;
	var ppd = 0 ;
	var projected = 0 ;

	populatePrizeAmounts() ;

	return {
		name: trialName,
		start: startDate,
		end: endDate,
		majorPrizes: majorPrizes,
		allPrizes: allPrizes,
		// chars: chars,
		// seals: seals,
		points: points,
		ppd: ppd,
		projected: projected,
		calcPPDs: calcPPDs,
		updatePrizeCounts: updatePrizeCounts,
		prizeAmounts: prizeAmounts,
		gotPrizeAmounts: gotPrizeAmounts
	}

	function populatePrizeAmounts() {
		for(var i=0; i<allPrizes.length; i++) {
			var p = allPrizes[i] ;
			if(p.img.indexOf('orb') >= 0) {
				prizeAmounts.orb += parseInt(p.amount.replace(/,/g, '')) ;
			}
			if(p.img.indexOf('feather') >= 0) {
				prizeAmounts.feather += parseInt(p.amount.replace(/,/g, '')) ;
			}
			if(p.img.indexOf('Crystal') >= 0) {
				prizeAmounts.crystal += parseInt(p.amount.replace(/,/g, '')) ;
			}
			if(p.img.indexOf('coin') >= 0) {
				prizeAmounts.coin += parseInt(p.amount.replace(/,/g, '')) ;
			}
		}
	}

	function updatePrizeCounts() {
		// Reset all prizes first
		gotPrizeAmounts.orb = 0 ;
		gotPrizeAmounts.feather = 0 ;
		gotPrizeAmounts.crystal = 0 ;
		gotPrizeAmounts.coin = 0 ;

		for(var i=0; i<allPrizes.length; i++) {
			var p = allPrizes[i] ;

			// If I don't have enough to get this prize yet, break
			if(p.points > this.points) break ;

			if(p.img.indexOf('orb') >= 0) {
				gotPrizeAmounts.orb += parseInt(p.amount.replace(/,/g, '')) ;
			}
			if(p.img.indexOf('feather') >= 0) {
				gotPrizeAmounts.feather += parseInt(p.amount.replace(/,/g, '')) ;
			}
			if(p.img.indexOf('Crystal') >= 0) {
				gotPrizeAmounts.crystal += parseInt(p.amount.replace(/,/g, '')) ;
			}
			if(p.img.indexOf('coin') >= 0) {
				gotPrizeAmounts.coin += parseInt(p.amount.replace(/,/g, '')) ;
			}
		}
	}

	function calcPPDs(remaining) {
		var points = this.points ;

		var now = new Date().getTime() ;
		var elapsed = now - startDate.getTime() ;

		if(startDate.getTime() > now || remaining < 0) return ;

		this.ppd = Math.round((this.points / (elapsed / (1000 * 60 * 60 * 24)))*100)/100 ;
		this.projected = Math.floor(this.points + (this.ppd*(remaining / (1000 * 60 * 60 * 24)))) ;

		var prizes = this.majorPrizes ;
		for(var i=0; i<prizes.length; i++) {
			if(points >= prizes[i].points) {
				prizes[i].ppdLeft = 0 ;
				prizes[i].onTrack = 'Got it!' ;
				prizes[i].color = '#0000CC' ;
			}
			else {
				prizes[i].ppdLeft = Math.round(((prizes[i].points-points) / (remaining / (1000 * 60 * 60 * 24)))*100)/100 ;
				//if(prizes[i].ppdLeft < 0) prizes[i].ppdLeft = 0 ;
				prizes[i].onTrack = (this.ppd > prizes[i].ppdLeft) ? 'Yes' : 'No' ;
				prizes[i].color = (prizes[i].onTrack == 'Yes') ? '#00CC00' : '#CC0000' ;
			}
		}
	}
});