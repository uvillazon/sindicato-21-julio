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
using System.Data.Objects;

namespace Sindicato.Services
{
    public class ListasServices : BaseService, IListasServices
    {
        //private ISD_LISTASManager _manListas;

        public ListasServices(/*ISD_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        public ListasServices(string conexion)
        {
            this.conexion = conexion;
        }
        public DataPaged<SD_LISTAS> ObtenerListas(PagingInfo paginacion, FiltrosModel<SD_LISTAS> filtros)
        {
            DataPaged<SD_LISTAS> resultado = new DataPaged<SD_LISTAS>();
            IQueryable<SD_LISTAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_LISTASManager(uow);
                result = manager.QueryPaged(manager.Query(), paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
                resultado.Rows = result.ToList();
                resultado.Total = manager.Query().Count();
                resultado.success = true;

            });

            return resultado;
        }

        public DataPaged<SD_LISTAS_ITEMS> ObtenerListasItem(PagingInfo info, FiltrosModel<SD_LISTAS> filtros)
        {
            throw new NotImplementedException();
        }


        public RespuestaSP SP_GrabarLista(SD_LISTAS lista)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SD_ALTA_LISTA(lista.LISTA, lista.DESCRIPCION, lista.TAM_LIMITE, lista.TIPO_VALOR, lista.MAYUS_MINUS, 0, p_res);
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

        public RespuestaSP SP_GrabarListaItem(SD_LISTAS_ITEMS listaItems, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SD_GRABAR_LISTAS_ITEMS(listaItems.ID_TABLA, listaItems.ID_PADRE, listaItems.ID_LISTA, listaItems.CODIGO, listaItems.VALOR, listaItems.ESTADO, login, p_res);
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

        public RespuestaSP EliminarListaItems(int ID_TABLA, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                var manager = new SD_LISTAS_ITEMSManager(uow);

                var lista = manager.BuscarTodos(x => x.ID_TABLA == ID_TABLA).FirstOrDefault();
                if (lista == null)
                {
                    result.success = false;
                    result.msg = "No existe la lista";
                }
                else
                {
                    manager.Delete(lista);
                    manager.Save();
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                }
            });

            return result;
        }


        public IEnumerable<SD_LISTAS_ITEMS> ObtenerListasItems(PagingInfo paginacion, FiltrosModel<ListasItemsModel> filtros)
        {
            IQueryable<SD_LISTAS_ITEMS> result = null;
            ExecuteManager(uow =>
            {
                var managerVentas = new SD_LISTAS_ITEMSManager(uow);
                result = managerVentas.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = managerVentas.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public IEnumerable<SD_LISTAS> ObtenerTodasListas()
        {
            IQueryable<SD_LISTAS> result = null;
            ExecuteManager(uow =>
            {
                var managerLista = new SD_LISTASManager(uow);
                result = managerLista.BuscarTodos();


            });
            return result;
        }
    }
}
