/**
 falta hacer lo de los nodos y la evolucion del tiempo de los comportamientos
 */
type Zonas ={
[key: string]: Map<string,number[]>
zonaAbierta:Map<string,number[]>
zonaCiega:Map<string,number[]>
zonaOculta:Map<string,number[]>
zonaDesconocida:Map<string,number[]>
}
type Zonasjson ={
[key: string]: number[]
zonaAbierta:number[]
zonaCiega:number[]
zonaOculta:number[]
zonaDesconocida:number[]
}
type fila = {
[key: string]: any
}
export interface observacionComportamiento { 
    fecha:string
    el_que_describe:string
    características:string[]// para poder crear una campana de gaust se requiere que cada comportamiento posea un puntaje
    quien_es_descrito:string
}
function calificadoresIguales(baseDeDatos:observacionComportamiento[]):observacionComportamiento[]{
    return baseDeDatos.filter(calificacion => calificacion.el_que_describe === calificacion.quien_es_descrito);
}
function buscarOpinionesDelEsteEvaluado(baseDeDatos:observacionComportamiento[],nombreEvaluado:string):observacionComportamiento[]{
    return baseDeDatos.filter(calificacion =>  calificacion.quien_es_descrito === nombreEvaluado);
}
function calificadoresDistintos(baseDeDatos:observacionComportamiento[]):observacionComportamiento[]{
    return baseDeDatos.filter(calificacion => calificacion.el_que_describe !== calificacion.quien_es_descrito);
}
function conteoComportamientos(tabla:observacionComportamiento[]):Map<string, [[string, number]]>{
    let colecionComportamientos = new Map<string,number>();
    tabla.forEach((fila:observacionComportamiento,index)=>{//colecionComportamientos va a guardar los comportamientos de cada persona  que son nombradas como las caracteristicas
        fila.características.forEach(comportamientos=>{
            console.log(index,colecionComportamientos.has([fila.quien_es_descrito,comportamientos].join("-")),[fila.quien_es_descrito,comportamientos])
            if(colecionComportamientos.has([fila.quien_es_descrito,comportamientos].join("-"))){
                let conteo:number = colecionComportamientos.get([fila.quien_es_descrito,comportamientos].join("-"))||0
                console.log({conteo},conteo>0)
                colecionComportamientos.set([fila.quien_es_descrito,comportamientos].join("-"),++conteo)
                console.log(colecionComportamientos.get([fila.quien_es_descrito,comportamientos].join("-")))
            }else{
                colecionComportamientos.set([fila.quien_es_descrito,comportamientos].join("-"),1)
            }
        })
    })
    // console.log(colecionComportamientos)    
    let tablaComportamientos:(string|number)[][]= [...colecionComportamientos.entries()].map(fila=>[fila[0].split("-"),fila[1]].flat())
    console.log(tablaComportamientos);
    // console.log(tablaComportamientos.map(fila=>[fila[0],fila.slice(1)]))
    let coleccionPersonasComportamientos = new Map<string, [[string,number]] >()    
    tablaComportamientos.forEach(fila=>{// se va a crear un Map de los comportamientos de cada persona
        // console.log(fila)
        if(coleccionPersonasComportamientos.has(fila[0]+"")){
        coleccionPersonasComportamientos.get(fila[0]+"")?.push([fila[1]+"",Number(fila[2])])
        // console.log(coleccionPersonasComportamientos.get(fila[0]+""))

        }else{
        coleccionPersonasComportamientos.set(fila[0]+"",[[fila[1]+"",Number(fila[2])]])    
        }
    })
    return coleccionPersonasComportamientos 
}
export function probabilidadComportamiento(tabla:observacionComportamiento[]):Map<string, (string | number)[][]>{
 
    let coleccionPersonasComportamientos:Map<string, [[string,number]] > = conteoComportamientos(tabla);
    // console.log(coleccionPersonasComportamientos)
    let coleccionPersonasComportamientosPorcentajes =  new Map<string, (string | number)[][]>()
    for (let [key, value] of coleccionPersonasComportamientos.entries()) {
        let total =  value.map(f=>f[1]).reduce((a,b)=> a+b)
        console.log(key,        value,        total)
        let nuevoArray =  coleccionPersonasComportamientos.get(key)?.map((f:[string,number])=>[f[0],f[1]/total])||[]
        // coleccionPersonasComportamientos.set(key,nuevoArray|[])
        coleccionPersonasComportamientosPorcentajes.set(key,nuevoArray.sort((a,b)=>Number(b[1])-Number(a[1])))
        // console.log({nuevoArray})
        // console.log(coleccionPersonasComportamientos.get(key))
    }
    return coleccionPersonasComportamientosPorcentajes
}
export function ventanaDeHonaryConteoComportamientos(array:observacionComportamiento[]):Map<string, Ventana>{
    let conteoColeccion:  Map<string,Map<string, number> > = new Map([...conteoComportamientos(array)].map(persona=> [persona[0], new Map(persona[1])] ));
    return new Map([...ventanaJohari(array)].map(persona=>{
        let zonas:any = persona[1];
         zonas = {...zonas,
            abierta:persona[1].abierta.map(comportamiento=> [comportamiento,conteoColeccion.get(persona[0])?.get(comportamiento)] ),
            ciega:persona[1].ciega.map(comportamiento=> [comportamiento,conteoColeccion.get(persona[0])?.get(comportamiento)] ),
            oculta:persona[1].oculta.map(comportamiento=> [comportamiento,conteoColeccion.get(persona[0])?.get(comportamiento)] )
         }
        return [persona[0],zonas]
    }))
    
}
export function ventanaDeHonaryProbabilidadComportamientos(array:observacionComportamiento[]):Map<string, Ventana>{
    let conteoCompor = conteoComportamientos(array);
    let conteoColeccion:  Map<string,Map<string, number> > = new Map([...conteoCompor].map(persona=> [persona[0], new Map(persona[1])] ));
    return new Map([...ventanaJohari(array)].map(persona=>{
        let zonas:any = persona[1];
 
         zonas = {...zonas,
            abierta:persona[1].abierta.map(comportamiento=> [comportamiento,conteoColeccion.get(persona[0])?.get(comportamiento)] ),
            ciega:persona[1].ciega.map(comportamiento=> [comportamiento,conteoColeccion.get(persona[0])?.get(comportamiento)] ),
            oculta:persona[1].oculta.map(comportamiento=> [comportamiento,conteoColeccion.get(persona[0])?.get(comportamiento)] ),
            desconocida: conteoCompor.get(persona[0])//
         };
         let conteo_abierta:number = zonas.abierta.length? zonas.abierta.map((f:[string,number])=>f[1]).reduce((a:number,b:number)=>a+b):1
         let conteo_ciega:number = zonas.ciega.length?  zonas.ciega.map((f:[string,number])=>f[1]).reduce((a:number,b:number)=>a+b):1
         let conteo_oculta:number = zonas.oculta.length?zonas.oculta.map((f:[string,number])=>f[1]).reduce((a:number,b:number)=>a+b):1
         let conteo_desconocida:number|undefined = zonas.desconocida.length?conteoCompor.get(persona[0])?.map(f=>f[1]).reduce((a,b)=>a+b):1
        let conteo_desconocidaNOunde:number = conteo_desconocida?conteo_desconocida:1
         zonas = {...zonas,
            abierta:zonas.abierta.map((comportamiento:[string,number])=> [comportamiento[0],comportamiento[1]/conteo_abierta*100] ).sort((a:[string,number],b:[string,number])=>Number(b[1])-Number(a[1])),
            ciega:zonas.ciega.map((comportamiento:[string,number])=> [comportamiento[0],comportamiento[1]/conteo_ciega*100] ).sort((a:[string,number],b:[string,number])=>Number(b[1])-Number(a[1])),
            oculta:zonas.oculta.map((comportamiento:[string,number])=> [comportamiento[0],comportamiento[1]/conteo_oculta*100] ).sort((a:[string,number],b:[string,number])=>Number(b[1])-Number(a[1])),
            desconocida: zonas.desconocida.map((comportamiento:[string,number])=> [comportamiento[0],comportamiento[1]/conteo_desconocidaNOunde*100] ).sort((a:[string,number],b:[string,number])=>Number(b[1])-Number(a[1]))
         };
         return [persona[0],zonas]
    }))
    
}
export function ventanaJohari(array:observacionComportamiento[]):Map<string, Ventana>{
    let opinionPropiaDeUsuario = calificadoresIguales(array);
    // console.log({opinionPropiaDeUsuario})
    let opinionOtros = calificadoresDistintos(array);
    // console.log({opinionOtros})
    let organizacionUsuarioCalificaciones = agruparOpinionPropiaConOtros(opinionPropiaDeUsuario,opinionOtros);
    // console.log({organizacionUsuarioCalificaciones})
    let resultadoVentanaHonary =  agruparDatosCadaZona(organizacionUsuarioCalificaciones);
    // console.log([...resultadoVentanaHonary.entries()])
    return resultadoVentanaHonary;
}
interface  AgrupacionOpinion{
    usuario: string
    opinionPropios:string[]
    opinionOtros:string[]
}
export function agruparOpinionPropiaConOtros(opinionesPropias:observacionComportamiento[],opinionOtros:observacionComportamiento[]):AgrupacionOpinion[]{
    let usuarios = new Set(opinionesPropias.map(f=>f.el_que_describe))
    let coleccionUsuarios:AgrupacionOpinion[] = [];
    usuarios.forEach((usuario)=>{
       let opinionOtrosEsteEvaluado =   buscarOpinionesDelEsteEvaluado(opinionOtros,usuario).flatMap(f=>f.características);
        let opinionPropia = buscarOpinionesDelEsteEvaluado(opinionesPropias,usuario).flatMap(f=>f.características);
       //    console.log({opinionOtrosEsteEvaluado});
       let agrupacionOpinionUsuario:AgrupacionOpinion =  {
           usuario:usuario,
           opinionPropios:opinionPropia,
           opinionOtros:opinionOtrosEsteEvaluado};
        // console.log(agrupacionOpinionUsuario);
        coleccionUsuarios.push(agrupacionOpinionUsuario)
   });
   return coleccionUsuarios;
}
// function agrupacionPuntajes(opinonPropia,opinionesOtros){
//     // console.log(opinonPropia)
//    let coleccionAgrupacionPuntajes = [];
//    opinionesOtros.forEach((opinion)=>{
//     //    console.log(Object.keys(opinion))
//     /*    console.log(opinonPropia.propiedad,opinonPropia.calificacion , 
//      opinion[opinonPropia.propiedad])*/
//        coleccionAgrupacionPuntajes.push(opinion[opinonPropia.propiedad]);
//     });
//     return {comportamiento:opinonPropia.propiedad,puntaje:coleccionAgrupacionPuntajes};
// }
interface Ventana {
    abierta:string[]
    ciega:string[]
    oculta:string[]
    desconocida:string[]
}
function agruparDatosCadaZona(organizacionUsuarioCalificaciones:AgrupacionOpinion[]):Map<string,Ventana> {
    let usuarios = new Map<string,Ventana>();
    // console.log(organizacionUsuarioCalificaciones);
    organizacionUsuarioCalificaciones.forEach((usuario)=>{
        // personalidad['nombre usuario'] = usuario.usuario;
        let ventana_de_johari:Ventana = {
            'abierta':[],
            'ciega':[],
            'oculta':[],
            'desconocida':[]
        };
        let respuestaZonaAbierta = zonaAbiertaOpinion({opinionesOtros:usuario.opinionOtros,opinionesPropia:usuario.opinionPropios});
        // console.log({respuestaZonaAbierta})
        ventana_de_johari.abierta = respuestaZonaAbierta;
        let respuestaZonaCiega = zonaCiegaOpinion({opinionesOtros:usuario.opinionOtros,opinionesPropia:usuario.opinionPropios});
        // console.log({respuestaZonaCiega})
        ventana_de_johari.ciega = respuestaZonaCiega;
        let respuestaZonaOculta = zonaOcultaOpinion({opinionesOtros:usuario.opinionOtros,opinionesPropia:usuario.opinionPropios});
        // console.log({respuestaZonaOculta})
        ventana_de_johari.oculta= respuestaZonaOculta;
        usuarios.set(usuario.usuario,ventana_de_johari)
    });
    return usuarios;
}
export interface Opinion{
    opinionesPropia:string[]
    opinionesOtros:string[]
}

export function zonaAbiertaOpinion(opinion:Opinion):string[]{
  return  [... new Set(opinion.opinionesPropia.filter(opinionPropia => opinion.opinionesOtros.some(opinionOtro=> opinionPropia ==    opinionOtro ) ))]
 }
export function zonaCiegaOpinion(opinion:Opinion):string[]{
  return  [... new Set(opinion.opinionesOtros .filter(opinionOtro => !opinion.opinionesPropia.some(opinionPropia => opinionPropia ==    opinionOtro ) ))]
 }
 
export function zonaOcultaOpinion(opinion:Opinion):string[]{
    return  [... new Set(opinion.opinionesPropia.filter(opinionPropia => !opinion.opinionesOtros.some(opinionOtro=> opinionPropia ==    opinionOtro ) ))]
 }
//  function zonaDesconocida(arrayPuntajesPropios, arrayPuntajerOtros){
//      let puntajePropio =  arrayPuntajesPropios.puntaje;
//      let puntajeOtros = arrayPuntajerOtros.reduce( (datoAnterio,datoAhora) => datoAnterio+datoAhora);
//   //    console.log(puntajeOtros,puntajePropio)
//       let promedioPuntaje = (puntajePropio+puntajeOtros)/(arrayPuntajerOtros.length+1);
//      return { resultado : puntajePropio === 0 && puntajeOtros === 0 , puntaje: promedioPuntaje};
//  }
 