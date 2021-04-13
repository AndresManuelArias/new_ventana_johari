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
function buscarOpinionesOtrosDeEsteEvaluado(baseDeDatos:observacionComportamiento[],nombreEvaluado:string):observacionComportamiento[]{
    return baseDeDatos.filter(calificacion =>  calificacion.quien_es_descrito === nombreEvaluado);
}
function calificadoresDistintos(baseDeDatos:observacionComportamiento[]):observacionComportamiento[]{
    return baseDeDatos.filter(calificacion => calificacion.el_que_describe !== calificacion.quien_es_descrito);
}

export function probabilidadComportamiento(tabla:observacionComportamiento[]):Map<string, (string | number)[][]>{
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


// export function ventanaJohari(array:observacionComportamiento[]){
//     let opinionPropiaDeUsuario = calificadoresIguales(array);
//     let opinionOtros = calificadoresDistintos(array);
//     //  console.log(opinionOtros)
//     let organizacionUsuarioCalificaciones = agruparOpinionPropiaConOtros(opinionPropiaDeUsuario,opinionOtros);
//     let resultadoVentanaHonary =  agruparDatosCadaZona(organizacionUsuarioCalificaciones);
//     // resultadoVentanaHonary.forEach((usuario)=>{
//     //     console.log(usuario['nombre usuario'],usuario['ventana de johari']);
//     // });
//     return resultadoVentanaHonary;
// }
interface  AgrupacionOpinion{
    usuario: string
    opinionPropios: never[]
    opinionOtros: never[]
}
// export function agruparOpinionPropiaConOtros(opinionPropia:observacionComportamiento[],opinionOtros:observacionComportamiento[]){
//     let coleccionUsuarios = [];
//     opinionPropia.forEach((usuario)=>{
//        let agrupacionOpinionUsuario =  {usuario:usuario.quien_es_descrito,opinionPropios:[],opinionOtros:[]};
//        let opinionOtrosEsteEvaluado =   buscarOpinionesOtrosDeEsteEvaluado(opinionOtros,usuario.quien_es_descrito);
//         //   console.log(opinionOtrosEsteEvaluado);
//         // let tranformaUsuario = usuario;
//        let calificacionesPropia = usuario.características // quitarUnaParteDelJson(tranformaUsuario,['evaluador','evaluado','fecha','entorno']);
//     //    console.log(calificacionesPropia);
//        for(let calificacion in  calificacionesPropia){
//             agrupacionOpinionUsuario
//                 .opinionPropios
//                     .push({comportamiento:calificacion,puntaje:calificacionesPropia[calificacion]});
//             agrupacionOpinionUsuario
//                 .opinionOtros
//                     .push(agrupacionPuntajes({
//                         calificacion:calificacionesPropia[calificacion],
//                         propiedad:calificacion}, opinionOtrosEsteEvaluado));
//        }
//     //    console.log(agrupacionPuntajesUsuario);
//        coleccionUsuarios.push(agrupacionPuntajesUsuario);
//    });
//    return coleccionUsuarios;
// }
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
// function agruparDatosCadaZona(organizacionUsuarioCalificaciones) {
//     let usuarios = [];
//     // console.log(organizacionUsuarioCalificaciones);
//     organizacionUsuarioCalificaciones.forEach((usuario)=>{
//         let personalidad =   {};
//         personalidad['nombre usuario'] = usuario.usuario;
//         personalidad['ventana de johari'] = {
//             'abierta':[],
//             'ciega':[],
//             'oculta':[],
//             'desconocida':[]
//         };
//         // console.log(usuario);
//         usuario.puntajesPropios.forEach((observacionPropia)=>{
//             // console.log(observacionPropia)
//             let observacionComportamientosDeOtros = usuario
//                                                         .puntajesOtros
//                                                         .filter((observacionOtros)=> observacionOtros.comportamiento === observacionPropia.comportamiento );
//             let respuestaZonaAbierta = zonaAbierta(observacionPropia, observacionComportamientosDeOtros[0].puntaje);
//             // console.log(respuestaZonaAbierta)
//             if( respuestaZonaAbierta.resultado) { 
//                 personalidad['ventana de johari']
//                     .abierta.push({
//                         comportamiento:observacionPropia.comportamiento,
//                         puntaje:respuestaZonaAbierta.puntaje});
//                 // console.log(observacionComportamientosDeOtros,observacionPropia );
//             }
//             let respuestaZonaCiega = zonaCiega(observacionPropia, observacionComportamientosDeOtros[0].puntaje);
//             // console.log(respuestaZonaAbierta)
//             if( respuestaZonaCiega.resultado) { 
//                 personalidad['ventana de johari']
//                     .ciega.push({comportamiento:observacionPropia.comportamiento,puntaje:respuestaZonaCiega.puntaje});
//                 // console.log(observacionComportamientosDeOtros,observacionPropia );
//             }
//             let respuestaZonaOculta = zonaOculta(observacionPropia, observacionComportamientosDeOtros[0].puntaje);
//             // console.log(respuestaZonaAbierta)
//             if( respuestaZonaOculta.resultado) { 
//                 personalidad['ventana de johari']
//                     .oculta.push({
//                         comportamiento:observacionPropia.comportamiento,
//                         puntaje:respuestaZonaOculta.puntaje
//                     });
//                 // console.log(observacionComportamientosDeOtros,observacionPropia );
//             }
//             let respuestaZonaDesconocida = zonaDesconocida(observacionPropia, observacionComportamientosDeOtros[0].puntaje);
//             // console.log(respuestaZonaAbierta)
//             if( respuestaZonaDesconocida.resultado) { 
//                 personalidad['ventana de johari']
//                     .desconocida
//                     .push({comportamiento:observacionPropia.comportamiento,puntaje:respuestaZonaDesconocida.puntaje});
//                 // console.log(observacionComportamientosDeOtros,observacionPropia );
//             }
            
//         });
//         usuarios.push(personalidad);
//     });
//     return usuarios;
// }