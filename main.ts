import {probabilidadComportamiento,observacionComportamiento,ventanaJohari,ventanaDeHonaryConteoComportamientos,ventanaDeHonaryProbabilidadComportamientos} from './ventanaJohari/ventanaJohariBase.ts';
let tabla:string[][]= []
for await (const dirEntry of Deno.readDir("data_base")) {//https://doc.deno.land/builtin/stable
    console.log(dirEntry.name);
    const decoder = new TextDecoder('utf-8');
    let lectura:string = await decoder.decode(await Deno.readFile("data_base/"+dirEntry.name));
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
 console.log({tablaConvertida});
// console.log(coleccionPersonasComportamientos)
 let coleccionPersonasComportamientosPorcentajes:Map<string, (string | number)[][]> = probabilidadComportamiento(tablaConvertida);
// console.log([...coleccionPersonasComportamientosPorcentajes])
// export {coleccionPersonasComportamientosPorcentajes}

// console.log([...ventanaJohari(tablaConvertida)]);

[...ventanaDeHonaryProbabilidadComportamientos(tablaConvertida)].forEach(f=>{
  console.log("ventandaconteo",f[0],
  "abierta",f[1].abierta.length?f[1].abierta.map(a=>a[1]).reduce((a,b)=>a+b):0,
  "ciega",f[1].ciega.length?f[1].ciega.map(a=>a[1]).reduce((a,b)=>a+b):0,
  "oculta",f[1].oculta.length?f[1].oculta.map(a=>a[1]).reduce((a,b)=>a+b):0,
  "desconocida",f[1].desconocida.length?f[1].desconocida.map(a=>a[1]).reduce((a,b)=>a+b):0

  )
})