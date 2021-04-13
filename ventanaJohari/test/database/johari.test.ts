import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

let dattos = []
dattos.forEach((data:datosProbarModificacionMatrix,index)=>{
    Deno.test(`Metodo de Gaust  Jordan${index}`, () => {
        assertEquals(metodoGaustJordan(data.matrix),data.resultado)
    });
})