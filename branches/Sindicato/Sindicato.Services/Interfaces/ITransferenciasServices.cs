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
    public interface ITrasferenciasServices
    {
        IEnumerable<SD_INGRESOS> ObtenerIngresosPaginados(PagingInfo paginacion, FiltrosModel<TransferenciasModel> filtros);
        IEnumerable<SD_EGRESOS> ObtenerEgresosPaginados(PagingInfo paginacion, FiltrosModel<TransferenciasModel> filtros);
        IEnumerable<SD_TRANSFERENCIAS> ObtenerTransferenciasPaginados(PagingInfo paginacion, FiltrosModel<TransferenciasModel> filtros);

        RespuestaSP GuardarIngreso(SD_INGRESOS ingreso, string login);
        RespuestaSP EliminarIngreso(int ID_INGRESO);

        RespuestaSP GuardarEgreso(SD_EGRESOS egreso, string login);
        RespuestaSP EliminarEgreso(int ID_EGRESO);

        RespuestaSP GuardarTransferencia(SD_TRANSFERENCIAS transf, string login);
        RespuestaSP EliminarTransferencia(int ID_TRANSFERENCIA);

        RespuestaSP EliminarIngresoPorSocio(int ID_INGRESO);
    }
}
