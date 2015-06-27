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
    public interface ICierresServices
    {

        IEnumerable<SD_CIERRES> ObtenerCierresPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<SD_DETALLE_PERIODO_SOCIO> ObtenerDetalleSocioPeriodoPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        
        RespuestaSP GuardarCierre(SD_CIERRES cierre, string login);
        RespuestaSP GenerarDetalleCierre(int ID_CIERRE, string login);

        SD_CIERRES ObtenerUltimoRegistroCierre();

        List<PeriodoSocioModel> ObtenerCierrePeriodoSocio(int ID_CIERRE);
        
    }
}
