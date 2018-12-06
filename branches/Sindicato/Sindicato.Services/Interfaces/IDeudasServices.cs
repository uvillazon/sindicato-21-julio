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
    public interface IDeudasServices
    {
        IEnumerable<SD_DEUDAS_SOCIOS> ObtenerDeudasPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros);
        IEnumerable<SD_DETALLES_DEUDAS> ObtenerDetallesDeudasPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros);

        RespuestaSP GuardarDeuda(SD_DEUDAS_SOCIOS deuda, string login);
        RespuestaSP EliminarDeuda(int ID_DEUDA);

        RespuestaSP GuardarDetalleDeuda(SD_DETALLES_DEUDAS detalle, string login);
        RespuestaSP PagoDetalleDeuda(SD_DETALLES_DEUDAS detalle, string login);
        RespuestaSP AnularDetalleDeuda(int ID_DETALLE);
        RespuestaSP EliminarDetalleDeuda(int ID_DETALLE);

    }
}
