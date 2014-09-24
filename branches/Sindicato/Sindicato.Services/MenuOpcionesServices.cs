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
    }
}
