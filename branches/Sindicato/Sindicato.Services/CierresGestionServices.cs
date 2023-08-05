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
using Newtonsoft.Json;

namespace Sindicato.Services
{
    public class CierresGestionServices : BaseService, ICierresGestionServices
    {


        public IEnumerable<SD_GESTION> ObtenerGestionPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_GESTION> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_GESTIONManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public RespuestaSP GenerarCierreGestion(string login)
        {
            RespuestaSP result = new RespuestaSP();
            ReportesServices reporte = new ReportesServices();
            ExecuteManager(uow =>
            {
                var managerGestion = new SD_GESTIONManager(uow);
                var managerDetalle = new SD_DETALLE_CIERRE_GESTIONManager(uow);



                var gestion = managerGestion.BuscarTodos(x => x.ESTADO == "ACTIVO").FirstOrDefault();
                if (gestion == null)
                {
                    result.success = false;
                    result.msg = "No existe Gestion Activa";
                }
                else
                {
                    var det = managerDetalle.BuscarTodos(x => x.ID_GESTION == gestion.ID_GESTION);

                    foreach (var item in det)
                    {

                        managerDetalle.Delete(item);
                    }
                    decimal disponible = 0;
                    decimal por_cobrar = 0;
                    decimal saldo_anterior = 0;
                    decimal por_cobrar_ga = 0;
                    var gestionAnterior = managerGestion.BuscarTodos(x => x.ESTADO == "INACTIVO").OrderByDescending(x => x.FECHA_FIN).FirstOrDefault();
                    if (gestionAnterior == null)
                    {
                        disponible = 98732;
                    }
                    else
                    {
                        disponible = (decimal)gestionAnterior.SALDO_A_FAVOR;
                    }

                    var detalles = reporte.ObtenerReporteTotalPrestamosPorGestion(gestion.ID_GESTION);
                    var grupo = detalles.GroupBy(x => new { x.TIPO_PRESTAMO, x.AMORTIZACION, x.CONDONACION_G_ANT, x.TOTAL_MORA_CANCELADO_G_ANT, x.TOTAL_CANCELADO_G_ANT }).Select(y => new
                        {
                            TIPO_PRESTAMO = y.Key.TIPO_PRESTAMO,
                            CANTIDAD_PRESTAMO = y.Count(),
                            IMPORTE_PRESTAMO = y.Sum(z => z.IMPORTE_PRESTAMO),
                            IMPORTE_INTERES = y.Sum(z => z.IMPORTE_INTERES),
                            TOTAL_MORA = y.Sum(z => z.IMPORTE_MORA),
                            MORA_CANCELADA = y.Sum(z => z.MORA_CANCELADA),
                            TOTAL_CANCELADO = y.Sum(z => z.IMPORTE_TOTAL),
                            TOTAL_CONDONACION = y.Sum(z => z.TOTAL_CONDONACIONES),
                            //MORAS = y.Sum(z => z.SD_PRESTAMOS_MORA.Sum()),
                            TOTAL_CUOTAS = y.Sum(z => z.SEMANAS),
                            CAPITAL = y.Sum(z => z.CAPITAL_CANCELADO),
                            INTERES = y.Sum(z => z.INTERES_CANCELADO),
                            CANCELADO = y.Sum(z => z.CANCELADO),
                            PENDIENTE = y.Sum(z => z.PENDIENTE),
                            INTERES_CANCELADO = y.Sum(z => z.INTERES_CANCELADO),
                            SALDO_GESTION_ANTERIOR = y.Key.AMORTIZACION,
                            CONDONACION_G_ANT = y.Key.CONDONACION_G_ANT,
                            TOTAL_MORA_CANCELADO_G_ANT = y.Key.TOTAL_MORA_CANCELADO_G_ANT,
                            TOTAL_CANCELADO_G_ANT = y.Key.TOTAL_CANCELADO_G_ANT,
                            SALDO_POR_COBRAR_G_ANT = y.First().SALDO_POR_COBRAR_G_ANT
                        });

                    foreach (var item in grupo)
                    {
                        var detalle = new SD_DETALLE_CIERRE_GESTION
                        {
                            ID_DETALLE = managerDetalle.ObtenerSecuencia(),
                            ID_GESTION = gestion.ID_GESTION,
                            TIPO = "DETALLE",
                            DETALLE = item.TIPO_PRESTAMO,
                            CANT_PREST_CANCELADOS = item.CANCELADO,
                            CANT_PREST_POR_COBRAR = item.PENDIENTE,
                            TOTAL_PRESTAMO = item.IMPORTE_PRESTAMO,
                            TOTAL_INTERES = (decimal)item.IMPORTE_INTERES,
                            TOTAL_MORAS = item.TOTAL_MORA,
                            TOTAL_CONDONACION_INTERES = item.TOTAL_CONDONACION,
                            TOTAL_CANCELADO = item.TOTAL_CANCELADO,
                            TOTAL_MORA_CANCELADO = item.MORA_CANCELADA,
                            TOTAL_INTERES_CANCELADO = item.INTERES_CANCELADO,
                            FECHA_REG = DateTime.Now,

                        };
                        saldo_anterior = item.TOTAL_CANCELADO_G_ANT + item.TOTAL_MORA_CANCELADO_G_ANT;
                        por_cobrar_ga = item.SALDO_POR_COBRAR_G_ANT;
                        disponible = disponible - item.IMPORTE_PRESTAMO + (item.TOTAL_CANCELADO + item.MORA_CANCELADA);
                        por_cobrar = por_cobrar + (decimal)(item.IMPORTE_PRESTAMO + item.IMPORTE_INTERES + item.TOTAL_MORA) - (item.TOTAL_CANCELADO + item.TOTAL_CONDONACION + item.MORA_CANCELADA);


                        managerDetalle.Add(detalle);

                    }
                    result.id = gestion.ID_GESTION;
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    object data = new
                    {
                        ID_GESTION = gestion.ID_GESTION,
                        FECHA_INI = String.Format("{0:dd/MM/yyyy}", gestion.FECHA_INICIO),
                        FECHA_FIN = String.Format("{0:dd/MM/yyyy}", DateTime.Now),
                        CODIGO = gestion.CODIGO,
                        DESCRIPCION = gestion.DESCRIPCION,
                        DISPONIBLE = disponible + saldo_anterior,
                        POR_COBRAR = por_cobrar + por_cobrar_ga,
                        TOTAL = disponible + saldo_anterior + por_cobrar

                    };
                    result.data = data;

                }

            });
            return result;
        }


        public IEnumerable<SD_DETALLE_CIERRE_GESTION> ObtenerDetalleGestionPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_DETALLE_CIERRE_GESTION> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLE_CIERRE_GESTIONManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public RespuestaSP GuardarCierreGestion(SD_GESTION cierre, string CODIGO_NUEVO, string DESCRIPCION_NUEVA_GESTION, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_GESTIONManager(uow);
                var gestion = manager.BuscarTodos(x => x.ID_GESTION == cierre.ID_GESTION).FirstOrDefault();
                if (gestion == null)
                {
                    result.success = false;
                    result.msg = "No existe la GESTION";

                }
                else
                {
                    if (gestion.ESTADO == "INACTIVO")
                    {
                        result.success = false;
                        result.msg = "La Gestion ya fue CERRADO";
                    }
                    else
                    {
                        gestion.ESTADO = "INACTIVO";
                        gestion.FECHA_FIN = cierre.FECHA_FIN;
                        gestion.OBSERVACION_CIERRE = cierre.OBSERVACION_CIERRE;
                        gestion.SALDO_A_FAVOR = cierre.SALDO_A_FAVOR;
                        gestion.SALDO_POR_COBRAR = cierre.SALDO_POR_COBRAR;
                        SD_GESTION nuevaGestion = new SD_GESTION()
                        {
                            ID_GESTION = manager.ObtenerSecuencia(),
                            CODIGO = CODIGO_NUEVO,

                            DESCRIPCION = DESCRIPCION_NUEVA_GESTION,
                            FECHA_INICIO = gestion.FECHA_FIN.Value.AddDays(1),
                            FECHA_REG = DateTime.Now,
                            LOGIN = login,
                            ESTADO = "ACTIVO"
                        };
                        manager.Add(nuevaGestion);
                        result.success = true;
                        result.msg = "Proceso ejecutado correctamente";
                    }
                }
            });
            return result;


        }
    }
}
