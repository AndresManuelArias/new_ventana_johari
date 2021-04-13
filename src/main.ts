//servidor

import {Application, Router, send,RouterContext} from "https://deno.land/x/oak@v6.2.0/mod.ts";
import {  viewEngine,
    engineFactory,
    adapterFactory} from  "https://deno.land/x/view_engine@v1.4.5/mod.ts";
import {probabilidadComportamiento,observacionComportamiento,ventanaDeHonaryConteoComportamientos,ventanaDeHonaryProbabilidadComportamientos} from '../ventanaJohari/ventanaJohariBase.ts';
let tabla:string[][]= []
const decoder = new TextDecoder('utf-8');
for await (const dirEntry of Deno.readDir("../data_base")) { 
    console.log(dirEntry.name);
    let lectura:string = await decoder.decode(await Deno.readFile("../data_base/"+dirEntry.name));
    // console.log(lectura)
    tabla = tabla.concat(lectura.split("\r\n").map(fila=>fila.split("\t")).slice(1))
    // console.log(tabla)
  }
let tablaConvertida:observacionComportamiento[] = tabla.map(fila=>{return {
    fecha:fila[0],
    características:fila[1].split(", "),
    el_que_describe:fila[2],
    quien_es_descrito:fila[3]
 }})
let coleccionPersonasComportamientosPorcentajes:Map<string, (string | number)[][]> = probabilidadComportamiento(tablaConvertida)
let personas = new Set([...coleccionPersonasComportamientosPorcentajes.keys()])
let coleccionAgrupacionPuntajesHonary = ventanaDeHonaryProbabilidadComportamientos(tablaConvertida)
// now setting app
const app = new Application();


// now set view engine as   EJS
const ejsEngine = await engineFactory.getEjsEngine();//https://ejs.co/

const oakAdapter = await adapterFactory.getOakAdapter();
/*falta crear archivos estaticos y probar wetcomponen https://www.youtube.com/watch?v=8bcfgXePHnk
 https://www.youtube.com/watch?v=dEZXx2FVBdQ&list=PLIcuwIrm4rKfVEWId6In6rzVY6Xum0y9u
https://www.youtube.com/watch?v=neko6u1vHcY&list=PLTd5ehIj0goNQNCgtu-M2oGGpyQ1m6nxo
*/

// now passing view engine as middleware to app

app. use(viewEngine(oakAdapter, ejsEngine))

// Now we can set our router

const router = new Router();

router
.get("/probabilidad_comportamiento",async (ctx)=>{//https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
    let query = ctx.request.url.searchParams
    console.log("/simplex")
    console.log(query.get("filas"))
    console.log(query.get("columnas"))

    ctx.render('views/index.ejs',{personas})
})
.get("/probabilidad_comportamiento/:persona",async (ctx)=>{
    console.log(ctx.params.persona)
    let personaAnalizar = {comportamientos:ctx.params.persona?coleccionPersonasComportamientosPorcentajes.get(ctx.params.persona):undefined,
    nombre:ctx.params.persona}
    console.log(personaAnalizar)
    ctx.render('views/index.ejs',{personas,personaAnalizar})

})
.get("/ventana_probabilidad_comportamiento",async (ctx)=>{//https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
    let query = ctx.request.url.searchParams
    console.log("/simplex")
    console.log(query.get("filas"))
    console.log(query.get("columnas"))

    ctx.render('views/ventana.ejs',{personas})
})
.get("/ventana_probabilidad_comportamiento/:persona",async (ctx)=>{
    console.log(ctx.params.persona)
    let personaAnalizar = {comportamientos:ctx.params.persona?coleccionAgrupacionPuntajesHonary.get(ctx.params.persona):undefined,
    nombre:ctx.params.persona}
    console.log(personaAnalizar)
    ctx.render('views/ventana.ejs',{personas,personaAnalizar})

})
// .post("/probabilidad_comportamiento", async(context:RouterContext)=>{//https://doc.deno.land/builtin/stable#URLSearchParams
//     const { value } = context.request.body();
//     const params  = await value;
//     console.log(params)
//     console.log(params.getAll("z"))
//     let z:Ecuation = {sol:0,x:params.getAll("z").map((x:string)=> Number(x)*-1)} 
//     let a:number[] = params.getAll("a").map(Number)

//     switch (params.get("tipoSimplex")) {
//         case "0":
          
//             break;
//         case "1":
//             a = a.map(x=>x*-1)
//         break;
    
//         default:
//             break;
//     }
//     console.log({z})

//     console.log(params.getAll("a"))
//     console.log({a})

//     // let ecuation:Ecuation[]=[];
//     let fila:number[] = []; 
//     let filas:number[][] =[];
//     do{
//         if(fila.length <= z.x.length ){
//             // console.log(fila.length , z.x.length)
//             fila.push(a.splice(0,1)[0])
//         }else{
//             filas.push(fila)
//             // console.log(filas)
//             fila = []
//         }
//         // console.log({a})
//     }while(a.length)
//     filas.push(fila)
//     fila = []
//     // console.log({filas})
//     let ecuations:Ecuation[] = filas.map(f=>{
//         return {sol:f.slice(-1)[0],x:f.slice(0,-1)}
//     })
//     let matrix:VariableSimple = {z,ecuations}
//     console.log({matrix})
//     console.log(matrix.ecuations)
//     let titulo:string = "no selecciono tipo de simplex"
//     let operacion:solucionSimples = {z:0,x:[]};
//    console.log("tipoSimplex:", params.getAll("tipoSimplex"))
//     switch (params.get("tipoSimplex")) {
//         case "0":
//             titulo = "simplex primal"
//             operacion = metodoSimplexprimal(matrix).solucion
//             break;
//         case "1":
//             titulo = "simplex dual"
//             operacion = metodoSimplexDual(matrix).solucion

//         break;
    
//         default:
//             break;
//     }
//     console.log({operacion})
//     context.response.body = //html
//     `
//     <!DOCTYPE html>
//         <html>
//         <head>
 
//         </head>
//         <body>
//             <h1>Resultado de ${ titulo}</h1> <br>
//             <p>solucion Z ${operacion.z} <p>
            
//             <ul>
//                 ${operacion.x.map(x=>`<li> el valor de x${x.c+1} es ${x.f} </li>`)}
//             </ul>
//         </body>
//     </html>
//     `
// })

// Now pass our router as a middleware to our app

app.use(router.routes());
app.use(router.allowedMethods());


app.listen({port:8000});
console.log("running")
