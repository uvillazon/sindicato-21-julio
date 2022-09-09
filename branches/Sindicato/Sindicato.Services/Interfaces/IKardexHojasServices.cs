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
    public interface IKardexHojasServices
    {
        //IEnumerable<SD_AUTOS> ObtenerAutos(Expression<Func<SD_USUARIOS, bool>> criterio);
        IEnumerable<SD_KARDEX_HOJAS> ObtenerKardex(PagingInfo paginacion, FiltrosModel<AutosModel> filtros, string codigo);

        IEnumerable<object> ObtenerMesDeKardex();

        
        IEnumerable<SD_SOCIO_MOVIL_AUTOS> ObtenerKardexHojaPorMovilPaginados(PagingInfo paginacion, FiltrosModel<AutosModel> filtros);
        //IEnumerable<SD_SOCIO_MOVIL_AUTOS> ObtenerAutosSociosPaginados(PagingInfo paginacion, FiltrosModel<AutosModel> filtros)

    }
}
