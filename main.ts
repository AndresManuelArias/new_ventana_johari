import {probabilidadComportamiento,observacionComportamiento} from './ventanaJohari/ventanaJohariBase.ts';
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
 console.log({tablaConvertida})
// console.log(coleccionPersonasComportamientos)
 let coleccionPersonasComportamientosPorcentajes:Map<string, (string | number)[][]> = probabilidadComportamiento(tablaConvertida)
console.log([...coleccionPersonasComportamientosPorcentajes])
export {coleccionPersonasComportamientosPorcentajes}