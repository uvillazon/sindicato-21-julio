using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Services.Interfaces;
using Sindicato.Common;
using Sindicato.Model;
using System.Linq.Dynamic;
using LinqKit;
using Sindicato.Business;
using System.Linq.Expressions;
using System.Data.Objects;
using Sindicato.Services.Model;

namespace Sindicato.Services
{
    public class ReportesServices : BaseService
    {
        
        public IEnumerable<ReporteTotal> ObtenerReporteTotal(DateTime FECHA_INI , DateTime FECHA_FIN)
        {
            List<ReporteTotal> result = new List<ReporteTotal>();
            ExecuteManager(uow =>
            {
                var managerHojas =new SD_HOJAS_CONTROLManager(uow);
                var managerDetallesHojas = new SD_DETALLES_HOJAS_CONTROLManager(uow);
                var managerIngresos = new SD_INGRESOSManager(uow);
                var managerIngresosSocios = new SD_INGRESOS_POR_SOCIOSManager(uow);
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                var hojas = managerHojas.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin).OrderBy(x=>x.ID_HOJA);
                var detallesHojas = managerDetallesHojas.BuscarTodos(x => x.SD_HOJAS_CONTROL.FECHA_COMPRA < Fecha_fin && x.SD_HOJAS_CONTROL.FECHA_COMPRA >= FECHA_INI);

                var groupDetalles = detallesHojas.GroupBy(x => x.OBLIGACION).Select(y => new { OBLIGACION = y.Key , CANTIDAD = y.Count() , IMPORTE = y.Sum(z=>z.IMPORTE) , COSTO = y.Min(z=>z.IMPORTE)});

                
                var ini_hoja = hojas.Min(x=>x.ID_HOJA);
                var fin_hoja = hojas.Max(x=>x.ID_HOJA);
                
                var detalle = string.Format("Venta de Hojas de : {0}-{1}", ini_hoja, fin_hoja);
                //var deetalles = hojas.
                foreach (var item in groupDetalles)
                {
                    var detalleRep = new ReporteTotal() { 
                        DETALLE = detalle,
                        SUBDETALLE = item.OBLIGACION,
                        CANTIDAD = item.CANTIDAD,
                        BOLIVIANOS = (decimal)item.IMPORTE,
                        COSTO_UNITARIO = (decimal)item.COSTO
                    };
                    result.Add(detalleRep);                
                }
                var ingresosSocios = managerIngresosSocios.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin && x.SD_CAJAS.MONEDA == "BOLIVIANOS");
                var ingresosSociosDetalle = ingresosSocios.GroupBy(x => new {CATEGORIA = x.SD_TIPOS_INGRESOS_SOCIO.CATEGORIA , INGRESO = x.SD_TIPOS_INGRESOS_SOCIO.NOMBRE}).Select(y => new { DETALLE = y.Key.CATEGORIA , SUBDETALLE = y.Key.INGRESO, CANTIDAD = y.Count() , IMPORTE = y.Sum(z=>z.IMPORTE) , COSTO = y.Min(z=>z.IMPORTE)});
                foreach (var item in ingresosSociosDetalle)
                {
                    var detalleRep = new ReporteTotal()
                    {
                        DETALLE = item.DETALLE,
                        SUBDETALLE = item.SUBDETALLE,
                        CANTIDAD = item.CANTIDAD,
                        BOLIVIANOS = (decimal)item.IMPORTE,
                        COSTO_UNITARIO = (decimal)item.COSTO
                    };
                    result.Add(detalleRep);
                }

                var ingresosSociosDol = managerIngresosSocios.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin && x.SD_CAJAS.MONEDA == "DOLARES");
                var ingresosSociosDetalleDol = ingresosSociosDol.GroupBy(x => new { CATEGORIA = x.SD_TIPOS_INGRESOS_SOCIO.CATEGORIA, INGRESO = x.SD_TIPOS_INGRESOS_SOCIO.NOMBRE }).Select(y => new { DETALLE = y.Key.CATEGORIA, SUBDETALLE = y.Key.INGRESO, CANTIDAD = y.Count(), IMPORTE = y.Sum(z => z.IMPORTE), COSTO = y.Min(z => z.IMPORTE) });
                foreach (var item in ingresosSociosDetalleDol)
                {
                    var detalleRep = new ReporteTotal()
                    {
                        DETALLE = item.DETALLE,
                        SUBDETALLE = item.SUBDETALLE,
                        CANTIDAD = item.CANTIDAD,
                        DOLARES = (decimal)item.IMPORTE,
                        COSTO_UNITARIO = (decimal)item.COSTO
                    };
                    result.Add(detalleRep);
                }
            });
            return result;
        }

  
    }
}
