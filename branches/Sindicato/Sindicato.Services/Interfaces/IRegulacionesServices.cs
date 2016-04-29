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
    public interface IRegulacionesServices
    {
        //IEnumerable<SD_AUTOS> ObtenerAutos(Expression<Func<SD_USUARIOS, bool>> criterio);
        IEnumerable<SD_REGULARIZACIONES> ObtenerRegulacionesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<SD_DETALLES_REGULARIZACIONES> ObtenerDetalleRegulacionesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);

        RespuestaSP GuardarRegulaciones(SD_REGULARIZACIONES regulacion , string login);
        RespuestaSP AnularRegulacion(SD_REGULARIZACIONES regulacion, string login);
     }
}
