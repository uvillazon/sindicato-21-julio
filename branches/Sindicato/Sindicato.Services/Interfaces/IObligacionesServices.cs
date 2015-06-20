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
    public interface IObligacionesServices
    {
        IEnumerable<SD_KARDEX_SOCIO_DEBE> ObtenerKardexPaginados(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros);
        IEnumerable<SD_OTRAS_OBLIGACIONES> ObtenerObligacionesPaginados(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros);
        IEnumerable<SD_AMORTIZACIONES> ObtenerAmortizacionesPaginados(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros);

        RespuestaSP GuardarObligacion(SD_OTRAS_OBLIGACIONES obli, string login);
        RespuestaSP EliminarObligacion(int ID_OBLIGACION);

        RespuestaSP GuardarAmortizacion(SD_AMORTIZACIONES amortizacion, string login);
        RespuestaSP EliminarAmortizacion(int ID_AMORTIZACION);

        //RespuestaSP GuardarTransferencia(SD_TRANSFERENCIAS transf, string login);
        //RespuestaSP EliminarTransferencia(int ID_TRANSFERENCIA);
    }
}
