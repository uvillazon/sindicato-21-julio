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
    public interface IAutosServices
    {
        //IEnumerable<SD_AUTOS> ObtenerAutos(Expression<Func<SD_USUARIOS, bool>> criterio);
        IEnumerable<SD_AUTOS> ObtenerAutosPaginados(PagingInfo paginacion, FiltrosModel<AutosModel> filtros);
        SD_AUTOS ObtenereAutoPorCriterio(Expression<Func<SD_AUTOS, bool>> criterio);
        RespuestaSP GuardarAuto(SD_AUTOS auto, string login);
        //SD_USUARIOS
    }
}
