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

namespace Sindicato.Services
{
    public class UsuariosServices : BaseService, IUsuariosServices
    {
        //private ISD_LISTASManager _manListas;

        public UsuariosServices(/*ISD_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }


        public IEnumerable<SD_USUARIOS> ObtenerUsuariosPorCriterio(Expression<Func<SD_USUARIOS, bool>> criterio)
        {
            IQueryable<SD_USUARIOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_USUARIOSManager(uow);
                result = manager.BuscarTodos(criterio);

            });
            return result;
        }


        public IEnumerable<SD_USUARIOS> ObtenerUsuariosPaginados(PagingInfo paginacion)
        {
            IQueryable<SD_USUARIOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_USUARIOSManager(uow);
                result = manager.BuscarTodos();
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_PERFILES> ObtenerPerfilesPaginados(PagingInfo paginacion)
        {
            IQueryable<SD_PERFILES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_PERFILESManager(uow);
                result = manager.BuscarTodos();
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_MENU_OPCIONES> ObtenerMenuOpcionesPaginados(PagingInfo paginacion)
        {
            IQueryable<SD_MENU_OPCIONES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_MENU_OPCIONESManager(uow);
                result = manager.BuscarTodos(x => x.ESTADO == "A");
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_MENU_OPCIONES> ObtenerMenuOpcionesPorCriterio(Expression<Func<SD_MENU_OPCIONES, bool>> criterio)
        {
            IQueryable<SD_MENU_OPCIONES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_MENU_OPCIONESManager(uow);
                result = manager.BuscarTodos(criterio);
                //paginacion.total = result.Count();
                //result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP SP_GrabarUsuario(SD_USUARIOS usr, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_USUARIO(usr.ID_USUARIO, usr.LOGIN, usr.NOMBRE, usr.EMAIL, usr.ID_PERFIL, usr.ESTADO, usr.CONTRASENA, ID_USR, p_res);
                //context.P_SG_GUARDAR_CLIENTES(cli.ID_CLIENTE, cli.CODIGO, cli.EMPRESA, cli.NIT, cli.CONTACTO, cli.TELEFONO, cli.DIRECCION, cli.LIMITE, ID_USR, p_res);
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

        public RespuestaSP SP_GrabarPerfil(SD_PERFILES per, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SD_GUARDAR_PERFIL(per.ID_PERFIL, per.NOMBRE, per.DESCRIPCION, ID_USR, p_res);
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
    }
}
