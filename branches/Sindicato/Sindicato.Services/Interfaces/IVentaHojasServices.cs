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
        IEnumerable<SD_IMPRESION_HOJAS> ObtenerImpresionesHojasPaginados(PagingInfo paginacion, FiltrosModel<HojasModel> filtros);
        
        IEnumerable<SD_DETALLES_HOJAS_CONTROL> ObtenerDetallesPaginado(PagingInfo paginacion, FiltrosModel<HojasModel> filtros);
        RespuestaSP GuardarVentaHoja(SD_HOJAS_CONTROL venta, int CANTIDAD , string HOJAS, string login);
        RespuestaSP GuardarImpresionHojas(SD_HOJAS_CONTROL venta, int CANTIDAD, string HOJAS, string login);

        RespuestaSP AnularVentaHoja(int ID_HOJA, string login);
        RespuestaSP Reimprimir(SD_IMPRESIONES imp, string login);

        SD_HOJAS_CONTROL ObtenerHoja(Expression<Func<SD_HOJAS_CONTROL, bool>> criterio);
        IEnumerable<SD_HOJAS_CONTROL> ObtenerHojasPorVentas(int ID_VENTA);
        IEnumerable<SD_HOJAS_CONTROL> ObtenerHojasPorCriterio(Expression<Func<SD_HOJAS_CONTROL, bool>> criterio);
        SD_IMPRESIONES obtenerImpresion(Expression<Func<SD_IMPRESIONES, bool>> criterio);

        RespuestaSP VerificarVentaHoja(int ID_SOCIO_MOVIL, string login);

        IEnumerable<SD_VENTA_HOJAS_REFUERZO> ObtenerVentasRefuerzosPaginados(PagingInfo paginacion, FiltrosModel<HojasModel> filtros);
        RespuestaSP GuardarVentaRefuerzos(SD_VENTA_HOJAS_REFUERZO venta, string login);
        RespuestaSP AnularVentaRefuerzo(int ID_VENTA, string login);
        //SD_USUARIOS
    }
}
