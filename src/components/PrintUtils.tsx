// Utilidades para impresión en impresoras matriciales
// Formato optimizado para impresoras de 80mm (típicas de punto de venta)

export interface NotaImpresion {
  id: string;
  cliente: {
    codigo: string;
    nombre: string;
    razonSocial?: string;
    nif?: string;
    direccion?: string;
    telefono?: string;
  };
  articulos: {
    nombre: string;
    cantidad: string | number;
    valor: string;
    descuento?: string;
  }[];
  totales: {
    descuentos: string;
    iva: string;
    total: string;
  };
  tipoNota?: string;
  formaPago?: string;
  fecha?: string;
}

export interface GastoImpresion {
  id: string;
  nombre: string;
  categoria: string;
  precio: string;
  fecha: string;
}

export interface CobroImpresion {
  id: string;
  cliente: string;
  notas: any[];
  metodoPago: string;
  subtotal: number;
  fecha: string;
}

// Función para formatear texto a ancho fijo (matricial)
const padText = (text: string | number | undefined | null, width: number, align: 'left' | 'right' | 'center' = 'left'): string => {
  // Convertir a string y manejar valores undefined/null
  const str = String(text || '');
  const cleanText = str.substring(0, width);
  const padding = width - cleanText.length;
  
  if (align === 'right') {
    return ' '.repeat(padding) + cleanText;
  } else if (align === 'center') {
    const leftPad = Math.floor(padding / 2);
    const rightPad = padding - leftPad;
    return ' '.repeat(leftPad) + cleanText + ' '.repeat(rightPad);
  }
  return cleanText + ' '.repeat(padding);
};

// Línea separadora
const separator = (char: string = '-', width: number = 42): string => char.repeat(width);

// Generar texto para impresión de Nota de Venta
export const generarTextoNotaVenta = (nota: NotaImpresion): string => {
  const width = 42; // Ancho típico para impresoras de 80mm
  let texto = '\n';
  
  // Encabezado
  texto += padText('4VENTAS', width, 'center') + '\n';
  texto += padText('NOTA DE VENTA', width, 'center') + '\n';
  texto += separator('=', width) + '\n\n';
  
  // Info de la nota
  texto += padText(`Nota: ${nota.id}`, width) + '\n';
  texto += padText(`Fecha: ${nota.fecha || new Date().toLocaleDateString('es-ES')}`, width) + '\n';
  texto += separator('-', width) + '\n\n';
  
  // Cliente
  texto += padText('CLIENTE:', width) + '\n';
  texto += padText(`[${nota.cliente.codigo}] ${nota.cliente.nombre}`, width) + '\n';
  if (nota.cliente.razonSocial) {
    texto += padText(nota.cliente.razonSocial, width) + '\n';
  }
  if (nota.cliente.nif) {
    texto += padText(`NIF: ${nota.cliente.nif}`, width) + '\n';
  }
  if (nota.cliente.direccion) {
    texto += padText(nota.cliente.direccion, width) + '\n';
  }
  texto += separator('-', width) + '\n\n';
  
  // Tipo de nota y forma de pago
  if (nota.tipoNota) {
    texto += padText(`Tipo: ${nota.tipoNota}`, width) + '\n';
  }
  if (nota.formaPago) {
    texto += padText(`Pago: ${nota.formaPago}`, width) + '\n';
  }
  texto += separator('-', width) + '\n\n';
  
  // Artículos - Encabezado
  texto += padText('ARTICULO', 22) + padText('CANT', 6, 'right') + padText('PRECIO', 14, 'right') + '\n';
  texto += separator('-', width) + '\n';
  
  // Artículos - Lista
  nota.articulos.forEach(art => {
    const nombre = String(art.nombre || '').substring(0, 22);
    const cantidad = String(art.cantidad || '');
    
    // Manejar tanto formato antiguo (valor) como nuevo (precioUnitario)
    let precio = art.valor || '';
    if (!precio && art.precioUnitario !== undefined) {
      // Calcular precio total con descuento para el nuevo formato
      const subtotal = art.precioUnitario * (art.cantidad || 1);
      let descuentoAplicado = 0;
      
      if (art.descuento > 0) {
        if (art.tipoDescuento === 'porcentaje') {
          descuentoAplicado = (subtotal * art.descuento) / 100;
        } else {
          descuentoAplicado = art.descuento * (art.cantidad || 1);
        }
      }
      
      precio = (subtotal - descuentoAplicado).toFixed(2) + ' €';
    }
    
    texto += padText(nombre, 22) + padText(cantidad, 6, 'right') + padText(precio, 14, 'right') + '\n';
    
    // Mostrar descuento si existe
    if (art.descuento) {
      const descStr = art.tipoDescuento === 'porcentaje' 
        ? `-${art.descuento}%` 
        : art.descuento !== '0,00 €' && art.descuento !== '0 €' 
          ? `-${art.descuento}` 
          : '';
      
      if (descStr) {
        texto += padText('  Desc: ' + descStr, width) + '\n';
      }
    }
    
    // Mostrar nota del artículo si existe
    if (art.nota) {
      texto += padText('  Nota: ' + String(art.nota).substring(0, 35), width) + '\n';
    }
  });
  
  texto += separator('-', width) + '\n\n';
  
  // Totales
  const descuentosStr = (nota.totales?.descuentos || '0,00') + ' €';
  const ivaStr = (nota.totales?.iva || '0,00') + ' €';
  const totalStr = (nota.totales?.total || '0,00') + ' €';
  
  texto += padText('Descuentos:', 28) + padText(descuentosStr, 14, 'right') + '\n';
  texto += padText('IVA o RE:', 28) + padText(ivaStr, 14, 'right') + '\n';
  texto += separator('=', width) + '\n';
  texto += padText('TOTAL:', 28) + padText(totalStr, 14, 'right') + '\n';
  texto += separator('=', width) + '\n\n';
  
  // Pie
  texto += padText('Gracias por su compra', width, 'center') + '\n';
  texto += padText('www.4ventas.com', width, 'center') + '\n\n\n\n';
  
  return texto;
};

// Generar texto para impresión de Cobro
export const generarTextoCobro = (cobro: CobroImpresion): string => {
  const width = 42;
  let texto = '\n';
  
  texto += padText('4VENTAS', width, 'center') + '\n';
  texto += padText('RECIBO DE COBRO', width, 'center') + '\n';
  texto += separator('=', width) + '\n\n';
  
  texto += padText(`Recibo: ${cobro.id}`, width) + '\n';
  texto += padText(`Fecha: ${cobro.fecha}`, width) + '\n';
  texto += separator('-', width) + '\n\n';
  
  texto += padText('CLIENTE:', width) + '\n';
  texto += padText(cobro.cliente, width) + '\n';
  texto += separator('-', width) + '\n\n';
  
  texto += padText('NOTAS COBRADAS:', width) + '\n';
  texto += separator('-', width) + '\n';
  
  cobro.notas.forEach(nota => {
    texto += padText(nota.id, 12) + padText(String(nota.amount) + ' €', 30, 'right') + '\n';
  });
  
  texto += separator('-', width) + '\n\n';
  
  texto += padText('Metodo de Pago:', width) + '\n';
  texto += padText(cobro.metodoPago, width, 'center') + '\n\n';
  
  texto += separator('=', width) + '\n';
  texto += padText('TOTAL COBRADO:', 28) + padText(cobro.subtotal.toFixed(2) + ' €', 14, 'right') + '\n';
  texto += separator('=', width) + '\n\n';
  
  texto += padText('Gracias por su pago', width, 'center') + '\n\n\n\n';
  
  return texto;
};

// Generar texto para impresión de Resumen de Gastos
export const generarTextoResumenGastos = (gastos: GastoImpresion[], fecha: string): string => {
  const width = 42;
  let texto = '\n';
  
  texto += padText('4VENTAS', width, 'center') + '\n';
  texto += padText('RESUMEN DE GASTOS', width, 'center') + '\n';
  texto += separator('=', width) + '\n\n';
  
  texto += padText(`Fecha: ${fecha}`, width) + '\n';
  texto += separator('-', width) + '\n\n';
  
  texto += padText('CONCEPTO', 24) + padText('IMPORTE', 18, 'right') + '\n';
  texto += separator('-', width) + '\n';
  
  let total = 0;
  gastos.forEach(gasto => {
    const concepto = gasto.nombre.substring(0, 24);
    const importe = gasto.precio;
    
    // Extraer valor numérico para sumar
    const valor = parseFloat(importe.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    total += valor;
    
    texto += padText(concepto, 24) + padText(importe, 18, 'right') + '\n';
    texto += padText(`  ${gasto.categoria}`, 24) + padText(gasto.fecha, 18, 'right') + '\n';
  });
  
  texto += separator('=', width) + '\n';
  texto += padText('TOTAL:', 24) + padText(total.toFixed(2) + ' €', 18, 'right') + '\n';
  texto += separator('=', width) + '\n\n\n\n';
  
  return texto;
};

// Función para imprimir (abrir ventana de impresión del navegador)
export const imprimirTexto = (texto: string, titulo: string = 'Impresión'): void => {
  const ventanaImpresion = window.open('', '_blank', 'width=400,height=600');
  
  if (ventanaImpresion) {
    ventanaImpresion.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${titulo}</title>
          <style>
            @media print {
              @page {
                size: 80mm auto;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 5mm;
              }
            }
            body {
              font-family: 'Courier New', Courier, monospace;
              font-size: 12px;
              line-height: 1.3;
              white-space: pre;
              margin: 0;
              padding: 10px;
            }
          </style>
        </head>
        <body>${texto}</body>
      </html>
    `);
    
    ventanaImpresion.document.close();
    
    // Esperar un poco antes de imprimir
    setTimeout(() => {
      ventanaImpresion.print();
    }, 250);
  }
};

// Función específica para imprimir nota de venta
export const imprimirNotaVenta = (nota: NotaImpresion): void => {
  const texto = generarTextoNotaVenta(nota);
  imprimirTexto(texto, `Nota ${nota.id}`);
};

// Función específica para imprimir cobro
export const imprimirCobro = (cobro: CobroImpresion): void => {
  const texto = generarTextoCobro(cobro);
  imprimirTexto(texto, `Cobro ${cobro.id}`);
};

// Función específica para imprimir resumen de gastos
export const imprimirResumenGastos = (gastos: GastoImpresion[], fecha: string): void => {
  const texto = generarTextoResumenGastos(gastos, fecha);
  imprimirTexto(texto, `Gastos ${fecha}`);
};
