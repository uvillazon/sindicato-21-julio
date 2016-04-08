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
    public class CierresServices : BaseService, ICierresServices
    {
        public IEnumerable<SD_CIERRES> ObtenerCierresPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_CIERRES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_CIERRESManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarCierre(SD_CIERRES cierre, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_CIERRESManager(uow);
                var crear = manager.GuardarCierre(cierre, login);
                int id;
                bool esNumero = int.TryParse(crear, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = crear;
                }

            });
            return result;
        }

        public SD_CIERRES ObtenerUltimoRegistroCierre()
        {
            SD_CIERRES result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_CIERRESManager(uow);
                result = manager.BuscarTodos().OrderByDescending(x => x.ID_CIERRE).FirstOrDefault();
            });
            return result;
        }


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


        public IEnumerable<SD_DETALLE_PERIODO_SOCIO> ObtenerDetalleSocioPeriodoPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_DETALLE_PERIODO_SOCIO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLE_PERIODO_SOCIOManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.SD_SOCIOS.NOMBRE.ToUpper().Contains(contiene) || x.SD_SOCIOS.APELLIDO_PATERNO.ToUpper().Contains(contiene));
                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public RespuestaSP GenerarDetalleCierre(int ID_CIERRE, string login)
        {
            RespuestaSP result = new RespuestaSP();
            //ExecuteManager(uow =>
            //{
            //    var managerCierre = new SD_CIERRESManager(uow);
            //    var managerIngresos = new SD_VENTA_HOJASManager(uow);
            //    var managerSocios = new SD_SOCIOSManager(uow);
            //    var managerDetalle = new SD_DETALLE_PERIODO_SOCIOManager(uow);
            //    var cierre = managerCierre.BuscarTodos(x => x.ID_CIERRE == ID_CIERRE).FirstOrDefault();
            //    //var detalles = managerDetalle.BuscarTodos(x => x.ID_CIERRE == ID_CIERRE);
            //    if (cierre.ESTADO == "ACTIVO")
            //    {
            //        managerDetalle.EliminarDetallePeriodoSocio(ID_CIERRE);
            //        var socios = managerSocios.BuscarTodos(x => x.ESTADO == "NUEVO");
                    
            //        foreach (var socio in socios)
            //        {
            //            decimal ingresosHojas = 0;
            //            foreach (var mov in socio.SD_SOCIO_MOVILES.Where(x => x.ESTADO == "ACTIVO"))
            //            {
            //                //var totales = mov.SD_VENTA_HOJAS.GroupBy(x => x.FECHA).Select(y => new { FECHA = y.Key, TOTALVENTA = y.Sum(x => x.TOTAL_VENTA), TOTALCOSTO = y.Sum(x => x.TOTAL_COSTO) });
            //                ingresosHojas = ingresosHojas + (decimal)mov.SD_VENTA_HOJAS.Where(y => y.FECHA_VENTA >= cierre.FECHA_INI && y.FECHA_VENTA <= cierre.FECHA_FIN).Sum(x => x.TOTAL);
            //            }
            //            //var moviles 
            //            SD_DETALLE_PERIODO_SOCIO item = new SD_DETALLE_PERIODO_SOCIO()
            //            {
            //                ID_CIERRE = cierre.ID_CIERRE,
            //                ID_SOCIO = socio.ID_SOCIO,
            //                //PERIODO = cierre.CODIGO,
            //                //SOCIO = string.Format("{0} {1} {2}", socio.NOMBRE, socio.APELLIDO_PATERNO, socio.APELLIDO_MATERNO),
            //                INGRESOS_HOJAS = ingresosHojas,
            //                OTROS_INGRESOS = 0,
            //                OBLIGACIONES_INSTITUCION = socio.SD_OBLIGACIONES_SOCIO.Sum(x => x.IMPORTE),
            //                DESCUENTOS = socio.SD_DESCUENTOS_SOCIO.Where(x => x.SD_DESCUENTOS.ID_CIERRE == ID_CIERRE).Sum(y => y.IMPORTE),
            //                OTRAS_OBLIGACIONES = socio.SD_OTRAS_OBLIGACIONES.Where(x => x.ID_CIERRE == ID_CIERRE).Sum(y => y.IMPORTE)
            //                //INGRESOS_HOJAS = socio.SD_SOCIO_MOVILES.Where(x=>x.id
            //            };
            //            var total = (item.INGRESOS_HOJAS + item.OTROS_INGRESOS) - (item.OBLIGACIONES_INSTITUCION + item.OTRAS_OBLIGACIONES + item.DESCUENTOS);
            //            if (total > 0)
            //            {
            //                item.AHORRO = total;
            //                item.DEUDA = 0;
            //            }
            //            else
            //            {
            //                item.AHORRO = 0;
            //                item.DEUDA = total * -1;

            //            }
            //            managerDetalle.GuardarDetallePeriodoSocio(item, login);
            //        }
            //        result.success = true;
            //        result.msg = "Proceso Ejecutado Correctamente.";
            //        //result.Add(item);
            //    }
            //    else {
            //        result.success = false;
            //        result.msg = "Periodo en estado Inadecuado.";
            //    }
            //});
            return result;
        }
    }
}
