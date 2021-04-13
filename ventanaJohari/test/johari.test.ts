import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import {probabilidadComportamiento,observacionComportamiento,ventanaJohari,zonaAbiertaOpinion,Opinion,zonaCiegaOpinion,zonaOcultaOpinion} from '../ventanaJohariBase.ts';


let datos:{opinion:Opinion,resultado:string[]}[] = [
    {
        opinion:{
            opinionesPropia:[
                "amigable",  "lógico",
                "cariñoso",  "maduro",
                "violento",  "listo",
                "feliz",     "atento",
                "modesto",   "pasivo",
                "tranquilo", "sensible"
            ] ,
            opinionesOtros:[
                "amigable",      "impaciente",
                "amable",        "lógico",
                "irresponsable", "reflexivo",
                "amigable",      "generoso",
                "lógico",        "pasivo",
                "relajado",      "tímido",
                "amigable",      "lógico",
                "tranquilo",     "reflexivo",
                "relajado",      "listo",
                "generoso",      "feliz",
                "amable",        "lógico",
                "modesto",       "listo"
            ]
        },
        resultado:[
            "amigable",  "lógico",
               "listo",
            "feliz",    
            "modesto",   "pasivo",
            "tranquilo"
        ]
    },
    {
        opinion:{
            opinionesPropia:[
                "amigable",  "lógico",
                "cariñoso",  "maduro",
                "violento",  "listo",
                "feliz",     "atento",
                "modesto",   "pasivo",
                "tranquilo", "sensible"
            ] ,
            opinionesOtros:[
            ]
        },
        resultado:[
        ]
    },
    {
        opinion:{
            opinionesPropia:[
            ] ,
            opinionesOtros:[
                "amigable",      "impaciente",
                "amable",        "lógico",
                "irresponsable", "reflexivo",
                "amigable",      "generoso",
                "lógico",        "pasivo",
                "relajado",      "tímido",
                "amigable",      "lógico",
                "tranquilo",     "reflexivo",
                "relajado",      "listo",
                "generoso",      "feliz",
                "amable",        "lógico",
                "modesto",       "listo"
            ]
        },
        resultado:[
        ]
    }
]
datos.forEach((data: {opinion: Opinion; resultado: string[];},index)=>{
    Deno.test(`zonaAbiertaOpinion ${index}`, () => {
        assertEquals(zonaAbiertaOpinion(data.opinion),data.resultado)
    });
})


datos = [
    {
        opinion:{
            opinionesPropia:[
                "amigable",  "lógico",
                "cariñoso",  "maduro",
                "violento",  "listo",
                "feliz",     "atento",
                "modesto",   "pasivo",
                "tranquilo", "sensible"
            ] ,
            opinionesOtros:[
                "amigable",      "impaciente",
                "amable",        "lógico",
                "irresponsable", "reflexivo",
                "amigable",      "generoso",
                "lógico",        "pasivo",
                "relajado",      "tímido",
                "amigable",      "lógico",
                "tranquilo",     "reflexivo",
                "relajado",      "listo",
                "generoso",      "feliz",
                "amable",        "lógico",
                "modesto",       "listo"
            ]
        },
        resultado:[
            "impaciente","amable",        
            "irresponsable", "reflexivo",
            "generoso","relajado",  
            "tímido"                  
        ]
    },
    {
        opinion:{
            opinionesPropia:[
                "amigable",  "lógico",
                "cariñoso",  "maduro",
                "violento",  "listo",
                "feliz",     "atento",
                "modesto",   "pasivo",
                "tranquilo", "sensible"
            ] ,
            opinionesOtros:[
            ]
        },
        resultado:[
        ]
    },
    {
        opinion:{
            opinionesPropia:[
            ] ,
            opinionesOtros:[
                "amigable",      "impaciente",
                "amable",        "lógico",
                "irresponsable", "reflexivo",
                "amigable",      "generoso",
                "lógico",        "pasivo",
                "relajado",      "tímido",
                "amigable",      "lógico",
                "tranquilo",     "reflexivo",
                "relajado",      "listo",
                "generoso",      "feliz",
                "amable",        "lógico",
                "modesto",       "listo"
            ]
        },
        resultado:[
            "amigable",      "impaciente",
            "amable",        "lógico",
            "irresponsable", "reflexivo",
             "generoso",
                    "pasivo",
            "relajado",      "tímido",
             
            "tranquilo",      "listo",
            "feliz",      
            "modesto"
        ]
    }
]
datos.forEach((data: {opinion: Opinion; resultado: string[];},index)=>{
    Deno.test(`zonaCiegaOpinion ${index}`, () => {
        assertEquals(zonaCiegaOpinion(data.opinion),data.resultado)
    });
})


datos = [
    {
        opinion:{
            opinionesPropia:[
                "amigable",  "lógico",
                "cariñoso",  "maduro",
                "violento",  "listo",
                "feliz",     "atento",
                "modesto",   "pasivo",
                "tranquilo", "sensible"
            ] ,
            opinionesOtros:[
                "amigable",      "impaciente",
                "amable",        "lógico",
                "irresponsable", "reflexivo",
                "amigable",      "generoso",
                "lógico",        "pasivo",
                "relajado",      "tímido",
                "amigable",      "lógico",
                "tranquilo",     "reflexivo",
                "relajado",      "listo",
                "generoso",      "feliz",
                "amable",        "lógico",
                "modesto",       "listo"
            ]
        },
        resultado:[  
            "cariñoso", 
             "maduro",
            "violento",  
               "atento",
             "sensible"
        ]
    },
    {
        opinion:{
            opinionesPropia:[
                "amigable",  "lógico",
                "cariñoso",  "maduro",
                "violento",  "listo",
                "feliz",     "atento",
                "modesto",   "pasivo",
                "tranquilo", "sensible"
            ] ,
            opinionesOtros:[
            ]
        },
        resultado:[
            "amigable",  "lógico",
            "cariñoso",  "maduro",
            "violento",  "listo",
            "feliz",     "atento",
            "modesto",   "pasivo",
            "tranquilo", "sensible"
        ]
    },
    {
        opinion:{
            opinionesPropia:[
            ] ,
            opinionesOtros:[
                "amigable",      "impaciente",
                "amable",        "lógico",
                "irresponsable", "reflexivo",
                "amigable",      "generoso",
                "lógico",        "pasivo",
                "relajado",      "tímido",
                "amigable",      "lógico",
                "tranquilo",     "reflexivo",
                "relajado",      "listo",
                "generoso",      "feliz",
                "amable",        "lógico",
                "modesto",       "listo"
            ]
        },
        resultado:[
        ]
    }
]
datos.forEach((data: {opinion: Opinion; resultado: string[];},index)=>{
    Deno.test(`zonaOcultaOpinion ${index}`, () => {
        assertEquals(zonaOcultaOpinion(data.opinion),data.resultado)
    });
})