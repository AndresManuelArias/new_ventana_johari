//servidor

import {Application, Router, send,RouterContext,helpers} from "https://deno.land/x/oak@v6.2.0/mod.ts";
import {  viewEngine,
    engineFactory,
    adapterFactory} from  "https://deno.land/x/view_engine@v1.4.5/mod.ts";
import {probabilidadComportamiento,observacionComportamiento,ventanaDeHonaryConteoComportamientos,ventanaDeHonaryProbabilidadComportamientos} from '../ventanaJohari/ventanaJohariBase.ts';
// let tabla:string[][]= []
// const decoder = new TextDecoder('utf-8');
// for await (const dirEntry of Deno.readDir("../data_base")) { 
//     console.log(dirEntry.name);
//     let lectura:string = await decoder.decode(await Deno.readFile("../data_base/"+dirEntry.name));
//     // console.log(lectura)
//     tabla = tabla.concat(lectura.split("\r\n").map(fila=>fila.split("\t").concat(dirEntry.name)).slice(1))
//     // console.log(tabla)
//   }
// let tablaConvertida:{fecha:string
//     características:string[]
//     el_que_describe:string
//     quien_es_descrito:string
//     lugar:string}[] = tabla.map(fila=>{return {
//     fecha:fila[0],
//     características:fila[1].split(", "),
//     el_que_describe:fila[2],
//     quien_es_descrito:fila[3],
//     lugar:fila[4].slice(0,-4)
//  }})
// let coleccionPersonasComportamientosPorcentajes:Map<string, (string | number)[][]> = probabilidadComportamiento(tablaConvertida)
// let personas = new Set([...coleccionPersonasComportamientosPorcentajes.keys()])
// let grupos = new Set(tablaConvertida.map(l=>l.lugar))
// let grupoMap = new Map([...grupos.keys()].map((a,i)=>[a,i+1]))
// let coleccionAgrupacionPuntajesHonary = ventanaDeHonaryProbabilidadComportamientos(tablaConvertida)
// let comportamientosMap:Map<string,string> = new Map([...new Set(tablaConvertida.flatMap(f=>f.características))].map(f=>[f,`rgb(${Math.floor(Math.random() *255)}, ${Math.floor(Math.random() *255)}, ${Math.floor(Math.random() *255)})`]))
// // now setting app
const app = new Application();


// now set view engine as   EJS
const ejsEngine = await engineFactory.getEjsEngine();//https://ejs.co/

const oakAdapter = await adapterFactory.getOakAdapter();
/*falta crear archivos estaticos y probar wetcomponen https://www.youtube.com/watch?v=8bcfgXePHnk
 https://www.youtube.com/watch?v=dEZXx2FVBdQ&list=PLIcuwIrm4rKfVEWId6In6rzVY6Xum0y9u
https://www.youtube.com/watch?v=neko6u1vHcY&list=PLTd5ehIj0goNQNCgtu-M2oGGpyQ1m6nxo
*/

// now passing view engine as middleware to app

app.use(viewEngine(oakAdapter, ejsEngine))

// Now we can set our router

const router = new Router();


router
// .get("/grafos",async (ctx)=>{
//     console.log("/grafos")
//     let paramts = ctx.request.url.searchParams
//     let query=   helpers.getQuery(ctx, { mergeParams: true });
//     let tablaFiltrada   =tablaConvertida;
//     // console.log(tablaFiltrada)
//     let arrayNodes = [...personas]
//     let mapNodes = new Map(arrayNodes.map((a,i)=>[a,i]))

//     if(paramts.getAll("personas").length){
//         let arrayPersonas =paramts.getAll("personas")
//         tablaFiltrada = tablaFiltrada.filter(t=>arrayPersonas.some(a=>a==t.el_que_describe))
//         arrayNodes = [...new Set(tablaFiltrada.map(f=>f.quien_es_descrito).concat(arrayPersonas))]
//     }
//     console.log({arrayNodes})
//     console.log({tablaFiltrada})
//     console.log({grupoMap})

//     let nodes:{id:number,label:string}[] =arrayNodes.map((nombre,i)=>{
//         let nombreLUgar = tablaFiltrada.find(a=>a.el_que_describe==nombre)?.lugar||""
//         let group = nombreLUgar?grupoMap.get(nombreLUgar):0;
//         let id = mapNodes.get(nombre)||0
//         return {id,label:nombre,group}
//     })
//     console.log({mapNodes})
//     let edges = 
//       tablaFiltrada.flatMap(t=>{
//         let from = mapNodes.get(t.el_que_describe)
//         let to = mapNodes.get(t.quien_es_descrito)
   
//         return t.características.map(c=>{
       
//             return { from, to ,relation:c, label:c,arrows:"to",color:  comportamientosMap.get(c) }
//         })
//       }).map((f,i,m)=>{
//         let index = m.findIndex(n=> f.from==n.to && f.to==n.from && n.relation==f.relation)

//         if(index>0){
//             m.splice(index,1)
//             return {...f ,arrows:"to, from" }
//         }else{
//             return f
//         }
//   })
//     //   .slice(1,5)

//     // console.log(edges)

//     ctx.render('views/grafos.ejs',{nodes,edges,personas})
// })
// .get("/grafos/:lugar",async (ctx)=>{
//     console.log("/grafos/:lugar")
//    let query=   helpers.getQuery(ctx, { mergeParams: true });
//    let paramts = ctx.request.url.searchParams

//     let lugarTablaConvertida = tablaConvertida.filter(f=>f.lugar==ctx.params.lugar)
//     if(paramts.getAll("personas").length){
//         let arrayPersonas =paramts.getAll("personas")
//         lugarTablaConvertida = lugarTablaConvertida.filter(t=>arrayPersonas.some(a=>a==t.el_que_describe))
//     }
//     let  arrayNodes = [...new Set(lugarTablaConvertida.map(l=>l.el_que_describe).concat(lugarTablaConvertida.map(l=>l.quien_es_descrito)))]
//     console.log(arrayNodes)
//     let nodes:{id:number,label:string}[] =arrayNodes.map((t,i)=>{
//                 // let group = grupoMap.get(t.)

//         return {id:i,label:t,group:0}
//     })
//     let mapNodes = new Map(arrayNodes.map((a,i)=>[a,i]))
//     console.log(mapNodes)
//     let edges = 
//     lugarTablaConvertida.flatMap(t=>{
//         return t.características.map(c=>{
//             let from = mapNodes.get(t.el_que_describe)
//             let to = mapNodes.get(t.quien_es_descrito)
//             console.log({from},t.el_que_describe,
//                 {to},t.quien_es_descrito)
//             return { from, to ,label:c,relation:c,arrows:"to",color:  comportamientosMap.get(c) }
//         })
//       }).map((f,i,m)=>{
//             let index = m.findIndex(n=> f.from==n.to && f.to==n.from && n.relation==f.relation)
//             if(index>0){
//                 m.splice(index,1)
//                 return {...f ,arrows:"to, from" }
//             }else{
//                 return f
//             }
//       })
//     //   .slice(1,5)

//     console.log(edges)
//    console.log({query})

//     ctx.render('views/grafos.ejs',{nodes,edges,personas})
// })
// .get("/probabilidad_comportamiento",async (ctx)=>{//https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
//     let query = ctx.request.url.searchParams
//     console.log("/simplex")
//     console.log(query.get("filas"))
//     console.log(query.get("columnas"))

//     ctx.render('views/index.ejs',{personas})
// })
// .get("/probabilidad_comportamiento/:persona",async (ctx)=>{
//     console.log(ctx.params.persona)
//     let personaAnalizar = {comportamientos:ctx.params.persona?coleccionPersonasComportamientosPorcentajes.get(ctx.params.persona):undefined,
//     nombre:ctx.params.persona}
//     console.log(personaAnalizar)
//     ctx.render('views/index.ejs',{personas,personaAnalizar})

// })
// .get("/ventana_probabilidad_comportamiento",async (ctx)=>{//https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
//     let query = ctx.request.url.searchParams
//     console.log("/simplex")
//     console.log(query.get("filas"))
//     console.log(query.get("columnas"))

//     ctx.render('views/ventana.ejs',{personas})
// })
// .get("/ventana_probabilidad_comportamiento/:persona",async (ctx)=>{
//     console.log(ctx.params.persona)
//     let personaAnalizar = {comportamientos:ctx.params.persona?coleccionAgrupacionPuntajesHonary.get(ctx.params.persona):undefined,
//     nombre:ctx.params.persona}
//     console.log(personaAnalizar)
//     ctx.render('views/ventana.ejs',{personas,personaAnalizar})

// })

//------------------------------------------------------------------------------


.get("/ricardo",async (ctx)=>{
    
    ctx.render('src/views/miPrueba.ejs')

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
