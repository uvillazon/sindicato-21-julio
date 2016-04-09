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
    public class IngresosServices : BaseService, IIngresosServices
    {
        public IEnumerable<SD_INGRESOS_POR_SOCIOS> ObtenerIngresosPorSocioPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros)
        {
            IQueryable<SD_INGRESOS_POR_SOCIOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_INGRESOS_POR_SOCIOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO.Contains(contiene)||  x.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE.Contains(contiene) || x.SD_CAJAS.NOMBRE.Contains(contiene));

                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_TIPOS_INGRESOS_SOCIO> ObtenerITiposIngresosPorSocioPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros)
        {
            IQueryable<SD_TIPOS_INGRESOS_SOCIO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_TIPOS_INGRESOS_SOCIOManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.NOMBRE.Contains(contiene));
                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarIngreso(SD_INGRESOS_POR_SOCIOS ingreso, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_INGRESOS_POR_SOCIO(ingreso.ID_INGRESO, ingreso.ID_SOCIO_MOVIL, ingreso.ID_TIPO_INGRESO, ingreso.FECHA, ingreso.IMPORTE, ingreso.OBSERVACION, login, p_res);
                int id;
                bool esNumero = int.TryParse(p_res.Value.ToString(), out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }

            });
            return result;

        }

        public RespuestaSP EliminarIngreso(int ID_INGRESO)
        {
            throw new NotImplementedException();
        }

        public RespuestaSP GuardarTipoIngreso(SD_TIPOS_INGRESOS_SOCIO tipo, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_GUARDAR_TIPO_INGRESO(tipo.ID_TIPO,tipo.ID_CAJA,tipo.NOMBRE,tipo.OBSERVACION,tipo.MONEDA,tipo.IMPORTE, tipo.CATEGORIA,login, p_res);
                int id;
                bool esNumero = int.TryParse(p_res.Value.ToString(), out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }

            });
            return result;
        }

        public RespuestaSP EliminarTipoIngreso(int ID_TIPO_INGRESO)
        {
            throw new NotImplementedException();
        }
    }
}
