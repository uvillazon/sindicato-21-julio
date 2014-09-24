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
    }
}
