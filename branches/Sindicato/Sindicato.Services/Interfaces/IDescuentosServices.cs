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
        //asdasd
        
        RespuestaSP GenerarDescuentos(SD_DESCUENTOS desc,decimal? IMPORTE_SOCIO,decimal? IMPORTE_TOTAL  , string login);
        RespuestaSP GuardarDetalle(SD_DESCUENTOS_SOCIO detalle, string login);
        RespuestaSP CalcularSaldo(int ID_DESCUENTO);
        RespuestaSP AprobarAnularDebitoDescuento(int ID_DESCUENTO, string ACCION, string OBSERVACION, int? ID_CAJA, string login);

        //SD_CIERRES ObtenerUltimoRegistroCierre();
        
    }
}
