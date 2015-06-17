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
    public interface IDescuentosServices
    {

        IEnumerable<SD_DESCUENTOS> ObtenerDescuentosPaginados(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros);
        IEnumerable<SD_DESCUENTOS_SOCIO> ObtenerDetalleDescuentos(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros);
        
        RespuestaSP GuardarCierre(SD_CIERRES cierre, string login);

        SD_CIERRES ObtenerUltimoRegistroCierre();
        
    }
}
