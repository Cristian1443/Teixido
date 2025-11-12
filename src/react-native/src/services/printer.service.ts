/**
 * Servicio de Impresión Bluetooth - React Native
 * Usa react-native-bluetooth-escpos-printer
 */

import {
  BluetoothManager,
  BluetoothEscposPrinter,
} from 'react-native-bluetooth-escpos-printer';

export interface PrinterConfig {
  type: 'bluetooth';
  address: string;
  deviceName: string;
}

export interface PrintJob {
  type: 'venta' | 'cobro' | 'resumen';
  data: any;
  copies?: number;
}

class PrinterService {
  private config: PrinterConfig | null = null;
  private connected: boolean = false;

  // Escanear dispositivos Bluetooth
  async scanDevices(): Promise<any[]> {
    try {
      const paired = await BluetoothManager.enableBluetooth();
      const devices = await BluetoothManager.list();
      return devices;
    } catch (error) {
      console.error('Error escaneando dispositivos:', error);
      return [];
    }
  }

  // Conectar a impresora
  async connect(address: string): Promise<boolean> {
    try {
      await BluetoothManager.connect(address);
      this.connected = true;
      console.log('✅ Impresora conectada');
      return true;
    } catch (error) {
      console.error('❌ Error conectando impresora:', error);
      this.connected = false;
      return false;
    }
  }

  // Desconectar
  async disconnect(): Promise<void> {
    try {
      await BluetoothManager.disconnect();
      this.connected = false;
      console.log('Impresora desconectada');
    } catch (error) {
      console.error('Error desconectando:', error);
    }
  }

  // Verificar estado
  isConnected(): boolean {
    return this.connected;
  }

  // Imprimir
  async print(job: PrintJob): Promise<boolean> {
    if (!this.connected) {
      console.error('Impresora no conectada');
      return false;
    }

    try {
      const { type, data, copies = 1 } = job;

      for (let i = 0; i < copies; i++) {
        switch (type) {
          case 'venta':
            await this.printVenta(data);
            break;
          case 'cobro':
            await this.printCobro(data);
            break;
          case 'resumen':
            await this.printResumen(data);
            break;
        }
      }

      return true;
    } catch (error) {
      console.error('Error imprimiendo:', error);
      return false;
    }
  }

  // Imprimir venta
  private async printVenta(venta: any): Promise<void> {
    // Centrar y título
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
    await BluetoothEscposPrinter.printText('4VENTAS\n', {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 1,
      heigthtimes: 1,
      fonttype: 1,
    });

    await BluetoothEscposPrinter.printText('NOTA DE VENTA\n', {});
    await BluetoothEscposPrinter.printText('------------------------\n', {});

    // Alinear izquierda
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);

    // Información
    await BluetoothEscposPrinter.printText(`NOTA: ${venta.numero || venta.id}\n`, {});
    await BluetoothEscposPrinter.printText(`FECHA: ${venta.fecha}\n`, {});
    await BluetoothEscposPrinter.printText(`CLIENTE: ${venta.cliente}\n`, {});
    await BluetoothEscposPrinter.printText('------------------------\n', {});

    // Artículos
    if (venta.articulos && venta.articulos.length > 0) {
      for (const art of venta.articulos) {
        await BluetoothEscposPrinter.printText(`${art.nombre}\n`, {});
        await BluetoothEscposPrinter.printText(
          `  ${art.cantidad} x ${art.precioUnitario} = ${art.total}\n`,
          {}
        );
      }
    }

    await BluetoothEscposPrinter.printText('------------------------\n', {});

    // Totales
    if (venta.totales) {
      await BluetoothEscposPrinter.printText(`SUBTOTAL: ${venta.totales.subtotal}\n`, {});
      await BluetoothEscposPrinter.printText(`IVA: ${venta.totales.iva}\n`, {});
    }

    await BluetoothEscposPrinter.printText(`TOTAL: ${venta.total || venta.precio}\n`, {
      fonttype: 1,
    });

    // Forma de pago
    if (venta.formaPago) {
      await BluetoothEscposPrinter.printText(`\nFORMA DE PAGO: ${venta.formaPago}\n`, {});
    }

    // Saltos de línea finales
    await BluetoothEscposPrinter.printText('\n\n\n', {});
  }

  // Imprimir cobro
  private async printCobro(cobro: any): Promise<void> {
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
    await BluetoothEscposPrinter.printText('4VENTAS\n', { fonttype: 1 });
    await BluetoothEscposPrinter.printText('COMPROBANTE DE PAGO\n', {});
    await BluetoothEscposPrinter.printText('------------------------\n', {});

    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);

    await BluetoothEscposPrinter.printText(`CLIENTE: ${cobro.cliente}\n`, {});
    await BluetoothEscposPrinter.printText(`MONTO: ${cobro.monto}\n`, {});
    await BluetoothEscposPrinter.printText(`FORMA: ${cobro.formaPago || 'Efectivo'}\n`, {});
    await BluetoothEscposPrinter.printText(`FECHA: ${cobro.fecha}\n`, {});

    await BluetoothEscposPrinter.printText('\n\n\n', {});
  }

  // Imprimir resumen
  private async printResumen(resumen: any): Promise<void> {
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
    await BluetoothEscposPrinter.printText('4VENTAS\n', { fonttype: 1 });
    await BluetoothEscposPrinter.printText('RESUMEN DEL DIA\n', {});
    await BluetoothEscposPrinter.printText('------------------------\n', {});

    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);

    await BluetoothEscposPrinter.printText(`VENTAS: ${resumen.ventas}\n`, {});
    await BluetoothEscposPrinter.printText(`COBROS: ${resumen.cobros}\n`, {});
    await BluetoothEscposPrinter.printText(`GASTOS: ${resumen.gastos}\n`, {});
    await BluetoothEscposPrinter.printText('------------------------\n', {});
    await BluetoothEscposPrinter.printText(`TOTAL: ${resumen.total}\n`, { fonttype: 1 });

    await BluetoothEscposPrinter.printText('\n\n\n', {});
  }

  // Prueba de impresión
  async printTest(): Promise<boolean> {
    return await this.print({
      type: 'venta',
      data: {
        numero: 'TEST-001',
        fecha: new Date().toLocaleDateString(),
        cliente: 'PRUEBA DE IMPRESION',
        articulos: [
          {
            nombre: 'Artículo Test',
            cantidad: 1,
            precioUnitario: '10.00',
            total: '10.00',
          },
        ],
        total: '10.00 €',
      },
    });
  }
}

export const printerService = new PrinterService();
