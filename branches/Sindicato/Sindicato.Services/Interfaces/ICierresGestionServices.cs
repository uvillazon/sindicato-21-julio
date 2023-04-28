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
    public interface ICierresGestionServices
    {

        IEnumerable<SD_GESTION> ObtenerGestionPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);

        IEnumerable<SD_DETALLE_CIERRE_GESTION> ObtenerDetalleGestionPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);



        //IEnumerable<SD_DETALLE_CIERRES_CAJA> ObtenerDetallesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        //IEnumerable<CierreCajaModel> ObtenerCierreCajaGenerado(DateTime FECHA_INI, DateTime FECHA_FIN);

        //SD_CIERRES_CAJAS ObtenerUltimoRegistroCierre();

        RespuestaSP GenerarCierreGestion(string login);


        RespuestaSP GuardarCierreGestion(SD_GESTION cierre, string CODIGO_NUEVO , string DESCRIPCION_NUEVA_GESTION, string login);
    }
}
