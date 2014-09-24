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
        IEnumerable<SD_HOJAS_CONTROL> ObtenerHojasPaginados(PagingInfo paginacion, FiltrosModel<HojasModel> filtros);

        RespuestaSP GuardarHojas(SD_HOJAS_CONTROL h, int ID_USR, int CANTIDAD_HOJA, int ID_CAJA);

        //SD_USUARIOS
    }
}
