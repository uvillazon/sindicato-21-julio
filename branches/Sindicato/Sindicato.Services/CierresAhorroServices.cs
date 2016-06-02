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
    public class CierresAhorroServices : BaseService, ICierresAhorroServices
    {
        

        public List<PeriodoSocioModel> ObtenerCierrePeriodoSocio(int ID_CIERRE)
        {
            List<PeriodoSocioModel> result = new List<PeriodoSocioModel>();
            //ExecuteManager(uow =>
            //{
            //    var managerCierre = new SD_CIERRESManager(uow);
            //    var managerIngresos = new SD_VENTA_HOJASManager(uow);
            //    var managerSocios = new SD_SOCIOSManager(uow);
            //    var socios = managerSocios.BuscarTodos(x => x.ESTADO == "ACTIVO");
            //    var cierre = managerCierre.BuscarTodos(x => x.ID_CIERRE == ID_CIERRE).FirstOrDefault();
            //    foreach (var socio in socios)
            //    {
            //        decimal ingresosHojas = 0;
            //        foreach (var mov in socio.SD_SOCIO_MOVILES.Where(x => x.ESTADO == "ACTIVO"))
            //        {
            //            //var totales = mov.SD_VENTA_HOJAS.GroupBy(x => x.FECHA).Select(y => new { FECHA = y.Key, TOTALVENTA = y.Sum(x => x.TOTAL_VENTA), TOTALCOSTO = y.Sum(x => x.TOTAL_COSTO) });
            //            ingresosHojas = ingresosHojas + (decimal)mov.SD_VENTA_HOJAS.Where(y => y.FECHA_VENTA >= cierre.FECHA_INI && y.FECHA_VENTA <= cierre.FECHA_FIN).Sum(x => x.TOTAL);
            //        }
            //        //var moviles 
            //        PeriodoSocioModel item = new PeriodoSocioModel()
            //        {
            //            ID_PERIODO = cierre.ID_CIERRE,
            //            ID_SOCIO = socio.ID_SOCIO,
            //            PERIODO = cierre.CODIGO,
            //            SOCIO = string.Format("{0} {1} {2}", socio.NOMBRE, socio.APELLIDO_PATERNO, socio.APELLIDO_MATERNO),
            //            INGRESOS_HOJAS = ingresosHojas,
            //            OTROS_INGRESOS = 0,
            //            OBLIGACIONES_INSTITUCION = socio.SD_OBLIGACIONES_SOCIO.Sum(x => x.IMPORTE),
            //            OTRAS_OBLIGACIONES = socio.SD_DESCUENTOS_SOCIO.Where(x => x.SD_DESCUENTOS.ID_CIERRE == ID_CIERRE).Sum(y => y.IMPORTE)
            //            //INGRESOS_HOJAS = socio.SD_SOCIO_MOVILES.Where(x=>x.id
            //        };
            //        result.Add(item);
            //    }
            //    foreach (var item in result)
            //    {
            //        var total = (item.INGRESOS_HOJAS + item.OTROS_INGRESOS) - (item.OBLIGACIONES_INSTITUCION - item.OTRAS_OBLIGACIONES);
            //        if (total > 0)
            //        {
            //            item.AHORRO = total;
            //            item.DEUDA = 0;
            //        }
            //        else
            //        {
            //            item.AHORRO = 0;
            //            item.DEUDA = total * -1;

            //        }
            //    }

            //});
            return result;
            //throw new NotImplementedException();
        }




        public List<CierreAhorroSocioModel> ObtenerCierreAhorroSocio(DateTime fecha)
        {
            List<CierreAhorroSocioModel> result = new List<CierreAhorroSocioModel>();
            ExecuteManager(uow => {

                var managerSocio = new SD_SOCIOSManager(uow);
                var managerSociosMovil = new SD_SOCIO_MOVILESManager(uow);
                var managerHojas = new SD_HOJAS_CONTROLManager(uow);
                var managerReg = new SD_REGULARIZACIONESManager(uow);
                var socios = managerSocio.BuscarTodos();
                decimal cant_hojas = 0;
                decimal cant_regulaciones = 0 ;
                string msg = "";
                foreach (var item in socios)
                {
                    cant_hojas = 0;
                    cant_regulaciones = 0;
                    msg = "";
                    var sociosMovil = managerSociosMovil.BuscarTodos(x => x.ID_SOCIO == item.ID_SOCIO);
                    if (sociosMovil.Count() > 0) {
                        foreach (var item1 in sociosMovil)
                        {
                            cant_hojas = item1.SD_HOJAS_CONTROL.Where(x => x.ESTADO == "NUEVO").Count();
                            cant_regulaciones = item1.SD_REGULARIZACIONES.Where(x => x.ESTADO == "NUEVO").Count();
                            msg = string.Format("{0} - Movil : {1} con Hojas:  {2} y Regulaciones {3}", msg, item1.SD_MOVILES.NRO_MOVIL, cant_hojas, cant_regulaciones);
                        }   
                    }
                    
                    CierreAhorroSocioModel res = new CierreAhorroSocioModel()
                    {
                        ID_SOCIO = item.ID_SOCIO ,
                        SOCIO =  item.ObtenerNombreSocio(),
                        CANT_HOJAS = item.sd
                    };
                }
            
            });
            return result;
        }
    }
}
