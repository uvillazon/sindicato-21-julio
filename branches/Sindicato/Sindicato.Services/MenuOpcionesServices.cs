﻿using System;
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
    public class MenuOpcionesServices : BaseService, IMenuOpcionesServices
    {
        //private ISD_LISTASManager _manListas;

        public MenuOpcionesServices(/*ISD_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        public IEnumerable<SD_MENU_OPCIONES> ObtenerMenuOpciones(Expression<Func<SD_MENU_OPCIONES, bool>> criterio)
        {
            IQueryable<SD_MENU_OPCIONES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_MENU_OPCIONESManager(uow);
                result = manager.BuscarTodos(criterio);

            });
            return result;
        }


        public IEnumerable<V_TABLAS_COLUMNAS> ObtenerCamposTabla(Expression<Func<V_TABLAS_COLUMNAS, bool>> criterio)
        {
            IQueryable<V_TABLAS_COLUMNAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new V_TABLAS_COLUMNASManager(uow);
                result = manager.BuscarTodos(criterio);

            });
            return result;
        }


        public RespuestaSP SP_GuardarPerfilOpcion(SD_PERFILES_OPCIONES per, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_PERFIL_OPCION(per.ID_PERFIL, per.ID_OPC, 0, p_res);
                if (p_res.Value.ToString() == "1")
                {
                    result.success = true;
                    result.msg = "Proceso Ejectuado Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }


            });
            return result;
        }

        public RespuestaSP SP_EliminarPerfilOpcion(SD_PERFILES_OPCIONES per, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SD_ELIMINAR_PERFIL_OPCION(per.ID_PERFIL, per.ID_OPC, 0, p_res);
                if (p_res.Value.ToString() == "1")
                {
                    result.success = true;
                    result.msg = "Proceso Ejectuado Correctamente";
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
