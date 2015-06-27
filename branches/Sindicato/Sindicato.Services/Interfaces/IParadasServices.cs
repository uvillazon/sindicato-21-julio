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
    public interface IParadasServices
    {
        IEnumerable<SD_PARADAS> ObtenerParadasPaginado(PagingInfo paginacion, FiltrosModel<ParadasModel> filtros);

        IEnumerable<SD_CIERRES_PARADA> ObtenerCierresParadasPaginados(PagingInfo paginacion, FiltrosModel<ParadasModel> filtros);
        IEnumerable<SD_DETALLE_CIERRE_PARADA> ObtenerDetallesCierreParadaPaginados(PagingInfo paginacion, FiltrosModel<ParadasModel> filtros);
        RespuestaSP GuardarCierre(SD_CIERRES_PARADA cierre, string detalles, string login);
        SD_CIERRES_PARADA ObtenerUltimoRegistroCierre();
        List<DetalleCierreParadaModel> ObtenerDetalleCierreParada(int ID_PARADA, DateTime FECHA_DESDE, DateTime FECHA_HASTA);


        //RespuestaSP SP_GrabarCaja(SD_CAJAS caja, string login);
        //RespuestaSP SP_EliminarCaja(int ID_CAJA, int ID_USR);


        //IEnumerable<SD_KARDEX_EFECTIVO> ObtenerKardexEfectivo(PagingInfo paginacion, FiltrosModel<KardexEfectivoModel> filtros);
        //IEnumerable<SD_KARDEX_EFECTIVO> ObtenerKardexEfectivo(Expression<Func<SD_KARDEX_EFECTIVO, bool>> criterio);

        //SD_USUARIOS
    }
}
