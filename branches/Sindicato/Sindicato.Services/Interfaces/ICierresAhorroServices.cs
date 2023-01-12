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
    public interface ICierresAhorroServices
    {

        IEnumerable<SD_CIERRES> ObtenerCierresPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<SD_DETALLE_CIERRES_AHORRO> ObtenerDetallesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<CierreAhorroSocioModel> ObtenerCierreAhorroSocio(DateTime FECHA_INI, DateTime FECHA_FIN);
        IEnumerable<CierreAhorroSocioMovilModel> ObtenerCierreAhorroSocioMovil(DateTime FECHA_INI, DateTime FECHA_FIN , int? ID_SOCIO_MOVIL);

        SD_CIERRES ObtenerUltimoRegistroCierre();

        RespuestaSP GuardarCierre(SD_CIERRES cierre, string detalles ,string login);
        
    }
}
