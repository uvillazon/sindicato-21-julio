using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Model;
using Sindicato.Services.Model;
using System.Linq.Expressions;

namespace Sindicato.Services.Interfaces
{
    public interface IUsuariosServices
    {
        IEnumerable<SD_USUARIOS> ObtenerUsuariosPorCriterio(Expression<Func<SD_USUARIOS, bool>> criterio);
        //SD_USUARIOS
    }
}
