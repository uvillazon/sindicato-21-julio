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
    public class DescuentosServices : BaseService, IDescuentosServices
    {
        public IEnumerable<SD_DESCUENTOS> ObtenerDescuentosPaginados(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros)
        {
            IQueryable<SD_DESCUENTOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DESCUENTOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_DESCUENTOS_SOCIO> ObtenerDetalleDescuentos(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros)
        {
            IQueryable<SD_DESCUENTOS_SOCIO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DESCUENTOS_SOCIOManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    //result = result.Where(SD_SOCIOS
                    result = result.Where(x => x.SD_SOCIOS.NOMBRE.ToUpper().Contains(contiene) || x.SD_SOCIOS.APELLIDO_PATERNO.ToUpper().Contains(contiene) || x.SD_SOCIOS.APELLIDO_MATERNO.ToUpper().Contains(contiene));

                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public RespuestaSP GenerarDescuentos(SD_DESCUENTOS desc, decimal? IMPORTE_SOCIO, decimal? IMPORTE_TOTAL, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var managerDesc = new SD_DESCUENTOSManager(uow);
                var managerDescDetalle = new SD_DESCUENTOS_SOCIOManager(uow);
                var managerSocios = new SD_SOCIOSManager(uow);

                var crearDescuento = managerDesc.GuardarDescuento(desc, login);
                int idDescuento;
                bool esNumero = int.TryParse(crearDescuento, out idDescuento);
                if (esNumero)
                {
                    var socios = managerSocios.BuscarTodos(x => x.ESTADO == "NUEVO");
                    foreach (var item in socios)
                    {
                        if (IMPORTE_SOCIO != null)
                        {
                            var detalle = new SD_DESCUENTOS_SOCIO()
                            {
                                ID_DESCUENTO = idDescuento,
                                ID_SOCIO = item.ID_SOCIO,
                                IMPORTE = (decimal)IMPORTE_SOCIO,
                                DETALLE = "Sin Detalle"
                            };
                            managerDescDetalle.GuardarDetalle(detalle, login);

                        }
                        else
                        {
                            var importe = IMPORTE_TOTAL / socios.Count();
                            var detalle = new SD_DESCUENTOS_SOCIO()
                            {
                                ID_DESCUENTO = idDescuento,
                                ID_SOCIO = item.ID_SOCIO,
                                IMPORTE = (decimal)importe,
                                DETALLE = "Sin Detalle"
                            };
                            managerDescDetalle.GuardarDetalle(detalle, login);

                        }

                    }
                    managerDesc.ActualizarTotal(idDescuento);
                    result.id = idDescuento;
                    result.success = true;
                    result.msg = "Proceso Ejecutado correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = crearDescuento;
                }

            });
            return result;

        }


        public RespuestaSP CalcularSaldo(int ID_DESCUENTO)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_DESCUENTOSManager(uow);
                var total = manager.ActualizarTotal(ID_DESCUENTO);
                decimal tot;
                bool esNumero = decimal.TryParse(total, out tot);

                result.msg = total.ToString();
                result.success = true;
            });
            return result;

        }


        public RespuestaSP GuardarDetalle(SD_DESCUENTOS_SOCIO detalle, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_DESCUENTOS_SOCIOManager(uow);
                var resp = manager.GuardarDetalle(detalle, login);
                decimal tot;
                bool esNumero = decimal.TryParse(resp, out tot);
                if (esNumero)
                {
                    result.msg = resp.ToString();
                    result.success = true;
                }
                else
                {
                    result.msg = resp.ToString();
                    result.success = false;
                }

            });
            return result;
        }


        public RespuestaSP AprobarAnularDebitoDescuento(int ID_DESCUENTO, string ACCION, string OBSERVACION, int? ID_CAJA, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_DESCUENTOSManager(uow);
                var resp = manager.AprobarAnularDebitoDescuento(ID_DESCUENTO, ACCION, OBSERVACION, ID_CAJA, login);
                decimal tot;
                bool esNumero = decimal.TryParse(resp, out tot);
                if (esNumero)
                {
                    result.msg = "Proceso Ejecutado Correctamente.";
                    result.success = true;
                }
                else
                {
                    result.msg = resp.ToString();
                    result.success = false;
                }

            });
            return result;
        }


        public RespuestaSP GuardarDescuento(SD_DESCUENTOS desc, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_DESCUENTOSManager(uow);
                var resp = manager.GuardarDescuento(desc, login);
                decimal tot;
                bool esNumero = decimal.TryParse(resp, out tot);
                if (esNumero)
                {
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.success = true;
                }
                else
                {
                    result.msg = resp.ToString();
                    result.success = false;
                }

            });
            return result;
        }
    }
}
