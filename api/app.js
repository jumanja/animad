const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors())

const continents = [
    {
      id: 1,
      name: "Asia",
      population: "4,624,520,000",
      no_of_countries: 50,
      area: "44,579,000"
    },
    {
      id: 2,
      name: "Africa",
      population: "1,327,042,300",
      no_of_countries: 54,
      area: "30,370,000"
    },
    {
      id: 3,
      name: "North America",
      population: "590,176,500",
      no_of_countries: 23,
      area: "24,709,000"
    },
    {
      id: 4,
      name: "South America",
      population: "429,276,300",
      no_of_countries: 12,
      area: "17,840,000"
    },
    {
      id: 5,
      name: "Antartica",
      population: "No real data on populants",
      no_of_countries: 0,
      area: "14,000,000"
    },
    {
      id: 6,
      name: "Europe",
      population: "747,447,200",
      no_of_countries: 51,
      area: "10,180,000"
    },
    {
      id: 7,
      name: "Australia",
      population: "42,448,700",
      no_of_countries: 14,
      area: "8,600,000"
    }
  ]

  const scenes = [
	{
        id: 1,
		name: 'La enseñanza por medio de Parábolas',
		author: 'xamdox.website',
		coverURL: 'xamdox_cover.png',
		src: 'audio/MR-004-033-034.mp3',
		viewBox: {
			'a': 0,
			'b': 0,
			'c': 240,
			'd': 135,
			'time': 0.5
		},
		images: [
            {
                'value': 'MR/portada_Leon.png',
                'x': 0,
                'y': 0,
                'start': -1,
                'end': 10,
                'effect': 'infade_outfly',
                'animParam1': -200,
                'animParam2': 4000
            }
        ],
		texts: [
            {
			    'value': 'Marcos 4',
                'class': 'subtitulo',
                'start': 0.3,
                'end': 6,
                'x': 130,
                'dy': 20,
            },
            {
			    'value': 'La Enseñanza',
                'class': 'subtitulo title-1',
                'start': 0.3,
                'end': 6,
                'x': 130,
                'dy': 40,
            },
            {
			    'value': 'por medio de',
                'class': 'subtitulo title-2',
                'start': 0.3,
                'end': 6,
                'x': 130,
                'dy': 50,
            },
            {
			    'value': 'Parábolas',
                'class': 'subtitulo title-2',
                'start': 0.3,
                'end': 6,
                'x': 130,
                'dy': 60,
            }
         ],
         back: {
            'fillColor': '#000'
         }
    },
    {
        id: 2,
		viewBox: {
			'a': 240,
			'b': 0,
			'c': 240,
			'd': 135,
			'time': 10
		},
		images: [
            {
                'value': 'MR/jesus_apostoles.png',
                'x': 0,
                'y': 0,
                'start': 12,
                'end': 24,
                'transform': 'translate(200) scale(0.8, 0.8)',
                'effect': 'infly_outfly',
                'animParam1': 100,
                'animParam2': 2500,
                'animParam3': -10,
                'animParam4': 2500
            },
            {
                'value': 'MR/apostoles.png',
                'x': 50,
                'y': 0,
                'start': 15,
                'end': 24,
                'transform': 'translate(235, 5) scale(1,1)',
                'effect': 'infly_outfly',
                'animParam1': -10,
                'animParam2': 3500,
                'animParam3': 100,
                'animParam4': 3500
            },
        ],
		texts: [{
			'value': 'xamdox.website',
			'start': 14,
			'end': 16,
			'class': 'legend',
			'x': 250,
			'dy': 120,
            'effect': 'infly_outfly',
            'animParam1': 100,
            'animParam2': 2500,
            'animParam3': -10,
            'animParam4': 2500
		}],
		back: {
			'fillColor': '#000',
			'transform': 'translate(240)'
		}
	},
    {
		viewBox: {
			'a': 480,
			'b': 0,
			'c': 240,
			'd': 135,
			'time': 26
		},
		imagen: {
			'value': 'MR/arbolmostazas.png',
			'x': 0,
			'y': 0,
			'start': 20,
			'end': 46,
			'transform': 'translate(200)',
            'effect': 'infly_outfly',
            'animParam1': 100,
            'animParam2': 2500,
            'animParam3': -10,
            'animParam4': 2500
    },
		back: {
			'fillColor': '#000',
			'transform': 'translate(480)'
		}
	}
  ]

  app.get("/", (req, res) => {
    res.send(scenes);
  });
  
  app.listen(8081, () => {
    console.log("App's running on port 8081");
  });

