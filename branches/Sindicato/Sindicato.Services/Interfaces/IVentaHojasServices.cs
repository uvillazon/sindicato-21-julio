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
    public interface IVentaHojasServices
    {
        IEnumerable<SD_HOJAS_CONTROL> ObtenerVentasPaginados(PagingInfo paginacion, FiltrosModel<HojasModel> filtros);
        IEnumerable<SD_DETALLES_HOJAS_CONTROL> ObtenerDetallesPaginado(PagingInfo paginacion, FiltrosModel<HojasModel> filtros);
        RespuestaSP GuardarVentaHoja(SD_HOJAS_CONTROL venta, int CANTIDAD , string login);
        RespuestaSP AnularVentaHoja(int ID_HOJA, string login);

        SD_HOJAS_CONTROL ObtenerHoja(Expression<Func<SD_HOJAS_CONTROL, bool>> criterio);
        IEnumerable<SD_HOJAS_CONTROL> ObtenerHojasPorVentas(int ID_VENTA);


        //SD_USUARIOS
    }
}
