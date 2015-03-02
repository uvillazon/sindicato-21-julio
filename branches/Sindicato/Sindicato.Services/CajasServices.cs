using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Services.Interfaces;
using Sindicato.Common;
using Sindicato.Model;
using Sindicato.Services.Model;
using System.Linq.Dynamic;
using LinqKit;
using Sindicato.Business;
using System.Linq.Expressions;
using System.Data.Objects;
using System.Diagnostics;

namespace Sindicato.Services
{
    public class CajasServices : BaseService, ICajasServices
    {
        //private ISD_LISTASManager _manListas;

        public CajasServices(/*ISD_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }

        public IEnumerable<SD_CAJAS> ObtenerCajasPaginado(PagingInfo paginacion)
        {
            IQueryable<SD_CAJAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_CAJASManager(uow);
                result = manager.BuscarTodos();

                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP SP_GrabarCaja(SD_CAJAS caja, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SD_GUARDAR_CAJAS(caja.ID_CAJA, caja.CODIGO, caja.NOMBRE, caja.NRO_CUENTA,  caja.DESCRIPCION, caja.SALDO, login, p_res);


                try
                {
                    int result_id = Int32.Parse(p_res.Value.ToString());
                    if (result_id > 0)
                    {
                        result.success = true;
                        result.msg = "Proceso Ejecutado Correctamente";
                        result.id = result_id;
                    }
                    else
                    {
                        result.success = false;
                        result.msg = p_res.Value.ToString();
                        result.id = -1;
                    }
                }
                catch (FormatException e)
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                    result.id = -1;
                }

            });
            return result;
        }

        public RespuestaSP SP_EliminarCaja(int ID_CAJA, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SD_ELIMINAR_CAJA(ID_CAJA, ID_USR, p_res);
                if (p_res.Value.ToString() == "1")
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }

            });
            return result;
        }

        public IEnumerable<SD_KARDEX_EFECTIVO> ObtenerKardexEfectivo(PagingInfo paginacion, FiltrosModel<KardexEfectivoModel> filtros)
        {
            IQueryable<SD_KARDEX_EFECTIVO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_KARDEX_EFECTIVOManager(uow);
                //obtener todos los registros
                result = manager.BuscarTodos();
                //if (ID_CAJA != null) {
                //    result = result.Where(x => x.ID_CAJA == ID_CAJA);
                //}
                //formar un query una condicion ID_CAJA = 2 //ID_CAJA == 2
                filtros.FiltrarDatos();
                //
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_KARDEX_EFECTIVO> ObtenerKardexEfectivo(Expression<Func<SD_KARDEX_EFECTIVO, bool>> criterio)
        {
            IQueryable<SD_KARDEX_EFECTIVO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_KARDEX_EFECTIVOManager(uow);
                result = manager.BuscarTodos(criterio);


            });
            return result;
        }
    }
}
