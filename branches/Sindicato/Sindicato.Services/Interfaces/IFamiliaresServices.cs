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
    public interface IFamiliaresServices
    {

        IEnumerable<SD_FAMILIARES> ObtenerFamiliaresPaginados(PagingInfo paginacion, FiltrosModel<FamiliaresModel> filtros);
        RespuestaSP GuardarFamiliar(SD_FAMILIARES fam, int ID_USR);
        SD_FAMILIARES ObtenerFamiliarPorCriterio(Expression<Func<SD_FAMILIARES, bool>> criterio);
        //SD_USUARIOS
    }
}
