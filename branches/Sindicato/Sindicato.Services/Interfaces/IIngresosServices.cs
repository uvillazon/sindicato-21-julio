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
    public interface IIngresosServices
    {
        IEnumerable<SD_INGRESOS_POR_SOCIOS> ObtenerIngresosPorSocioPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros);
        IEnumerable<SD_TIPOS_INGRESOS_SOCIO> ObtenerITiposIngresosPorSocioPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros);
        
        RespuestaSP GuardarIngreso(SD_INGRESOS_POR_SOCIOS ingreso, string login);
        RespuestaSP EliminarIngreso(int ID_INGRESO);

        RespuestaSP GuardarTipoIngreso(SD_TIPOS_INGRESOS_SOCIO tipo, string login);
        RespuestaSP EliminarTipoIngreso(int ID_TIPO_INGRESO);

    }
}
