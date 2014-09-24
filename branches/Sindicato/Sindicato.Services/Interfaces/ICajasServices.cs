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
    public interface ICajasServices
    {
        IEnumerable<SD_CAJAS> ObtenerCajasPaginado(PagingInfo paginacion);
        RespuestaSP SP_GrabarCaja(SD_CAJAS caja, int ID_USR);
        RespuestaSP SP_EliminarCaja(int ID_CAJA, int ID_USR);


        IEnumerable<SD_KARDEX_EFECTIVO> ObtenerKardexEfectivo(PagingInfo paginacion, FiltrosModel<KardexEfectivoModel> filtros);
        IEnumerable<SD_KARDEX_EFECTIVO> ObtenerKardexEfectivo(Expression<Func<SD_KARDEX_EFECTIVO, bool>> criterio);

        //SD_USUARIOS
    }
}
