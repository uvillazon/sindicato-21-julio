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
    public interface ICierresCajaServices
    {

        IEnumerable<SD_CIERRES_CAJAS> ObtenerCierresPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<SD_DETALLE_CIERRES_CAJA> ObtenerDetallesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<CierreCajaModel> ObtenerCierreCajaGenerado(DateTime FECHA_INI, DateTime FECHA_FIN);

        SD_CIERRES_CAJAS ObtenerUltimoRegistroCierre();

        RespuestaSP GuardarCierre(SD_CIERRES_CAJAS cierre, string detalles, string login);

    }
}
