# CMDaySnooze

		
	CMDay: https://github.com/CMDay
	Auteurs:
		Roel Antonisse - Front-end development
		Cyd Stumpel - Visueel design
	Update: 14/11/2014
		

Promo website voor de CMDay.snooze app. Gebouwd met [Bootstrap](http://getbootstrap.com/). Bekijk hier de website op Github: [CMDay Snooze](http://CMDay.github.io/snooze-website).

## Benodigdheden

* [Node.js](http://nodejs.org/)
* [Grunt.js](http://gruntjs.com/getting-started)

## Ontwikkelen

In de console / terminal:

	$ npm install
	$ grunt

### Folder structuur

	development		<-- Aangemaakt met $grunt develop
	distribution	<-- Aangemaakt met $grunt distribute
	
	source			<-- Project bestanden
	└assets
		├fonts
		├images
		├scripts		<-- JS
		├styles		<-- CSS
		├vendor		<-- 3de partij software
		└views		<-- HTML
	
In de `development` folder komen alle web bestanden die nodig zijn voor tijdens de ontwikkeling van de website. In de distribution folder komen alle web bestanden om de website online te zetten.
