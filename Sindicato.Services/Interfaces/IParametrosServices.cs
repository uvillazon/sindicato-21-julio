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
    public interface IParametrosServices
    {
        IEnumerable<SD_PARAMETROS_LINEA> ObtenerParametrosPaginados(PagingInfo paginacion, FiltrosModel<ParametrosModel> filtros);
        IEnumerable<SD_PARAMETROS_LINEA> ObtenerParametros(Expression<Func<SD_PARAMETROS_LINEA, bool>> criterio);
        RespuestaSP GuardarParametros(SD_PARAMETROS_LINEA parametro, int ID_USR);
        RespuestaSP ObtenerParametro(string COD_PAR, int ID_LINEA = 1);
        //SD_USUARIOS
    }
}
