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
    public interface IMovilesServices
    {
        IEnumerable<SD_MOVILES> ObtenerMoviles(Expression<Func<SD_MOVILES, bool>> criterio = null);
        

        RespuestaSP GuardarMovil(SD_MOVILES movil, string LOGIN_USR);

        IEnumerable<SD_MOVILES> ObtenerMovilesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
       
    }
}
